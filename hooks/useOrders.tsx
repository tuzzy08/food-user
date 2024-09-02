import { useQuery } from '@tanstack/react-query';

export function useOrders(user_id: string, options: Record<string, any>) {
	const QUERY_KEY = `${user_id}-all-orders`;
	const API_ENDPOINT = `${process.env.EXPO_PUBLIC_API_URL_DEV}/orders/${user_id}`;
	return useQuery({
		queryKey: [QUERY_KEY],
		queryFn: () => fetch(API_ENDPOINT).then((res) => res.json()),
		...options,
	});
}
