import { useCallback, useMemo, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Text, View } from '@/components/Themed';
import { CartItemView } from './CartItemView';
import { CartItem, Item } from '@/store/store';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useBottomSheetBackHandler } from '@/hooks/useBottomSheetBackHandler';
import { CartItemViewBottomSheet } from './CartItemViewBottomSheet';
import { CartItemBottomSheetContent } from './CartItemBottomSheetContent';
import { useItemSelection } from '@/contexts/ItemSelectionContext';

export function CartList({ cart }: { cart: [string, CartItem[]][] }) {
	// console.log('cart', cart);
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
	const { handleSheetPositionChange } =
		useBottomSheetBackHandler(bottomSheetModalRef);
	const snapPoints = useMemo(() => ['85%'], []);
	const { addSelectedItem } = useItemSelection();

	const showModal = useCallback(
		(data: CartItem) => {
			addSelectedItem(data.item);
			bottomSheetModalRef.current?.present(data);
		},
		[addSelectedItem]
	);

	const closeModal = useCallback(() => {
		bottomSheetModalRef.current?.dismiss();
	}, []);

	return (
		<View style={styles.container}>
			<FlashList
				estimatedItemSize={100}
				data={cart}
				renderItem={({ item, index }) => (
					<CartItemView item={item} index={index} showModal={showModal} />
				)}
				showsHorizontalScrollIndicator={false}
				keyExtractor={(item) => item[0]}
				contentContainerStyle={styles.contentContainer}
				ItemSeparatorComponent={() => (
					<View style={{ height: 1, width: '100%' }} />
				)}
			/>
			<CartItemViewBottomSheet
				bottomSheetModalRef={bottomSheetModalRef}
				handleSheetChanges={handleSheetPositionChange}
				snapPoints={snapPoints}
			>
				{({ data }: { data: CartItem }) => (
					<CartItemBottomSheetContent closeModal={closeModal} data={data} />
				)}
			</CartItemViewBottomSheet>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: '100%',
		width: '95%',
	},
	contentContainer: {},
});
