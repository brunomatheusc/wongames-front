import { render, screen } from '@testing-library/react';
import { renderWithTheme } from 'utils/test/helpers';

import Banner from '.';

const props = {
	img: 'https://source.unsplash.com/user/willianjusten/1042x580',
	title: 'Defy death',
	subtitle: '<p>Play the new <strong>CrashLands</strong> season</p>',
	buttonLabel: 'Buy now',
	buttonLink: '/games/defy-death',
};

describe('<Banner />', () => {
	it('should render the Banner', () => {
		renderWithTheme(<Banner {...props} />);

		expect(screen.getByRole('heading', { name: /Defy death/i })).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: /play the new/i })).toBeInTheDocument();
		expect(screen.getByRole('img', { name: /Defy death/i })).toBeInTheDocument();
	});
});