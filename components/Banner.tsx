import { StyleSheet, View as UnsThemedView } from 'react-native';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { View, Text } from './Themed';
import Colors from '@/constants/Colors';

export function Banner() {
	return (
		<View>
			<UnsThemedView style={styles.banner}></UnsThemedView>
		</View>
	);
}

const styles = StyleSheet.create({
	banner: {
		width: wp('90%'),
		height: hp('10%'),
		borderColor: Colors.secondary,
		borderWidth: 0.4,
		borderRadius: 8,
	},
});
