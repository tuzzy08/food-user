import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Vendor_Data, useVendors } from '@/hooks/useVendors';
import { SpotlightSkeleton } from './SpotlightSkeleton';

function getRandomItem(vendors: Vendor_Data[]): Vendor_Data {
	const randomIndex = Math.floor(Math.random() * vendors.length);
	return vendors[randomIndex];
}

export function SpotlightCard() {
	const router = useRouter();
	const [spotlight_vendor, setSpotlightVendor] = useState<Vendor_Data>();
	const { isPending, data: all_vendors, error } = useVendors();

	useEffect(() => {
		if (all_vendors && all_vendors.length > 0) {
			const spotlight = getRandomItem(all_vendors);
			setSpotlightVendor(spotlight);
		}
	}, [all_vendors]);

	if (isPending) return <SpotlightSkeleton />;

	if (error) return <Text>{'An error has occured' + error.message}</Text>;

	if (!spotlight_vendor) return null;

	return (
		<TouchableOpacity
			onPress={() =>
				router.navigate({
					params: {
						vendor: JSON.stringify(spotlight_vendor),
					},
					pathname: `/[vendorId]`,
				})
			}
		>
			<View style={styles.itemContainer}>
				<Text style={styles.HeaderText}>Spotlight</Text>
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
						source={spotlight_vendor.vendor_logo_url}
						style={styles.itemImage}
					/>
				</View>
				{/* Details section / Footer */}
				<View style={styles.footer}>
					<View style={styles.footerTop}>
						<Text style={{ paddingVertical: 3 }}>
							{spotlight_vendor.vendor_title}
						</Text>
					</View>
					<View style={styles.footerBottom}>
						<View style={{ flexDirection: 'row' }}>
							<Text
								style={{ fontSize: 11 }}
							>{`From  ₦${spotlight_vendor.vendor_min_price} | `}</Text>
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

const styles = StyleSheet.create({
	itemContainer: {
		marginRight: 15,
		height: 240,
		width: 270,
		gap: 5,
	},
	HeaderText: {
		fontSize: 16,
		fontWeight: '600',
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
