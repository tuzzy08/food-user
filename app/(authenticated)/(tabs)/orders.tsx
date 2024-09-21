import { StyleSheet, Animated, Dimensions, FlatList } from 'react-native';
import { View } from '@/components/Themed';
import { OrdersTabBar } from '@/components/OrdersTabBar';
import { TabPage } from './TabPage';
import { useCallback, useRef } from 'react';

export interface Order {
	_id: string;
	order_id: string;
	order_date: string;
	order_status: string;
	order_total: number;
	items: Array<{
		item_id: string;
		item_title: string;
		item_image_url: string;
		item_description: string;
		item_price: number;
		item_in_stock: boolean;
		item_cook_time: number;
		item_category_id: string;
		item_category: string;
		item_vendor: string;
	}>;
}

export default function Page() {
	const scrollX = useRef(new Animated.Value(0)).current;

	const flatlistRef = useRef<FlatList>(null);
	const { width: screenWidth } = Dimensions.get('screen');

	const onItemPress = useCallback((itemIndex: number) => {
		flatlistRef.current?.scrollToOffset({
			offset: itemIndex * screenWidth,
		});
	}, []);
	return (
		<View style={styles.container}>
			<View style={{ alignSelf: 'center' }}>
				<OrdersTabBar scrollX={scrollX} onItemPress={onItemPress} />
			</View>

			<View
				style={styles.separator}
				lightColor='#eee'
				darkColor='rgba(255,255,255,0.1)'
			/>
			<TabPage scrollX={scrollX} ref={flatlistRef} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	separator: {
		marginVertical: 15,
		height: 1,
		width: '100%',
	},
});
