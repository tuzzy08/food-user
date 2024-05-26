import { StyleSheet, Text, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export function FoodCategoriesPlaceholder() {
	return (
		<SkeletonPlaceholder>
			<SkeletonPlaceholder.Item flexDirection='row' alignItems='center'>
				<SkeletonPlaceholder.Item
					width={41}
					height={41}
					borderRadius={50}
					marginRight={20}
				/>
				<SkeletonPlaceholder.Item
					width={41}
					height={41}
					borderRadius={50}
					marginRight={20}
				/>
				<SkeletonPlaceholder.Item
					width={41}
					height={41}
					borderRadius={50}
					marginRight={20}
				/>
				<SkeletonPlaceholder.Item
					width={41}
					height={41}
					borderRadius={50}
					marginRight={20}
				/>
			</SkeletonPlaceholder.Item>
		</SkeletonPlaceholder>
	);
}

const styles = StyleSheet.create({});
