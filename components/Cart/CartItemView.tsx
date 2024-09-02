import { Pressable, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { CartItem } from '@/store/store';
import { Image } from 'expo-image';
import Colors from '@/constants/Colors';

export function CartItemView({
	item,
	index,
	showModal,
}: {
	item: [string, CartItem[]];
	index: number;
	showModal: (data: CartItem) => void;
}) {
	// console.log('item', item);
	return (
		<View style={styles.container}>
			{/* Restaurant title */}
			<View style={styles.imgAndTextContainer}>
				<Image
					source={`${item[1][0].item.vendor_logo_url}`}
					style={styles.image}
				/>
				<View>
					<Text>{item[0]}</Text>
					<Text style={styles.itemQtyText}>x{item[1].length} items</Text>
				</View>
			</View>

			<Pressable onPress={() => showModal(item[1][0])}>
				<Text>View</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		width: '100%',
		height: 80,
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 10,
		borderWidth: 0.3,
		borderRadius: 7,
		borderColor: Colors.grey,
		gap: 10,
		marginBottom: 15,
	},
	image: { width: 50, height: 50, borderRadius: 10 },
	imgAndTextContainer: {
		flexDirection: 'row',
		gap: 10,
	},
	itemQtyText: {
		fontSize: 11,
	},
});
