import { StyleSheet, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { View, Text } from '@/components/Themed';
import { Vendor_Data } from '@/hooks/useForYouVendors';
import { useBoundStore } from '@/store/store';
import { ForYouCard } from './ForYouCard';
import { ForYouSkeleton } from './ForYouSkeleton';

export function ForYouList() {
	const user_position = useBoundStore((state) => state.userLocation);
	const [vendors, setVendors] = useState<Vendor_Data[]>([]);

	// TODO: Implement case where you cant get user loction
	const {
		isPending,
		error,
		data: closest_vendors,
	} = useQuery({
		queryKey: [
			'forYouVendors',
			user_position?.latitude,
			user_position?.longitude,
		],
		queryFn: () =>
			user_position
				? fetch(
						`${process.env.EXPO_PUBLIC_API_URL}/vendors/closest?lat=${user_position.latitude}&lng=${user_position.longitude}`
				  ).then((res) => res.json())
				: Promise.resolve([]),
		enabled: !!user_position, // Only run the query if user_position is available
	});

	useEffect(() => {
		if (closest_vendors && closest_vendors.length > 0) {
			setVendors(closest_vendors);
		}
	}, [closest_vendors]);

	if (isPending) return <ForYouSkeleton />;
	if (error) return <Text>{'An error has occurred: ' + error.message}</Text>;
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
	},
});
