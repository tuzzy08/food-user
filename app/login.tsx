import {
	ActivityIndicator,
	ScrollView,
	StyleSheet,
	TextInput,
	View,
	Text,
	TouchableOpacity,
} from 'react-native';
import { Image } from 'expo-image';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useForm, Controller } from 'react-hook-form';
import Colors from '@/constants/Colors';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { router } from 'expo-router';
import RNPickerSelect from 'react-native-picker-select';

const ng_src = require('@/assets/images/country_flags/ng.png');
const gh_src = require('@/assets/images/country_flags/gh.png');

export default function Page() {
	// State variable to track password visibility
	const [showPassword, setShowPassword] = useState(false);
	const { handleSendOtp, loading } = useAuth();
	type formDataType = {
		phone: string;
	};
	// Function to toggle the password visibility state
	// const toggleShowPassword = () => {
	// 	setShowPassword(!showPassword);
	// };
	const src = require('@/assets/images/nourri.png');

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			phone: '',
		},
	});

	const onSubmit = async (data: formDataType) => {
		await handleSendOtp(data.phone);
		if (!loading) router.replace('/confirmation');
	};
	return (
		<ScrollView style={{ flexGrow: 1 }}>
			<View style={styles.container}>
				<Image source={src} style={styles.image} />
				<Text>login</Text>
				<View style={styles.form}>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<View
							style={{
								width: wp('27%'),
								height: hp('6%'),
							}}
						>
							<RNPickerSelect
								onValueChange={(value) => console.log(value)}
								placeholder={{}}
								items={[
									{ label: 'NG', value: 'NG' },
									{ label: 'GH', value: 'GH' },
								]}
								Icon={() => <Image source={ng_src} style={styles.flag} />}
								style={{
									iconContainer: {
										top: 10,
										right: 35,
									},
								}}
							/>
						</View>
						<Controller
							control={control}
							rules={{
								required: true,
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<TextInput
									style={styles.input}
									placeholder='2348066542231'
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
									autoComplete='tel-device'
									keyboardType='number-pad'
								/>
							)}
							name='phone'
						/>
					</View>

					<View style={{ marginTop: 15 }}>
						<TouchableOpacity
							disabled={loading}
							style={[
								styles.button,
								{ backgroundColor: loading ? '#FFF' : Colors.secondary },
							]}
							onPress={handleSubmit(onSubmit)}
						>
							<Text
								style={{
									color: loading ? Colors.secondary : '#FFF',
									fontSize: 18,
									fontWeight: '700',
								}}
							>
								Login
							</Text>
						</TouchableOpacity>
						<ActivityIndicator
							size='large'
							color={Colors.primary}
							style={{ position: 'absolute', top: 15, right: 110 }}
							animating={loading}
						/>
					</View>
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		flex: 1,
		alignItems: 'center',
		marginTop: 120,
	},
	image: {
		width: 144,
		height: 40,
		marginRight: 20,
		marginTop: 30,
	},
	form: {
		borderWidth: 0.5,
		borderColor: Colors.secondary,
		borderRadius: 15,
		width: wp('92%'),
		height: hp('35%'),
		alignItems: 'center',
		gap: 20,
		marginTop: 30,
		padding: 10,
		paddingTop: 50,
	},
	input: {
		height: hp('6%'),
		width: wp('58%'),
		backgroundColor: Colors.grey,
		borderRadius: 10,
		color: 'black',
		paddingLeft: 15,
	},
	button: {
		height: hp('7%'),
		width: wp('85%'),
		borderRadius: 10,
		backgroundColor: Colors.secondary,
		justifyContent: 'center',
		alignItems: 'center',
	},
	flag: {
		width: 30,
		height: 30,
		borderRadius: 10,
	},
});

// import { StyleSheet, Text, View } from 'react-native';
// import React from 'react';

// export default function login() {
// 	return (
// 		<View>
// 			<Text>login</Text>
// 		</View>
// 	);
// }

// const styles = StyleSheet.create({});
