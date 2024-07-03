import { Item } from '@/app/(authenticated)/(tabs)/[vendorId]';
import { create, StateCreator } from 'zustand';

interface OtpSlice {
	otp: string | null;
	pinId: string | null;
	phone: string | null;
	// setOtp: (otp: string) => void;
	setPinId: (pinId: string) => void;
	setPhone: (phone: string) => void;
}
interface UserLocationSlice {
	userLocation: {
		longitude: number;
		latitude: number;
	} | null;
	userGeoHash: string | null;
	currentAddress: string | null;
	deliveryAddress: string | null;
	setUserLocation: (coordinates: {
		longitude: number;
		latitude: number;
	}) => void;
	setGeoHash: (geoHash: string) => void;
	setCurrentAddress: (address: string) => void;
	setDeliveryAddress: (address: string) => void;
}

interface CartItem {
	item: Item;
	qty: number;
}
interface CartSlice {
	cart: Array<CartItem>;
	addItem: (item: Item) => void;
	deleteItem: (itemId: string) => void;
	increaseItemQty: (itemId: string) => void;
	decreaseItemQty: (itemId: string) => void;
	clearCart: () => void;
	checkout: (userId: string, items: { item: Item; qty: number }[]) => void;
}
// Create Store Slices
const createLocationSlice: StateCreator<
	UserLocationSlice,
	[],
	[],
	UserLocationSlice
> = (set) => ({
	userLocation: null,
	userGeoHash: null,
	currentAddress: null,
	deliveryAddress: null,
	setUserLocation: (coordinates: { longitude: number; latitude: number }) =>
		set((state) => ({
			userLocation: {
				...state.userLocation,
				...coordinates,
			},
		})),
	setGeoHash: (geoHash: string) => set(() => ({ userGeoHash: geoHash })),
	setCurrentAddress: (address: string) =>
		set(() => ({ currentAddress: address })),
	setDeliveryAddress: (address: string) =>
		set(() => ({ deliveryAddress: address })),
});

const createOtpSlice: StateCreator<OtpSlice, [], [], OtpSlice> = (set) => ({
	otp: null,
	pinId: null,
	phone: null,
	// setOtp: (otp: string) => set(() => ({ otp: otp })),
	setPinId: (pinId: string) => set(() => ({ pinId: pinId })),
	setPhone: (phone: string) => set(() => ({ phone: phone })),
});

const creatCartSlice: StateCreator<CartSlice, [], [], CartSlice> = (set) => ({
	cart: [],
	addItem: (item: Item, qty: number = 1) =>
		set((state) => ({
			cart: [...state.cart, { item, qty }],
		})),
	deleteItem: (itemId: string) =>
		set((state) => {
			const updatedItems = [
				...state.cart.filter((cart_item, i) => cart_item.item._id !== itemId),
			];
			return {
				cart: [...updatedItems],
			};
		}),
	increaseItemQty: (itemId: string) =>
		set((state) => {
			// Fetch the item from array in state
			const item = state.cart.find(
				(cart_item) => cart_item.item._id === itemId
			);

			if (!item || item?.qty < 0) return {};
			// Update it's quantity
			item.qty += 1;
			return {
				// Filter out the item and merge in the updated item
				cart: [
					...state.cart.filter((cart_item) => cart_item.item._id !== itemId),
					item,
				],
			};
		}),
	decreaseItemQty: (itemId: string) =>
		set((state) => {
			// Fetch the item from array in state
			const item = state.cart.find(
				(cart_item) => cart_item.item._id === itemId
			);

			if (!item || item?.qty <= 0) return {};
			// Update it's quantity
			item.qty -= 1;
			return {
				// Filter out the item and merge in the updated item
				cart: [
					...state.cart.filter((cart_item) => cart_item.item._id !== itemId),
					item,
				],
			};
		}),
	clearCart: () =>
		set((state) => ({
			cart: [],
		})),
	checkout: async (userId: string, items: CartItem[]) => {
		try {
			const response = await fetch(`${process.env.EXPO_API_URL}/checkout`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					// Authorization: `Bearer ${authState.token}`,
				},
				body: JSON.stringify({
					userId,
					items,
				}),
			});
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		} catch (error) {
			console.log(error);
		}
	},
});

export const useBoundStore = create<UserLocationSlice & CartSlice & OtpSlice>()(
	(...a) => ({
		...createLocationSlice(...a),
		...creatCartSlice(...a),
		...createOtpSlice(...a),
	})
);
