import {
	StyleSheet,
	useWindowDimensions,
	TouchableOpacity,
	Pressable,
} from 'react-native';
import { View, Text } from '../Themed';
import { ShoppingBasket } from 'lucide-react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';

export function FloatingButton({
	cartlength,
	closeModal,
}: {
	cartlength: number;
	closeModal: () => void;
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
				<Text style={styles.buttonText}>{`View cart(${cartlength})`}</Text>
				<ShoppingBasket size={20} color={Colors.dark.text} />
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		gap: 5,
		bottom: -55,
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
