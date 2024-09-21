import 'react-native-reanimated';
import 'react-native-gesture-handler';
import { StyleSheet, View } from 'react-native';
import { Skeleton } from 'moti/skeleton';

export function SpotlightSkeleton() {
	return (
		<View style={styles.container}>
			<Skeleton width={270} height={240} radius={10} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
});

const Spacer = ({ height = 16 }) => <View style={{ height }} />;
