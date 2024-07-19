import { BottomSheetModal } from '@gorhom/bottom-sheet';
import Colors from '@/constants/Colors';
import { Categories } from './Categories';
import {
	Dispatch,
	SetStateAction,
	useCallback,
	useMemo,
	useRef,
	useState,
} from 'react';
import { View } from '../Themed';
import { Category } from '@/app/(authenticated)/(tabs)/[vendorId]';
import { BottomSheet, useBottomSheetBackHandler } from './BottomSheet';
import { MenuList } from './MenuList';
import { BottomSheetContent } from './BottomSheetContent';
import { ModifiedItem } from '@/store/store';

export function Menu({ categories }: { categories: Category[] }) {
	const default_category_name = 'All';
	const default_items = categories.find(
		(c) => c.name === default_category_name
	)?.items;
	// Active Items
	const [activeItems, setActiveItems] = useState<ModifiedItem[] | undefined>(
		default_items
	);
	// Default Category
	const [activeCategoryName, setActiveCategoryName] = useState<string>(
		default_category_name
	);

	// * Reference to BottomSheet Modal
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
	// * BottomSheet back(hardware) handler
	const { handleSheetPositionChange } =
		useBottomSheetBackHandler(bottomSheetModalRef);
	// * Modal SnapPoints
	const snapPoints = useMemo(() => ['85%'], []);
	// * Modal Callbacks
	const showModal = useCallback((data: ModifiedItem) => {
		bottomSheetModalRef.current?.present(data);
	}, []);
	const closeModal = useCallback(() => {
		bottomSheetModalRef.current?.dismiss();
	}, []);
	return (
		<View style={{ flex: 1 }}>
			<View
				style={{
					borderBottomWidth: 0.2,
					borderColor: Colors.lightGrey,
				}}
			>
				<Categories
					activeCategoryName={activeCategoryName as string}
					categories={categories}
					setActiveItems={setActiveItems}
					setActiveCategoryName={
						setActiveCategoryName as Dispatch<SetStateAction<string>>
					}
				/>
			</View>
			<MenuList showModal={showModal} items={activeItems} />
			{/* Meal Options Bottom Sheet	 */}
			<BottomSheet
				bottomSheetModalRef={bottomSheetModalRef}
				handleSheetChanges={handleSheetPositionChange}
				snapPoints={snapPoints}
			>
				{({ data }: { data: ModifiedItem }) => (
					<BottomSheetContent closeModal={closeModal} selectedItem={data} />
				)}
			</BottomSheet>
		</View>
	);
}
