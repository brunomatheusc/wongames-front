import { AddShoppingCart, RemoveShoppingCart } from "@styled-icons/material-outlined";
import Button, { ButtonProps } from "components/Button";
import { useCart } from "hooks/use-cart";

export type CartButtonProps = {
	id: string;
	hasText?: boolean;
} & Pick<ButtonProps, 'size'>;

export default function CartButton({ id, size = 'small', hasText = false }: CartButtonProps) {
	const { isInCart, addToCart, removeFromCart } = useCart();
	const ButtonText = isInCart(id) ? 'Remove from cart' : 'Add to cart';

	return (
		<Button
			icon={isInCart(id)
				? <RemoveShoppingCart aria-label="Remove from cart" />
				: <AddShoppingCart aria-label="Add to cart" />
			}
			size="small"
			onClick={() => (isInCart(id) ? removeFromCart(id) : addToCart(id))}
		>
			{ hasText && ButtonText}
		</Button>
	);
}