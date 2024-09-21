import { useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';
import { useRef, useCallback } from 'react';
import { WebView } from 'react-native-webview';

type NavigationState = {
	url?: string;
	title?: string;
	loading?: boolean;
	canGoBack?: boolean;
	canGoForward?: boolean;
};
export default function Page() {
	const { authorization_url } = useLocalSearchParams();
	console.log(authorization_url);
	const PAYSTACK_CALLBACK_URL =
		'https://nourri-api.onrender.com/orders/paystack/callback';
	const webViewRef = useRef<WebView>(null);

	const handleNavigationStateChange = useCallback((state: NavigationState) => {
		const { url } = state;

		if (!url) return;

		if (url === PAYSTACK_CALLBACK_URL) {
			// TODO:  Extract transaction reference from URL & Verify Transaction

			// Redirect to callback URL
			webViewRef.current?.injectJavaScript(
				`window.location = "${PAYSTACK_CALLBACK_URL}"`
			);
		}

		if (url === 'https://standard.paystack.co/close') {
			// Handle webview removal
			// You can use navigation to go back or unmount the component
			// For example, if using React Navigation:
			// navigation.goBack();
		}
	}, []);

	return (
		<WebView
			ref={webViewRef}
			source={{ uri: authorization_url as string }}
			style={styles.container}
			onNavigationStateChange={handleNavigationStateChange}
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
});
