import { FlashList } from '@shopify/flash-list';
import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { VendorCard } from '../VendorCard';
import { useVendors } from '@/hooks/useVendors';

export function Restaurants() {
	const { isPending, data: vendors, error } = useVendors();

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
				renderItem={({ item }) => <VendorCard vendor={item} />}
				estimatedItemSize={50} // Adjust this value based on the average item height
				contentContainerStyle={{ paddingHorizontal: 5 }}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
}

const styles = StyleSheet.create({});
