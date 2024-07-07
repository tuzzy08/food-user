import { StyleSheet, FlatList, Animated, Dimensions } from 'react-native';
import { Text, View } from '@/components/Themed';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { SharedValue } from 'react-native-reanimated';
import { LegacyRef, forwardRef, useCallback, useRef } from 'react';

const TabTitles = {
	MyCart: 'My Cart',
	InProgress: 'In Progress',
	Completed: 'Completed',
};

const titles = Object.values(TabTitles);

export const TabPage = forwardRef(
	(
		{
			scrollX,
		}: {
			scrollX: any;
		},
		ref: LegacyRef<FlatList<string>>
	) => {
		return (
			<View style={styles.container}>
				<Animated.FlatList
					ref={ref}
					data={titles}
					horizontal
					pagingEnabled
					onScroll={Animated.event(
						[{ nativeEvent: { contentOffset: { x: scrollX } } }],
						{
							useNativeDriver: false,
						}
					)}
					showsHorizontalScrollIndicator={false}
					renderItem={({ item }: { item: string }) => (
						<View style={styles.tab}>
							<Text>{item}</Text>
						</View>
					)}
					keyExtractor={(item) => item}
				/>
			</View>
		);
	}
);

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		// width: '100%',
		// height: '80%',
		// borderWidth: 1,
		// borderColor: 'red',
	},
	tab: {
		width: wp('100%'),
		height: hp('60%'),
		justifyContent: 'center',
		alignItems: 'center',
		// borderWidth: 1,
		// borderColor: 'yellow',
	},
});
