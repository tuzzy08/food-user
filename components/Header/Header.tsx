import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { View, Text } from '@/components/Themed';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Image } from 'expo-image';
import Colors from '@/constants/Colors';
import { LocationBar } from './LocationBar';
import { Bell } from 'lucide-react-native';
import { Link } from 'expo-router';

export function Header() {
	const colorScheme = useColorScheme();
	return (
		<View style={styles.container}>
			<View
				style={{
					flexDirection: 'row',
					marginTop: 18,
					padding: 8,
					paddingHorizontal: 3,
					paddingRight: 5,
				}}
			>
				<LocationBar />
				{/* <TouchableOpacity> */}
				<Link push href={'/(nonTabs)/notifications'} asChild>
					<Bell
						size={24}
						style={{ alignSelf: 'flex-end' }}
						color={Colors.secondary}
					/>
				</Link>

				{/* </TouchableOpacity> */}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: hp('13%'),
		justifyContent: 'center',
	},
	profileIcon: {
		width: 28,
		height: 28,
		borderRadius: 30,
	},
});
