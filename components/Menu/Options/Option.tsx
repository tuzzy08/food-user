import { StyleSheet, Text, View } from 'react-native';
import { OptionCheckbox } from './OptionCheckbox';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { OptionalItem } from '@/store/store';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { RequiredCheckbox } from './RequiredCheckbox';

const REQUIRED = 'required';

export function Option({
	index,
	item,
	checked,
	setChecked,
	selectedIndex,
	category_type,
	setSelectedIndex,
}: {
	index: number;
	checked: boolean;
	setChecked: any;
	category_type: string;
	item: OptionalItem;
	selectedIndex: number | undefined;
	setSelectedIndex: any;
}) {
	const handleChangeOption = () => {
		setSelectedIndex(index);
		setChecked(!checked);
	};

	const handleChangeRequired = () => {
		setSelectedIndex(index);
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
			{category_type === REQUIRED ? (
				<RequiredCheckbox
					onChange={handleChangeRequired}
					index={index}
					selectedIndex={selectedIndex}
					key={item.title}
				/>
			) : (
				<OptionCheckbox
					onChange={handleChangeOption}
					index={index}
					selectedIndex={selectedIndex}
					checked={checked}
					key={item.title}
				/>
			)}
		</BottomSheetView>
	);
}

const styles = StyleSheet.create({});
