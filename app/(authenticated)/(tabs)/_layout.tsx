import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Home, ClipboardList, Search, User } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useSegments } from 'expo-router';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Header } from '@/components/Header';
import { StatusBar } from 'expo-status-bar';

export default function TabLayout() {
	const colorScheme = useColorScheme();
	const segment = useSegments();
	// get the current page from the segment
	const page = segment[segment.length - 1];
	// create an array of list pages you want to hide the tab bar in
	// const pagesToHideTabBar = ['', ''];

	return (
		<>
			<StatusBar backgroundColor={colorScheme === 'dark' ? '#000' : '#FFF'} />
			<Tabs
				screenOptions={{
					tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
					tabBarStyle: {
						height: hp('9.5%'),
						paddingBottom: 12,
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
				<Tabs.Screen
					name='[vendorId]'
					options={{
						href: null,
						headerShown: false,
						// header: () => <RestaurantHeader />,
						tabBarStyle: {
							display: page === '[vendorId]' ? 'none' : 'flex',
						},
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
