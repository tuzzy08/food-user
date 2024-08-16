import { OptionalItem } from '@/store/store';
import { ReactNode, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import Animated, {
	SharedValue,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import Colors from '@/constants/Colors';

const REQUIRED = 'required';

type OptionAccordionProps = {
	category_title: string;
	category_type: string;
	items: Array<OptionalItem>;
};

export function OptionAccordion({
	category_title,
	category_type,
	items,
}: OptionAccordionProps) {
	const open = useSharedValue(true);
	const onPress = () => {
		open.value = !open.value;
	};
	return (
		<View>
			<AccordionHeader
				category_title={category_title}
				category_type={category_type}
				isExpanded={open}
				onPress={onPress}
			/>
			<AccordionWrapper isExpanded={open}>
				<AccordionContent items={items} />
			</AccordionWrapper>
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
		height: 180,
		width: '100%',
		paddingHorizontal: 8,
		paddingTop: 8,
	},
	optionHeader: {
		height: 35,
		backgroundColor: Colors.lightGrey,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		paddingTop: 8,
		paddingLeft: 3,
		paddingRight: 10,
		borderTopWidth: 0.5,
		borderTopColor: Colors.grey,
	},
	optionHeaderContent: {
		width: '70%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 5,
	},
	optionHeaderText: { fontSize: 13 },
	optionTypeText: {
		fontSize: 10,
	},
	optionType: {
		borderWidth: 0.5,
		paddingHorizontal: 4,
		height: 17,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 4,
	},
});

export function AccordionHeader({
	isExpanded,
	category_title,
	category_type,
	onPress,
}: {
	isExpanded: SharedValue<boolean>;
	category_title: string;
	category_type: string;
	onPress: () => void;
}) {
	const [isOpen, setIsOpen] = useState(isExpanded.value);

	const handlePress = () => {
		onPress();
		setIsOpen(!isOpen);
	};
	return (
		<View>
			{/* Accordion header */}
			<View style={styles.optionHeader}>
				<View style={styles.optionHeaderContent}>
					<Text style={styles.optionHeaderText}>{category_title}</Text>
					<View
						style={[
							styles.optionType,
							{
								borderColor:
									category_type === REQUIRED ? 'red' : Colors.light.text,
							},
						]}
					>
						<Text
							style={[
								styles.optionTypeText,
								{
									color: category_type === REQUIRED ? 'red' : Colors.light.text,
								},
							]}
						>
							{category_type}
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

export function AccordionContent({ items }: { items: Array<OptionalItem> }) {
	return (
		<View style={styles.accordionContent}>
			{items.map((item, index) => (
				<View key={index.toString()}>
					<Text>{item.title}</Text>
					<Text>{item.price}</Text>
				</View>
			))}
		</View>
	);
}
