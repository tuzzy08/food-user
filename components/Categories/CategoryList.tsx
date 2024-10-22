import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import { CategoryCard } from './MainCategories/CategoryCard';

const icons = {
	restaurant: require('@/assets/images/icons/mainCategories/restaurant_line.png'),
	supermarket: require('@/assets/images/icons/mainCategories/supermarket_line.png'),
	pharmacy: require('@/assets/images/icons/mainCategories/pharmacy_line.png'),
	delivery: require('@/assets/images/icons/mainCategories/courier_2_line.png'),
};

const CATEGORIES = [
	{
		id: 1,
		title: 'Restaurants',
		img_url: icons.restaurant,
		href: '',
		bgColor: '#6effba',
	},
	{
		id: 2,
		title: 'Supermarkets',
		img_url: icons.supermarket,
		href: '',
		bgColor: '#aa86f7',
	},
	{
		id: 3,
		title: 'Pharmacies',
		img_url: icons.pharmacy,
		href: '',
		bgColor: '#ffc880',
	},
	{
		id: 4,
		title: 'Delivery',
		img_url: icons.delivery,
		href: '',
		bgColor: '#F8777C',
	},
];

export function CategoryList() {
	return (
		<View style={[styles.listContainer]}>
			{CATEGORIES.map((item) => (
				<CategoryCard key={item.id} item={item} />
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	listContainer: {
		flexDirection: 'row',
		gap: 8,
	},
});
