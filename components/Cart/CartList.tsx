import { ScrollView, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Text, View } from '@/components/Themed';
import { CartItem } from './CartItem';
import { CartItem as Item } from '@/store/store';

export function CartList({ cart }: { cart: [string, Item[]][] }) {
	return (
		<ScrollView style={styles.container}>
			<FlashList
				estimatedItemSize={100}
				data={cart}
				renderItem={({ item }) => <CartItem item={item} />}
				horizontal={false}
				showsHorizontalScrollIndicator={false}
				keyExtractor={(item) => item[0]}
				contentContainerStyle={styles.contentContainer}
				ItemSeparatorComponent={() => (
					<View style={{ height: 1, width: '100%' }} />
				)}
			/>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		width: '95%',
	},
	contentContainer: {},
});
