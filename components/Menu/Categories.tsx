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
// import categories from './mockCategries';
import { Dispatch, SetStateAction, useState } from 'react';

type Category = {
	id: number;
	vendorId: number;
	title: string;
};

export function Categories({
	activeCategory,
	categoryNames,
	setActiveCategory,
}: {
	activeCategory: string;
	categoryNames: string[];
	setActiveCategory: Dispatch<SetStateAction<string>>;
}) {
	return (
		<View style={styles.container}>
			<FlashList
				contentContainerStyle={{ paddingLeft: 11 }}
				data={categoryNames}
				renderItem={({ item }) => (
					<CategoryItem
						item={item}
						activeCategory={activeCategory}
						setActiveCategory={setActiveCategory}
					/>
				)}
				extraData={activeCategory}
				estimatedItemSize={15}
				horizontal
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
}

function CategoryItem({
	item,
	activeCategory,
	setActiveCategory,
}: {
	item: string;
	activeCategory: string;
	setActiveCategory: Dispatch<SetStateAction<string>>;
}) {
	// const [selected, setSelected] = useState('All');
	const setFoodCategory = (category: string) => {
		setActiveCategory(category);
	};
	return (
		<Pressable
			onPress={() => {
				setFoodCategory(item);
			}}
		>
			<View style={[styles.item, activeCategory === item && styles.active]}>
				<Text>{item}</Text>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		height: hp('8%'),
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
