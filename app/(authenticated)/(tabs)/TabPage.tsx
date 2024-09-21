import { StyleSheet, FlatList, Animated } from 'react-native';
import { Image } from 'expo-image';
import { Text, View } from '@/components/Themed';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { LegacyRef, forwardRef } from 'react';
import { CartItem, useBoundStore } from '@/store/store';
import { OrderTab } from '@/components/OrderTab/OrderTab';
import { CartList } from '@/components/Cart/CartList';
import { useOrders } from '@/hooks/useOrders';

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
		}: {
			scrollX: any;
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
						<View style={styles.tab}>
							<TabContent item={item} />
						</View>
					)}
					keyExtractor={(item) => item}
				/>
			</View>
		);
	}
);

function TabContent({ item }: { item: string }) {
	const cart = useBoundStore((state) => state.cart);
	// TODO: Fetch orders from API using user_id
	const {
		isLoading,
		error,
		data: orders,
	} = useOrders('', { refetchOnMount: true });
	if (item === 'My Cart') {
		if (cart && cart.length > 0) {
			// const groupedItems = groupCartItemByVendor(cart);
			return <CartList cart={cart} />;
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
		flex: 1,
	},
	tab: {
		width: wp('100%'),
		height: hp('65%'),
		justifyContent: 'center',
		alignItems: 'center',
	},
	tabContent: {},
	emptyCart: {},
	emptyCartText: {},
});

function groupCartItemByVendor(cart: CartItem[]) {
	const groupedItems = cart.reduce(
		(acc: { [key: string]: CartItem[] }, item) => {
			const { vendor_title } = item.item;
			if (acc[vendor_title]) {
				acc[vendor_title].push(item);
			} else {
				acc[vendor_title] = [item];
			}
			return acc;
		},
		{}
	);
	return Object.entries(groupedItems);
}
