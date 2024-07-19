import 'react-native-reanimated';
import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { Skeleton } from 'moti/skeleton';
import { View } from '../Themed';

export function MenuListSkeleton() {
	return (
		<MotiView style={styles.container}>
			<MotiView>
				<Skeleton width={300} height={30} radius={5} />
				<Spacer height={8} />
			</MotiView>
			<MotiView>
				<Skeleton width={330} height={180} radius={5} />
				<Spacer height={6} />
				<Skeleton width={330} height={180} radius={5} />
				<Spacer height={6} />
				<Skeleton width={330} height={180} radius={5} />
			</MotiView>
		</MotiView>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'space-between',
		alignItems: 'center',
		// marginRight: 5,
		gap: 20,
	},
});

const Spacer = ({ height = 16 }) => <View style={{ height }} />;
