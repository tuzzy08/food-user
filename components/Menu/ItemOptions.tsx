import Colors from '@/constants/Colors';
import { Option } from '@/store/store';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { OptionAccordion } from './OptionAccordion';
import { BottomSheetView } from '@gorhom/bottom-sheet';

const REQUIRED = 'required';
const OPTIONAL = 'optional';

export function ItemOptions({
	options,
}: {
	options: {
		required: Array<Option>;
		optional: Array<Option>;
	};
}) {
	return (
		<>
			<BottomSheetView key={'required'}>
				{options.required.length > 0
					? options.required.map((option) => (
							<OptionAccordion
								key={option.category_title.toString()}
								category_title={option.category_title}
								category_type={REQUIRED}
								items={option.items}
							/>
					  ))
					: null}
			</BottomSheetView>
			<BottomSheetView key={'optional'}>
				{options.optional.length > 0
					? options.optional.map((option) => (
							<OptionAccordion
								key={option.category_title.toString()}
								category_title={option.category_title}
								category_type={OPTIONAL}
								items={option.items}
							/>
					  ))
					: null}
			</BottomSheetView>
		</>
	);
}

const styles = StyleSheet.create({});
