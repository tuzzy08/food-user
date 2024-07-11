import { StyleSheet, useColorScheme } from 'react-native';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { View, Text } from './Themed';
import Colors from '@/constants/Colors';

export function Rating({ rating }: { rating: number }) {
	const color = useColorScheme();
	return (
		<View
			style={[
				styles.container,
				{
					backgroundColor:
						color === 'dark'
							? Colors.dark.alt.background
							: Colors.light.background,
				},
			]}
		>
			<StarRatingDisplay
				starSize={11}
				rating={rating}
				starStyle={{ marginHorizontal: 1 }}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {},
});
