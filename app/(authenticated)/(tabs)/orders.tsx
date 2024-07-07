import { StyleSheet, Animated, Dimensions, FlatList } from 'react-native';
import { Text, View } from '@/components/Themed';
import { OrdersTabBar } from '@/components/OrdersTabBar';
import { useBoundStore } from '@/store/store';
import { useSharedValue } from 'react-native-reanimated';
import { TabPage } from './TabPage';
import { LegacyRef, useCallback, useRef } from 'react';

export default function Page() {
	const cart = useBoundStore((state) => state.cart);
	const scrollX = useRef(new Animated.Value(0)).current;

	const flatlistRef = useRef<FlatList>(null);
	const { width: screenWidth } = Dimensions.get('screen');

	const onItemPress = useCallback((itemIndex: number) => {
		console.log('onItemPress', itemIndex);
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
		// alignItems: 'center',
		// justifyContent: 'center',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '100%',
	},
});
