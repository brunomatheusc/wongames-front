import { AppProps} from 'next/app';
import { Provider as AuthProvider } from 'next-auth/client';
import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';

import { DefaultSeo } from 'next-seo';
import SEO from '../../next-seo.config';

import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'styled-components';
import { CartProvider } from 'hooks/use-cart';
import { WishlistProvider } from 'hooks/use-wishlist';

import { useApollo } from 'utils/apollo';

import Global from 'styles/global';
import theme from 'styles/theme';

export default function App({ Component, pageProps }: AppProps) {
	const client = useApollo(pageProps.initialApolloState, pageProps.session);

	return (
		<AuthProvider session={pageProps.session}>
			<ApolloProvider client={client}>
				<ThemeProvider theme={theme}>
					<CartProvider>
						<WishlistProvider>
							<Head>
								<title>Won Games</title>
								<link rel="shortcut icon" href="/img/icon-512.png" />
								<link rel="apple-touch-icon" href="/img/icon-512.png" />
								<link rel="manifest" href="/manifest.json"/>

								<meta name="description" content="The Best Game Store in the World" />
							</Head>

							<DefaultSeo {...SEO} />

							<Global />

							<NextNProgress color="#f231a5" startPosition={0.3} stopDelayMs={200} height={3} />

							<Component {...pageProps} />
						</WishlistProvider>
					</CartProvider>
				</ThemeProvider>
			</ApolloProvider>
		</AuthProvider>
	);
}