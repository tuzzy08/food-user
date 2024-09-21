type OrderItem = {
	itemId: string; // Item ID
	itemVendorId: string;
	itemQty: number;
	itemPrice: number;
};

type SubOrder = {
	vendor_id: string;
	user_id: string;
	items: OrderItem[];
	order_status: string;
	total_price: number;
};

type Ticket = {
	// order_no: string;
	user_id: string;
	orders: SubOrder[];
	order_total_price: number;
	overall_status: string;
};

enum OrderStatus {
	PendingVendorConfirmation = 'PendingVendorConfirmation',
	vendorConfirmed = 'vendorConfirmed',
	Processing = 'Processing',
	readyForPickup = 'readyForPickup',
	Delivering = 'Delivering',
	Delivered = 'Delivered',
	Cancelled = 'Cancelled',
}

export class OrderProcessor {
	groupItemsByVendor(items: OrderItem[]): Record<string, OrderItem[]> {
		return items.reduce((acc, item) => {
			if (!acc[item.itemVendorId]) {
				acc[item.itemVendorId] = [];
			}
			acc[item.itemVendorId].push(item);
			return acc;
		}, {} as Record<string, OrderItem[]>);
	}

	// Function to create a sub-order for a group of items
	createSubOrder(
		user_id: string,
		vendor_id: string,
		items: OrderItem[]
	): SubOrder {
		const orderItems: OrderItem[] = items.map((item) => ({
			itemId: item.itemId,
			itemQty: item.itemQty,
			itemPrice: item.itemPrice,
			itemVendorId: vendor_id,
		}));

		const total_price = items.reduce(
			(sum, item) => sum + item.itemPrice * item.itemQty,
			0
		);

		return {
			vendor_id,
			user_id,
			items: orderItems,
			order_status: 'pending', // Default status
			total_price,
		};
	}

	// Function to create a composite order
	createCompositeOrder(user_id: string, cartItems: OrderItem[]): Ticket {
		const groupedItems = this.groupItemsByVendor(cartItems);
		const orders: SubOrder[] = Object.keys(groupedItems).map((vendorId) =>
			this.createSubOrder(vendorId, user_id, groupedItems[vendorId])
		);

		const order_total_price = orders.reduce(
			(sum, subOrder) => sum + subOrder.total_price,
			0
		);

		return {
			user_id,
			orders,
			order_total_price,
			overall_status: OrderStatus.PendingVendorConfirmation, // Default overall status
		};
	}
}
