import 'react-native-reanimated';
import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { Skeleton } from 'moti/skeleton';
import { View } from '../../Themed';

export function HeaderSkeleton() {
	return (
		<MotiView style={styles.container}>
			<Skeleton width={350} height={200} />
			<Spacer height={8} />
		</MotiView>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'space-between',
		alignItems: 'center',
		// flex: 1,
		// width: '100%',
		// height: '100%',
	},
});

const Spacer = ({ height = 16 }) => <View style={{ height }} />;
