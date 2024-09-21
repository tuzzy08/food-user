import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Home, ClipboardList, Search, User } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Header } from '@/components/Header';
import { StatusBar } from 'expo-status-bar';

export default function TabLayout() {
	const colorScheme = useColorScheme();
	return (
		<>
			<StatusBar backgroundColor={colorScheme === 'dark' ? '#000' : '#FFF'} />
			<Tabs
				screenOptions={{
					tabBarActiveTintColor: Colors.primary,
					tabBarStyle: {
						height: hp('10%'),
						paddingBottom: 10,
					},
					tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
				}}
			>
				<Tabs.Screen
					name='index'
					options={{
						title: 'Home',
						headerTitle: '',
						tabBarIcon: ({ color }) => (
							<Home size={28} color={color} style={styles.tabIcon} />
						),
						header: () => <Header />,
					}}
				/>
				<Tabs.Screen
					name='orders'
					options={{
						title: 'Orders',
						tabBarIcon: ({ color }) => (
							<ClipboardList size={28} color={color} style={styles.tabIcon} />
						),
					}}
				/>

				<Tabs.Screen
					name='search'
					options={{
						title: 'Search',
						tabBarIcon: ({ color }) => (
							<Search size={28} color={color} style={styles.tabIcon} />
						),
					}}
				/>
				<Tabs.Screen
					name='profile'
					options={{
						headerShown: false,
						title: 'Profile',
						tabBarIcon: ({ color }) => (
							<User size={28} color={color} style={styles.tabIcon} />
						),
					}}
				/>
			</Tabs>
		</>
	);
}

const styles = StyleSheet.create({
	tabIcon: {
		marginBottom: -3,
	},
});
