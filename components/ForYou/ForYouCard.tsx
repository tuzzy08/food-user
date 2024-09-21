import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { View, Text } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { Image } from 'expo-image';
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

export function ForYouCard({ vendor }: { vendor: VendorProps }) {
	const router = useRouter();
	const color = useColorScheme();
	console.log(vendor);
	return (
		<TouchableOpacity
			onPress={() =>
				router.navigate({
					params: { vendor: JSON.stringify(vendor) },
					pathname: `/(authenticated)/vendor`,
				})
			}
		>
			<View style={styles.itemContainer}>
				{/* Image Section */}
				<View
					style={{
						width: '100%',
						height: '70%',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Image
						source={vendor ? vendor.vendor_logo_url : ''}
						style={styles.itemImage}
					/>
				</View>
				{/* Details section / Footer */}
				<View
					style={[
						styles.footer,
						{
							backgroundColor:
								color === 'dark'
									? Colors.dark.alt.background
									: Colors.light.background,
						},
					]}
				>
					<Text style={{ paddingVertical: 3, marginTop: 5 }}>
						{vendor.vendor_title}
					</Text>
					<View
						style={[
							styles.footerBottom,
							{
								backgroundColor:
									color === 'dark'
										? Colors.dark.alt.background
										: Colors.light.background,
							},
						]}
					>
						<View
							style={{
								flexDirection: 'row',
								backgroundColor:
									color === 'dark'
										? Colors.dark.alt.background
										: Colors.light.background,
							}}
						>
							<Text
								style={{ fontSize: 11 }}
							>{`From  ₦${vendor.vendor_min_price} | `}</Text>
							<Text style={{ fontSize: 11, color: Colors.errorColor }}>
								Closed
							</Text>
						</View>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	itemContainer: {
		marginRight: 15,
		height: 220,
		width: 270,
		// gap: 5,
	},
	itemImage: {
		height: '100%',
		width: '100%',
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},
	itemTitle: {
		fontSize: 12,
		fontWeight: '400',
	},
	footer: {
		height: '30%',
		width: '100%',
		gap: 4,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		paddingLeft: 5,
	},
	footerTop: {
		paddingHorizontal: 3,
	},
	footerBottom: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 3,
	},
});
