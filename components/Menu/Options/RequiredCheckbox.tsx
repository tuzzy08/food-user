import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Check } from 'lucide-react-native';

const REQUIRED = 'required';

export function RequiredCheckbox({
	onChange,
	index,
	selectedIndex,
}: {
	onChange: () => void;
	index: number;
	selectedIndex: number | undefined;
	key: React.Key;
}) {
	return (
		<Pressable
			style={[
				styles.checkboxBase,
				selectedIndex === index ? styles.checkboxChecked : null,
			]}
			onPress={onChange}
		>
			{selectedIndex === index && <Check size={20} color='white' />}
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
