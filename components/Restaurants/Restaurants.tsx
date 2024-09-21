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
				width: '100%',
			}}
		>
			<FlashList
				data={vendors}
				renderItem={({ item }) => {
					return <VendorCard vendor={item} />;
				}}
				estimatedItemSize={50}
				contentContainerStyle={{ paddingHorizontal: 12 }}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
}
