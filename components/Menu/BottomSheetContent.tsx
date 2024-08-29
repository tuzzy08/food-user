import { useCallback, useEffect, useMemo, useState } from 'react';
import Toast from 'react-native-root-toast';
import { BottomSheetView, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View, ScrollView } from 'react-native';
import Colors from '@/constants/Colors';
import { useBoundStore, Item, Option as StoreOption } from '@/store/store';
import { ItemOptions } from './ItemOptions';
import { CircleMinus, CirclePlus } from 'lucide-react-native';
import { useItemSelection } from '@/contexts/ItemSelectionContext';

// Add this type definition
type Option = StoreOption & { selected: boolean };

type ItemOptions = {
	required: Array<Option>;
	optional: Array<Option>;
};

export function BottomSheetContent({
	closeModal,
	selectedItem,
}: {
	closeModal: () => void;
	selectedItem: Item;
}) {
	const { selectedOptions, addSelectedOption, removeSelectedOption } =
		useItemSelection();
	const itemOptions = useMemo(() => {
		if (!selectedItem) return { required: [], optional: [] };

		const required = selectedItem.options
			.filter((option) => option.type === 'required')
			.map((option) => ({ ...option, selected: false }));
		const optional = selectedItem.options
			.filter((option) => option.type === 'optional')
			.map((option) => ({ ...option, selected: false }));
		return { required, optional };
	}, [selectedItem?.options]);

	// const [itemOptions, setItemOptions] = useState<ItemOptions>({
	// 	required: [],
	// 	optional: [],
	// });

	// useEffect(() => {
	// 	if (selectedItem) {
	// 		setItemOptions({
	// 			required: selectedItem.options
	// 				.filter((option) => option.option_type === 'required')
	// 				.map((option) => ({ ...option, selected: false })),
	// 			optional: selectedItem.options
	// 				.filter((option) => option.option_type === 'optional')
	// 				.map((option) => ({ ...option, selected: false })),
	// 		});
	// 	}
	// }, [selectedItem]);

	// const toggleOption = useCallback(
	// 	(optionType: 'required' | 'optional', index: number) => {
	// 		const option = itemOptions[optionType][index];
	// 		if (option.selected) {
	// 			removeSelectedOption(option.category);
	// 		} else {
	// 			addSelectedOption(option.category, option);
	// 		}
	// 		setItemOptions((prevOptions) => {
	// 			const updatedOptions = { ...prevOptions };
	// 			updatedOptions[optionType][index].selected =
	// 				!updatedOptions[optionType][index].selected;
	// 			return updatedOptions;
	// 		});
	// 	},
	// 	[itemOptions, addSelectedOption, removeSelectedOption]
	// );
	const toggleOption = useCallback((option: Option) => {
		if (option.selected) {
			removeSelectedOption(option.category);
		} else {
			addSelectedOption(option.category, option);
		}
	}, []);
	// const areAllRequiredOptionsSelected = useCallback(() => {
	// 	return itemOptions.required.every((option) => option.selected);
	// }, [itemOptions.required]);

	const [itemQty, setItemQty] = useState(1);
	const totalPrice = selectedItem?.item_price! * itemQty;

	// const [prevItem, setPrevItem] = useState<ModifiedItem | undefined>(
	// 	selectedItem
	// );
	// if (prevItem !== selectedItem) {
	// 	setPrevItem(selectedItem);
	// 	setItemQty(1);
	// }
	const cart = useBoundStore((state) => state.cart);
	const cart_total = cart.reduce(
		(acc, item) => acc + item.item.item_price * item.quantity,
		0
	);
	const addItem = useBoundStore((state) => state.addItem);

	const handleAddToCart = useCallback(() => {
		if (!selectedItem) return;

		const optionsToAdd = Object.values(selectedOptions);
		addItem(
			{
				...selectedItem,
				options: optionsToAdd,
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
	}, [selectedItem, selectedOptions, itemQty, addItem, closeModal]);

	return (
		<BottomSheetView style={styles.bottomSheetContent}>
			{/* Food image */}
			<Image
				contentFit='fill'
				source={selectedItem?.item_image_url}
				style={styles.bottomSheetImage}
			/>
			{/* Main bottom sheet content */}
			<BottomSheetScrollView
				contentContainerStyle={styles.bottomSheetScrollView}
			>
				{/* Item info */}
				<BottomSheetView style={styles.itemDescription}>
					<Text style={styles.bottomSheetTitle}>
						{selectedItem?.item_title}
					</Text>
					<Text>{selectedItem?.item_description}</Text>
					<Text style={styles.price}>{`₦${selectedItem?.item_price}`}</Text>
				</BottomSheetView>
				{/* Optional items for the selected item */}
				{selectedItem?.options && (
					<BottomSheetView style={styles.optionsContainer}>
						{selectedItem?.options && (
							<ItemOptions options={itemOptions} toggleOption={toggleOption} />
						)}
					</BottomSheetView>
				)}
			</BottomSheetScrollView>
			{/* Footer */}
			<View style={styles.footer}>
				{/* Add and Minus & Add to cart buttons */}
				<BottomSheetView style={styles.actionButtonsContainer}>
					{/* Add and Minus buttons */}
					<BottomSheetView style={styles.quantityButtonContainer}>
						<CircleMinus
							strokeWidth={0.7}
							color={Colors.dark.background}
							size={40}
							onPress={() => {
								setItemQty((prevQty) => {
									return prevQty > 1 ? prevQty - 1 : prevQty;
								});
							}}
						/>
						<Text style={styles.quantityText}>{itemQty}</Text>
						<CirclePlus
							strokeWidth={0.7}
							color={Colors.dark.background}
							size={40}
							onPress={() => {
								setItemQty((prevQty) => prevQty + 1);
							}}
						/>
					</BottomSheetView>
					{/* Add to cart button */}
					<Pressable
						style={styles.addToCartButton}
						onPress={() => handleAddToCart()}
					>
						<Text style={styles.addToCartButtonText}>{`ADD `}</Text>
						<Text
							style={styles.addToCartButtonTotalPriceText}
						>{`(₦${totalPrice})`}</Text>
					</Pressable>
				</BottomSheetView>
			</View>
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
		flex: 1,
	},
	bottomSheetScrollView: {
		paddingBottom: 100,
		flexGrow: 1,
	},
	bottomSheetTitle: {
		fontSize: 16,
		fontWeight: '600',
		color: Colors.dark.background,
	},
	itemDescription: {
		marginTop: 5,
		paddingHorizontal: 10,
		paddingBottom: 25,
		gap: 10,
	},
	footer: {
		width: '100%',
		height: 90,
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		bottom: 0,
		backgroundColor: Colors.light.background,
	},
	actionButtonsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 50,
		marginHorizontal: 20,
		// borderWidth: 1,
	},
	addToCartButton: {
		flexDirection: 'row',
		borderColor: '#000',
		borderRadius: 4,
		height: 40,
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
		color: Colors.dark.text,
	},
	price: { fontSize: 14, fontWeight: 'bold', color: Colors.dark.background },
	quantityButtonContainer: {
		flexDirection: 'row',
		// justifyContent: 'center',
		gap: 15,
		alignItems: 'center',
		borderRadius: 4,
		height: 50,
		// borderWidth: 1,
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
	quantityText: {
		color: Colors.dark.background,
		fontSize: 18,
		fontWeight: '700',
	},
	optionsContainer: {
		flex: 1,
	},
});
