import { Dispatch, SetStateAction } from 'react';
import { StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Item } from '@/app/(authenticated)/(tabs)/[vendorId]';
import { View } from '../Themed';
import { MenuItem } from './MenuItem';

export function MenuList({
	showModal,
	items,
}: {
	showModal: (data: Item) => void;
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
});
