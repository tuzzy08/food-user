import { ScrollView, StyleSheet, TextInput, View, Text } from 'react-native';
import { Image } from 'expo-image';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import Colors from '@/constants/Colors';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useForm, Controller } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react-native';
import { router } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { useBoundStore } from '@/store/store';

export default function Page() {
	const setPinId = useBoundStore((state) => state.setPinId);
	// State variable to track password visibility
	const [showPassword, setShowPassword] = useState(false);
	// Background image source
	const src = require('@/assets/images/nourri.png');

	// Function to toggle the password visibility state
	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};
	const { handleSignUp } = useAuth();

	type formDataType = {
		firstName: string;
		lastName: string;
		phone: string;
		email: string;
		password: string;
		referralCode?: string;
	};

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			firstName: '',
			lastName: '',
			phone: '',
			email: '',
			password: '',
			referralCode: '',
		},
	});
	const onSubmit = async (data: formDataType) => {
		console.log('🚀 ~ onSubmit ~ data:', data);

		// TODO: Properly handle user signups
		const pinId = await handleSignUp(data);
		if (pinId) setPinId(pinId);

		router.replace('/confirmation');
	};

	return (
		<ScrollView style={{ flexGrow: 1 }}>
			<StatusBar style='dark' />
			<View style={styles.container}>
				<Image source={src} style={styles.image} />
				<View style={styles.form}>
					{/* Phone Number */}
					<View style={{ gap: 10 }}>
						<Text style={styles.label}>
							Phone Number <Text style={styles.required}>*</Text>
						</Text>
						<Controller
							control={control}
							rules={{
								required: true,
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<TextInput
									style={styles.input}
									placeholder=''
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
								/>
							)}
							name='phone'
						/>
						{errors.firstName && <Text>This is required.</Text>}
					</View>
					{/* First & Last Names Container */}
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
							gap: 10,
						}}
					>
						{/* First Name */}
						<View style={{ gap: 5 }}>
							<Text>
								First Name <Text style={styles.required}>*</Text>
							</Text>
							<Controller
								control={control}
								rules={{
									required: true,
								}}
								render={({ field: { onChange, onBlur, value } }) => (
									<TextInput
										style={{
											height: hp('6%'),
											width: wp('41%'),
											backgroundColor: Colors.grey,
											borderRadius: 15,
											paddingHorizontal: 10,
										}}
										placeholder=''
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
										autoComplete='name-given'
									/>
								)}
								name='firstName'
							/>
						</View>
						{/* Last Name */}
						<View style={{ gap: 5 }}>
							<Text>
								Last Name <Text style={styles.required}>*</Text>
							</Text>
							<Controller
								control={control}
								rules={{
									required: true,
								}}
								render={({ field: { onChange, onBlur, value } }) => (
									<TextInput
										style={{
											height: hp('6%'),
											width: wp('41%'),
											backgroundColor: Colors.grey,
											borderRadius: 15,
											paddingHorizontal: 10,
										}}
										placeholder=''
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
										autoComplete='name-family'
									/>
								)}
								name='lastName'
							/>
						</View>
					</View>
					{/* Email */}
					<View style={{ gap: 10 }}>
						<Text>
							Email address <Text style={styles.required}>*</Text>
						</Text>
						<Controller
							control={control}
							rules={{
								required: true,
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<TextInput
									style={styles.input}
									placeholder=''
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
									autoComplete='email'
								/>
							)}
							name='email'
						/>
					</View>
					{/* Password */}
					<View
						style={{
							gap: 5,
						}}
					>
						<Text>Password</Text>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<Controller
								control={control}
								rules={{
									required: false,
								}}
								render={({ field: { onChange, onBlur, value } }) => (
									<TextInput
										// Set secureTextEntry prop to hide
										//password when showPassword is false
										secureTextEntry={!showPassword}
										style={styles.input}
										placeholder=''
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
										autoComplete='new-password'
									/>
								)}
								name='password'
							/>
							{showPassword ? (
								<EyeOff
									style={styles.passwordIcon}
									color={Colors.secondary}
									onPress={toggleShowPassword}
								/>
							) : (
								<Eye
									style={styles.passwordIcon}
									color={Colors.secondary}
									onPress={toggleShowPassword}
								/>
							)}
						</View>
					</View>

					{/* Referral Code */}
					<View style={{ gap: 5 }}>
						<Text>Referral Code</Text>
						<Controller
							control={control}
							rules={{
								required: false,
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<TextInput
									style={styles.input}
									placeholder=''
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
								/>
							)}
							name='referralCode'
						/>
						{/* <TextInput style={styles.input} placeholder='enter code(if any)' /> */}
					</View>

					<View style={{ marginTop: 25 }}>
						<TouchableOpacity
							style={styles.button}
							onPress={handleSubmit(onSubmit)}
						>
							<Text style={{ color: '#FFF', fontSize: 16, fontWeight: '700' }}>
								Register
							</Text>
						</TouchableOpacity>
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
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 130,
	},
	image: {
		width: 144,
		height: 40,
		marginRight: 20,
		marginTop: -30,
		marginBottom: 30,
	},
	form: {
		borderWidth: 0.5,
		borderColor: Colors.secondary,
		borderRadius: 20,
		width: wp('95%'),
		// height: hp('70%'),
		justifyContent: 'center',
		alignItems: 'center',
		gap: 20,
		marginTop: 30,
		padding: 10,
	},
	input: {
		height: hp('6%'),
		width: wp('85%'),
		backgroundColor: Colors.grey,
		borderRadius: 15,
		color: 'black',
		paddingLeft: 10,
	},
	button: {
		height: hp('6%'),
		width: wp('85%'),
		borderRadius: 15,
		backgroundColor: Colors.secondary,
		justifyContent: 'center',
		alignItems: 'center',
	},
	required: {
		color: Colors.primary,
	},
	label: {
		alignSelf: 'flex-start',
	},
	passwordIcon: {
		position: 'absolute',
		right: 10,
	},
});
