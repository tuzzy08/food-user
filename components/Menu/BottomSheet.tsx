import {
	BackHandler,
	NativeEventSubscription,
	Pressable,
	StyleSheet,
} from 'react-native';
import { Image } from 'expo-image';
import {
	BottomSheetView,
	BottomSheetModal,
	BottomSheetBackdrop,
	TouchableOpacity,
	BottomSheetModalProps,
} from '@gorhom/bottom-sheet';
import { View, Text } from '../Themed';
import { useCallback, useRef } from 'react';
import Colors from '@/constants/Colors';
import { Item } from '@/app/(authenticated)/(tabs)/[vendorId]';
import { SharedValue } from 'react-native-reanimated/lib/typescript/reanimated2/commonTypes';

type SnapPoints =
	| (string | number)[]
	| SharedValue<(string | number)[]>
	| Readonly<(string | number)[] | SharedValue<(string | number)[]>>
	| undefined;

export function BottomSheet({
	selectedItem,
	bottomSheetModalRef,
	handleSheetChanges,
	snapPoints,
}: {
	selectedItem: Item | undefined;
	handleSheetChanges: ((index: number) => void) | undefined;
	snapPoints: SnapPoints;
	bottomSheetModalRef: any;
}) {
	// * Backdrop Component
	const renderBackdrop = useCallback(
		(props: any) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
				opacity={0.3}
				// * Disables touch outside bottom sheet to close
				pressBehavior={'close'}
			/>
		),
		[]
	);
	return (
		<BottomSheetModal
			ref={bottomSheetModalRef}
			index={0}
			snapPoints={snapPoints}
			onChange={handleSheetChanges}
			backdropComponent={renderBackdrop}
			// handleStyle={{
			// 	display: 'none',
			// }}
			// * Disables sliding either the content or handle to close the bottom sheet.
			// enableContentPanningGesture={false}
			// enableHandlePanningGesture={false}
		>
			<BottomSheetView style={styles.contentContainer}>
				{/* Food image here */}
				<View style={styles.bottomSheetImage}>
					<Image
						source={selectedItem?.item_image_url}
						style={{ height: '100%', width: '100%' }}
					/>
				</View>
				{/* Main bottom sheet content */}
				<BottomSheetView style={styles.bottomSheetContent}>
					{/* Pricing info */}
					<BottomSheetView style={{ marginTop: 5, padding: 8, gap: 5 }}>
						<Text style={styles.bottomSheetTitle}>
							{selectedItem?.item_title}
						</Text>
						<Text
							style={styles.bottomSheetPrice}
						>{`₦${selectedItem?.item_price}`}</Text>
					</BottomSheetView>
					{/* Add and Minus & Add to cart buttons */}
					<BottomSheetView
						style={{
							flexDirection: 'row',
							gap: 30,
							marginLeft: 20,
							// borderWidth: 1,
							// borderColor: '#000',
						}}
					>
						{/* Add and Minus buttons */}
						<BottomSheetView
							style={{
								flexDirection: 'row',
								// gap: 15,
								borderWidth: 1,
								borderColor: '#000',
								justifyContent: 'center',
								alignItems: 'center',
								borderRadius: 4,
								// padding: 10,
							}}
						>
							<Pressable style={{ padding: 18 }}>
								<Text
									style={{ color: '#000', fontSize: 18, fontWeight: '700' }}
								>
									-
								</Text>
							</Pressable>
							<Text
								style={{
									color: '#000',
									padding: 18,
									fontSize: 18,
									fontWeight: '700',
								}}
							>
								1
							</Text>
							<Pressable style={{ padding: 18 }}>
								<Text
									style={{ color: '#000', fontSize: 18, fontWeight: '700' }}
								>
									+
								</Text>
							</Pressable>
						</BottomSheetView>
						{/* Add to cart button */}
						<TouchableOpacity
							style={{
								borderColor: '#000',
								borderRadius: 4,
								flex: 1,
								width: 150,
								justifyContent: 'center',
								alignItems: 'center',
								backgroundColor: Colors.secondary,
							}}
						>
							<Text style={{ color: '#000', fontSize: 18, fontWeight: '500' }}>
								ADD
							</Text>
						</TouchableOpacity>
					</BottomSheetView>
					{/*  */}
				</BottomSheetView>
			</BottomSheetView>
		</BottomSheetModal>
	);
}

const styles = StyleSheet.create({
	contentContainer: {
		flex: 1,
	},
	bottomSheetImage: {
		height: '30%',
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
	},
	bottomSheetContent: {
		height: '65%',
		justifyContent: 'space-between',
	},
	bottomSheetTitle: {
		fontSize: 16,
		fontWeight: '600',
		color: Colors.dark.background,
	},
	bottomSheetPrice: { fontSize: 14, color: Colors.dark.background },
});

/**
 * hook that dismisses the bottom sheet on the hardware back button press if it is visible
 * @param bottomSheetRef ref to the bottom sheet which is going to be closed/dismissed on the back press
 */
export const useBottomSheetBackHandler = (
	bottomSheetRef: React.RefObject<BottomSheetModal | null>
) => {
	const backHandlerSubscriptionRef = useRef<NativeEventSubscription | null>(
		null
	);
	const handleSheetPositionChange = useCallback<
		NonNullable<BottomSheetModalProps['onChange']>
	>(
		(index) => {
			const isBottomSheetVisible = index >= 0;
			if (isBottomSheetVisible && !backHandlerSubscriptionRef.current) {
				// setup the back handler if the bottom sheet is right in front of the user
				backHandlerSubscriptionRef.current = BackHandler.addEventListener(
					'hardwareBackPress',
					() => {
						bottomSheetRef.current?.dismiss();
						return true;
					}
				);
			} else if (!isBottomSheetVisible) {
				backHandlerSubscriptionRef.current?.remove();
				backHandlerSubscriptionRef.current = null;
			}
		},
		[bottomSheetRef, backHandlerSubscriptionRef]
	);
	return { handleSheetPositionChange };
};
