import {
	StyleSheet,
	Text,
	TouchableOpacity,
	useWindowDimensions,
} from 'react-native';
import Colors from '@/constants/Colors';
import { Image } from 'expo-image';
import Color from 'color';

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
					width: width * 0.222,
					height: height * 0.11,
					backgroundColor: Color(item.bgColor).lighten(0.2).toString(),
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
		borderRadius: 15,
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
