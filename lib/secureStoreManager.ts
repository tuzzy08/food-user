import * as SecureStore from 'expo-secure-store';

export async function saveToSecureStore(key: string, value: string) {
	await SecureStore.setItemAsync(key, value);
}

export async function getFromSecureStore(key: string) {
	const value = await SecureStore.getItemAsync(key);
	return value;
}

export async function deleteFromSecureStore(key: string) {
	await SecureStore.deleteItemAsync(key);
}
