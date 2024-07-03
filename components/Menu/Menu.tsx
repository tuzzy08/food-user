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
import { Category, Item } from '@/app/(authenticated)/(tabs)/[vendorId]';
import { BottomSheet, useBottomSheetBackHandler } from './BottomSheet';
import { MenuList } from './MenuList';

export function Menu({ categories }: { categories: Category[] }) {
	// Default Category & Items
	const default_category_name = 'All';
	const default_items = categories.find(
		(c) => c.name === default_category_name
	)?.items;
	// Active Items
	const [activeItems, setActiveItems] = useState<Item[] | undefined>(
		default_items
	);
	// Default Category
	const [activeCategoryName, setActiveCategoryName] = useState<string>(
		default_category_name
	);
	// Currently selected item
	const [selectedItem, setSelectedItem] = useState<Item | undefined>();

	// * Reference to BottomSheet Modal
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
	// * BottomSheet back(hardware) handler
	const { handleSheetPositionChange } =
		useBottomSheetBackHandler(bottomSheetModalRef);
	// * Modal SnapPoints
	const snapPoints = useMemo(() => ['85%'], []);
	// * Modal Callbacks
	const showModal = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);
	const handleSheetChanges = useCallback((index: number) => {
		console.log('handleSheetChanges', index);
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
			<MenuList
				showModal={showModal}
				items={activeItems}
				setSelectedItem={setSelectedItem}
			/>
			{/* Meal Options Bottom Sheet	 */}
			<BottomSheet
				bottomSheetModalRef={bottomSheetModalRef}
				handleSheetChanges={handleSheetPositionChange}
				snapPoints={snapPoints}
				selectedItem={selectedItem}
			/>
		</View>
	);
}
