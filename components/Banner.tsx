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
			<UnsThemedView style={styles.banner}>
				<Text>Ads Here</Text>
			</UnsThemedView>
		</View>
	);
}

const styles = StyleSheet.create({
	banner: {
		width: wp('85%'),
		height: hp('8%'),
		borderColor: Colors.secondary,
		borderWidth: 0.4,
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
