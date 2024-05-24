import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function Layout() {
	const colorScheme = useColorScheme();
	return (
		<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
			<Stack>
				<Stack.Screen name='mapPage' options={{ headerShown: false }} />
				<Stack.Screen name='notifications' options={{}} />
				<Stack.Screen
					name='wallet'
					options={{ headerTitle: '', headerBackTitle: 'back' }}
				/>
			</Stack>
		</ThemeProvider>
	);
}
