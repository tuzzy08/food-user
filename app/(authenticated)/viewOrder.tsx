import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Colors from '@/constants/Colors';
import { View, Text } from '@/components/Themed';
import { CartItem, ItemsToOrder, useBoundStore } from '@/store/store';
import OrderSummary from '@/components/Orders/OrderSummary';
import { getCheckoutUrl } from '@/hooks/getCheckoutUrl';

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

export default function Page() {
	const { vendorId } = useLocalSearchParams();
	const { getItemToOrder } = useBoundStore((state) => state);
	const cartItem = getItemToOrder(vendorId as string);

	const handlePlaceOrder = async (cart: ItemsToOrder) => {
		if (!cart) return;
		console.log('Placing order', cart);
		const order_total = calculateItemTotal(cart.items);
		try {
			const { status, data } = await getCheckoutUrl(cart, order_total);
			console.log('response from checkout url', status, data);
			if (!status) return;
			if (data.authorization_url) {
				router.push({
					pathname: '/(authenticated)/checkoutView',
					params: {
						authorization_url: data.authorization_url,
					},
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	if (!cartItem) {
		return (
			<View style={styles.container}>
				<Text>This order is empty.</Text>
			</View>
		);
	}
	return (
		<ScrollView style={styles.container}>
			<Text style={styles.headerTitle}>{`${cartItem.vendor_title}`}</Text>
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
