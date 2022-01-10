import GamesTemplate, { GameTemplateProps } from "templates/Games";

import { QUERY_GAMES } from "graphql/queries/games";
import { QueryGames, QueryGamesVariables } from "graphql/generated/QueryGames";

import filterItemsMock from 'components/ExploreSidebar/mock';
import { initializeApollo } from "utils/apollo";

export default function GamesPage(props: GameTemplateProps) {
	return <GamesTemplate {...props} />;
}

export async function getStaticProps() {
	const apolloClient = initializeApollo();

	const { data } = await apolloClient.query<QueryGames, QueryGamesVariables>({
		query: QUERY_GAMES,
		variables: { limit: 15 }
	});

	return {
		props: {
			revalidate: 60,
			initialApolloState: apolloClient.cache.extract(),
			filterItems: filterItemsMock,
		}
	};
}
