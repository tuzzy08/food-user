import { CartItem } from '@/store/store';
import { StyleSheet, Text, View } from 'react-native';

export function CartItemList({ cart }: { cart: CartItem[] }) {
	return (
		<View>
			<Text>CartItem</Text>
		</View>
	);
}

const styles = StyleSheet.create({});
