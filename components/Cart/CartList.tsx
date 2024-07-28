import { useCallback, useMemo, useRef } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Text, View } from '@/components/Themed';
import { CartItem } from './CartItem';
import { CartItem as Item, ModifiedItem } from '@/store/store';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useBottomSheetBackHandler } from '@/hooks/useBottomSheetBackHandler';
import { BottomSheet } from './BottomSheet';
import { BottomSheetContent } from './BottomSheetContent';

export function CartList({ cart }: { cart: [string, Item[]][] }) {
	// * Reference to BottomSheet Modal
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
	// * BottomSheet back(hardware) handler
	const { handleSheetPositionChange } =
		useBottomSheetBackHandler(bottomSheetModalRef);
	// * Modal SnapPoints
	const snapPoints = useMemo(() => ['85%'], []);
	// * Modal Callbacks
	const showModal = useCallback((data: Item) => {
		bottomSheetModalRef.current?.present(data);
	}, []);
	const closeModal = useCallback(() => {
		bottomSheetModalRef.current?.dismiss();
	}, []);
	return (
		<View style={styles.container}>
			<FlashList
				estimatedItemSize={100}
				data={cart}
				renderItem={({ item }) => (
					<CartItem item={item} showModal={showModal} />
				)}
				showsHorizontalScrollIndicator={false}
				keyExtractor={(item) => item[0]}
				contentContainerStyle={styles.contentContainer}
				ItemSeparatorComponent={() => (
					<View style={{ height: 1, width: '100%' }} />
				)}
			/>
			<BottomSheet
				bottomSheetModalRef={bottomSheetModalRef}
				handleSheetChanges={handleSheetPositionChange}
				snapPoints={snapPoints}
			>
				{({ data }: { data: ModifiedItem }) => (
					<BottomSheetContent closeModal={closeModal} data={data} />
				)}
			</BottomSheet>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		// flexGrow: 1,
		height: '100%',
		width: '95%',
	},
	contentContainer: {},
});
