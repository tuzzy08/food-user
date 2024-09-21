type Coordinates = { latitude: number; longitude: number };

export async function getAddressFromCoordinates(
	coordinates: Coordinates,
	options?: any
) {
	let result;
	const google_map_api_url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.latitude},${coordinates.longitude}&location_type=ROOFTOP&result_type=street_address&key=${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}`;
	try {
		const response = await fetch(google_map_api_url);
		if (!response.ok) {
			throw new Error('Network error: Failed to fetch address');
		}
		const json = await response.json();
		if (json.status === 'ZERO_RESULTS') {
			throw new Error('No results found');
		}
		result = json.results[0].formatted_address;
	} catch (error) {
		console.error(error);
	}
	return result;
}

export function wrapString(input: string): string {
	const maxLength = 25;
	if (input && input.length > maxLength) {
		return input.substring(0, maxLength - 3) + '..';
	}
	return input;
}
