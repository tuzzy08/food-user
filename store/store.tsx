import { create, StateCreator } from 'zustand';

interface CartItem {
	itemId: string;
	itemTitle: string;
	itemVendorId: string;
	itemVendorTitle: string;
	itemQty: number;
	itemPrice: number;
}

interface OtpSlice {
	otp: string;
	pinId: string;
	phone: string;
	// setOtp: (otp: string) => void;
	setPinId: (pinId: string) => void;
	setPhone: (phone: string) => void;
}
interface UserLocationSlice {
	userLocation: {
		longitude: number;
		latitude: number;
	};
	userGeoHash: string;
	currentAddress: string;
	deliveryAddress: string;
	setUserLocation: (coordinates: {
		longitude: number;
		latitude: number;
	}) => void;
	setGeoHash: (geoHash: string) => void;
	setCurrentAddress: (address: string) => void;
	setDeliveryAddress: (address: string) => void;
}
interface CartSlice {
	items: CartItem[];
	addItem: (item: CartItem) => void;
	deleteItem: (itemId: string) => void;
	increaseItemQty: (itemId: string) => void;
	decreaseItemQty: (itemId: string) => void;
	clearCart: () => void;
}
// Create Store Slices
const createLocationSlice: StateCreator<
	UserLocationSlice,
	[],
	[],
	UserLocationSlice
> = (set) => ({
	userLocation: {
		longitude: 6.4,
		latitude: 5.3,
	},
	userGeoHash: '',
	currentAddress: '',
	deliveryAddress: '',
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
	otp: '',
	pinId: '',
	phone: '',
	// setOtp: (otp: string) => set(() => ({ otp: otp })),
	setPinId: (pinId: string) => set(() => ({ pinId: pinId })),
	setPhone: (phone: string) => set(() => ({ phone: phone })),
});

const creatCartSlice: StateCreator<CartSlice, [], [], CartSlice> = (set) => ({
	items: [],
	addItem: (item: CartItem) =>
		set((state) => ({
			items: [...state.items, item],
		})),
	deleteItem: (itemId: string) =>
		set((state) => {
			const updatedItems = [
				...state.items.filter((item, i) => item.itemId !== itemId),
			];
			return {
				items: [...updatedItems],
			};
		}),
	increaseItemQty: (itemId: string) =>
		set((state) => {
			// Fetch the item from array in state
			const item = state.items.find((item) => item.itemId === itemId);

			if (!item || item?.itemQty < 0) return {};
			// Update it's quantity
			item.itemQty += 1;
			return {
				// Filter out the item and merge in the updated item
				items: [...state.items.filter((item) => item.itemId !== itemId), item],
			};
		}),
	decreaseItemQty: (itemId: string) =>
		set((state) => {
			// Fetch the item from array in state
			const item = state.items.find((item) => item.itemId === itemId);

			if (!item || item?.itemQty <= 0) return {};
			// Update it's quantity
			item.itemQty -= 1;
			return {
				// Filter out the item and merge in the updated item
				items: [...state.items.filter((item) => item.itemId !== itemId), item],
			};
		}),
	clearCart: () =>
		set((state) => ({
			items: [],
		})),
});

export const useBoundStore = create<UserLocationSlice & CartSlice & OtpSlice>()(
	(...a) => ({
		...createLocationSlice(...a),
		...creatCartSlice(...a),
		...createOtpSlice(...a),
	})
);
