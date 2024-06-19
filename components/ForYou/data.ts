const images = {
	mGardens: require('@/assets/images/vendors/m_gardens/m_logo.jpg'),
	shawarma_rpblk: require('@/assets/images/vendors/shawarma_rpblk/logo.png'),
	chicken_rpblk: require('@/assets/images/vendors/chicken_rpblk/logo.jpg'),
	food_palace: require('@/assets/images/vendors/food_palace/logo.jpg'),
	genesis: require('@/assets/images/vendors/genesis/logo.jpg'),
	cafe33: require('@/assets/images/vendors/cafe33/logo.jpg'),
	coldstone: require('@/assets/images/vendors/cold_stone/logo.jpeg'),
	pinkberry: require('@/assets/images/vendors/pinkberry/logo.jpg'),
	sugarcane: require('@/assets/images/vendors/sugarcane/logo.jpg'),
	amala: require('@/assets/images/vendors/amala_hqtrs/logo.jpg'),
	vineyard_juicebar: require('@/assets/images/vendors/juice_bar/logo.jpeg'),
};

type Data = {
	id: number;
	title: string;
	imgUrl: number;
	href: string;
	rating: number;
	startingPrice: number;
};

type Vendor_Data = {
	_id: string;
	vendor_payout_bank_name: string;
	vendor_payout_account_number: string;
	vendor_title: string;
	vendor_logo_url: string;
	vendor_email: string;
	vendor_contact_phone: string;
	vendor_address: string;
	_geoloc: any;
	vendor_categories: any;
	vendor_items: any;
	vendor_isVerified: boolean;
	vendor_isActive: boolean;
	vendor_isOpen: boolean;
};

const data: Data[] = [
	{
		id: 1,
		title: 'Michael Gardens',
		imgUrl: images.mGardens,
		href: '',
		rating: 3,
		startingPrice: 300,
	},
	{
		id: 2,
		title: 'Shawarma Republik - YKC Woji',
		imgUrl: images.shawarma_rpblk,
		href: '',
		rating: 4,
		startingPrice: 500,
	},
	{
		id: 3,
		title: 'Chicken Republic - Woji',
		imgUrl: images.chicken_rpblk,
		href: '',
		rating: 2.5,
		startingPrice: 350,
	},
	{
		id: 4,
		title: 'Food Palace',
		imgUrl: images.food_palace,
		href: '',
		rating: 3,
		startingPrice: 500,
	},
	{
		id: 5,
		title: 'Genesis Restaurant - GRA',
		imgUrl: images.genesis,
		href: '',
		rating: 4,
		startingPrice: 600,
	},
	{
		id: 6,
		title: 'Cafe33 Powered by iphy',
		imgUrl: images.cafe33,
		href: '',
		rating: 3.5,
		startingPrice: 400,
	},
	{
		id: 7,
		title: 'Cold Stone Creamery - Peter Odili',
		imgUrl: images.coldstone,
		href: '',
		rating: 4.5,
		startingPrice: 1000,
	},
	{
		id: 8,
		title: 'Pinkberry - GRA',
		imgUrl: images.pinkberry,
		href: '',
		rating: 4,
		startingPrice: 1300,
	},
	{
		id: 9,
		title: 'Sugarcane continental / Calabar Kitchen',
		imgUrl: images.sugarcane,
		href: '',
		rating: 3.5,
		startingPrice: 350,
	},
	{
		id: 10,
		title: 'Amala HeadQuarters - GRA',
		imgUrl: images.amala,
		href: '',
		rating: 4,
		startingPrice: 400,
	},
	{
		id: 11,
		title: 'Vineyard Juice Bar',
		imgUrl: images.vineyard_juicebar,
		href: '',
		rating: 3.5,
		startingPrice: 200,
	},
	{
		id: 12,
		title: 'Genesis Restaurant Rumuomasi',
		imgUrl: images.genesis,
		href: '',
		rating: 3.5,
		startingPrice: 200,
	},
];

export default data;
