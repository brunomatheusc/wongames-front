import '../../../.jest/match-media-mock';
import { screen } from '@testing-library/react';
import { renderWithTheme } from 'utils/test/helpers';

import highlightMock from 'components/Highlight/mock';
import gamesMock from 'components/GameCardSlider/mock';

import Showcase from '.';

const props = {
	title: 'Most popular',
	highlight: highlightMock,
	games: gamesMock.slice(0, 1),
};

describe('<Showcase />', () => {
	it('should render full showcase', () => {
		renderWithTheme(<Showcase { ...props } />);

		expect(screen.getByRole('heading', { name: /most popular/i })).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: highlightMock.title })).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: gamesMock[0].title })).toBeInTheDocument();
	});

	it('should render without title', () => {
		renderWithTheme(<Showcase games={props.games} highlight={props.highlight} />);

		expect(screen.getByRole('heading', { name: highlightMock.title })).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: gamesMock[0].title })).toBeInTheDocument();
		expect(screen.queryByRole('heading', { name: /most popular/i })).not.toBeInTheDocument();
	});

	it('should render without highlight', () => {
		renderWithTheme(<Showcase games={props.games} title={props.title} />);

		expect(screen.getByRole('heading', { name: /most popular/i })).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: gamesMock[0].title })).toBeInTheDocument();
		expect(screen.queryByRole('heading', { name: highlightMock.title })).not.toBeInTheDocument();
	});

	it('should render without games', () => {
		renderWithTheme(<Showcase highlight={props.highlight} title={props.title} />);

		expect(screen.getByRole('heading', { name: /most popular/i })).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: highlightMock.title })).toBeInTheDocument();
		expect(screen.queryByRole('heading', { name: gamesMock[0].title })).not.toBeInTheDocument();
	});
});