import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Redirect } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';

import { useColorScheme } from '@/components/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function AuthLayout() {
	const { authState } = useAuth();
	// console.log('🚀 ~ TabLayout ~ authState:', authState);

	// * Check if the user is authenticated
	// if (authState!.authenticated !== true || authState!.token === null) {
	// 	return <Redirect href='/login' />;
	// }
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
			<Stack>
				<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
			</Stack>
		</ThemeProvider>
	);
}
