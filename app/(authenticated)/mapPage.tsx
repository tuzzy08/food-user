import { StyleSheet, Text, View } from 'react-native';
import { Map } from '@/components/Map';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useBoundStore } from '@/store/store';

export default function Page() {
	const userLocation = useBoundStore((state) => state.userLocation);
	const setUserLocation = useBoundStore((state) => state.setUserLocation);

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				// setErrorMsg('Permission to access location was denied');
				return;
			}

			// Get User's current location
			let {
				coords: { longitude, latitude },
			} = await Location.getCurrentPositionAsync({});

			setUserLocation({ longitude, latitude });
			/**
			 * ! This call is billed on google, use Sparingly or use the MapBox API in development.
			 */
			// Get Address from location
			// const address = await getAddressFromCoordinates(location);
		})();
	}, []);
	return (
		<View style={styles.container}>
			<Map initialCoords={userLocation} style={styles.mapView} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	mapView: {
		height: hp('100%'),
		width: wp('100%'),
	},
});
