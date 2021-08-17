import { Divider } from 'components/Divider';
import Gallery, { GalleryImageProps } from 'components/Gallery';
import { GameCardProps } from 'components/GameCard';
import GameDetails, { GameDetailsProps } from 'components/GameDetails';
import GameInfo, { GameInfoProps } from 'components/GameInfo';
import { HighlightProps } from 'components/Highlight';
import Showcase from 'components/Showcase';
import TextContent from 'components/TextContent';
import Base from 'templates/Base';

import * as S from './styles';

export type GameTemplateProps = {
	cover: string;
	gameInfo: GameInfoProps;
	gallery?: GalleryImageProps[];
	description: string;
	details: GameDetailsProps;
	upcomingGames: GameCardProps[];
	upcomingHighlight: HighlightProps;
	recommendedGames: GameCardProps[];
};

export default function Game({ cover, gameInfo, gallery, description, details, upcomingGames: upcommingGames, upcomingHighlight: upcommingHighlight, recommendedGames }: GameTemplateProps) {
	return (
		<Base>
            <S.Cover src={cover} role="image" aria-label="cover" />

			<S.Main>
				<S.SectionGameInfo>
					<GameInfo {...gameInfo} />
				</S.SectionGameInfo>

				<S.SectionGallery>
					{ gallery && <Gallery items={gallery} />}
				</S.SectionGallery>

				<S.SectionDescription>
					<TextContent title="Description" content={description} />
				</S.SectionDescription>

				<S.SectionGameDetails>
					<GameDetails {...details} />

					<Divider />
				</S.SectionGameDetails>

				<Showcase title="Upcoming" games={upcommingGames} highlight={upcommingHighlight} />

				<Showcase title="You may like these games" games={recommendedGames} />
			</S.Main>
		</Base>
	);
};