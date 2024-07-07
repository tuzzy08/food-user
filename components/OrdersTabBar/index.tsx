import {
	Animated,
	Dimensions,
	Pressable,
	useColorScheme,
	StyleSheet,
	View,
	findNodeHandle,
	LayoutChangeEvent,
} from 'react-native';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Text } from '@/components/Themed';
import React, {
	Dispatch,
	SetStateAction,
	forwardRef,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import Colors from '@/constants/Colors';
import {
	SharedValue,
	interpolate,
	useSharedValue,
} from 'react-native-reanimated';

const TabTitles = {
	MyCart: 'My Cart',
	InProgress: 'In Progress',
	Completed: 'Completed',
};

const tabs = Object.values(TabTitles);

// const tabs = [
// 	{ title: TabTitles.MyCart, ref: React.createRef<View>() },
// 	{ title: TabTitles.InProgress, ref: React.createRef<View>() },
// 	{ title: TabTitles.Completed, ref: React.createRef<View>() },
// ];

export function OrdersTabBar({
	scrollX,
	onItemPress,
}: {
	scrollX: Animated.Value;
	onItemPress: (itemIndex: number) => void;
}) {
	const [measurements, setMeasurements] = useState<
		Array<{ x: number; width: number }>
	>([]);
	const [active, setActive] = useState(TabTitles.MyCart);

	const containerRef = useRef<View>(null);

	// useEffect(() => {
	// 	if (containerRef.current) {
	// 		const containerNode = findNodeHandle(containerRef.current);
	// 		if (containerNode !== null) {
	// 			let measurements: Array<{
	// 				x: number;
	// 				y: number;
	// 				width: number;
	// 				height: number;
	// 			}> = [];
	// 			tabs.forEach((tab) => {
	// 				if (tab.ref.current) {
	// 					tab.ref.current.measureLayout(
	// 						containerNode,
	// 						(x, y, width, height) => {
	// 							console.log(`Measurements for ${tab.title}:`, {
	// 								x,
	// 								y,
	// 								width,
	// 								height,
	// 							});
	// 							// Handle the measurements here
	// 							measurements.push({ x, y, width, height });
	// 							// Set State
	// 							if (measurements.length === tabs.length) {
	// 								setMeasurements(measurements);
	// 							}
	// 						},
	// 						() => {
	// 							console.error(`Failed to measure layout for ${tab.title}`);
	// 						}
	// 					);
	// 				}
	// 			});
	// 		}
	// 	}
	// }, []);

	const onTabLayout = useCallback((event: LayoutChangeEvent, index: number) => {
		const { x, width } = event.nativeEvent.layout;
		setMeasurements((prev) => {
			const newMeasurements = [...prev];
			newMeasurements[index] = { x, width };
			return newMeasurements;
		});
	}, []);
	return (
		<View style={[styles.container]}>
			{tabs.map((title, index) => (
				<Tab
					onItemPress={onItemPress}
					index={index}
					key={title}
					title={title}
					active={active}
					setActive={setActive}
					onLayout={(event: LayoutChangeEvent) => onTabLayout(event, index)}
				/>
			))}
			{measurements.length === tabs.length && (
				<Indicator
					measurements={measurements}
					scrollx={scrollX}
					tabTitles={tabs}
				/>
			)}
		</View>
	);
}

export const Tab = ({
	title,
	onItemPress,
	index,
	active,
	setActive,
	onLayout,
}: {
	title: string;
	active: string;
	index: number;
	onItemPress: (itemIndex: number) => void;
	setActive: Dispatch<SetStateAction<string>>;
	onLayout: (event: LayoutChangeEvent) => void;
}) => {
	const colorScheme = useColorScheme();
	const backgroundColor =
		colorScheme === 'dark' ? Colors.dark.background : Colors.light.background;
	const color = colorScheme === 'dark' ? Colors.dark.text : Colors.light.text;
	return (
		<Pressable
			onPress={() => {
				onItemPress(index);
				setActive(title);
			}}
			style={[styles.item, { backgroundColor }]}
			onLayout={onLayout}
		>
			<Text style={[{ color, fontSize: 17 }]}>{title}</Text>
		</Pressable>
	);
};

const Indicator = ({
	measurements,
	scrollx,
	tabTitles,
}: {
	measurements: Array<{ x: number; width: number }>;
	scrollx: Animated.Value;
	tabTitles: string[];
}) => {
	const { width: screenWidth } = Dimensions.get('screen');
	const inputRange = tabTitles.map((_, i) => i * screenWidth);
	// const outputRange = measurements.map((measurement) => measurement.width);
	// Indicator width
	const indicatorWidth = scrollx.interpolate({
		inputRange,
		outputRange: measurements.map((measurement) => measurement.width),
	});
	// Indicator x position
	const indicatorX = scrollx.interpolate({
		inputRange,
		outputRange: measurements.map((measurement) => measurement.x),
	});
	return (
		<Animated.View
			style={[
				styles.indicator,
				{
					width: indicatorWidth,
					zIndex: -1,
					transform: [
						{
							translateX: indicatorX,
						},
					],
				},
			]}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: wp('90%'),
		height: hp('7%'),
		borderRadius: 8,
		// backgroundColor: Colors.lightGrey,
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
	tabText: { fontSize: 16 },
	indicator: {
		position: 'absolute',
		bottom: -2,
		height: 5,
		// borderRadius: 8,
		backgroundColor: Colors.secondary,
		// padding: 10,
		// paddingVertical: 6,
	},
});
