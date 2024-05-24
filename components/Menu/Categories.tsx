import {
	Pressable,
	StyleSheet,
	TouchableOpacity,
	useColorScheme,
} from 'react-native';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { FlashList } from '@shopify/flash-list';
import { View, Text } from '../Themed';
import Colors from '@/constants/Colors';
import categories from './mockCategries';
import { Dispatch, SetStateAction, useState } from 'react';

type Category = {
	id: number;
	vendorId: number;
	title: string;
};

export function Categories({
	category,
	setCategory,
}: {
	category: string;
	setCategory: Dispatch<SetStateAction<string>>;
}) {
	return (
		<View style={styles.container}>
			<FlashList
				contentContainerStyle={{ paddingLeft: 11 }}
				data={categories}
				renderItem={({ item }) => (
					<CategoryItem
						item={item}
						category={category}
						setCategory={setCategory}
					/>
				)}
				extraData={category}
				estimatedItemSize={15}
				horizontal
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
}

function CategoryItem({
	item,
	category,
	setCategory,
}: {
	item: Category;
	category: string;
	setCategory: Dispatch<SetStateAction<string>>;
}) {
	// const [selected, setSelected] = useState('All');
	const setFoodCategory = (category: string) => {
		setCategory(category);
	};
	return (
		<Pressable
			onPress={() => {
				console.log(category);
				setFoodCategory(item.title);
			}}
		>
			<View style={[styles.item, category === item.title && styles.active]}>
				<Text>{item.title}</Text>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		height: hp('8%'),
		alignItems: 'center',
		justifyContent: 'center',
		// backgroundColor: Colors.secondary,
	},
	item: {
		marginRight: 10,
		// alignItems: 'center',
		marginTop: 15,
		padding: 5,
		paddingHorizontal: 10,
		borderRadius: 5,
	},
	active: {
		backgroundColor: Colors.secondary,
	},
});
