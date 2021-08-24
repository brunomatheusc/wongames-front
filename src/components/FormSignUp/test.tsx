import { screen } from '@testing-library/react';
import { renderWithTheme } from 'utils/test/helpers';

import FormSignUp from '.';

describe('<FormSignUp />', () => {
	it('should render the FormSignUp', () => {
		renderWithTheme(<FormSignUp />);

		expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument();
	});
});