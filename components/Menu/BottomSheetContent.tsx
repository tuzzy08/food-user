import { useCallback, useMemo, useState } from 'react';
import Toast from 'react-native-root-toast';
import { BottomSheetView, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Colors from '@/constants/Colors';
import { useBoundStore, Item, Option as StoreOption } from '@/store/store';
import { ItemOptions } from './ItemOptions';
import { CircleMinus, CirclePlus } from 'lucide-react-native';

const REQUIRED = 'required';
interface SelectedOptions {
	[key: string]: StoreOption | StoreOption[];
}

type ItemOptions = {
	required: Array<StoreOption>;
	optional: Array<StoreOption>;
};

export function BottomSheetContent({
	closeModal,
	selectedItem,
}: {
	closeModal: () => void;
	selectedItem: Item;
}) {
	const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});
	const [itemQty, setItemQty] = useState(1);
	const [missingRequiredOptions, setMissingRequiredOptions] = useState<
		StoreOption[]
	>([]);

	function checkMissingRequiredOptions(
		selectedOptions: SelectedOptions,
		selectedItem: Item
	): Array<StoreOption> | null {
		if (!selectedItem.options) {
			return null;
		}
		const missingOptions = [];

		const requiredOptions = selectedItem.options.filter(
			(option) => option.type === 'required'
		);

		for (const requiredOption of requiredOptions) {
			if (!selectedOptions[requiredOption.category]) {
				missingOptions.push(requiredOption);
			}
		}
		return missingOptions;
	}

	const handleOptionSelect = (option: StoreOption, category_type: string) => {
		setSelectedOptions((prev) => {
			const updatedOptions = { ...prev };
			if (category_type === REQUIRED) {
				// For required options, replace the existing option for the category
				updatedOptions[option.category] = option;
			} else {
				// For optional options, toggle the selection
				if (Array.isArray(updatedOptions[option.category])) {
					const existingIndex = (
						updatedOptions[option.category] as StoreOption[]
					).findIndex((opt) => opt.title === option.title);
					if (existingIndex !== -1) {
						// If the option is already selected, remove it
						(updatedOptions[option.category] as StoreOption[]).splice(
							existingIndex,
							1
						);
						if (
							(updatedOptions[option.category] as StoreOption[]).length === 0
						) {
							delete updatedOptions[option.category];
						}
					} else {
						// If the option is not selected, add it
						(updatedOptions[option.category] as StoreOption[]).push(option);
					}
				} else {
					// Initialize the array if it doesn't exist
					updatedOptions[option.category] = [option];
				}
			}
			return updatedOptions;
		});

		// Update missingRequiredOptions
		setMissingRequiredOptions((prev) => {
			const updatedMissing = prev.filter(
				(missingOption) => missingOption.category !== option.category
			);
			return updatedMissing;
		});
	};

	const optionsTotal = useMemo(() => {
		return Object.values(selectedOptions).reduce((total, option) => {
			if (Array.isArray(option)) {
				// Sum up prices for optional items (which are now arrays)
				return (
					total +
					option.reduce((subtotal, opt) => subtotal + (opt.price || 0), 0)
				);
			} else {
				// Add price for required items (which are still single objects)
				return total + (option.price || 0);
			}
		}, 0);
	}, [selectedOptions]);

	const totalPrice = useMemo(() => {
		const basePrice = selectedItem?.item_price || 0;
		return (basePrice + optionsTotal) * itemQty;
	}, [selectedItem, optionsTotal, itemQty]);

	const handleIncrement = useCallback(() => {
		setItemQty((prevQty) => prevQty + 1);
	}, []);
	const handleDecrement = useCallback(() => {
		setItemQty((prevQty) => Math.max(1, prevQty - 1));
	}, []);
	const { addItem, getItem, cart } = useBoundStore((state) => state);

	const handleAddToCart = useCallback(() => {
		if (!selectedItem) return;

		const missingOptions = checkMissingRequiredOptions(
			selectedOptions,
			selectedItem
		);
		if (missingOptions && missingOptions.length > 0) {
			setMissingRequiredOptions(missingOptions);
			// Show a toast or alert to inform the user about missing required options
			Toast.show('Please select all required options', {
				duration: Toast.durations.SHORT,
				position: Toast.positions.BOTTOM - 50,
				backgroundColor: Colors.errorColor,
			});
			return;
		}

		// Check if item already exists in cart
		const existingItem = getItem(selectedItem._id);
		if (existingItem) {
			closeModal();
			return;
		}

		// Retrieve optional items selected by the user
		const optionsToAdd = Object.values(selectedOptions);
		// Delete existing options from the item
		const { options, ...rest } = selectedItem;
		const itemToAddToCart = rest;

		// Add item to cart
		addItem(
			{
				...itemToAddToCart,
				options: optionsToAdd,
			},
			itemQty
		);
		setSelectedOptions({});
		setItemQty(1);
		Toast.show('Added to cart!', {
			duration: Toast.durations.SHORT,
			position: Toast.positions.BOTTOM - 50,
			delay: 400,
			opacity: 0.7,
			hideOnPress: true,
			backgroundColor: Colors.dark.alt.primary,
		});
		closeModal();
	}, [
		selectedItem,
		selectedOptions,
		itemQty,
		closeModal,
		missingRequiredOptions,
		addItem,
		getItem,
	]);

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
				showsVerticalScrollIndicator={false}
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
							<ItemOptions
								options={{
									required: selectedItem.options
										.filter((option) => option.type === 'required')
										.map((option) => ({ ...option, selected: false })),
									optional: selectedItem.options
										.filter((option) => option.type === 'optional')
										.map((option) => ({ ...option, selected: false })),
								}}
								onOptionSelect={handleOptionSelect}
								missingRequiredOptions={missingRequiredOptions}
							/>
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
							onPress={handleDecrement}
						/>
						<Text style={styles.quantityText}>{itemQty}</Text>
						<CirclePlus
							strokeWidth={0.7}
							color={Colors.dark.background}
							size={40}
							onPress={handleIncrement}
						/>
					</BottomSheetView>
					{/* Add to cart button */}
					<Pressable style={styles.addToCartButton} onPress={handleAddToCart}>
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
		gap: 15,
		alignItems: 'center',
		borderRadius: 4,
		height: 50,
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
