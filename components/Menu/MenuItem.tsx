import { StyleSheet, useColorScheme } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Image } from 'expo-image';
import { View, Text } from '../Themed';
import Colors from '@/constants/Colors';
import { Item } from '@/store/store';
import { useItemSelection } from '@/contexts/ItemSelectionContext';

export function MenuItem({
	item,
	showModal,
}: {
	item: Item;
	showModal: (data: Item) => void;
}) {
	const color = useColorScheme();
	const { addSelectedItem } = useItemSelection();
	return (
		<TouchableOpacity
			onPress={() => {
				addSelectedItem(item);
				showModal(item);
			}}
			style={[
				styles.container,
				{
					backgroundColor:
						color === 'dark'
							? Colors.dark.alt.background
							: Colors.light.background,
				},
			]}
		>
			<Image
				contentFit='fill'
				style={{
					height: '100%',
					width: '25%',
					borderBottomLeftRadius: 10,
					borderTopLeftRadius: 10,
				}}
				source={item?.item_image_url}
			/>

			<View
				style={{
					justifyContent: 'space-between',
					paddingBottom: 5,
					paddingTop: 3,
					backgroundColor:
						color === 'dark'
							? Colors.dark.alt.background
							: Colors.light.background,
				}}
			>
				{/* Title */}
				<Text style={styles.title}>{item?.item_title}</Text>

				<Text
					style={[
						styles.description,
						{
							color: color === 'dark' ? Colors.grey : Colors.light.text,
						},
					]}
				>
					{item?.item_description.split(' ').length > 5
						? summarize(item?.item_description)
						: item?.item_description}
				</Text>
				<Text
					style={{
						marginTop: 15,
						color: color === 'dark' ? Colors.grey : Colors.light.text,
						fontWeight: 'bold',
					}}
				>{`₦${item?.item_price}`}</Text>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		borderRadius: 10,
		gap: 10,
		height: hp('12%'),
		width: '100%',
		marginBottom: 15,
	},
	title: {
		fontSize: 14,
		fontWeight: 'bold',
	},
	prepTimeText: {
		fontSize: 11,
		color: Colors.grey,
	},
	addButton: {
		backgroundColor: Colors.secondary,
		marginTop: 14,
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 5,
	},
	description: {
		fontSize: 12,
		marginTop: 3,
	},
});

function summarize(text: string | undefined) {
	if (!text) return '';
	const summary = text.split(' ').slice(0, 5).join(' ');
	return summary + '...';
}
