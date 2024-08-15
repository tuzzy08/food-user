import { ScrollView, StyleSheet, useColorScheme } from 'react-native';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Text, View } from '@/components/Themed';
import { CategoryList } from '@/components/Categories/CategoryList';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Banner } from '@/components/Banner';
import { ForYou } from '@/components/ForYou';
import Colors from '@/constants/Colors';
import { Restaurants } from '@/components/Restaurants/Restaurants';
import { SpotlightCard } from '@/components/Spotlight/Spotlight';

export default function Page() {
	const colorScheme = useColorScheme();

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView
				style={styles.rootContainerscrollView}
				showsVerticalScrollIndicator={false}
			>
				<View
					style={[
						styles.container,
						{
							backgroundColor:
								colorScheme === 'light' ? Colors.lightGrey : '#000',
						},
					]}
				>
					<Banner />
					<CategoryList />

					<ForYou />
					<View
						style={[
							styles.spotlight,
							{
								borderBottomWidth: colorScheme === 'dark' ? 0.4 : undefined,
								borderBottomColor:
									colorScheme === 'dark' ? Colors.grey : undefined,
								borderTopWidth: colorScheme === 'dark' ? 0.4 : undefined,
								borderTopColor:
									colorScheme === 'dark' ? Colors.grey : undefined,
							},
						]}
					>
						<SpotlightCard />
					</View>
					<View style={[styles.vendorList]}>
						<Restaurants />
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	rootContainerscrollView: {
		flexGrow: 1,
		marginHorizontal: 6,
	},
	container: {
		gap: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},

	spotlight: {
		height: hp('38%'),
		width: '100%',
		paddingTop: 5,
	},
	vendorList: {
		paddingBottom: 5,
	},
});
