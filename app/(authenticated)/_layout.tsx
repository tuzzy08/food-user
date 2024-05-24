import React from 'react';
import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Home, ClipboardList, Search, User } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { Redirect, useSegments } from 'expo-router';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Header } from '@/components/Header';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '@/hooks/useAuth';

export default function TabLayout() {
	// return <Redirect href='/login' />;
	const { authState } = useAuth();
	console.log('🚀 ~ TabLayout ~ authState:', authState);

	// * Check if the user is authenticated
	// if (authState!.authenticated !== true || authState!.token === null) {
	// 	return <Redirect href='/login' />;
	// }
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
				backBehavior='history'
				screenOptions={{
					tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
					tabBarStyle: {
						height: hp('10%'),
						paddingBottom: 9,
					},
					tabBarLabelStyle: { fontSize: 11 },
				}}
			>
				<Tabs.Screen
					name='index'
					options={{
						title: 'Home',
						tabBarIcon: ({ color }) => (
							<Home size={25} color={color} style={styles.tabIcon} />
						),
						header: () => <Header />,
					}}
				/>
				<Tabs.Screen
					name='orders'
					options={{
						title: 'Orders',
						tabBarIcon: ({ color }) => (
							<ClipboardList size={25} color={color} style={styles.tabIcon} />
						),
					}}
				/>

				<Tabs.Screen
					name='search'
					options={{
						title: 'Search',
						tabBarIcon: ({ color }) => (
							<Search size={25} color={color} style={styles.tabIcon} />
						),
					}}
				/>
				<Tabs.Screen
					name='profile'
					options={{
						headerShown: false,
						title: 'Profile',
						tabBarIcon: ({ color }) => (
							<User size={25} color={color} style={styles.tabIcon} />
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
				<Tabs.Screen
					name='(nonTabs)'
					options={{
						href: null,
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
