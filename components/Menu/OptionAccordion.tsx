import { OptionalItem } from '@/store/store';
import { ReactNode, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { CircleChevronDown, CircleChevronUp } from 'lucide-react-native';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import Animated, {
	SharedValue,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import { Option } from './Option';

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
		<BottomSheetView style={{ flex: 1 }}>
			<AccordionHeader
				category_title={category_title}
				category_type={category_type}
				isExpanded={open}
				onPress={onPress}
			/>
			<AccordionWrapper isExpanded={open}>
				<AccordionContent items={items} />
			</AccordionWrapper>
		</BottomSheetView>
	);
}

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
		<BottomSheetView style={styles.optionHeader}>
			<BottomSheetView style={styles.optionHeaderContent}>
				<Text style={styles.optionHeaderText}>{category_title}</Text>
				<BottomSheetView
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
						{`${category_type.charAt(0).toUpperCase()}${category_type.slice(
							1
						)}`}
					</Text>
				</BottomSheetView>
			</BottomSheetView>
			<BottomSheetView>
				{isOpen ? (
					<CircleChevronUp
						size={26}
						color={Colors.light.text}
						onPress={handlePress}
					/>
				) : (
					<CircleChevronDown
						size={26}
						color={Colors.light.text}
						onPress={handlePress}
					/>
				)}
			</BottomSheetView>
		</BottomSheetView>
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
		<Animated.View style={[styles.animatedBottomSheetView, bodyStyle]}>
			<BottomSheetView
				onLayout={(e) => {
					height.value = e.nativeEvent.layout.height;
				}}
				style={styles.wrapper}
			>
				{/* Accordion Content */}
				{children}
			</BottomSheetView>
		</Animated.View>
	);
}

export function AccordionContent({ items }: { items: Array<OptionalItem> }) {
	return (
		<BottomSheetView style={styles.accordionContent}>
			<Text>Select an option</Text>
			<BottomSheetView
				style={{
					width: '100%',
					gap: 25,
					paddingBottom: 10,
				}}
			>
				{items.map((item, index) => (
					<Option key={index.toString()} index={index} item={item} />
				))}
			</BottomSheetView>
		</BottomSheetView>
	);
}

const styles = StyleSheet.create({
	animatedBottomSheetView: {
		flex: 1,
		overflow: 'hidden',
	},
	wrapper: {
		width: '100%',
		flex: 1,
		padding: 10,
		position: 'absolute',
	},
	accordionContent: {
		flex: 1,
		gap: 20,
	},
	optionHeader: {
		height: 50,
		backgroundColor: Colors.lightGrey,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 10,
		marginRight: 5,
		borderTopWidth: 0.5,
		borderTopColor: Colors.grey,
	},
	optionHeaderContent: {
		width: '70%',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 25,
	},
	optionHeaderText: { fontSize: 16 },
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
	optionCheckbox: {},
});
