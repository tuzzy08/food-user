import { StyleSheet, View } from 'react-native';
import { MotiView } from 'moti';
import { Skeleton } from 'moti/skeleton';

export function CategoriesSkeleton() {
	return (
		<MotiView style={styles.container}>
			<Skeleton width={41} height={41} radius='round' />
			<Skeleton width={41} height={41} radius='round' />
			<Skeleton width={41} height={41} radius='round' />
			<Skeleton width={41} height={41} radius='round' />
			<Skeleton width={41} height={41} radius='round' />
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
