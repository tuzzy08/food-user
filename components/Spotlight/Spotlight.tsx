import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Vendor_Data, useVendors } from '@/hooks/useVendors';

export function SpotlightCard() {
	const router = useRouter();
	const [spotlight_vendor, setSpotlightVendor] = useState<Vendor_Data>();

	useEffect(() => {
		async function fetchSpotlightVendor() {
			const vendors = await useVendors();
			const spotlight = getRandomItem(vendors);
			setSpotlightVendor(spotlight);
		}
		fetchSpotlightVendor();
	}, []);
	return (
		<TouchableOpacity
			onPress={() =>
				router.navigate({
					params: {
						vendorId: spotlight_vendor?._id,
						imgUrl: spotlight_vendor ? spotlight_vendor.vendor_logo_url : '',
					},
					pathname: `/[vendorId]`,
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
						source={spotlight_vendor ? spotlight_vendor.vendor_logo_url : ''}
						style={styles.itemImage}
					/>
				</View>
				{/* Details section / Footer */}
				<View style={styles.footer}>
					<View style={styles.footerTop}>
						<Text style={{ paddingVertical: 3 }}>
							{spotlight_vendor?.vendor_title}
						</Text>
					</View>
					<View style={styles.footerBottom}>
						<View style={{ flexDirection: 'row' }}>
							<Text
								style={{ fontSize: 11 }}
							>{`From  ₦${spotlight_vendor?.vendor_min_price} | `}</Text>
							<Text style={{ fontSize: 11, color: Colors.primary }}>
								Closed
							</Text>
						</View>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
}

function getRandomItem(vendors: Vendor_Data[]): Vendor_Data {
	const randomIndex = Math.floor(Math.random() * vendors.length);
	return vendors[randomIndex];
}

const styles = StyleSheet.create({
	itemContainer: {
		marginRight: 15,
		height: 240,
		width: 270,
		// gap: 5,
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
