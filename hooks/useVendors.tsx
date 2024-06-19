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

export async function useVendors(): Promise<Vendor_Data[]> {
	let vendors;
	try {
		const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/vendors`);
		vendors = await res.json();
	} catch (error) {
		console.log('request error', error);
	}
	return vendors;
}
