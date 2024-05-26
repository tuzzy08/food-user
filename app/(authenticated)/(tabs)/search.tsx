import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Search } from '@/components/Search';

export default function Page() {
	return (
		<View style={styles.container}>
			<Search />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
});
