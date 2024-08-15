import { create, StateCreator } from 'zustand';

const CHECKOUT_URL = `${process.env.EXPO_API_URL}/orders/checkout`;

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
export interface ModifiedItem extends ItemFromAPI {
	vendor_id: string;
	vendor_title: string;
	vendor_logo_url: string;
}

export interface OptionForCartItem {
	title: string;
	quantity: number;
	price: number;
}

interface OptionItemFromAPI {
	title: string;
	quantity: number;
	price: number;
}

export interface OptionFromAPI {
	title: string;
	type: string;
	items: Array<OptionItemFromAPI>;
}
export interface ItemFromAPI {
	_id: string;
	item_title: string;
	item_image_url: string;
	item_description: string;
	item_price: number;
	item_in_stock: boolean;
	item_cook_time: number;
	item_category_id: string;
	item_category: string;
	item_vendor: string;
	options: Array<OptionFromAPI>;
}

export type Item = Pick<
	ItemFromAPI,
	| '_id'
	| 'item_title'
	| 'item_image_url'
	| 'item_description'
	| 'item_price'
	| 'item_vendor'
> & {
	vendor_title: string;
	vendor_id: string;
	vendor_logo_url: string;
	options: Array<OptionForCartItem>;
};

export interface CartItem {
	item: Item;
	quantity: number;
}
interface CartSlice {
	cart: Array<CartItem>;
	addItem: (item: Item, qty: number) => void;
	deleteItem: (itemId: string) => void;
	increaseItemQty: (itemId: string) => void;
	decreaseItemQty: (itemId: string) => void;
	clearCart: () => void;
	checkout: (userId: string, cart: Array<CartItem>) => void;
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
	addItem: (item: Item, quantity: number) =>
		set((state) => ({
			cart: [...state.cart, { item: item, quantity: quantity }],
		})),
	deleteItem: (itemId: string) =>
		set((state) => {
			const updatedItems = [
				...state.cart.filter(({ item }, _) => item._id !== itemId),
			];
			return {
				cart: [...updatedItems],
			};
		}),
	increaseItemQty: (itemId: string) =>
		set((state) => {
			// Fetch the item from array in state
			const item = state.cart.find(({ item }) => item._id === itemId);

			if (!item || item?.quantity < 0) return {};
			// Update it's quantity
			item.quantity += 1;
			return {
				// Filter out the item and merge in the updated item
				cart: [...state.cart.filter(({ item }) => item._id !== itemId), item],
			};
		}),
	decreaseItemQty: (itemId: string) =>
		set((state) => {
			// Fetch the item from array in state
			const item = state.cart.find(({ item }) => item._id === itemId);

			if (!item || item?.quantity <= 0) return {};
			// Update it's quantity
			item.quantity -= 1;
			return {
				// Filter out the item and merge in the updated item
				cart: [...state.cart.filter(({ item }) => item._id !== itemId), item],
			};
		}),
	clearCart: () =>
		set((state) => ({
			cart: [],
		})),
	checkout: async (userId: string, items: CartItem[]) => {
		try {
			const response = await fetch(CHECKOUT_URL, {
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
