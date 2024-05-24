import { StyleSheet } from 'react-native';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { View, Text } from './Themed';

export function Rating({ rating }: { rating: number }) {
	return (
		<View style={styles.container}>
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
