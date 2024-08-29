import { StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Item } from '@/store/store';
import { View } from '../Themed';
import { MenuItem } from './MenuItem';
import { useItemSelection } from '@/contexts/ItemSelectionContext';

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
				renderItem={({ item }) => {
					return <MenuItem showModal={showModal} item={item} />;
				}}
				estimatedItemSize={12}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	menu: {
		flex: 1,
		marginHorizontal: 5,
		marginTop: 10,
	},
});
