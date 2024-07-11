import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
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
}: // style,
{
	vendor: VendorProps;
	// style?: {};
}) {
	const router = useRouter();
	const color = useColorScheme();
	return (
		vendor && (
			<TouchableOpacity
				onPress={() =>
					router.navigate({
						params: {
							vendor: JSON.stringify(vendor),
						},
						pathname: `/[vendorId]`,
					})
				}
				style={[{ borderRadius: 10 }, { marginBottom: 10 }]}
			>
				<View style={styles.container}>
					<Image
						source={vendor ? vendor.vendor_logo_url : ''}
						style={styles.image}
					/>
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
						<View
							style={[
								styles.footerTop,
								{
									backgroundColor:
										color === 'dark'
											? Colors.dark.alt.background
											: Colors.light.background,
								},
								,
							]}
						>
							<Text style={{}}>{vendor.vendor_title}</Text>
							<Rating rating={vendor.vendor_rating} />
						</View>

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
								style={[
									{ flexDirection: 'row' },
									{
										backgroundColor:
											color === 'dark'
												? Colors.dark.alt.background
												: Colors.light.background,
									},
								]}
							>
								<Text
									style={{ fontSize: 11 }}
								>{`From  ₦${vendor.vendor_min_price} | `}</Text>
								<Text style={{ fontSize: 11, color: Colors.primary }}>
									Closed
								</Text>
							</View>
						</View>
					</View>
				</View>
			</TouchableOpacity>
		)
	);
}

const styles = StyleSheet.create({
	container: {
		width: 320,
		height: 240,
		alignItems: 'center',
	},
	image: {
		width: '100%',
		height: '70%',
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},
	itemTitle: {
		fontSize: 12,
		fontWeight: '400',
	},
	footer: {
		paddingHorizontal: 5,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		width: '100%',
		height: '30%',
	},
	footerTop: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingTop: 15,
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
