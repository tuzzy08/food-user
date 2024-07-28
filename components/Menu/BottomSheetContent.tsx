import { useCallback, useState } from 'react';
import Toast from 'react-native-root-toast';
import { BottomSheetView, TouchableOpacity } from '@gorhom/bottom-sheet';
import { View, Text } from '../Themed';
import { Image } from 'expo-image';
import { Pressable, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import { useBoundStore, OptionForCartItem, ModifiedItem } from '@/store/store';
import { FloatingButton } from './FloatingButton';

const minusText = '-';
const plusText = '+';

export function BottomSheetContent({
	selectedItem,
	closeModal,
}: {
	selectedItem: ModifiedItem | undefined;
	closeModal: () => void;
}) {
	// Set Item options, quantity and price
	const [options, setOptions] = useState<Array<OptionForCartItem>>([]);
	const [itemQty, setItemQty] = useState(1);
	const totalPrice = selectedItem?.item_price! * itemQty;

	const [prevItem, setPrevItem] = useState<ModifiedItem | undefined>(
		selectedItem
	);
	if (prevItem !== selectedItem) {
		setPrevItem(selectedItem);
		setItemQty(1);
	}
	const cart = useBoundStore((state) => state.cart);
	const cart_total = cart.reduce(
		(acc, item) => acc + item.item.item_price * item.quantity,
		0
	);
	const addItem = useBoundStore((state) => state.addItem);

	const handleAddToCart = useCallback(() => {
		addItem(
			{
				_id: selectedItem?._id!,
				item_title: selectedItem?.item_title!,
				item_image_url: selectedItem?.item_image_url!,
				item_description: selectedItem?.item_description!,
				item_price: selectedItem?.item_price!,
				item_vendor: selectedItem?.item_vendor!,
				options: options,
				vendor_title: selectedItem?.vendor_title!,
				vendor_id: selectedItem?.vendor_id!,
				vendor_logo_url: selectedItem?.vendor_logo_url!,
			},
			itemQty
		);
		Toast.show('Added to cart!', {
			duration: Toast.durations.SHORT,
			position: Toast.positions.BOTTOM,
			delay: 350,
			opacity: 0.8,
			hideOnPress: true,
			backgroundColor: Colors.primary,
		});
		closeModal();
	}, [selectedItem]);

	return (
		<BottomSheetView>
			{/* Food image */}
			<Image
				contentFit='fill'
				source={selectedItem?.item_image_url}
				style={styles.bottomSheetImage}
			/>
			{/* Main bottom sheet content */}
			<BottomSheetView style={styles.bottomSheetContent}>
				{/* Pricing info */}
				<BottomSheetView style={{ marginTop: 5, padding: 8, gap: 5 }}>
					<Text style={styles.bottomSheetTitle}>
						{selectedItem?.item_title}
					</Text>
					<Text
						style={styles.bottomSheetPrice}
					>{`₦${selectedItem?.item_price}`}</Text>
				</BottomSheetView>
				{/* Add and Minus & Add to cart buttons */}
				<BottomSheetView style={styles.actionButtonsContainer}>
					{/* Add and Minus buttons */}
					<BottomSheetView style={styles.quantityButtonContainer}>
						<Pressable
							onPress={() => {
								setItemQty((prevQty) => {
									if (prevQty > 1) {
										return prevQty - 1;
									}
									return prevQty;
								});
							}}
							style={styles.quantityButton}
						>
							<Text style={styles.quantityButtonText}>{minusText}</Text>
						</Pressable>
						<Text
							style={{
								color: '#000',
								padding: 18,
								fontSize: 18,
								fontWeight: '700',
							}}
						>
							{itemQty}
						</Text>
						<Pressable
							onPress={() => {
								setItemQty((prevQty) => prevQty + 1);
							}}
							style={styles.quantityButton}
						>
							<Text style={styles.quantityButtonText}>{plusText}</Text>
						</Pressable>
					</BottomSheetView>
					{/* Add to cart button */}
					<TouchableOpacity
						style={styles.addToCartButton}
						onPress={() => handleAddToCart()}
					>
						<Text style={styles.addToCartButtonText}>{`ADD `}</Text>
						<Text
							style={styles.addToCartButtonTotalPriceText}
						>{`(₦${totalPrice})`}</Text>
					</TouchableOpacity>
				</BottomSheetView>

				{/*  */}
			</BottomSheetView>
			{cart.length > 0 ? (
				<FloatingButton
					closeModal={closeModal}
					cartlength={cart.length}
					totalPrice={cart_total}
				/>
			) : null}
		</BottomSheetView>
	);
}

const styles = StyleSheet.create({
	bottomSheetImage: {
		height: '30%',
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
	},
	bottomSheetContent: {
		height: '65%',
		justifyContent: 'space-between',
	},
	bottomSheetTitle: {
		fontSize: 16,
		fontWeight: '600',
		color: Colors.dark.background,
	},
	actionButtonsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 50,
		marginHorizontal: 20,
	},
	addToCartButton: {
		flexDirection: 'row',
		borderColor: '#000',
		borderRadius: 4,
		paddingVertical: 15,
		// flex: 1,
		width: 130,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.secondary,
	},
	addToCartButtonText: {
		color: Colors.dark.text,
		fontSize: 18,
		fontWeight: '500',
	},
	addToCartButtonTotalPriceText: {
		fontSize: 14,
	},
	bottomSheetPrice: { fontSize: 14, color: Colors.dark.background },
	quantityButtonContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 4,
		borderWidth: 1,
		paddingHorizontal: 5,
		borderColor: Colors.grey,
	},
	quantityButton: {
		borderWidth: 1.5,
		width: 35,
		height: 35,
		borderRadius: 50,
		borderColor: Colors.grey,
		justifyContent: 'center',
		alignItems: 'center',
	},
	quantityButtonText: {
		color: Colors.dark.background,
		fontSize: 20,
		fontWeight: '700',
	},
});
