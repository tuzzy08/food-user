import { StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { View } from '@/components/Themed';
import { CartItemView } from './CartItemView';
import { ItemsToOrder } from '@/store/store';

export function CartList({ cart }: { cart: Array<ItemsToOrder> }) {
	return (
		<View style={styles.container}>
			<FlashList
				estimatedItemSize={100}
				data={cart}
				renderItem={({ item }) => <CartItemView order={item} />}
				showsHorizontalScrollIndicator={false}
				keyExtractor={(item) => item.vendor_title}
				ItemSeparatorComponent={() => (
					<View style={{ height: 1, width: '100%' }} />
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: '100%',
		width: '95%',
	},
});
