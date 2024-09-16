import { BottomSheetModal } from '@gorhom/bottom-sheet';
import Colors from '@/constants/Colors';
import { Categories } from './Categories';
import { Dispatch, SetStateAction, useState } from 'react';
import { View } from '../Themed';
import { Category } from '@/app/(authenticated)/[vendorId]';
import { BottomSheet } from './BottomSheet';
import { MenuList } from './MenuList';
import { BottomSheetContent } from './BottomSheetContent';
import { Item } from '@/store/store';

export function Menu({
	categories,
	showModal,
	closeModal,
	bottomSheetModalRef,
	handleSheetChanges,
	snapPoints,
}: {
	categories: Category[] | undefined;
	showModal: (data: Item) => void;
	closeModal: () => void;
	bottomSheetModalRef: React.RefObject<BottomSheetModal>;
	handleSheetChanges: (index: number) => void;
	snapPoints: string[];
}) {
	const default_category_name = 'All';
	const default_items = categories?.find(
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
				handleSheetChanges={handleSheetChanges}
				snapPoints={snapPoints}
			>
				{/* <BottomSheetContent closeModal={closeModal} /> */}
				{({ data }: { data: Item }) => (
					<BottomSheetContent closeModal={closeModal} selectedItem={data} />
				)}
			</BottomSheet>
		</View>
	);
}
