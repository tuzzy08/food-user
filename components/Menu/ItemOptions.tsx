import Colors from '@/constants/Colors';
import { Option } from '@/store/store';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { OptionAccordion } from './Options/OptionAccordion';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { useCallback, useState } from 'react';

// type Option = ItemOption & { selected: boolean };

type ItemOptions = {
	required: Array<Option>;
	optional: Array<Option>;
};

const groupOptionsByCategory = (options: ItemOptions) => {
	const groupedOptions: {
		[key: string]: { type: string; options: Option[] };
	} = {};

	// Group required options
	options.required.forEach((option) => {
		if (!groupedOptions[option.category]) {
			groupedOptions[option.category] = { type: 'required', options: [] };
		}
		groupedOptions[option.category].options.push(option);
	});

	// Group optional options
	options.optional.forEach((option) => {
		if (!groupedOptions[option.category]) {
			groupedOptions[option.category] = { type: 'optional', options: [] };
		}
		groupedOptions[option.category].options.push(option);
	});

	return groupedOptions;
};

export function ItemOptions({
	options,
	onOptionSelect,
	missingRequiredOptions,
}: {
	options: ItemOptions;
	onOptionSelect: (option: Option, category_type: string) => void;
	missingRequiredOptions: Option[];
}) {
	const groupedOptions = groupOptionsByCategory(options);

	return (
		<BottomSheetView key={'required'}>
			{groupedOptions
				? Object.entries(groupedOptions).map(([key, value]) => (
						<OptionAccordion
							key={key}
							category_title={key}
							category_type={value.type}
							items={value.options}
							onOptionSelect={(option) => onOptionSelect(option, value.type)}
							missingRequiredOptions={missingRequiredOptions}
						/>
				  ))
				: null}
		</BottomSheetView>
	);
}

const styles = StyleSheet.create({});
