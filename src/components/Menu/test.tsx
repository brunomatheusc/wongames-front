import { fireEvent, screen } from '@testing-library/react';
import { renderWithTheme } from '../../utils/test/helpers';

import Menu from '.';

describe('<Menu />', () => {
	it('should render the Menu', () => {
		renderWithTheme(<Menu />);

		expect(screen.getByLabelText(/open menu/i)).toBeInTheDocument();
		expect(screen.getByRole('img', { name: /won games/i })).toBeInTheDocument();
		expect(screen.getByLabelText(/search/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/open shopping cart/i)).toBeInTheDocument();
	});

	it('should render the open/close mobile menu', () => {
		renderWithTheme(<Menu />);

		const fullMenuElement = screen.getByRole('navigation', { hidden: true });

		expect(fullMenuElement.getAttribute('aria-hidden')).toBe('true');
		expect(fullMenuElement).toHaveStyle({ opacity: 0 });

		fireEvent.click(screen.getByLabelText(/open menu/i));
		expect(fullMenuElement.getAttribute('aria-hidden')).toBe('false');
		expect(fullMenuElement).toHaveStyle({ opacity: 1 });

		fireEvent.click(screen.getByLabelText(/close menu/i));
		expect(fullMenuElement.getAttribute('aria-hidden')).toBe('true');
		expect(fullMenuElement).toHaveStyle({ opacity: 0 });
	});

	it('should show register box when logged out', () => {
		renderWithTheme(<Menu />);

		expect(screen.getByText(/login now/i)).toBeInTheDocument();
		expect(screen.getByText(/sign up/i)).toBeInTheDocument();
	});

	it('should show wishlist and account when logged in', () => {
		renderWithTheme(<Menu username="bruno" />);

		expect(screen.getByText(/my account/i)).toBeInTheDocument();
		expect(screen.getByText(/wishlist/i)).toBeInTheDocument();
		expect(screen.queryByText(/login now/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/sign up/i)).not.toBeInTheDocument();
	});
});