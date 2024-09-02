import React, { createContext, useState, useContext, useCallback } from 'react';
import { Item, Option, useBoundStore } from '@/store/store';

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
	itemQty: number;
	handleIncrement: () => void;
	handleDecrement: () => void;
	calculateOrderTotal: () => number;
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
	itemQty: 1,
	handleIncrement: () => {},
	handleDecrement: () => {},
	calculateOrderTotal: () => 0,
};

const ItemSelectionContext =
	createContext<ItemSelectionContextType>(defaultContext);

export const ItemSelectionProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [selectedItem, setSelectedItem] = useState<Item | null>(null);
	const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});
	const [itemQty, setItemQty] = useState(1);
	const increaseItemQty = useBoundStore((state) => state.increaseItemQty);
	const decreaseItemQty = useBoundStore((state) => state.decreaseItemQty);

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

	const handleIncrement = useCallback(() => {
		if (selectedItem) {
			increaseItemQty(selectedItem._id);
			setItemQty((prevQty) => prevQty + 1);
		}
	}, [selectedItem, increaseItemQty]);

	const handleDecrement = useCallback(() => {
		if (selectedItem) {
			decreaseItemQty(selectedItem._id);
			setItemQty((prevQty) => Math.max(1, prevQty - 1));
		}
	}, [selectedItem, decreaseItemQty]);

	const calculateOrderTotal = useCallback(() => {
		const basePrice = selectedItem?.item_price || 0;
		const optionsTotal = Object.values(selectedOptions).reduce(
			(total, option) => {
				return total + (option.price || 0);
			},
			0
		);
		return (basePrice + optionsTotal) * itemQty;
	}, [selectedItem, selectedOptions, itemQty]);

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
				itemQty,
				handleIncrement,
				handleDecrement,
				calculateOrderTotal,
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
