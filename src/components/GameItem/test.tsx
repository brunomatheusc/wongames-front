import { render, screen } from 'utils/test-utils';

import GameItem, { GameItemProps, PaymentInfoProps } from '.';

const props: GameItemProps = {
	id: '1',
	img: 'https://source.unsplash.com/user/willianjusten/151x70',
	title: 'Red Dead Redemption 2',
	price: 'R$ 215,00',
}

describe('<GameItem />', () => {
	it('should render the GameItem', () => {
		render(<GameItem {...props} />);

		expect(screen.getByRole('heading', { name: props.title })).toBeInTheDocument();
		expect(screen.getByRole('img')).toHaveAttribute('src', props.img);
		expect(screen.getByText(props.price)).toBeInTheDocument();
	});

	it('should render the item with download link', () => {
		const downloadLink = 'https://link';

		render(<GameItem {...props} downloadLink={downloadLink} />);

		expect(screen.getByRole('link', { name: `Get ${props.title} here`})).toHaveAttribute('href', downloadLink);
	});

	it('should render payment info', () => {
		const paymentInfo: PaymentInfoProps = {
			flag: 'mastercard',
			img:'/img/cards/mastercard.png',
			number: '**** **** **** 4236',
			purchaseDate: 'Purchase made on 07/20/2020 at 8:32',
		};

		render(<GameItem {...props} paymentInfo={paymentInfo} />);

		expect(screen.getByRole('img', { name: paymentInfo.flag! })).toHaveAttribute('src', paymentInfo.img);
		expect(screen.getByText(paymentInfo.number)).toBeInTheDocument();
		expect(screen.getByText(paymentInfo.purchaseDate)).toBeInTheDocument();
	});

	it('should render freem game when there is no payment info', () => {
		const paymentInfo: PaymentInfoProps = {
			flag: null,
			img: null,
			number: 'Free Game',
			purchaseDate: 'Purchase made on 07/20/2020 at 8:32',
		};

		render(<GameItem {...props} paymentInfo={paymentInfo} />);

		expect(screen.getByText(/free game/i)).toBeInTheDocument();
	});
});