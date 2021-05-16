import * as S from './styles';
import { MdShoppingCart as ShoppingCartIcon, MdSearch as SearchIcon } from 'react-icons/md';
import { RiMenu2Fill as MenuIcon } from 'react-icons/ri';

import Logo from '../../components/Logo';

export default function Menu() {
	return (
		<S.Wrapper>
			<S.IconWrapper>
				<MenuIcon aria-label="Open menu" />
			</S.IconWrapper>

			<S.LogoWrapper>
				<Logo hideOnMobile />
			</S.LogoWrapper>

			<S.MenuGroup>
				<S.IconWrapper>
					<SearchIcon aria-label="Search" />
				</S.IconWrapper>

				<S.IconWrapper>
					<ShoppingCartIcon aria-label="Open Shopping Cart" />
				</S.IconWrapper>
			</S.MenuGroup>
		</S.Wrapper>
	);
};