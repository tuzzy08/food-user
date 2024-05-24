import { StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

export function Map({
	initialCoords,
	style,
}: {
	initialCoords: { longitude: number; latitude: number };
	style: any;
}) {
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
				onDragEnd={(e) => console.log(e.nativeEvent.coordinate)}
			/>
		</MapView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
