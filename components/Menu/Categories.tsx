import { Pressable, StyleSheet } from 'react-native';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { FlashList } from '@shopify/flash-list';
import { View, Text } from '../Themed';
import Colors from '@/constants/Colors';
import { Dispatch, SetStateAction, useState } from 'react';
import { Category } from '@/app/(authenticated)/(tabs)/[vendorId]';
import { Item } from '@/store/store';

export function Categories({
	activeCategoryName,
	categories,
	setActiveCategoryName,
	setActiveItems,
}: {
	activeCategoryName: string;
	categories: Category[] | undefined;
	setActiveCategoryName: Dispatch<SetStateAction<string>>;
	setActiveItems: Dispatch<SetStateAction<Item[] | undefined>>;
}) {
	// Extract category names
	const categoryNames = categories?.reduce((acc: string[], cat: Category) => {
		acc.push(cat.name);
		return acc;
	}, []);
	// Check if there are no categories
	if (categoryNames?.length === 1 && categoryNames[0] === 'All')
		return <Text>No categories added.</Text>;
	return (
		<View style={styles.container}>
			<FlashList
				contentContainerStyle={{ paddingLeft: 11 }}
				data={categoryNames}
				renderItem={({ item }) => (
					<CategoryItem
						item={item}
						categories={categories}
						activeCategoryName={activeCategoryName}
						setActiveCategoryName={setActiveCategoryName}
						setActiveItems={setActiveItems}
					/>
				)}
				extraData={activeCategoryName}
				estimatedItemSize={15}
				horizontal
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
}

function CategoryItem({
	item,
	activeCategoryName,
	categories,
	setActiveCategoryName,
	setActiveItems,
}: {
	item: string;
	activeCategoryName: string;
	categories: Category[] | undefined;
	setActiveCategoryName: Dispatch<SetStateAction<string>>;
	setActiveItems: Dispatch<SetStateAction<Item[] | undefined>>;
}) {
	const setFoodCategory = (category: string) => {
		setActiveCategoryName(category);
		setActiveItems((prev) => {
			const category_items = categories?.find(
				(c) => c.name === category
			)?.items;
			return category_items;
		});
	};
	return (
		<Pressable
			onPress={() => {
				setFoodCategory(item);
			}}
		>
			<View style={[styles.item, activeCategoryName === item && styles.active]}>
				<Text>{item}</Text>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		height: hp('8%'),
		flexDirection: 'row',
		alignItems: 'center',
	},
	item: {
		marginRight: 10,
		marginTop: 15,
		padding: 5,
		paddingHorizontal: 10,
		borderRadius: 5,
	},
	active: {
		backgroundColor: Colors.secondary,
	},
});
