import { Pressable, StyleSheet, useColorScheme } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import {
	BottomSheetView,
	BottomSheetModal,
	BottomSheetBackdrop,
	TouchableOpacity,
} from '@gorhom/bottom-sheet';
import { MenuItem } from './MenuItem';
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
import { View, Text } from '../Themed';
import { Category, Item } from '@/app/(authenticated)/(tabs)/[vendorId]';

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

	// * Backdrop Component
	const renderBackdrop = useCallback(
		(props: any) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
				opacity={0.3}
				// * Disables touch outside bottom sheet to close
				pressBehavior={'none'}
			/>
		),
		[]
	);
	// * Reference to BottomSheet Modal
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
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
			<MenuList showModal={showModal} items={activeItems} />
			{/* Meal Options Bottom Sheet	 */}
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
					<View style={styles.bottomSheetImage}></View>
					{/* Main bottom sheet content */}
					<BottomSheetView style={styles.bottomSheetContent}>
						{/* Pricing info */}
						<BottomSheetView style={{ marginTop: 5, padding: 8, gap: 5 }}>
							<Text style={styles.bottomSheetTitle}>Food Title</Text>
							<Text style={styles.bottomSheetPrice}>Food Price🎉</Text>
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
								<Text
									style={{ color: '#000', fontSize: 18, fontWeight: '500' }}
								>
									ADD
								</Text>
							</TouchableOpacity>
						</BottomSheetView>
						{/*  */}
					</BottomSheetView>
				</BottomSheetView>
			</BottomSheetModal>
		</View>
	);
}

function MenuList({
	showModal,
	items,
}: {
	showModal: () => void;
	items: Item[] | undefined;
}) {
	return (
		<View style={styles.menu}>
			<FlashList
				data={items}
				renderItem={({ item }) => (
					<MenuItem showModal={showModal} item={item} />
				)}
				estimatedItemSize={12}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	menu: {
		flex: 1,
		marginHorizontal: 10,
		marginTop: 10,
	},
	contentContainer: {
		flex: 1,
	},
	bottomSheetImage: {
		height: '30%',
		backgroundColor: Colors.grey,
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
	},
	bottomSheetContent: {
		height: '65%',
		justifyContent: 'space-between',
	},
	bottomSheetTitle: { fontSize: 16, fontWeight: '600', color: Colors.grey },
	bottomSheetPrice: { fontSize: 14, color: '#000' },
});
