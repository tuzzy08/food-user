import { Pressable, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { CartItem, ItemsToOrder } from '@/store/store';
import { Image } from 'expo-image';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';

export function CartItemView({
	order,
	index,
	showModal,
}: {
	order: ItemsToOrder;
	index: number;
	showModal: (data: CartItem) => void;
}) {
	// console.log('item', item);
	const router = useRouter();
	const handlePress = () => {
		router.push({
			pathname: '/viewOrder',
			params: {
				vendorId: JSON.stringify(order.vendorId),
			},
		});
	};
	return (
		<View style={styles.container}>
			{/* Restaurant title */}
			<View style={styles.imgAndTextContainer}>
				<Image source={`${order.vendorLogoUrl}`} style={styles.image} />
				<View>
					<Text>{`${order.vendorTitle}`}</Text>
					<Text style={styles.itemQtyText}>x{order.items.length} items</Text>
				</View>
			</View>

			<Pressable onPress={handlePress}>
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
