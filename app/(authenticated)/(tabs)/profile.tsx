import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { Text, View } from '@/components/Themed';
import { SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import {
	Wallet,
	Hammer,
	Tag,
	MessageCircleQuestion,
	CircleHelp,
	LogOut,
	ChevronRight,
} from 'lucide-react-native';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '@/constants/Colors';

export default function Page() {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header />
			<ProfileOptions />
		</SafeAreaView>
	);
}

function Header() {
	return (
		<View style={styles.headerContainer}>
			<Text style={styles.headerText}>Hello {`<User>`}!</Text>
			<View style={{ flexDirection: 'row', gap: 5 }}>
				<Text style={{ color: Colors.secondary }}>Wallet Balance</Text>
				<View style={styles.balanceBubble}>
					<Text>N0.00</Text>
				</View>
			</View>
		</View>
	);
}

function ProfileOptions() {
	const colorScheme = useColorScheme();
	const color = colorScheme === 'dark' ? 'white' : 'black';
	const items = [
		{
			icon: <Wallet color={color} />,
			title: 'My Wallet',
			href: '/wallet',
		},
		{
			icon: <Hammer color={color} />,
			title: 'Manage Profile',
			href: '/manageProfile',
		},
		{
			icon: <Tag color={color} />,
			title: 'Promo codes',
			href: '/promocodes',
		},
		{
			icon: <CircleHelp color={color} />,
			title: 'F.A.Q.',
			href: '/faq',
		},
		{
			icon: <MessageCircleQuestion color={color} />,
			title: 'Support',
			href: '/support',
		},
		{
			icon: <LogOut color={color} />,
			title: 'Log out',
			href: '',
		},
	];
	return (
		<View style={styles.profileOptionsContainer}>
			{items.map((item, index) => (
				<Option item={item} key={index.toString()} />
			))}
		</View>
	);
}

function Option({
	item,
}: {
	item: { icon: React.JSX.Element; title: string; href: any };
}) {
	const colorScheme = useColorScheme();
	return (
		<TouchableOpacity
			style={styles.option}
			onPress={() => router.push(item.href)}
		>
			<View style={{ flexDirection: 'row', gap: 20 }}>
				<View>{item.icon}</View>
				<View>
					<Text style={styles.optionText}>{item.title}</Text>
				</View>
			</View>

			<ChevronRight
				color={colorScheme === 'dark' ? 'white' : 'black'}
				style={{ display: item.title === 'Log out' ? 'none' : undefined }}
			/>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	headerContainer: {
		marginTop: 60,
		height: hp('15%'),
		gap: 5,
		paddingLeft: 10,
	},
	headerText: {
		fontSize: 26,
		marginTop: 20,
	},
	profileOptionsContainer: {
		flex: 1,
		paddingHorizontal: 10,
		paddingTop: 20,
		marginTop: 20,
	},
	option: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 10,
		height: hp('8%'),
	},
	optionText: {
		fontSize: 18,
	},
	balanceBubble: {
		height: 'auto',
		width: 'auto',
		backgroundColor: 'green',
		paddingVertical: 1,
		paddingHorizontal: 5,
		borderRadius: 25,
	},
});
