import { ScrollView, StyleSheet, useColorScheme } from 'react-native';
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

export default function Page() {
	const colorScheme = useColorScheme();
	const spotlight = getRandomItem(data);
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView
				contentContainerStyle={styles.scrollView}
				showsVerticalScrollIndicator={false}
			>
				{/* Root View */}
				<View
					style={[
						styles.container,
						{
							backgroundColor:
								colorScheme === 'light' ? Colors.lightGrey : '#000',
						},
					]}
				>
					{/* Categories */}
					<View style={{ marginTop: -4 }}>
						<CategoryList />
					</View>
					{/* Ad Banner */}
					<View style={styles.banner}>
						<Banner />
					</View>
					<View style={styles.foryouContainer}>
						{/* <View style={styles.foryou}> */}
						<Text style={styles.HeaderText}>For You</Text>
						<ForYou />
					</View>
					{/* Spotlight */}
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
						<VendorCard
							item={spotlight}
							style={{
								width: '80%',
								height: '95%',
							}}
						/>
					</View>
					{/* Restaurant List */}
					<View style={styles.vendorList}>
						<Restaurants />
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

function getRandomItem(array: typeof data) {
	const randomIndex = Math.floor(Math.random() * array.length);
	return array[randomIndex];
}

const styles = StyleSheet.create({
	scrollView: {
		flexGrow: 1,
	},
	container: { flex: 1 },
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
		// /borderColor: 'blue',
		// bor/derWidth: 0.5,
		paddingVertical: 10,
		paddingLeft: 10,
		gap: 10,
	},
	foryou: {},
	HeaderText: {
		fontSize: 16,
		fontWeight: '600',
	},
	spotlight: {
		// borderWidth: 0.5,
		// borderColor: 'green',
		height: hp('40%'),
		width: '100%',
		marginTop: 15,
		padding: 10,
		gap: 15,
	},
	vendorList: {
		// flex: 1,
		marginTop: 15,
		// borderWidth: 0.5,
		// borderColor: 'white',
		width: '100%',
		paddingHorizontal: 20,
		paddingTop: 30,
	},
});
