if (__DEV__) {
	require('../ReactotronConfig');
}
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { RootSiblingParent } from 'react-native-root-siblings';
import { useBoundStore } from '@/store/store';
import { useColorScheme } from '@/components/useColorScheme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getAddressFromCoordinates } from '@/lib';
import { AuthProvider } from '@/contexts/AuthContext';
import { Stack } from 'expo-router';

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from 'expo-router';

// export const unstable_settings = {
// 	// Ensure that reloading on `/modal` keeps a back button present.
// 	initialRouteName: '(tabs)',
// };

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
	const setUserLocation = useBoundStore((state) => state.setUserLocation);
	const setCurrentAddress = useBoundStore((state) => state.setCurrentAddress);
	const currentAddress = useBoundStore((state) => state.currentAddress);

	const colorScheme = useColorScheme();
	const [loaded, error] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
		// ...FontAwesome.font,
	});

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);
	// Check for location permissions
	useEffect(() => {
		(async () => {
			try {
				let { status } = await Location.requestForegroundPermissionsAsync();
				if (status !== 'granted') {
					console.log('Permission to access location was denied');
					return;
				}
				//  Get user's current location
				let {
					coords: { longitude, latitude },
				} = await Location.getCurrentPositionAsync({});
				const location = { longitude, latitude };
				setUserLocation(location);

				if (currentAddress === null) {
					/**
					 * ! This call is billed on google, use Sparingly or use the MapBox API in development.
					 */
					const address = await getAddressFromCoordinates(location);
					setCurrentAddress(address);
					// TODO: Remove this (for development purposes only)
					// const temp_addres =
					// 	' 3 Joshua close, Nvigwe Woji, Port harcourt, Nigeria';
					// setCurrentAddress(temp_addres);
				}
			} catch (error) {
				console.log('🚀 ~ RootLayout ~ error:', error);
			}
		})();
	}, []);

	if (!loaded) {
		return null;
	}

	return (
		<AuthProvider>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<ThemeProvider
					value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
				>
					<RootSiblingParent>
						<BottomSheetModalProvider>
							<QueryClientProvider client={queryClient}>
								<SafeAreaProvider>
									<Stack>
										<Stack.Screen
											name='(authenticated)'
											options={{ headerShown: false }}
										/>
										<Stack.Screen
											name='login'
											options={{ headerShown: false }}
										/>
										<Stack.Screen
											name='register'
											options={{ headerShown: false }}
										/>
										<Stack.Screen
											name='confirmation'
											options={{ headerShown: false }}
										/>
									</Stack>
								</SafeAreaProvider>
							</QueryClientProvider>
						</BottomSheetModalProvider>
					</RootSiblingParent>
				</ThemeProvider>
			</GestureHandlerRootView>
		</AuthProvider>
	);
}
