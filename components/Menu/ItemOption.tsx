import Colors from '@/constants/Colors';
import { OptionFromAPI } from '@/store/store';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import Animated, {
	SharedValue,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { ReactNode, useCallback, useState } from 'react';

export function ItemOption({ option }: { option: OptionFromAPI }) {
	const open = useSharedValue(true);
	const onPress = () => {
		open.value = !open.value;
	};

	return (
		<View>
			<AccordionHeader option={option} isExpanded={open} onPress={onPress} />
			<AccordionWrapper isExpanded={open}>
				<AccordionContent option={option} />
			</AccordionWrapper>
		</View>
	);
}

export function AccordionHeader({
	isExpanded,
	onPress,
	option,
}: {
	isExpanded: SharedValue<boolean>;
	onPress: () => void;
	option: OptionFromAPI;
}) {
	const [isOpen, setIsOpen] = useState(isExpanded.value);

	// const onPress = () => {
	// 	console.log('Pressed!');
	// 	isExpanded.value = !isExpanded.value;
	// 	setIsOpen(isExpanded.value);
	// };

	const handlePress = useCallback(() => {
		setIsOpen(isExpanded.value);
		onPress();
	}, [isExpanded.value]);
	return (
		<View>
			{/* Accordion header */}
			<View style={styles.optionHeader}>
				<View style={styles.optionHeaderContent}>
					<Text style={styles.optionHeaderText}>{option.title}</Text>
					<View
						style={[
							styles.optionType,
							{
								borderColor:
									option.type === 'required' ? 'red' : Colors.light.text,
							},
						]}
					>
						<Text
							style={[
								styles.optionTypeText,
								{
									color: option.type === 'required' ? 'red' : Colors.light.text,
								},
							]}
						>
							{option.type}
						</Text>
					</View>
				</View>
				{isOpen ? (
					<Pressable onPress={handlePress}>
						<ChevronUp size={28} color={Colors.light.text} />
					</Pressable>
				) : (
					<Pressable onPress={handlePress}>
						<ChevronDown size={28} color={Colors.light.text} />
					</Pressable>
				)}
			</View>
			{/* Accordion */}
		</View>
	);
}
export function AccordionWrapper({
	isExpanded,
	children,
	duration = 500,
}: {
	isExpanded: SharedValue<boolean>;
	children: ReactNode;
	duration?: number;
}) {
	const height = useSharedValue(0);

	const derivedHeight = useDerivedValue(() =>
		withTiming(height.value * Number(isExpanded.value), {
			duration,
		})
	);
	const bodyStyle = useAnimatedStyle(() => ({
		height: derivedHeight.value,
	}));

	return (
		<View>
			<Animated.View style={[styles.animatedView, bodyStyle]}>
				<View
					onLayout={(e) => {
						height.value = e.nativeEvent.layout.height;
					}}
					style={styles.wrapper}
				>
					{/* Accordion Content */}
					{children}
				</View>
			</Animated.View>
		</View>
	);
}

export function AccordionContent({ option }: { option: OptionFromAPI }) {
	return (
		<View style={styles.accordionContent}>
			<Text>{option.title}</Text>
			<Text>test</Text>
		</View>
	);
}
const styles = StyleSheet.create({
	animatedView: {
		width: '100%',
		overflow: 'hidden',
	},
	wrapper: {
		width: '100%',
		position: 'absolute',
		display: 'flex',
		alignItems: 'center',
	},
	accordionContent: {
		height: 200,
		width: '100%',
		paddingHorizontal: 8,
		paddingTop: 8,
	},
	optionHeader: {
		height: 45,
		backgroundColor: Colors.lightGrey,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		paddingTop: 8,
		paddingLeft: 3,
		paddingRight: 10,
	},
	optionHeaderContent: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 5,
		gap: 20,
	},
	optionHeaderText: { fontSize: 15 },
	optionTypeText: {
		fontSize: 10,
	},
	optionType: {
		borderWidth: 0.5,
		paddingHorizontal: 5,
		height: 20,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 4,
	},
});
