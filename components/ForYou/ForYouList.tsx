import { StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { View, Text } from '@/components/Themed';
import data from './data';
import { VendorCard } from '../VendorCard';

export function ForYouList() {
	return (
		<View style={styles.listContainer}>
			<FlashList
				data={data}
				renderItem={({ item }) => (
					<VendorCard
						item={item}
						style={{ marginRight: 15, height: 240, width: 270 }}
					/>
				)}
				estimatedItemSize={15}
				horizontal
				contentContainerStyle={{ paddingHorizontal: 1 }}
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	listContainer: {
		flex: 1,
	},
});
