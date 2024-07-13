import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { CartItem as Item } from '@/store/store';
import { Link } from 'expo-router';
import { Image } from 'expo-image';
import Colors from '@/constants/Colors';

export function CartItem({ item }: { item: [string, Item[]] }) {
	console.log(item);
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

			<View>
				<Link href={``}>
					<Text>View</Text>
				</Link>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		width: '95%',
		height: 75,
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 10,
		borderWidth: 0.3,
		borderRadius: 7,
		borderColor: Colors.grey,
		gap: 10,
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
