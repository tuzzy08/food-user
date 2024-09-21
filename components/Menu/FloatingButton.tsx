import {
	StyleSheet,
	useWindowDimensions,
	TouchableOpacity,
} from 'react-native';
import { View, Text } from '../Themed';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';

export function FloatingButton({
	cartlength,
	totalPrice,
}: {
	cartlength: number;
	totalPrice: number;
}) {
	const { width } = useWindowDimensions();
	return (
		<TouchableOpacity
			onPress={() => {
				console.log('pressed');
				// router.push('/');
				// // closeModal();
			}}
		>
			<View style={[styles.container, { width: width * 0.93 }]}>
				<Text style={styles.buttonText}>{`View cart(${cartlength})`}</Text>
				<Text style={styles.buttonText}>{`₦${totalPrice}`}</Text>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		gap: 5,
		bottom: 10,
		zIndex: 10,
		marginHorizontal: 13,
		backgroundColor: Colors.primary,
		height: 43,
		borderRadius: 3,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonText: {
		color: Colors.dark.text,
		fontSize: 16,
	},
});
