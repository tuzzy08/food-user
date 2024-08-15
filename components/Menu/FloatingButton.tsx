import {
	StyleSheet,
	useWindowDimensions,
	TouchableOpacity,
} from 'react-native';
import { View, Text } from '../Themed';
import { ShoppingBasket } from 'lucide-react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';

export function FloatingButton({
	cartlength,
	closeModal,
	totalPrice,
}: {
	cartlength: number;
	closeModal: () => void;
	totalPrice: number;
}) {
	const { width } = useWindowDimensions();
	return (
		<TouchableOpacity
			onPress={() => {
				router.push('/(authenticated)/(tabs)/orders');
				closeModal();
			}}
		>
			<View style={[styles.container, { width: width * 0.93 }]}>
				{/* <ShoppingBasket size={20} color={Colors.dark.text} /> */}
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
		fontSize: 18,
		fontWeight: '500',
	},
});
