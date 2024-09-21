import { useItemSelection } from '@/contexts/ItemSelectionContext';
import { BottomSheetModal, BottomSheetModalProps } from '@gorhom/bottom-sheet';
import { useCallback, useRef } from 'react';
import { BackHandler, NativeEventSubscription } from 'react-native';

/**
 * hook that dismisses the bottom sheet on the hardware back button press if it is visible
 * @param bottomSheetRef ref to the bottom sheet which is going to be closed/dismissed on the back press
 */
export const useBottomSheetBackHandler = (
	bottomSheetRef: React.RefObject<BottomSheetModal | null>
) => {
	const { clearSelectedItem } = useItemSelection();
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
						clearSelectedItem();
						bottomSheetRef.current?.dismiss();
						return true;
					}
				);
			} else if (!isBottomSheetVisible) {
				clearSelectedItem();
				backHandlerSubscriptionRef.current?.remove();
				backHandlerSubscriptionRef.current = null;
			}
		},
		[bottomSheetRef, backHandlerSubscriptionRef]
	);
	return { handleSheetPositionChange };
};
