import { StyleSheet, useColorScheme, SafeAreaView } from 'react-native';
import { useLocalSearchParams, Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useQuery } from '@tanstack/react-query';
import { Text, View } from '@/components/Themed';
import { Header } from '@/components/RestaurantView';
import { Menu } from '@/components/Menu';
import { useState } from 'react';
import Colors from '@/constants/Colors';
export interface Item {
	_id: string;
	item_title: string;
	item_image_url: string;
	item_description: string;
	item_price: number;
	item_in_stock: boolean;
	item_cook_time: number;
	item_category_id: string;
	item_category: string;
	item_vendor: string;
}

export interface Category {
	id: string;
	name: string;
	items: Item[];
}

export default function Page() {
	const colorScheme = useColorScheme();
	const params = useLocalSearchParams();
	const vendor = JSON.parse(params.vendor as string);
	console.log('vendor', vendor);
	// Fetch items for this vendor
	const {
		isPending,
		error,
		data: items,
	} = useQuery({
		queryKey: [`${vendor.vendor_title}-all-items`],
		queryFn: () =>
			fetch(
				`${process.env.EXPO_PUBLIC_API_URL}/vendors/${vendor._id}/items`
			).then((res) => res.json()),
	});

	// Sort the items by category
	const sorted_categories: Array<Category> = items?.reduce(
		(acc: Array<Category>, item: Item) => {
			if (!acc.find((cat: Category) => cat.id === item.item_category_id)) {
				acc.push({
					id: item.item_category_id,
					name: item.item_category,
					items: [item],
				});
			} else {
				acc
					?.find((cat: Category) => cat.id === item.item_category_id)
					?.items.push(item);
			}
			return acc;
		},
		[]
	);
	// TODO: Add default "All" category
	sorted_categories.unshift({
		id: 'All',
		name: 'All',
		items: [items],
	});

	return (
		<>
			<StatusBar
				translucent={true}
				style={colorScheme === 'dark' ? 'light' : 'dark'}
			/>
			<View style={{ flex: 1 }}>
				<View
					style={{
						height: hp('30%'),
					}}
				>
					<Header imgUrl={vendor.vendor_logo_url} />
				</View>
				{/* Menu items */}
				<View style={styles.menu}>
					<Menu categories={sorted_categories} />
				</View>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	menu: {
		flex: 1,
		// marginHorizontal: 5,
	},
});
