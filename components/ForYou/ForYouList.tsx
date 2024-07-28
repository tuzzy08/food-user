import { StyleSheet, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { View, Text } from '@/components/Themed';
import { Vendor_Data, useForYouVendors } from '@/hooks/useForYouVendors';
import { useBoundStore } from '@/store/store';
import { ForYouCard } from './ForYouCard';
import { ForYouSkeleton } from './ForYouSkeleton';

export function ForYouList() {
	const user_position = useBoundStore((state) => state.userLocation);
	const [vendors, setVendors] = useState<Vendor_Data[]>([]);
	// TODO: Implement fallback in a case where you cant get user loction
	const {
		isPending,
		error,
		data: closest_vendors,
	} = useForYouVendors(user_position?.latitude, user_position?.longitude);

	useEffect(() => {
		if (closest_vendors && closest_vendors.length > 0) {
			setVendors(closest_vendors);
		}
	}, [closest_vendors]);

	if (isPending) return <ForYouSkeleton />;
	if (error) return <Text>{'An error has occurred: ' + error.message}</Text>;
	return (
		<View style={styles.listContainer}>
			<Text style={styles.HeaderText}>For You</Text>
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
		gap: 5,
	},
	HeaderText: {
		fontSize: 16,
		fontWeight: '600',
	},
});
