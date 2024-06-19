import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { Image } from 'expo-image';
import { Rating } from '@/components/Rating';
import { useRouter } from 'expo-router';

type VendorProps = {
	_id: string;
	vendor_title: string;
	vendor_logo_url: string;
	vendor_email: string;
	vendor_contact_phone: string;
	vendor_address: string;
	_geoloc: any;
	vendor_min_price: number;
	vendor_categories: any;
	vendor_items: any;
	vendor_isVerified: boolean;
	vendor_isActive: boolean;
	vendor_isOpen: boolean;
	vendor_rating: number;
};

export function VendorCard({
	vendor,
	style,
}: {
	vendor: VendorProps;
	style?: {};
}) {
	const router = useRouter();
	return (
		vendor && (
			<TouchableOpacity
				onPress={() =>
					router.navigate({
						params: {
							vendorId: vendor._id,
							imgUrl: vendor ? vendor.vendor_logo_url : '',
						},
						pathname: `/[vendorId]`,
					})
				}
			>
				<View style={[styles.itemContainer, { ...style }]}>
					{/* Image Section */}
					<View style={{ width: '100%', height: '70%' }}>
						<Image
							source={vendor ? vendor.vendor_logo_url : ''}
							style={styles.itemImage}
						/>
					</View>
					{/* Details section / Footer */}
					<View style={styles.footer}>
						<View style={styles.footerTop}>
							<Text style={{ paddingVertical: 3 }}>{vendor.vendor_title}</Text>
						</View>
						<View style={styles.footerBottom}>
							<View style={{ flexDirection: 'row' }}>
								<Text
									style={{ fontSize: 11 }}
								>{`From  ₦${vendor.vendor_min_price} | `}</Text>
								<Text style={{ fontSize: 11, color: Colors.primary }}>
									Closed
								</Text>
							</View>

							<Rating rating={vendor.vendor_rating} />
						</View>
					</View>
				</View>
			</TouchableOpacity>
		)
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
