import { StyleSheet, Text, View } from 'react-native';
import { OptionCheckbox } from './OptionCheckbox';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { OptionalItem } from '@/store/store';
import { useState } from 'react';

export function Option({ index, item }: { index: number; item: OptionalItem }) {
	const [checked, setChecked] = useState(false);
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
			<OptionCheckbox
				onChange={() => setChecked(!checked)}
				checked={checked}
				key={item.title}
			/>
		</BottomSheetView>
	);
}

const styles = StyleSheet.create({});
