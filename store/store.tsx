import { create, StateCreator } from 'zustand';

const CHECKOUT_URL = `${process.env.EXPO_API_URL}/orders/checkout`;

type option_type = 'required' | 'optional';

interface OtpSlice {
	otp: string | null;
	pinId: string | null;
	phone: string | null;
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
export interface Option {
	category: string;
	title: string;
	price: number;
	type: option_type;
	isMissing?: boolean;
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
	options: Array<Option>;
}
export interface Item extends ItemFromAPI {
	vendor_id: string;
	vendor_title: string;
	vendor_logo_url: string;
	options: Array<Option>;
}
type CartItemType = {
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
	vendor_id: string;
	vendor_title: string;
	vendor_logo_url: string;
	options: Array<Option | Option[]>;
};
export interface CartItem {
	item: CartItemType;
	quantity: number;
}

export interface ItemsToOrder {
	vendor_id: string;
	vendor_title: string;
	vendor_logo_url: string;
	items: Array<CartItem>;
	order_total?: number;
	createdAt?: string;
}

interface CartSlice {
	cart: Array<ItemsToOrder>;
	addItem: (item: CartItemType, qty: number) => void;
	getItem: (itemId: string) => CartItem | undefined;
	getItemToOrder: (vendorId: string) => ItemsToOrder | undefined;
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
	setPinId: (pinId: string) => set(() => ({ pinId: pinId })),
	setPhone: (phone: string) => set(() => ({ phone: phone })),
});

const creatCartSlice: StateCreator<CartSlice, [], [], CartSlice> = (
	set,
	get
) => ({
	cart: [],

	addItem: (item: CartItemType, quantity: number) =>
		set((state) => {
			const vendorId = item.vendor_id;
			const newCartItem: CartItem = { item, quantity };

			const existingVendorIndex = state.cart.findIndex(
				(order) => order.vendor_id === vendorId
			);

			if (existingVendorIndex !== -1) {
				// Vendor already exists in cart, add item to existing order
				const updatedCart = [...state.cart];
				updatedCart[existingVendorIndex].items.push(newCartItem);
				return { cart: updatedCart };
			} else {
				// New vendor, create a new order
				const newOrder: ItemsToOrder = {
					vendor_id: vendorId,
					vendor_title: item.vendor_title,
					vendor_logo_url: item.vendor_logo_url,
					items: [newCartItem],
					createdAt: new Date().toISOString(),
				};
				return { cart: [...state.cart, newOrder] };
			}
		}),

	getItem: (itemId: string) => {
		const state = get();
		const cleanedItemId = itemId.replace(/^"(.*)"$/, '$1');
		for (const order of state.cart) {
			const foundItem = order.items.find(
				(cartItem) => cartItem.item._id === cleanedItemId
			);
			if (foundItem) return foundItem;
		}
		return undefined;
	},
	getItemToOrder: (vendorId: string) => {
		const state = get();
		const cleanedVendorId = vendorId.replace(/^"(.*)"$/, '$1');
		const order = state.cart.find(
			(order) => order.vendor_id === cleanedVendorId
		);
		return order ? order : undefined;
	},

	deleteItem: (itemId: string) =>
		set((state) => ({
			cart: state.cart
				.map((order) => ({
					...order,
					items: order.items.filter((cartItem) => cartItem.item._id !== itemId),
				}))
				.filter((order) => order.items.length > 0),
		})),

	increaseItemQty: (itemId: string) =>
		set((state) => ({
			cart: state.cart.map((order) => ({
				...order,
				items: order.items.map((cartItem) =>
					cartItem.item._id === itemId
						? { ...cartItem, quantity: cartItem.quantity + 1 }
						: cartItem
				),
			})),
		})),

	decreaseItemQty: (itemId: string) =>
		set((state) => ({
			cart: state.cart
				.map((order) => ({
					...order,
					items: order.items
						.map((cartItem) =>
							cartItem.item._id === itemId && cartItem.quantity > 1
								? { ...cartItem, quantity: cartItem.quantity - 1 }
								: cartItem
						)
						.filter((cartItem) => cartItem.quantity > 0),
				}))
				.filter((order) => order.items.length > 0),
		})),

	clearCart: () => set({ cart: [] }),

	checkout: async (userId: string, items: CartItem[]) => {
		try {
			const response = await fetch(CHECKOUT_URL, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
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
