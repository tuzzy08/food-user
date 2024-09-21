import { Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from '@/components/Themed';
import { CartItem, useBoundStore } from '@/store/store';
import { CircleMinus, CirclePlus, Trash, Dot } from 'lucide-react-native';
import Color from 'color';
import Colors from '@/constants/Colors';
import { useItemSelection } from '@/contexts/ItemSelectionContext';
import { Image } from 'expo-image';

export default function OrderSummary({ item }: { item: CartItem }) {
	const { increaseItemQty, decreaseItemQty, deleteItem } = useBoundStore(
		(state) => state
	);
	const { removeSelectedOption } = useItemSelection();

	const subTotal = item.item.item_price * item.quantity;
	return (
		<View style={styles.container}>
			{/* <View style={{ gap: 40 }}> */}
			{/* Item Title & Quantity */}
			<View style={{ gap: 5 }}>
				{/* Item Title & Quantity */}
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

					{/* Quantity buttons */}
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
				{/* Options */}
				<View style={styles.itemOptions}>
					<Text
						style={{
							fontSize: 16,
							marginTop: 10,
							marginBottom: 10,
							fontWeight: '500',
						}}
					>
						Extras
					</Text>
					<View style={styles.extrasContainer}>
						{item.item.options.length > 0 ? (
							item.item.options.flatMap((optionOrArray, index) => {
								const options = Array.isArray(optionOrArray)
									? optionOrArray
									: [optionOrArray];
								return options.map((option, subIndex) => (
									<View
										style={{
											flexDirection: 'row',
											alignItems: 'center',
											gap: 15,
											// marginTop: 5,
											padding: 10,
										}}
										key={`${index}-${subIndex}`}
									>
										<Dot size={10} color={Colors.light.text} />
										<Text
											style={{ fontSize: 14 }}
										>{`${option.title}  x1`}</Text>
										{option.type === 'optional' && (
											<Pressable
												style={[
													{
														backgroundColor: Color(Colors.errorColor)
															.whiten(0.4)
															.toString(),
														borderRadius: 7,
														padding: 5,
													},
												]}
												onPress={() => removeSelectedOption(option.category)}
											>
												{/* <Text
													style={{
														alignSelf: 'center',
														color: Colors.dark.text,
													}}
												>
													remove
												</Text> */}
												<Trash size={14} color={Colors.dark.text} />
												{/*  */}
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
			{/* Separator */}
			{/* <View style={styles.separator} /> */}
			{/* Price & Delete button */}
			<View style={styles.priceAndDeleteButton}>
				<Text style={styles.itemPriceText}>{`₦${subTotal}`}</Text>
				<Pressable
					style={[
						styles.removeOptionButton,
						{
							backgroundColor: Color(Colors.errorColor).whiten(2.2).toString(),
						},
					]}
					onPress={() => deleteItem(item.item._id)}
				>
					<Trash size={19} color={Colors.errorColor} />
				</Pressable>
			</View>
			{/* </View> */}
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
	subTotalPriceText: {
		fontSize: 16,
	},
	separator: {
		// marginVertical: 15,
		height: 0.3,
		width: '100%',
		backgroundColor: Colors.grey,
	},
	quantityContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	removeOptionButton: {
		padding: 5,
		borderRadius: 50,
	},
	quantityText: {
		fontSize: 16,
	},
});
