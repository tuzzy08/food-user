import { useQuery } from '@tanstack/react-query';

export type Vendor_Data = {
	_id: string;
	vendor_title: string;
	vendor_logo_url: string;
	vendor_email: string;
	vendor_contact_phone: string;
	vendor_address: string;
	_geoloc: { lat: number; lng: number };
	vendor_min_price: number;
	vendor_categories: [any];
	vendor_items: [any];
	vendor_isVerified: boolean;
	vendor_isActive: boolean;
	vendor_isOpen: boolean;
	vendor_rating: number;
};

export function useForYouVendors(
	lat: number | undefined,
	lng: number | undefined
) {
	// if (!lat || !lng) throw new Error('Missing location information!');

	const QUERY_KEY = `vendors-for-you-${lat}-${lng}`;
	const API_ENDPOINT = `${process.env.EXPO_PUBLIC_API_URL}/vendors/closest?lat=${lat}&lng=${lng}`;

	return useQuery<Vendor_Data[]>({
		queryKey: [QUERY_KEY],
		queryFn: () => fetch(API_ENDPOINT).then((res) => res.json()),
	});
}
