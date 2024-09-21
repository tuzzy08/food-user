import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Search } from '@/components/Search';

export default function Page() {
	return (
		<View style={styles.container}>
			<Search />
			<View
				style={styles.separator}
				lightColor='#eee'
				darkColor='rgba(255,255,255,0.1)'
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	separator: {
		marginVertical: 40,
		height: 1,
		width: '100%',
	},
});
