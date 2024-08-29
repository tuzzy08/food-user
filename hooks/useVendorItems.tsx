import { ItemFromAPI } from '@/store/store';
import { useQuery } from '@tanstack/react-query';

export function useVendorItems(vendor_id: string) {
	const QUERY_KEY = `${vendor_id}-all-items`;
	const API_ENDPOINT = `${process.env.EXPO_PUBLIC_API_URL_DEV}/vendors/${vendor_id}/items`;
	return useQuery<ItemFromAPI[]>({
		queryKey: [QUERY_KEY],
		queryFn: () => fetch(API_ENDPOINT).then((res) => res.json()),
	});
}
