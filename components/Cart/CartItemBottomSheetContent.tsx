import { StyleSheet, TouchableOpacity } from 'react-native';
import { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import Colors from '@/constants/Colors';
import { View, Text } from '@/components/Themed';
import { CartItem } from '@/store/store';
import { CircleMinus, CirclePlus } from 'lucide-react-native';
import { useItemSelection } from '@/contexts/ItemSelectionContext';
import { useBoundStore } from '@/store/store';

export function CartItemBottomSheetContent({
	data,
	closeModal,
}: {
	data: CartItem;
	closeModal: () => void;
}) {
	console.log('data', data);
	const { handleIncrement, handleDecrement, removeSelectedOption } =
		useItemSelection();
	const { increaseItemQty, decreaseItemQty } = useBoundStore((state) => state);
	// Updated function to calculate total for this specific item
	const calculateItemTotal = (data: CartItem) => {
		if (!data) return 0;
		// const basePrice = parseFloat(data.item_price);
		const optionsTotal = data.item.options.reduce(
			(total, option) => total + (option.price || 0),
			0
		);
		return data.item.item_price * data.quantity + optionsTotal;
	};

	return (
		<BottomSheetScrollView style={styles.container}>
			<Text style={styles.title}>{data.item.item_title}</Text>
			<Text>Tes{data.item.item_description}</Text>
			<Text style={styles.price}>{`₦${data.item.item_price}`}</Text>

			<View style={styles.optionsContainer}>
				{Object.entries(data.item.options).map(([category, option]) => (
					<View key={category} style={styles.option}>
						<Text>{option.title}</Text>
						{option.type === 'optional' && (
							<TouchableOpacity onPress={() => removeSelectedOption(category)}>
								<Text style={styles.removeOption}>Remove</Text>
							</TouchableOpacity>
						)}
					</View>
				))}
			</View>

			<View style={styles.quantityContainer}>
				<CircleMinus
					onPress={() => decreaseItemQty(data.item._id)}
					size={20}
					color={Colors.light.background}
				/>
				<Text style={styles.quantityText}>{data.quantity}</Text>
				<CirclePlus
					onPress={() => increaseItemQty(data.item._id)}
					size={20}
					color={Colors.light.background}
				/>
			</View>

			<Text style={styles.totalPrice}>{`Total: ₦${calculateItemTotal(
				data
			).toFixed(2)}`}</Text>

			<TouchableOpacity style={styles.checkoutButton} onPress={closeModal}>
				<Text style={styles.checkoutButtonText}>Checkout</Text>
			</TouchableOpacity>
		</BottomSheetScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		borderWidth: 1,
		borderColor: 'red',
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		color: Colors.dark.background,
	},
	price: {
		fontSize: 16,
		color: Colors.dark.background,
	},
	optionsContainer: {
		marginTop: 10,
	},
	option: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	removeOption: {
		color: 'red',
	},
	quantityContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 20,
		borderWidth: 1,
		borderColor: 'red',
	},
	quantityText: {
		marginHorizontal: 10,
		fontSize: 18,
		color: Colors.light.background,
	},
	totalPrice: {
		marginTop: 20,
		fontSize: 18,
		fontWeight: 'bold',
		color: Colors.dark.background,
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
