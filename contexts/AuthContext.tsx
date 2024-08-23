import React, { createContext, useEffect, useState } from 'react';
import { useBoundStore } from '@/store/store';
import {
	getFromSecureStore,
	deleteFromSecureStore,
	saveToSecureStore,
} from '@/lib/secureStoreManager';
import { sendOtpToPhone, verifyOtp } from '@/lib/otpHelpers';

interface RegistrationData {
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	password: string;
	referralCode?: string;
}

interface AuthData {
	authState?: { token: string | null; authenticated: boolean };
	loading: boolean;
	// handleSignIn?: (email: string, password: string) => void;
	handleSendOtp: (phone: string) => void;
	handleVerifyOtp: (phone: string, pinId: string, otp: string) => void;
	// handleLogOut: () => void;
	handleSignUp: (data: RegistrationData) => Promise<string>;
}

const defaultContext = {
	authState: {
		token: null,
		authenticated: false,
	},
	loading: false,
	handleSignIn: async (email: string, password: string) => {},
	handleSendOtp: async (phone: string) => {},
	handleVerifyOtp: async (phone: string, pinId: string, otp: string) => {},
	handleLogOut: async () => {},
	handleSignUp: async (data: RegistrationData) => '',
};

const TOKEN_KEY = 'authToken';

export const AuthContext = createContext<AuthData>(defaultContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const setPinId = useBoundStore((state) => state.setPinId);
	const setPhone = useBoundStore((state) => state.setPhone);

	const [authState, setAuthState] = useState<{
		token: string | null;
		authenticated: boolean;
	}>({
		token: null,
		authenticated: false,
	});
	const [loading, setLoading] = useState(false);

	// * Load Token from secure store if it exists
	useEffect(() => {
		async function loadToken() {
			const token = await getFromSecureStore(TOKEN_KEY);
			if (token)
				setAuthState((state) => ({
					...state,
					token: token,
					authenticated: true,
				}));
		}
		loadToken().catch(async (error) => {
			console.log(error);
			await deleteFromSecureStore(TOKEN_KEY);
		});
	}, []);

	const handleSignUp = async (data: RegistrationData): Promise<string> => {
		return fetch(`${process.env.EXPO_PUBLIC_API_URL_DEV}/register`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				// Authorization: `Bearer ${authState.token}`,
			},
			body: JSON.stringify(data),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then((data) => {
				const { pinId } = data;
				if (!pinId) throw new Error('No pinId in response');
				return pinId;
			});
	};

	// const handleLogOut = async () => {
	// 	try {
	// 		// const loggedOut = await kindeClient.logout(true);
	// 		// if (loggedOut) {
	// 		// 	// User was logged out
	// 		// 	setAuthState({ token: null, authenticated: false });
	// 		// 	// Delete token from storage
	// 		// 	await deleteFromSecureStore(TOKEN_KEY);
	// 		// }
	// 	} catch (error) {}
	// };

	const handleSendOtp = async (phone: string) => {
		try {
			setLoading(true);
			setPhone(phone);
			const { pinId } = await sendOtpToPhone(phone);
			// setPinId(pinId);
			// setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	const handleVerifyOtp = async (phone: string, pinId: string, otp: string) => {
		try {
			setLoading(true);
			const { verified, access_token } = await verifyOtp(phone, pinId, otp);
			if (verified && access_token) {
				// * User was authenticated
				setAuthState((state) => ({
					...state,
					token: access_token,
					authenticated: true,
				}));
				// * Save token to secure storage
				await saveToSecureStore('authToken', access_token);
				// * Set auth token in header
				// axios.defaults.headers.common[
				// 	'Authorization'
				// ] = `Bearer ${access_token}`;
				// setLoading(false);
			}
		} catch (error) {}
	};

	return (
		<AuthContext.Provider
			value={{
				authState,
				// handleLogOut,
				handleSignUp,
				loading,
				handleSendOtp,
				handleVerifyOtp,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
