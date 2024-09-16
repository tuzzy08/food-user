import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Colors from '@/constants/Colors';
import { View, Text } from '@/components/Themed';
import { CartItem, ItemsToOrder, useBoundStore } from '@/store/store';
import OrderSummary from '@/components/Orders/OrderSummary';

// function to calculate total for an array of CartItems
const calculateItemTotal = (cartItems: CartItem[]) => {
	let optionsTotalAmount = 0;
	return cartItems.reduce((total, cartItem) => {
		const basePrice = cartItem.item.item_price * cartItem.quantity;
		optionsTotalAmount = cartItem.item.options.reduce((optionTotal, option) => {
			if (Array.isArray(option)) {
				// Sum up prices for optional items (which are now arrays)
				return (
					optionTotal +
					option.reduce((subtotal, opt) => subtotal + (opt.price || 0), 0)
				);
			} else {
				// Add price for required items (which are still single objects)
				return optionTotal + (option.price || 0);
			}
		}, 0);
		return total + basePrice + optionsTotalAmount;
	}, 0);
};
const handlePlaceOrder = (order: ItemsToOrder) => {
	console.log('Placing order', order);
};

export default function Page() {
	const { vendorId } = useLocalSearchParams();
	const { getItemToOrder } = useBoundStore((state) => state);
	const cartItem = getItemToOrder(vendorId as string);

	console.log('cart item', cartItem);

	if (!cartItem) {
		return (
			<View style={styles.container}>
				<Text>Item not found.</Text>
			</View>
		);
	}
	return (
		<ScrollView style={styles.container}>
			<Text style={styles.headerTitle}>{`${cartItem.vendorTitle}`}</Text>
			{cartItem.items.map((item) => (
				<OrderSummary item={item} key={item.item.item_title} />
			))}
			<Text style={styles.totalPrice}>{`Total: ₦${calculateItemTotal(
				cartItem.items
			).toFixed(2)}`}</Text>
			<TouchableOpacity
				onPress={() => handlePlaceOrder(cartItem)}
				style={styles.checkoutButton}
			>
				<Text style={styles.checkoutButtonText}>Place order</Text>
			</TouchableOpacity>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
	},
	headerTitle: {
		fontSize: 16,
		fontWeight: '500',
		paddingBottom: 10,
	},
	priceText: {
		fontSize: 16,
	},
	totalPrice: {
		marginTop: 20,
		fontSize: 18,
		fontWeight: 'bold',
	},
	checkoutButton: {
		marginTop: 20,
		backgroundColor: Colors.primary,
		padding: 10,
		borderRadius: 5,
		alignItems: 'center',
	},
	checkoutButtonText: {
		color: 'white',
		fontSize: 16,
	},
});
