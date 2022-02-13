import { ReactNode } from 'react';
import Link from 'next/link';
import { Favorite, FavoriteBorder } from '@styled-icons/material-outlined';

import Ribbon, { RibbonColors, RibbonSizes } from 'components/Ribbon';
import CartButton from 'components/CartButton';

import formatPrice from 'utils/format-price';

import * as S from './styles';

export type GameCardProps = {
	id: string;
	slug: string;
	title: string;
	developer: string;
	img: string;
	price: number;
	promotionalPrice?: number;
	favorite?: boolean;
	onFav?: () => void;
	ribbon?: ReactNode;
	ribbonSize?: RibbonSizes;
	ribbonColor?: RibbonColors;
};

export default function GameCard({ id, title, slug, developer, img, price, promotionalPrice, favorite = false, onFav, ribbon, ribbonSize, ribbonColor }: GameCardProps) {
	return (
		<S.Wrapper>
			{ !!ribbon && <Ribbon color={ribbonColor} size={ribbonSize}>{ ribbon}</Ribbon>}

			<Link href={`/game/${slug}`} passHref>
				<S.ImageBox>
					<img src={img} alt={title} />
				</S.ImageBox>
			</Link>

			<S.Content>
				<Link href={`/game/${slug}`} passHref>
					<S.Info>
						<S.Title>{title}</S.Title>
						<S.Developer>{developer}</S.Developer>
					</S.Info>
				</Link>

				<S.FavButton role="button" onClick={onFav}>
					{ favorite ?
						<Favorite aria-label="Remove from Wishlist" /> :
						<FavoriteBorder aria-label="Add to Wishlist" />
					}
				</S.FavButton>

				<S.BuyBox>
					{ !!promotionalPrice && <S.Price isPromotional>{ formatPrice(price) }</S.Price>}
					<S.Price>{formatPrice(promotionalPrice || price)}</S.Price>

					<CartButton id={id} />
				</S.BuyBox>
			</S.Content>
		</S.Wrapper>
	);
};