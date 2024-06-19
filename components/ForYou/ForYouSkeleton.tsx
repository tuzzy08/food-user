import 'react-native-reanimated';
import 'react-native-gesture-handler';

import { StyleSheet, View } from 'react-native';
import { MotiView } from 'moti';
import { Skeleton } from 'moti/skeleton';

export function ForYouSkeleton() {
	return (
		<MotiView style={styles.container}>
			<Skeleton width={270} height={240} radius={10} />
			<Skeleton width={100} height={240} radius={10} />
		</MotiView>
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
