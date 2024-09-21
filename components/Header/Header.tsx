import { Pressable, StyleSheet, useColorScheme } from 'react-native';
import { View, Text } from '@/components/Themed';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '@/constants/Colors';
import { LocationBar } from './LocationBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useBoundStore } from '@/store/store';
import { ShoppingCart } from 'lucide-react-native';

export function Header() {
	const colorScheme = useColorScheme();
	const cart = useBoundStore((state) => state.cart);
	return (
		<SafeAreaView
			style={[
				styles.container,
				{
					backgroundColor:
						colorScheme === 'light'
							? Colors.light.background
							: Colors.dark.background,
				},
			]}
		>
			<View
				style={{
					flexDirection: 'row',
					marginTop: 20,
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<LocationBar />
				<Pressable
					style={styles.cartBadge}
					onPress={() => router.push('/orders')}
				>
					<ShoppingCart size={13} color={'white'} strokeWidth={3} />
					<Text style={styles.badgeText}>Cart ({cart.length})</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		height: hp('12%'),
		paddingHorizontal: 8,
	},
	profileIcon: {
		width: 28,
		height: 28,
		borderRadius: 30,
	},
	badgeText: {
		fontSize: 14,
		fontWeight: '500',
		color: 'white',
	},
	cartBadge: {
		backgroundColor: Colors.primary,
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 10,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 5,
	},
});
