import 'react-native-reanimated';
import 'react-native-gesture-handler';

import { StyleSheet, View } from 'react-native';
import { MotiView } from 'moti';
import { Skeleton } from 'moti/skeleton';

export function ForYouSkeleton() {
	return (
		<MotiView style={styles.container}>
			<MotiView>
				<Skeleton width={260} height={180} radius={5} />
				<Spacer height={12} />
				<Skeleton width={260} height={20} radius={5} />
			</MotiView>
			<MotiView>
				<Skeleton width={150} height={180} radius={5} />
				<Spacer height={12} />
				<Skeleton width={150} height={20} radius={5} />
			</MotiView>
		</MotiView>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginRight: 5,
		gap: 20,
	},
});

const Spacer = ({ height = 16 }) => <View style={{ height }} />;
