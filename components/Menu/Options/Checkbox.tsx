import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';
import Colors from '@/constants/Colors';

export function Checkbox({
	isSelected,
	onPress,
	isRequired,
	isOnlyOption,
}: {
	isSelected: boolean;
	onPress: () => void;
	isRequired: boolean;
	isOnlyOption: boolean;
}) {
	const handlePress = () => {
		if (isRequired && isOnlyOption && isSelected) {
			// Prevent deselection if it's the only required option
			return;
		}
		onPress();
	};

	return (
		<Pressable
			style={[
				styles.checkboxBase,
				isSelected ? styles.checkboxChecked : null,
				isRequired ? styles.checkboxRequired : null,
				isSelected && isRequired
					? {
							borderColor: Colors.dark.alt.secondary,
							backgroundColor: Colors.dark.alt.secondary,
					  }
					: null,
			]}
			onPress={handlePress}
		>
			{isSelected && <Check size={20} color='white' />}
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
		borderColor: Colors.primary,
		backgroundColor: 'transparent',
	},
	checkboxChecked: {
		backgroundColor: Colors.primary,
	},
	checkboxRequired: {
		borderColor: 'red',
	},
});
