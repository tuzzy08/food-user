import { StyleSheet } from 'react-native';
import { BottomSheetView, TouchableOpacity } from '@gorhom/bottom-sheet';
import Colors from '@/constants/Colors';
import { View, Text } from '@/components/Themed';
import { ModifiedItem } from '@/store/store';

export function BottomSheetContent({
	data,
	closeModal,
}: {
	data: ModifiedItem;
	closeModal: () => void;
}) {
	console.log(data);
	return <></>;
}

const styles = StyleSheet.create({});
