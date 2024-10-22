import { Pressable, StyleSheet, TextInput, useColorScheme } from 'react-native';
import { Search as SearchIcon, CircleX } from 'lucide-react-native';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useForm, Controller } from 'react-hook-form';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';

export function Search() {
	const colorScheme = useColorScheme();
	const color = colorScheme === 'dark' ? Colors.dark.text : Colors.light.text;
	const bgColor = colorScheme === 'dark' ? Colors.dark.background : Colors.grey;
	// Form control
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			query: '',
		},
	});

	const onSubmit = async (data: { query: string }) => {
		console.log(data);
	};

	return (
		<View style={[styles.container, { backgroundColor: bgColor }]}>
			<View
				style={{
					flexDirection: 'row',
					backgroundColor: bgColor,
					alignItems: 'center',
					gap: 20,
				}}
			>
				<SearchIcon size={24} color={color} />
				<View>
					<Controller
						control={control}
						rules={{
							required: true,
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								style={[styles.input, { backgroundColor: bgColor, color }]}
								placeholder='Chinese fried rice, eba ....'
								placeholderTextColor={color}
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
							/>
						)}
						name='query'
					/>
				</View>
			</View>
			<Pressable onPress={() => reset()}>
				<CircleX size={24} color={color} />
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: wp('90%'),
		height: hp('8%'),
		borderWidth: 0.3,
		borderRadius: 5,
		borderColor: Colors.grey,
		backgroundColor: Colors.lightGrey,
		padding: 10,
		marginTop: 20,
		marginBottom: 20,
		// gap: 20,
	},
	input: {
		height: hp('6%'),
		width: wp('58%'),
		fontSize: 18,
	},
});
