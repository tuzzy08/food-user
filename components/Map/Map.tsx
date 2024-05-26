import { StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { getAddressFromCoordinates } from '@/lib';
import { useBoundStore } from '@/store/store';

export function Map({
	initialCoords,
	style,
}: {
	initialCoords: { longitude: number; latitude: number };
	style: any;
}) {
	const setUserLocation = useBoundStore((state) => state.setUserLocation);
	const setCurrentAddress = useBoundStore((state) => state.setCurrentAddress);
	return (
		<MapView
			provider={PROVIDER_GOOGLE}
			initialRegion={{
				latitude: initialCoords.latitude,
				longitude: initialCoords.longitude,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421,
			}}
			style={style}
			// showsUserLocation
		>
			<Marker
				draggable
				coordinate={{
					latitude: initialCoords.latitude,
					longitude: initialCoords.longitude,
				}}
				onDragEnd={async (e) => {
					console.log(e.nativeEvent.coordinate);
					const { longitude, latitude } = e.nativeEvent.coordinate;
					setUserLocation({ latitude, longitude });
					const address = await getAddressFromCoordinates({
						latitude,
						longitude,
					});
					setCurrentAddress(address);
				}}
			/>
		</MapView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
