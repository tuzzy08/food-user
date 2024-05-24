import { Pressable, StyleSheet } from 'react-native';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Image, ImageSource } from 'expo-image';
import Colors from '@/constants/Colors';
import { Text, View } from '../../Themed';
import { ArrowLeft } from 'lucide-react-native';
import { SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

type ImgUrl = string | number | ImageSource | ImageSource[] | string[] | null;

export function Header({ imgUrl }: { imgUrl: any }) {
	const router = useRouter();
	return (
		<>
			<Image source={imgUrl} style={styles.image} />
			<Pressable
				// TODO: Remember to reset the state of the selected menu category on exit.
				onPress={() => router.back()}
				style={{
					width: 40,
					height: 40,
					borderRadius: 50,
					backgroundColor: Colors.lightGrey,
					position: 'absolute',
					top: 40,
					left: 15,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<ArrowLeft strokeWidth={5} size={18} color={'#000'} />
			</Pressable>
		</>
	);
}

const styles = StyleSheet.create({
	image: { height: '100%', width: '100%' },
});
