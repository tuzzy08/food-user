import { Pressable, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { ItemsToOrder } from '@/store/store';
import { Image } from 'expo-image';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';

export function CartItemView({ order }: { order: ItemsToOrder }) {
	const router = useRouter();
	const handlePress = () => {
		router.push({
			pathname: '/viewOrder',
			params: {
				vendorId: JSON.stringify(order.vendor_id),
			},
		});
	};
	return (
		<View style={styles.container}>
			{/* Restaurant title */}
			<View style={styles.imgAndTextContainer}>
				<Image source={`${order.vendor_logo_url}`} style={styles.image} />
				<View>
					<Text>{`${order.vendor_title}`}</Text>
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
