import '../../../.jest/match-media-mock';
import { fireEvent, screen } from '@testing-library/react';

import Gallery from '.';
import { renderWithTheme } from 'utils/test/helpers';

import items from './mock';

describe('<Gallery />', () => {
	it('should render thumbnails as buttons', () => {
		const mockItems = items.slice(0, 2);
		renderWithTheme(<Gallery items={mockItems} />);

		expect(screen.getByRole('button', { name: `Thumb - ${mockItems[0].label}` })).toHaveAttribute('src', mockItems[0].src);
		expect(screen.getByRole('button', { name: `Thumb - ${mockItems[1].label}` })).toHaveAttribute('src', mockItems[1].src);
	});

	it('should handle open modal', () => {
		const mockItems = items.slice(0, 2);
		renderWithTheme(<Gallery items={mockItems} />);

		const modal = screen.getByLabelText('modal');

		expect(modal.getAttribute('aria-hidden')).toBe('true');
		expect(modal).toHaveStyle({ opacity: 0 });

		fireEvent.click(screen.getByRole('button', { name: `Thumb - ${mockItems[0].label}` }));
		expect(modal.getAttribute('aria-hidden')).toBe('false');
		expect(modal).toHaveStyle({ opacity: 1 });
	});

	it('should open modal with selected image', async () => {
		const mockItems = items.slice(0, 2);
		renderWithTheme(<Gallery items={mockItems} />);

		fireEvent.click(screen.getByRole('button', { name: `Thumb - ${mockItems[1].label}` }));

		const img = await screen.findByRole('img', { name: mockItems[1].label });
		expect(img.parentElement?.parentElement).toHaveClass('slick-active');
	});

	it('should handle close modal when overlay or button click', () => {
		const mockItems = items.slice(0, 2);
		renderWithTheme(<Gallery items={mockItems} />);

		const modal = screen.getByLabelText('modal');

		fireEvent.click(screen.getByRole('button', { name: `Thumb - ${mockItems[0].label}` }));
		expect(modal.getAttribute('aria-hidden')).toBe('false');
		expect(modal).toHaveStyle({ opacity: 1 });

		fireEvent.click(screen.getByRole('button', { name: /close modal/i }));
		expect(modal.getAttribute('aria-hidden')).toBe('true');
		expect(modal).toHaveStyle({ opacity: 0 });
	});

	it('should handle close modal when esc button is pressed', () => {
		const mockItems = items.slice(0, 2);
		const { container } = renderWithTheme(<Gallery items={mockItems} />);

		const modal = screen.getByLabelText('modal');

		fireEvent.click(screen.getByRole('button', { name: `Thumb - ${mockItems[0].label}` }));

		fireEvent.keyUp(container, { key: 'Escape' });

		expect(modal.getAttribute('aria-hidden')).toBe('true');
		expect(modal).toHaveStyle({ opacity: 0 });
	});
});