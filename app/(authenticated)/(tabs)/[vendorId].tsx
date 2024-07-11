import { StyleSheet, useColorScheme, SafeAreaView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useQuery } from '@tanstack/react-query';
import { Text, View } from '@/components/Themed';
import { Header } from '@/components/RestaurantView';
import { Menu } from '@/components/Menu';
import { MenuListSkeleton } from '@/components/Menu/MenuListSkeleton';
import { HeaderSkeleton } from '@/components/RestaurantView/Header/HeaderSkeleton';
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
	// Fetch items for this vendor
	const {
		isLoading,
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
	const default_category_name = 'All';
	// TODO: Add default "All" category
	sorted_categories?.unshift({
		id: default_category_name,
		name: default_category_name,
		items: items,
	});

	if (isLoading) return <MenuListSkeleton />;

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
					{isLoading ? (
						<HeaderSkeleton />
					) : (
						<Header imgUrl={vendor.vendor_logo_url} />
					)}
				</View>
				{/* Menu items */}
				{isLoading ? (
					<MenuListSkeleton />
				) : (
					<View style={styles.menu}>
						<Menu categories={sorted_categories} key={vendor._id} />
					</View>
				)}
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	menu: {
		flex: 1,
	},
});
