import { Pressable, StyleSheet, useColorScheme } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import {
	BottomSheetView,
	BottomSheetModal,
	BottomSheetBackdrop,
	TouchableOpacity,
} from '@gorhom/bottom-sheet';
// import {
// 	widthPercentageToDP as wp,
// 	heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
import data from './data';
import { MenuItem } from './MenuItem';
import Colors from '@/constants/Colors';
import { Categories } from './Categories';
import { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text } from '../Themed';
import { Category } from '@/app/(authenticated)/(tabs)/[vendorId]';

export function Menu({ categories }: { categories: Category[] }) {
	// Extract category names
	const category_names = categories?.reduce((acc: string[], cat: Category) => {
		acc.push(cat.name);
		return acc;
	}, []);
	console.log('category_names', category_names);
	const [activeCategory, setActiveCategory] = useState('All');
	const [allCategories] = useState<Array<Category>>(categories);
	const [activeItems, setActiveItems] = useState();
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
	const colorScheme = useColorScheme();
	return (
		<View style={{ flex: 1 }}>
			<View
				style={{
					borderBottomWidth: 0.2,
					borderColor: Colors.lightGrey,
				}}
			>
				<Categories
					activeCategory={activeCategory}
					categoryNames={category_names}
					setActiveCategory={setActiveCategory}
				/>
			</View>
			<MenuList showModal={showModal} />
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

function MenuList({ showModal }: { showModal: () => void }) {
	return (
		<View style={styles.menu}>
			<FlashList
				data={data}
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
