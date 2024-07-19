import {
	StyleSheet,
	View,
	Text,
	Pressable,
	TouchableOpacity,
	useWindowDimensions,
} from 'react-native';
// import { Text } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { Image } from 'expo-image';

export function CategoryCard({
	item,
}: {
	item: {
		id: number;
		title: string;
		img_url: string;
		href: string;
		bgColor: string;
	};
}) {
	const { width, height } = useWindowDimensions();
	return (
		// Set the width and height of the container
		<TouchableOpacity
			style={[
				styles.container,
				{
					width: width * 0.23,
					height: height * 0.11,
					backgroundColor: item.bgColor,
				},
			]}
		>
			<Image source={item.img_url} style={styles.item_Image} />
			<Text style={styles.item_Text}>{item.title}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		borderWidth: 0.3,
		borderColor: Colors.grey,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
		gap: 8,
	},
	item_Text: {
		fontSize: 10,
		fontWeight: '500',
	},
	item_Image: {
		width: 39,
		height: 39,
	},
});
