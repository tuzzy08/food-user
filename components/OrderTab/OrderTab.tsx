import { Order } from '@/app/(authenticated)/(tabs)/orders';
import { StyleSheet, Text, View } from 'react-native';

export function OrderTab({ orders }: { orders: Order[] }) {
	return (
		<View>
			<Text>Order</Text>
		</View>
	);
}

const styles = StyleSheet.create({});
