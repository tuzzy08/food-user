import {
	ScrollView,
	StyleSheet,
	useColorScheme,
	StatusBar,
} from 'react-native';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { View } from '@/components/Themed';
import { CategoryList } from '@/components/Categories/CategoryList';
import { Banner } from '@/components/Banner';
import { ForYou } from '@/components/ForYou';
import Colors from '@/constants/Colors';
import { Restaurants } from '@/components/Restaurants/Restaurants';
import { SpotlightCard } from '@/components/Spotlight/Spotlight';

export default function Page() {
	const colorScheme = useColorScheme();

	return (
		<>
			<StatusBar
				backgroundColor={
					colorScheme === 'light'
						? Colors.light.background
						: Colors.dark.background
				}
			/>
			<ScrollView
				style={[
					styles.rootContainerscrollView,
					{
						backgroundColor:
							colorScheme === 'light' ? Colors.light.mainBackGround : '#000',
					},
				]}
				showsVerticalScrollIndicator={false}
			>
				<View
					style={[
						styles.container,
						{
							backgroundColor:
								colorScheme === 'light' ? Colors.light.mainBackGround : '#000',
						},
					]}
				>
					<TopSection />
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
		</>
	);
}

function TopSection() {
	return (
		<View style={styles.topSection}>
			<Banner />
			<CategoryList />
		</View>
	);
}
const styles = StyleSheet.create({
	rootContainerscrollView: {
		flexGrow: 1,
	},
	container: {
		gap: 10,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	spotlight: {
		height: hp('38%'),
		width: '100%',
		paddingTop: 5,
		alignItems: 'center',
	},
	vendorList: {
		paddingBottom: 5,
	},
	topSection: {
		// marginTop: 10,
		gap: 30,
		paddingVertical: 15,
		alignItems: 'center',
	},
});
