import { StyleSheet, FlatList, Animated } from 'react-native';
import { Image } from 'expo-image';
import { Text, View } from '@/components/Themed';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { LegacyRef, forwardRef, useCallback, useRef } from 'react';
import { Order } from './orders';
import { CartItem } from '@/store/store';
import { OrderTab } from '@/components/OrderTab/OrderTab';
import { CartItemList } from '@/components/CartItemList/CartItemList';

const TabTitles = {
	MyCart: 'My Cart',
	InProgress: 'In Progress',
	Completed: 'Completed',
};

const titles = Object.values(TabTitles);

export const TabPage = forwardRef(
	(
		{
			scrollX,
			orders,
			cart,
		}: {
			scrollX: any;
			cart: CartItem[];
			orders: Order[];
		},
		ref: LegacyRef<FlatList<string>>
	) => {
		return (
			<View style={styles.container}>
				<Animated.FlatList
					ref={ref}
					data={titles}
					horizontal
					pagingEnabled
					onScroll={Animated.event(
						[{ nativeEvent: { contentOffset: { x: scrollX } } }],
						{
							useNativeDriver: false,
						}
					)}
					showsHorizontalScrollIndicator={false}
					renderItem={({ item }: { item: string }) => (
						// item === 'My Cart' ? (
						// 	<TabContent cart={cart} />
						// ) : (
						// 	<TabContent orders={orders} />
						// )
						<View style={styles.tab}>
							{/* <Text>{item}</Text> */}
							<TabContent item={item} cart={cart} orders={orders} />
						</View>
					)}
					keyExtractor={(item) => item}
				/>
			</View>
		);
	}
);

function TabContent({
	orders,
	cart,
	item,
}: {
	orders?: Order[];
	cart?: CartItem[];
	item: string;
}) {
	if (item === 'My Cart') {
		if (cart && cart.length > 0) {
			return <CartItemList cart={cart} />;
		} else {
			return <EmptyCart />;
		}
	} else {
		if (orders && orders.length > 0) {
			return <OrderTab orders={orders} />;
		} else {
			return <EmptyCart />;
		}
	}
}

export function EmptyCart() {
	return (
		<View style={styles.emptyCart}>
			<Image
				source={require('@/assets/images/empty-cart.png')}
				style={{ width: 150, height: 150 }}
			/>
			<Text style={styles.emptyCartText}>Your cart is empty</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		// width: '100%',
		// height: '80%',
		// borderWidth: 1,
		// borderColor: 'red',
	},
	tab: {
		width: wp('100%'),
		height: hp('60%'),
		justifyContent: 'center',
		alignItems: 'center',
		// borderWidth: 1,
		// borderColor: 'yellow',
	},
	tabContent: {},
	emptyCart: {},
	emptyCartText: {},
});
