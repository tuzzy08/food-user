import { BackHandler, NativeEventSubscription, StyleSheet } from 'react-native';

import {
	BottomSheetView,
	BottomSheetModal,
	BottomSheetBackdrop,
	BottomSheetModalProps,
} from '@gorhom/bottom-sheet';
import { useCallback, useRef } from 'react';
import { SharedValue } from 'react-native-reanimated/lib/typescript/reanimated2/commonTypes';
import Colors from '@/constants/Colors';

type SnapPoints =
	| (string | number)[]
	| SharedValue<(string | number)[]>
	| Readonly<(string | number)[] | SharedValue<(string | number)[]>>
	| undefined;

export function BottomSheet({
	children,
	bottomSheetModalRef,
	handleSheetChanges,
	snapPoints,
}: {
	children: any;
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
		>
			{(data) => (
				<BottomSheetView style={styles.contentContainer}>
					<>{typeof children === 'function' ? children(data) : children}</>
				</BottomSheetView>
			)}
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
	actionButtonsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 50,
		marginHorizontal: 20,
	},
	addToCartButton: {
		flexDirection: 'row',
		borderColor: '#000',
		borderRadius: 4,
		paddingVertical: 15,
		// flex: 1,
		width: 130,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.secondary,
	},
	addToCartButtonText: {
		color: Colors.dark.text,
		fontSize: 18,
		fontWeight: '500',
	},
	addToCartButtonTotalPriceText: {
		fontSize: 14,
	},
	bottomSheetPrice: { fontSize: 14, color: Colors.dark.background },
	quantityButtonContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 4,
		borderWidth: 1,
		paddingHorizontal: 5,
		borderColor: Colors.grey,
	},
	quantityButton: {
		borderWidth: 1.5,
		width: 40,
		height: 40,
		borderRadius: 50,
		borderColor: Colors.grey,
		justifyContent: 'center',
		alignItems: 'center',
	},
	quantityButtonText: {
		color: Colors.dark.background,
		fontSize: 20,
		fontWeight: '700',
	},
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
