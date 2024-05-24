import { StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { View, Text } from '@/components/Themed';
import Categories from './categories';
import { CategoryItem } from './CategoryItem';

export function CategoryList() {
	return (
		<View style={styles.listContainer}>
			<FlashList
				data={Categories}
				renderItem={({ item }) => <CategoryItem item={item} />}
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
		height: 130,
	},
});
