import { NextPage } from "next";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { BlogReducers } from "../store/reducers";
import "../styles/globals.css";

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
	const store = createStore(BlogReducers.reduceBlog, composeWithDevTools(applyMiddleware()));

	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
};

export default MyApp;
