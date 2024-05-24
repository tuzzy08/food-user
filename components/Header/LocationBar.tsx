import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { Text, View } from '@/components/Themed';
import { MapPin, ChevronDown } from 'lucide-react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import { useBoundStore } from '@/store/store';
import { wrapString } from '@/lib';

export function LocationBar() {
	const colorScheme = useColorScheme();
	const currentAddress = useBoundStore((state) => state.currentAddress);
	const summarizedAddress = wrapString(currentAddress);

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => router.navigate('/mapPage')}>
				<View style={styles.addressBox}>
					<MapPin size={12} color={Colors.secondary} />
					<Text
						style={styles.addressText}
					>{`#3 Joshua Close, Nvigwe Woji`}</Text>
					<ChevronDown
						size={19}
						color={
							colorScheme === 'dark' ? Colors.dark.text : Colors.light.text
						}
						style={{ marginTop: 3 }}
					/>
				</View>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	addressBox: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 3,
	},
	addressText: {
		fontSize: 13,
	},
});
