import { StyleSheet, FlatList } from 'react-native';
import { View, Text } from '@/components/Themed';
import { useEffect, useState } from 'react';
import { Vendor_Data, useForYouVendors } from '@/hooks/useForYouVendors';
import { useBoundStore } from '@/store/store';
import { ForYouCard } from './ForYouCard';

export function ForYouList() {
	const [vendors, setVendors] = useState<Vendor_Data[]>([]);
	const user_position = useBoundStore((state) => state.userLocation);

	useEffect(() => {
		async function fetchClosestVendors() {
			if (user_position) {
				const vendors = await useForYouVendors(
					user_position.latitude,
					user_position.longitude
				);
				console.log('closest', vendors);
				setVendors(vendors);
			}
		}
		fetchClosestVendors();
	}, []);
	return (
		<View style={styles.listContainer}>
			<FlatList
				data={vendors}
				renderItem={({ item }) => <ForYouCard vendor={item} />}
				keyExtractor={(item) => item._id}
				horizontal
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	listContainer: {
		minHeight: 240,
		minWidth: 320.5,
		// borderColor: 'red',
		// borderWidth: 1,
		// backgroundColor: 'green',
	},
});
