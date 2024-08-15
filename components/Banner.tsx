import { StyleSheet, View as UnThemedView } from 'react-native';
import Animated, { Easing, FadeIn, FadeOut } from 'react-native-reanimated';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { View, Text } from './Themed';
import Colors from '@/constants/Colors';

export function Banner() {
	return (
		<Animated.View
			style={styles.banner}
			entering={FadeIn.duration(500).easing(Easing.ease)}
		>
			<Text>Ads Here</Text>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	banner: {
		width: wp('95%'),
		height: hp('10%'),
		borderColor: Colors.grey,
		borderWidth: 0.4,
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
