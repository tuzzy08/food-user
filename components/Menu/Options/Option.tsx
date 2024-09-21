import { StyleSheet, Text, View } from 'react-native';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { Option as OptionalItem } from '@/store/store';
import { Checkbox } from './Checkbox';

const REQUIRED = 'required';

type Option = OptionalItem & { selected: boolean };

export function Option({
	index,
	item,
	isSelected,
	onSelect,
	category_type,
	isOnlyOption,
	missingRequiredOptions,
}: {
	index: number;
	item: OptionalItem;
	isSelected: boolean;
	onSelect: (item: OptionalItem) => void;
	category_type: string;
	isOnlyOption: boolean;
	missingRequiredOptions: OptionalItem[];
}) {
	const handleChange = () => {
		onSelect(item);
	};
	const isMissing = missingRequiredOptions.some(
		(option) => option.title === item.title
	);

	return (
		<BottomSheetView
			style={[
				{
					flexDirection: 'row',
					justifyContent: 'space-between',
					paddingRight: 7,
				},
				isMissing && {
					borderColor: 'red',
					borderWidth: 0.5,
					padding: 5,
					borderRadius: 5,
				},
			]}
			key={index.toString()}
		>
			<BottomSheetView>
				<Text>{item.title}</Text>
				<Text>{`₦${item.price}`}</Text>
			</BottomSheetView>
			<Checkbox
				isSelected={isSelected}
				onPress={handleChange}
				isRequired={category_type === REQUIRED}
				isOnlyOption={isOnlyOption}
			/>
		</BottomSheetView>
	);
}

const styles = StyleSheet.create({});
