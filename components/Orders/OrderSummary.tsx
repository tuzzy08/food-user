import React, { useState, useCallback } from 'react';
import { Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from '@/components/Themed';
import { CartItem, useBoundStore } from '@/store/store';
import { CircleMinus, CirclePlus, Trash, Dot } from 'lucide-react-native';
import Color from 'color';
import Colors from '@/constants/Colors';
import { Image } from 'expo-image';

export default function OrderSummary({ item }: { item: CartItem }) {
	const [itemOptions, setItemOptions] = useState(item.item.options);
	const { increaseItemQty, decreaseItemQty, deleteItem, deleteOption } =
		useBoundStore((state) => state);

	const deleteItemOption = useCallback(
		(optionTitle: string) => {
			deleteOption(item.item._id, optionTitle);
			setItemOptions((prevOptions) =>
				prevOptions
					.map((optionOrArray) => {
						if (Array.isArray(optionOrArray)) {
							const filteredArray = optionOrArray.filter(
								(opt) => opt.title !== optionTitle
							);
							return filteredArray.length > 0 ? filteredArray : null;
						}
						return optionOrArray.title !== optionTitle ? optionOrArray : null;
					})
					.filter(
						(option): option is NonNullable<typeof option> => option !== null
					)
			);
		},
		[deleteOption, item.item._id]
	);

	const subTotal = item.item.item_price * item.quantity;

	return (
		<View style={styles.container}>
			<View style={{ gap: 5 }}>
				<View style={styles.itemTitleAndQuantity}>
					<View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
						<View style={styles.optionImage}>
							<Image
								source={item.item.item_image_url}
								style={{ flex: 1, borderRadius: 30 }}
								contentFit='fill'
							/>
						</View>
						<Text style={styles.itemTitletext}>{item.item.item_title}</Text>
					</View>

					<View style={styles.quantityContainer}>
						<TouchableOpacity onPress={() => decreaseItemQty(item.item._id)}>
							<CircleMinus size={20} color={Colors.light.text} />
						</TouchableOpacity>
						<Text style={styles.quantityText}>{item.quantity}</Text>
						<TouchableOpacity onPress={() => increaseItemQty(item.item._id)}>
							<CirclePlus size={20} color={Colors.light.text} />
						</TouchableOpacity>
					</View>
				</View>

				<View style={styles.itemOptions}>
					<Text style={styles.extrasTitle}>Extras</Text>
					<View style={styles.extrasContainer}>
						{itemOptions.length > 0 ? (
							itemOptions.flatMap((optionOrArray, index) => {
								const options = Array.isArray(optionOrArray)
									? optionOrArray
									: [optionOrArray];
								return options.map((option, subIndex) => (
									<View style={styles.optionItem} key={`${index}-${subIndex}`}>
										<Dot size={10} color={Colors.light.text} />
										<Text
											style={styles.optionText}
										>{`${option.title}  x1`}</Text>
										{option.type === 'optional' && (
											<Pressable
												style={styles.removeOptionButton}
												onPress={() => deleteItemOption(option.title)}
											>
												<Trash size={14} color={Colors.dark.text} />
											</Pressable>
										)}
									</View>
								));
							})
						) : (
							<Text>None</Text>
						)}
					</View>
				</View>
			</View>

			<View style={styles.priceAndDeleteButton}>
				<Text style={styles.itemPriceText}>{`₦${subTotal}`}</Text>
				<Pressable
					style={[styles.removeOptionButton, styles.deleteItemButton]}
					onPress={() => deleteItem(item.item._id)}
				>
					<Trash size={19} color={Colors.errorColor} />
				</Pressable>
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 15,
		borderRadius: 10,
		gap: 20,
	},
	extrasContainer: {
		flex: 1,
		padding: 5,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: Colors.grey,
	},
	itemTitleAndQuantity: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	priceAndDeleteButton: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	optionImage: {
		width: 30,
		aspectRatio: 1,
	},
	itemOptions: {},
	itemTitletext: { fontSize: 18 },
	itemPriceText: {},
	quantityContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	removeOptionButton: {
		padding: 5,
		borderRadius: 50,
		backgroundColor: Color(Colors.errorColor).whiten(0.4).toString(),
	},
	deleteItemButton: {
		backgroundColor: Color(Colors.errorColor).whiten(2.2).toString(),
	},
	quantityText: {
		fontSize: 16,
	},
	extrasTitle: {
		fontSize: 16,
		marginTop: 10,
		marginBottom: 10,
		fontWeight: '500',
	},
	optionItem: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 15,
		padding: 10,
	},
	optionText: { fontSize: 14 },
});
