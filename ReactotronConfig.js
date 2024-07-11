import Reactotron, { asyncStorage } from 'reactotron-react-native';
import {
	QueryClientManager,
	reactotronReactQuery,
} from 'reactotron-react-query';
import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();
const queryClientManager = new QueryClientManager({
	// @ts-ignore
	queryClient,
});

Reactotron.use(reactotronReactQuery(queryClientManager))
	.configure({
		onDisconnect: () => {
			queryClientManager.unsubscribe();
		},
	})
	.use(asyncStorage())
	.useReactNative()
	.connect();

// Reactotron.configure() // controls connection & communication settings
// 	.use(asyncStorage()) // for react native async storage
// 	.useReactNative() // add all built-in react native plugins
// 	.connect(); // let's connect!
