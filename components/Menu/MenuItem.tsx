import Colors from '@/constants/Colors';
import { StyleSheet, useColorScheme } from 'react-native';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Image } from 'expo-image';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { View, Text } from '../Themed';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Item } from '@/app/(authenticated)/(tabs)/[vendorId]';
import { Dispatch, SetStateAction } from 'react';

export function MenuItem({
	item,
	setSelectedItem,
	showModal,
}: {
	item: Item;
	setSelectedItem: Dispatch<SetStateAction<Item | undefined>>;
	showModal: () => void;
}) {
	const colorScheme = useColorScheme();
	return (
		<View style={styles.container}>
			<Image
				style={{
					height: '70%',
					width: '30%',
					borderRadius: 10,
				}}
				source={item.item_image_url}
			/>

			<View style={{ gap: 8 }}>
				<Text style={styles.title}>{item.item_title}</Text>
				<View style={{ flexDirection: 'row' }}>
					<MaterialCommunityIcons
						name='pot-steam'
						color={Colors.secondary}
						size={14}
					/>
					<Text style={styles.prepTimeText}>{`  Cooking Time`}</Text>
					<Text style={styles.prepTimeText}>{`  ~ ${Math.floor(
						item.item_cook_time / 60
					)} Mins.`}</Text>
				</View>
				<Text
					style={{ marginTop: 8, color: Colors.grey }}
				>{`₦${item.item_price}`}</Text>
				<TouchableOpacity
					style={styles.addButton}
					onPress={() => {
						setSelectedItem(item);
						showModal();
					}}
				>
					<Text style={{ alignSelf: 'center' }}>ADD</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		borderRadius: 10,
		gap: 45,
		height: hp('17%'),
		marginBottom: 40,
	},
	title: {
		fontSize: 14,
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
});
