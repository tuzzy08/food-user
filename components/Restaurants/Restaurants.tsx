import { FlashList } from '@shopify/flash-list';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { VendorCard } from '../VendorCard';
import { Vendor_Data } from '@/hooks/useVendors';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

export function Restaurants() {
	const [vendors, setVendors] = useState<Vendor_Data[]>([]);

	const {
		isPending,
		error,
		data: all_vendors,
	} = useQuery({
		queryKey: ['allVendors'],
		queryFn: () =>
			fetch(`${process.env.EXPO_PUBLIC_API_URL}/vendors`).then((res) =>
				res.json()
			),
	});

	useEffect(() => {
		if (all_vendors && all_vendors.length > 0) {
			setVendors(all_vendors);
		}
	}, [all_vendors]);

	if (isPending)
		return (
			<>
				<Text>Loading</Text>
			</>
		);

	if (error) return 'An error has occured' + error.message;

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
