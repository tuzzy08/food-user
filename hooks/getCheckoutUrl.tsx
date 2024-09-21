import { ItemsToOrder } from '@/store/store';

const CHECKOUT_URL = `${process.env.EXPO_PUBLIC_API_URL}/orders/checkout`;
type ResponseType = {
	status: boolean;
	message: string;
	data: {
		authorization_url: string;
		access_code: string;
		reference: string;
	};
};

export async function getCheckoutUrl(
	cart: ItemsToOrder,
	order_total: number
): Promise<ResponseType> {
	const payload = JSON.stringify({ ...cart, order_total });
	const response = await fetch(CHECKOUT_URL, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: payload,
	});
	const result = await response.json();
	return result;
}
