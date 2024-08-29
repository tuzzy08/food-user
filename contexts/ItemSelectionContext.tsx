import React, { createContext, useState, useContext } from 'react';
import { Item, Option } from '@/store/store';

interface SelectedOptions {
	[key: string]: Option;
}

interface ItemSelectionContextType {
	selectedItem: Item | null;
	addSelectedItem: (item: Item | null) => void;
	clearSelectedItem: () => void;
	selectedOptions: SelectedOptions;
	setSelectedItem: (item: Item | null) => void;
	addSelectedOption: (category: string, option: Option) => void;
	removeSelectedOption: (category: string) => void;
	clearSelectedOptions: () => void;
}

const defaultContext = {
	selectedItem: null,
	addSelectedItem: (item: Item | null) => {},
	clearSelectedItem: () => {},
	selectedOptions: {},
	setSelectedItem: (item: Item | null) => {},
	addSelectedOption: (category: string, option: Option) => {},
	removeSelectedOption: (category: string) => {},
	clearSelectedOptions: () => {},
};

const ItemSelectionContext =
	createContext<ItemSelectionContextType>(defaultContext);

export const ItemSelectionProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [selectedItem, setSelectedItem] = useState<Item | null>(null);
	const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});

	const addSelectedItem = (item: Item | null) => {
		setSelectedItem(item);
	};

	const clearSelectedItem = () => {
		setSelectedItem(null);
	};

	const addSelectedOption = (category: string, option: Option) => {
		setSelectedOptions((prev) => ({ ...prev, [category]: option }));
	};

	const removeSelectedOption = (category: string) => {
		setSelectedOptions((prev) => {
			const { [category]: _, ...rest } = prev;
			return rest;
		});
	};

	const clearSelectedOptions = () => {
		setSelectedOptions({});
	};

	return (
		<ItemSelectionContext.Provider
			value={{
				selectedItem,
				addSelectedItem,
				clearSelectedItem,
				selectedOptions,
				setSelectedItem,
				addSelectedOption,
				removeSelectedOption,
				clearSelectedOptions,
			}}
		>
			{children}
		</ItemSelectionContext.Provider>
	);
};

export const useItemSelection = () => {
	const context = useContext(ItemSelectionContext);
	if (context === undefined) {
		throw new Error(
			'useItemSelection must be used within an ItemSelectionProvider'
		);
	}
	return context;
};
