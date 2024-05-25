import { StyleSheet, useColorScheme, SafeAreaView } from 'react-native';
import { useLocalSearchParams, Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Text, View } from '@/components/Themed';
import { Header } from '@/components/RestaurantView';
import { Menu } from '@/components/Menu';
import Colors from '@/constants/Colors';
import { useState } from 'react';

export default function Page() {
	const vendor = useLocalSearchParams();
	const url = vendor.imgUrl as string;
	const res = parseInt(url);
	const colorScheme = useColorScheme();
	const [selected, setSelected] = useState('All');
	// const [active, setSelected] = useState(false);

	return (
		<>
			<StatusBar
				translucent={true}
				style={colorScheme === 'dark' ? 'light' : 'dark'}
			/>
			<View style={{ flex: 1 }}>
				<View
					style={{
						height: hp('30%'),
					}}
				>
					<Header imgUrl={res} />
				</View>
				{/* Menu items */}
				<View style={styles.menu}>
					<Menu />
				</View>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	menu: {
		flex: 1,
		// marginHorizontal: 5,
	},
});
