import { Suspense } from 'react';
import {
	ScrollView,
	StyleSheet,
	useColorScheme,
	Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Text, View } from '@/components/Themed';
import { CategoryList } from '@/components/Categories/CategoryList';
import { Banner } from '@/components/Banner';
import { ForYou } from '@/components/ForYou';
import Colors from '@/constants/Colors';
import data from '@/components/ForYou/data';
import { VendorCard } from '@/components/VendorCard';
import { Restaurants } from '@/components/Restaurants/Restaurants';
import { SpotlightCard } from '@/components/Spotlight/Spotlight';
import { ForYouSkeleton } from '@/components/ForYou/ForYouSkeleton';
import { CategoriesSkeleton } from '@/components/Categories/CategoriesSkeleton';
import { SpotlightSkeleton } from '@/components/Spotlight/SpotlightSkeleton';

export default function Page() {
	const colorScheme = useColorScheme();

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView
				contentContainerStyle={styles.scrollView}
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
					<View style={{ marginTop: -4 }}>
						<CategoryList />
					</View>
					<View style={styles.banner}>
						<Banner />
					</View>
					<View style={styles.foryouContainer}>
						<Text style={styles.HeaderText}>For You</Text>
						<ForYou />
					</View>
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
						<Text style={styles.HeaderText}>Spotlight</Text>
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
	scrollView: {
		flexGrow: 1,
		paddingTop: 5,
	},
	container: { flex: 1, marginLeft: 5 },
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	banner: {
		alignItems: 'center',
		marginTop: -35,
		paddingBottom: 20,
	},
	foryouContainer: {
		marginTop: 15,
		paddingVertical: 10,
		paddingLeft: 10,
	},
	HeaderText: {
		fontSize: 16,
		fontWeight: '600',
	},
	spotlight: {
		height: hp('38%'),
		width: '100%',
		marginTop: 15,
		padding: 8,
		gap: 15,
	},
	vendorList: {
		flex: 1,
		marginTop: 15,
		paddingTop: 30,
		paddingBottom: 5,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
