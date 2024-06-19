import { FlashList } from '@shopify/flash-list';
import { Dimensions, StyleSheet, View } from 'react-native';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { VendorCard } from '../VendorCard';
import { Vendor_Data, useVendors } from '@/hooks/useVendors';
import { useEffect, useState } from 'react';

export function Restaurants() {
	const [vendors, setVendors] = useState<Vendor_Data[]>([]);

	useEffect(() => {
		async function fetchVendors() {
			const vendors = await useVendors();
			setVendors(vendors);
		}
		fetchVendors();
	}, []);

	return (
		<View
			style={{
				// flex: 1,

				minWidth: 320.5,
				// height: hp('90%'),
				// minHeight: 1000,
				// minHeight: 500,
				// width: '90%',
				// borderColor: 'green',
				// borderWidth: 1,
			}}
		>
			<FlashList
				data={vendors}
				renderItem={({ item }) => (
					<VendorCard
						vendor={item}
						style={{ marginBottom: 30, width: 309, height: 250 }}
					/>
				)}
				estimatedItemSize={50} // Adjust this value based on the average item height
				contentContainerStyle={{ paddingHorizontal: 5 }}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
}

const styles = StyleSheet.create({});
