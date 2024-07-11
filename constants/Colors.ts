import { err } from 'react-native-svg';

const tintColorLight = '#14C458';
const tintColorDark = '#14C458';

export default {
	errorColor: '#F83E55',
	light: {
		text: '#000',
		background: '#fff',
		tint: tintColorLight,
		tabIconDefault: '#ccc',
		tabIconSelected: tintColorLight,
	},
	dark: {
		text: '#fff',
		background: '#000',
		tint: tintColorDark,
		tabIconDefault: '#ccc',
		tabIconSelected: tintColorDark,
		alt: {
			background: '#121217',
			primary: '#14C458',
			secondary: '#F83E55',
		},
	},
	// Primary #ff0000 secondary #FFA500
	primary: '#14C458',
	secondary: '#F83E55',
	grey: '#DCDCDC',
	lightGrey: '#F8F8FF',
};
