import { screen } from '@testing-library/react';
import { renderWithTheme } from 'utils/test/helpers';

import GameDetails, { GameDetailsProps } from '.';

const props: GameDetailsProps = {
	developer: 'Different Tales',
	platforms: ['windows', 'linux', 'mac'],
	releaseDate: '2020-11-21T23:00:00',
	publisher: 'Walkabout',
	rating: 'BR0',
	genres: ['Role-playing', 'Narrative']
};

describe('<GameDetails />', () => {
	it('should render the blocks', () => {
		renderWithTheme(<GameDetails {...props} />);

		expect(screen.getByRole('heading', { name: /Developer/i })).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: /release date/i })).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: /platforms/i })).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: /publisher/i })).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: /rating/i })).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: /genre/i })).toBeInTheDocument();
	});

	it('should render platform icons', () => {
		renderWithTheme(<GameDetails {...props} />);

		expect(screen.getByText(/linux/i)).toBeInTheDocument();
		expect(screen.getByText(/windows/i)).toBeInTheDocument();
		expect(screen.getByText(/apple/i)).toBeInTheDocument();
	});

	it('should render the formated date', () => {
		renderWithTheme(<GameDetails {...props} />);

		const formattedDate = new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(props.releaseDate));
		expect(screen.getByText(formattedDate)).toBeInTheDocument();
	});

	it('should render free rating when BR0', () => {
		renderWithTheme(<GameDetails {...props} />);

		expect(screen.getByText(/free/i)).toBeInTheDocument();
	});

	it('should render the publisher', () => {
		renderWithTheme(<GameDetails {...props} />);

		expect(screen.getByText(props.publisher)).toBeInTheDocument();
	});

	it('should render developer', () => {
		renderWithTheme(<GameDetails {...props} />);

		expect(screen.getByText(props.developer)).toBeInTheDocument();
	});

	it('should render 18+ rating when BR18', () => {
		renderWithTheme(<GameDetails {...props} rating="BR18" />);

		expect(screen.getByText(/18\+/i)).toBeInTheDocument();
	});

	it('should render a list of genres', () => {
		renderWithTheme(<GameDetails {...props} rating="BR18" />);
		const { genres } = props;

		expect(screen.getByText(genres.join(' / '))).toBeInTheDocument();
	});
});