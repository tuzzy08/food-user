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
	const summarizedAddress = wrapString(currentAddress!);

	return (
		<View
			style={[
				styles.container,
				{
					// backgroundColor:
					// 	colorScheme === 'light' ? Colors.light.mainBackGround : '#000',
					borderWidth: colorScheme === 'light' ? 0.7 : undefined,
					borderColor: colorScheme === 'light' ? Colors.grey : undefined,
					borderRadius: 20,
					padding: 4,
				},
			]}
		>
			<TouchableOpacity onPress={() => router.navigate('/mapPage')}>
				<View
					style={[
						styles.addressBox,
						{
							// backgroundColor:
							// 	colorScheme === 'light' ? Colors.light.mainBackGround : '#000',
						},
					]}
				>
					<MapPin size={17} color={Colors.primary} />
					<Text style={styles.addressText}>{summarizedAddress}</Text>
					<ChevronDown
						size={23}
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
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	addressBox: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 2,
	},
	addressText: {
		fontSize: 14,
	},
});
