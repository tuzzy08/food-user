import { FlashList } from '@shopify/flash-list';
import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { VendorCard } from '../VendorCard';
import { Vendor_Data } from '@/hooks/useVendors';
import { useQuery } from '@tanstack/react-query';

export function Restaurants() {
	const {
		isPending,
		error,
		data: vendors,
	} = useQuery<Vendor_Data[]>({
		queryKey: ['allVendors'],
		queryFn: () =>
			fetch(`${process.env.EXPO_PUBLIC_API_URL}/vendors`).then((res) =>
				res.json()
			),
	});

	if (isPending) return <Text>Loading</Text>;

	if (error) return <Text>{`An error has occured ${error.message}`}</Text>;

	return (
		<View
			style={{
				minWidth: 320.5,
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
