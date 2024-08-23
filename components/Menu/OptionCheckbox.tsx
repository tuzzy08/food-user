import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Check } from 'lucide-react-native';

export function OptionCheckbox({
	onChange,
	checked,
}: {
	onChange: () => void;
	checked: boolean;
	key: React.Key;
}) {
	return (
		<Pressable
			style={[styles.checkboxBase, checked && styles.checkboxChecked]}
			onPress={onChange}
		>
			{checked && <Check size={20} color='white' />}
		</Pressable>
	);
}

const styles = StyleSheet.create({
	checkboxBase: {
		width: 24,
		height: 24,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 50,
		borderWidth: 2,
		borderColor: 'coral',
		backgroundColor: 'transparent',
	},
	checkboxChecked: {
		backgroundColor: 'coral',
	},
});
