import { StyleSheet, useColorScheme, SafeAreaView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useQuery } from '@tanstack/react-query';
import { Text, View } from '@/components/Themed';
import { Header } from '@/components/RestaurantView';
import { Menu } from '@/components/Menu';
import { MenuListSkeleton } from '@/components/Menu/MenuListSkeleton';
import { HeaderSkeleton } from '@/components/RestaurantView/Header/HeaderSkeleton';
import { Item, ItemFromAPI, useBoundStore } from '@/store/store';
import { useVendorItems } from '@/hooks/useVendorItems';
import { FloatingButton } from '@/components/Menu/FloatingButton';
import { useCallback, useMemo, useRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useBottomSheetBackHandler } from '@/hooks/useBottomSheetBackHandler';
import {
	useItemSelection,
	ItemSelectionProvider,
} from '@/contexts/ItemSelectionContext';

export interface Category {
	id: string;
	name: string;
	items: Item[];
}

export default function Page() {
	const cart = useBoundStore((state) => state.cart);
	const calculateCartTotal = useCallback(() => {
		return cart.reduce((total, cartItem) => {
			const itemTotal = cartItem.item.item_price * cartItem.quantity;
			const optionsTotal =
				cartItem.item.options?.reduce((optionTotal, option) => {
					return optionTotal + (option.price || 0);
				}, 0) || 0;
			return total + itemTotal + optionsTotal * cartItem.quantity;
		}, 0);
	}, [cart]);

	const cart_total = calculateCartTotal();
	// const cart_total = cart.reduce(
	// 	(acc, item) => acc + item.item.item_price * item.quantity,
	// 	0
	// );
	const colorScheme = useColorScheme();
	const params = useLocalSearchParams();
	const vendor = JSON.parse(params.vendor as string);
	// Fetch items for this vendor
	const { isLoading, error, data: items } = useVendorItems(vendor._id);

	// Extend the items with vendor info
	const extended_items = items?.map((item: ItemFromAPI) => {
		return {
			...item,
			vendor_id: vendor._id,
			vendor_title: vendor.vendor_title,
			vendor_logo_url: vendor.vendor_logo_url,
		};
	});
	// Sort the items by category
	const sorted_categories = extended_items?.reduce(
		(acc: Array<Category>, item: Item) => {
			if (!acc.find((cat: Category) => cat.id === item.item_category_id)) {
				acc.push({
					id: item.item_category_id,
					name: item.item_category,
					items: [item],
				});
			} else {
				acc
					?.find((cat: Category) => cat.id === item.item_category_id)
					?.items.push(item);
			}
			return acc;
		},
		[]
	);
	const default_category_name = 'All';
	// TODO: Add default "All" category
	sorted_categories?.unshift({
		id: default_category_name,
		name: default_category_name,
		items: extended_items!,
	});

	// * Reference to BottomSheet Modal
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
	// * BottomSheet back(hardware) handler
	const { handleSheetPositionChange } =
		useBottomSheetBackHandler(bottomSheetModalRef);
	// * Modal SnapPoints
	const snapPoints = useMemo(() => ['85%'], []);
	// * Modal Callbacks
	const { addSelectedItem } = useItemSelection();
	const showModal = useCallback((data: Item) => {
		bottomSheetModalRef.current?.present(data);
	}, []);
	const closeModal = useCallback(() => {
		bottomSheetModalRef.current?.dismiss();
	}, []);

	return (
		<ItemSelectionProvider>
			<>
				<StatusBar
					translucent={true}
					style={colorScheme === 'dark' ? 'light' : 'dark'}
				/>
				<View style={{ flex: 1 }}>
					{isLoading ? (
						<>
							<HeaderSkeleton />
							<MenuListSkeleton />
						</>
					) : (
						<>
							<View
								style={{
									height: hp('30%'),
									width: '100%',
								}}
							>
								<Header imgUrl={vendor.vendor_logo_url} />
							</View>
							{/* Menu items */}
							<View style={styles.menu}>
								<Menu
									categories={sorted_categories}
									key={vendor._id}
									showModal={showModal}
									closeModal={closeModal}
									bottomSheetModalRef={bottomSheetModalRef}
									handleSheetChanges={handleSheetPositionChange}
									snapPoints={snapPoints}
								/>
							</View>
							{cart.length > 0 ? (
								<FloatingButton
									closeModal={closeModal}
									cartlength={cart.length}
									totalPrice={cart_total}
								/>
							) : null}
						</>
					)}
				</View>
			</>
		</ItemSelectionProvider>
	);
}

const styles = StyleSheet.create({
	menu: {
		flex: 1,
	},
});
