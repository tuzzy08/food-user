import { useQuery } from '@tanstack/react-query';

export function useOrders(user_id: string) {
	return useQuery({
		queryKey: [`${user_id}-all-orders`],
		queryFn: () =>
			fetch(`${process.env.EXPO_PUBLIC_API_URL}/orders/${user_id}`).then(
				(res) => res.json()
			),
	});
}
