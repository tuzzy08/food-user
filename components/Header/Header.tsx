import { Pressable, StyleSheet, useColorScheme } from 'react-native';
import { View, Text } from '@/components/Themed';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '@/constants/Colors';
import { LocationBar } from './LocationBar';
import { Bell, ShoppingBag } from 'lucide-react-native';
import { Link, router } from 'expo-router';

export function Header() {
	const colorScheme = useColorScheme();
	return (
		<View style={styles.container}>
			<View
				style={{
					flexDirection: 'row',
					marginTop: 18,
					padding: 8,
					paddingHorizontal: 13,
				}}
			>
				<Link href={'/notifications'} asChild>
					<Bell
						size={24}
						style={{ alignSelf: 'flex-end' }}
						color={Colors.secondary}
					/>
				</Link>
				<LocationBar />
				<Pressable onPress={() => router.push('/orders')}>
					<ShoppingBag size={23} color={Colors.secondary} />
					{<View style={styles.badge}></View>}
				</Pressable>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: hp('13%'),
		justifyContent: 'center',
	},
	profileIcon: {
		width: 28,
		height: 28,
		borderRadius: 30,
	},
	badge: {
		position: 'absolute',
		top: -3,
		right: -3,
		width: wp('3%'),
		height: wp('3%'),
		borderRadius: wp('10%'),
		backgroundColor: Colors.primary,
	},
});
