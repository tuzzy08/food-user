import Colors from '@/constants/Colors';
import { OptionFromAPI } from '@/store/store';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { OptionAccordion } from './OptionAccordion';

const REQUIRED = 'required';
const OPTIONAL = 'optional';

export function ItemOptions({
	options,
}: {
	options: {
		required: Array<OptionFromAPI>;
		optional: Array<OptionFromAPI>;
	};
}) {
	return (
		<>
			<View key={'required'}>
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
			</View>
			<View key={'optional'}>
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
			</View>
		</>
	);
}

const styles = StyleSheet.create({});
