import { StyleSheet, useColorScheme } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Image } from 'expo-image';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { View, Text } from '../Themed';
import Colors from '@/constants/Colors';
import { ModifiedItem } from '@/store/store';

export function MenuItem({
	item,
	showModal,
}: {
	item: ModifiedItem;
	showModal: (data: ModifiedItem) => void;
}) {
	const color = useColorScheme();
	return (
		<TouchableOpacity
			onPress={() => {
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
				source={item.item_image_url}
			/>

			<View
				style={{
					justifyContent: 'space-between',
					paddingBottom: 5,
					paddingTop: 3,

					// gap: 8,
					// borderWidth: 1,
					// borderColor: Colors.lightGrey,
					backgroundColor:
						color === 'dark'
							? Colors.dark.alt.background
							: Colors.light.background,
				}}
			>
				{/* Title */}
				<Text style={styles.title}>{item.item_title}</Text>

				<Text style={styles.description}>
					{summarize(item.item_description)}
				</Text>
				<Text
					style={{ marginTop: 15, color: Colors.grey, fontWeight: 'bold' }}
				>{`₦${item.item_price}`}</Text>
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
		// borderWidth: 1,
		// borderColor: 'red',
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
		color: Colors.grey,
		marginTop: 3,
	},
});

function summarize(text: string) {
	const summary = text.split(' ').slice(0, 7).join(' ');
	return summary + '...';
}
