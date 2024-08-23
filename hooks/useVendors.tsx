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

const QUERY_KEY = 'all-vendors';
const API_ENDPOINT = `${process.env.EXPO_PUBLIC_API_URL_DEV}/vendors`;

export function useVendors() {
	return useQuery<Vendor_Data[]>({
		queryKey: [QUERY_KEY],
		queryFn: () => fetch(API_ENDPOINT).then((res) => res.json()),
	});
}
