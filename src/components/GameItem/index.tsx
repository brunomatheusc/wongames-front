import { useCart } from 'hooks/use-cart';
import { MdFileDownload } from 'react-icons/md';
import * as S from './styles';

export type PaymentInfoProps = {
	number: string;
	flag: string | null;
	img: string | null;
	purchaseDate: string;
}

export type GameItemProps = {
	id: string;
	img: string;
	title: string;
	price: string;
	downloadLink?: string;
	paymentInfo?: PaymentInfoProps;
}

export default function GameItem({ id, img, title, price, downloadLink, paymentInfo }: GameItemProps) {
	const { isInCart, removeFromCart } = useCart();

	return (
		<S.Wrapper>
            <S.GameContent>
				<S.ImageBox>
					<img src={img} alt="" />
				</S.ImageBox>

				<S.Content>
					<S.Title>
						{title}

						{!!downloadLink &&
						<S.DownloadLink href={downloadLink} target="_blank" aria-label={`Get ${title} here`}>
							<MdFileDownload size={22} />
						</S.DownloadLink>}
					</S.Title>

					<S.Group>
						<S.Price>{price}</S.Price>

						{ isInCart(id) && (
							<S.Remove onClick={() => removeFromCart(id)}>Remove</S.Remove>
						)}
					</S.Group>

				</S.Content>
			</S.GameContent>

			{ !!paymentInfo && (
			<S.PaymentContent>
				<div>{ paymentInfo.purchaseDate}</div>

				<S.CardInfo>
					<span>{paymentInfo.number}</span>
					{!!paymentInfo.img && !!paymentInfo.flag && <img src={paymentInfo.img} alt={paymentInfo.flag} />}
				</S.CardInfo>
			</S.PaymentContent>
			)}
		</S.Wrapper>
	);
};