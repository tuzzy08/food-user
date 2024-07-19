import { Pressable, StyleSheet } from 'react-native';
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

export function Header() {
	const cart = useBoundStore((state) => state.cart);
	return (
		<SafeAreaView style={styles.container}>
			<View
				style={{
					flexDirection: 'row',
					marginTop: 18,
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<LocationBar />
				<Pressable
					style={styles.cartBadge}
					onPress={() => router.push('/orders')}
				>
					<Text style={{ fontSize: 13 }}>View cart ({cart.length})</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		height: hp('10%'),
		paddingHorizontal: 8,
	},
	profileIcon: {
		width: 28,
		height: 28,
		borderRadius: 30,
	},
	badgeText: {
		fontSize: 10,
		fontWeight: '600',
	},
	cartBadge: {
		backgroundColor: Colors.primary,
		paddingHorizontal: 8,
		paddingVertical: 2,
		borderRadius: 10,
	},
});
