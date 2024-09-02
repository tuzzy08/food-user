import { StyleSheet, Text, View } from 'react-native';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { Option as OptionalItem } from '@/store/store';
import { useItemSelection } from '@/contexts/ItemSelectionContext';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
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
}: {
	index: number;
	item: Option;
	isSelected: boolean;
	onSelect: (item: Option) => void;
	category_type: string;
	isOnlyOption: boolean;
}) {
	const handleChange = () => {
		onSelect(item);
	};

	return (
		<BottomSheetView
			style={{
				flexDirection: 'row',
				justifyContent: 'space-between',
				paddingRight: 7,
			}}
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
