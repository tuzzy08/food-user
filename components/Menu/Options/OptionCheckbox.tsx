import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Check } from 'lucide-react-native';

const REQUIRED = 'required';

export function OptionCheckbox({
	onChange,
	index,
	selectedIndex,
	checked,
}: {
	onChange: () => void;
	index: number;
	selectedIndex: number | undefined;
	key: React.Key;
	checked: boolean;
}) {
	return (
		<Pressable
			style={[
				styles.checkboxBase,
				selectedIndex === index && checked ? styles.checkboxChecked : null,
			]}
			onPress={onChange}
		>
			{selectedIndex === index && checked ? (
				<Check size={20} color='white' />
			) : null}
		</Pressable>
	);
}

const styles = StyleSheet.create({
	checkboxBase: {
		width: 22,
		height: 22,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		borderWidth: 2,
		borderColor: 'coral',
		backgroundColor: 'transparent',
	},
	checkboxChecked: {
		backgroundColor: 'coral',
	},
});
