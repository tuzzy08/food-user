import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { Image, ImageSource } from 'expo-image';
import { Rating } from '@/components/Rating';
import { useRouter } from 'expo-router';
type ImgUrl =
	| string
	| number
	| ImageSource
	| ImageSource[]
	| string[]
	| null
	| undefined;

type ForYouItem = {
	id: number;
	title: string;
	imgUrl: ImgUrl;
	href: string;
	rating: number;
	startingPrice: number;
};

export function VendorCard({ item, style }: { item: ForYouItem; style?: {} }) {
	const router = useRouter();
	return (
		<TouchableOpacity
			onPress={() =>
				router.navigate({
					params: { vendorId: item.id, imgUrl: item.imgUrl },
					pathname: `/[vendorId]`,
				})
			}
		>
			<View style={[styles.itemContainer, { ...style }]}>
				{/* Image Section */}
				<View style={{ width: '100%', height: '70%' }}>
					<Image source={item.imgUrl} style={styles.itemImage} />
				</View>
				{/* Details section / Footer */}
				<View style={styles.footer}>
					<View style={styles.footerTop}>
						<Text style={{ paddingVertical: 3 }}>{item.title}</Text>
					</View>
					<View style={styles.footerBottom}>
						<View style={{ flexDirection: 'row' }}>
							<Text
								style={{ fontSize: 11 }}
							>{`From  ₦${item.startingPrice} | `}</Text>
							<Text style={{ fontSize: 11, color: Colors.primary }}>
								Closed
							</Text>
						</View>

						<Rating rating={item.rating} />
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	itemContainer: {
		// gap: 5,
		// borderColor: 'red',
		// borderWidth: 0.5,
	},
	itemImage: {
		height: '100%',
		width: '100%',
		borderRadius: 6,
	},
	itemTitle: {
		fontSize: 12,
		fontWeight: '400',
	},
	footer: {
		height: '30%',
		width: '100%',
		gap: 4,
		// borderColor: 'green',
		// borderWidth: 0.5,
	},
	footerTop: {
		paddingHorizontal: 3,
	},
	footerBottom: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 3,
		// borderColor: 'yellow',
		// borderWidth: 0.5,
	},
});
