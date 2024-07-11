import { useQuery } from '@tanstack/react-query';

export function useOrders({ user_id }: { user_id: string }) {
	return useQuery({
		queryKey: [`${vendor.vendor_title}-all-items`],
		queryFn: () =>
			fetch(
				`${process.env.EXPO_PUBLIC_API_URL}/vendors/${vendor._id}/items`
			).then((res) => res.json()),
	});
}
