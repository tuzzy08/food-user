import { Pressable, useColorScheme, StyleSheet } from 'react-native';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Text, View } from '@/components/Themed';
import React, { useState } from 'react';
import Colors from '@/constants/Colors';

const TabTitles = {
	MyCart: 'My Cart',
	InProgress: 'In Progress',
	Completed: 'Completed',
};
const tabs = [
	{ title: TabTitles.MyCart },
	{ title: TabTitles.InProgress },
	{ title: TabTitles.Completed },
];

export function OrdersTabBar() {
	const [active, setActive] = useState(TabTitles.MyCart);
	const colorScheme = useColorScheme();
	const color = colorScheme === 'dark' ? Colors.dark.text : Colors.light.text;
	return (
		<View style={styles.container}>
			{/* <View style={[styles.item, styles.active]}>
				<Text style={[]}>My Cart</Text>
			</View>
			<View style={styles.item}>
				<Text>In progress</Text>
			</View>
			<View style={styles.item}>
				<Text>Completed</Text>
			</View> */}
			{tabs.map((tab) => {
				return (
					<Pressable
						key={tab.title}
						onPress={() => setActive(tab.title)}
						style={[styles.item, active === tab.title && styles.active]}
					>
						<Text
							style={[
								active === tab.title
									? styles.activeText
									: { color: Colors.light.text },
							]}
						>
							{tab.title}
						</Text>
					</Pressable>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: wp('90%'),
		height: hp('7%'),
		borderRadius: 8,
		backgroundColor: Colors.lightGrey,
		padding: 10,
		paddingVertical: 6,
	},
	item: { backgroundColor: Colors.lightGrey },
	active: {
		backgroundColor: Colors.secondary,
		padding: 10,
		paddingVertical: 8,
		borderRadius: 8,
	},
	activeText: {
		color: Colors.dark.text,
		fontSize: 16,
	},
});
