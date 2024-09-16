import { StyleSheet, useColorScheme } from 'react-native';
import Animated, { Easing, FadeIn } from 'react-native-reanimated';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Text } from './Themed';
import Colors from '@/constants/Colors';

export function Banner() {
	const colorScheme = useColorScheme();
	return (
		<Animated.View
			style={[
				styles.banner,
				{
					backgroundColor:
						colorScheme === 'dark'
							? Colors.dark.background
							: Colors.light.background,
				},
			]}
			entering={FadeIn.duration(500).easing(Easing.ease)}
		>
			<Text>Ads Here</Text>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	banner: {
		width: wp('85%'),
		height: hp('8.5%'),
		borderColor: Colors.grey,
		borderWidth: 0.4,
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
