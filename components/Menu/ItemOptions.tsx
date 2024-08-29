import Colors from '@/constants/Colors';
import { Option as StoreOption } from '@/store/store';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { OptionAccordion } from './Options/OptionAccordion';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { useCallback, useState } from 'react';

const REQUIRED = 'required';
const OPTIONAL = 'optional';

type Option = StoreOption & { selected: boolean };

type ItemOptions = {
	required: Array<Option>;
	optional: Array<Option>;
};

const groupOptionsByCategory = (options: ItemOptions) => {
	const groupedOptions: {
		[key: string]: { type: 'required' | 'optional'; options: Option[] };
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
	toggleOption,
}: {
	options: ItemOptions;
	toggleOption: (option: Option) => void;
}) {
	const groupedOptions = groupOptionsByCategory(options);
	console.log(groupedOptions);

	// const [itemOptions, setItemOptions] = useState<ItemOptions>(options);
	// const toggleOption = useCallback(
	// 	(optionType: 'required' | 'optional', index: number) => {
	// 		setItemOptions((prevOptions) => {
	// 			const updatedOptions = { ...prevOptions };
	// 			updatedOptions[optionType][index].selected =
	// 				!updatedOptions[optionType][index].selected;
	// 			return updatedOptions;
	// 		});
	// 	},
	// 	[]
	// );
	return (
		<BottomSheetView key={'required'}>
			{groupedOptions
				? Object.entries(groupedOptions).map(([key, value]) => (
						<OptionAccordion
							key={key}
							category_title={key}
							category_type={value.type}
							items={value.options}
						/>
				  ))
				: null}
		</BottomSheetView>
		// <>
		// 	<BottomSheetView key={'required'}>
		// 		{options.required.length > 0
		// 			? options.required.map((option) => (
		// 					<OptionAccordion
		// 						key={option.title.toString()}
		// 						category_title={option.category}
		// 						category_type={REQUIRED}
		// 						items={options.required}
		// 					/>
		// 			  ))
		// 			: null}
		// 	</BottomSheetView>
		// 	<BottomSheetView key={'optional'}>
		// 		{options.optional.length > 0
		// 			? options.optional.map((option) => (
		// 					<OptionAccordion
		// 						key={option.title.toString()}
		// 						category_title={option.category}
		// 						category_type={OPTIONAL}
		// 						items={options.optional}
		// 					/>
		// 			  ))
		// 			: null}
		// 	</BottomSheetView>
		// </>
	);
}

const styles = StyleSheet.create({});
