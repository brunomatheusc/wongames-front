import { tint } from 'polished';
import styled, { css } from 'styled-components';

import * as ButtonStyles from 'components/Button/styles';

export const Wrapper = styled.div``;

export const Body = styled.div`
	${({ theme }) => css`
		padding: ${theme.spacings.small};
		background: ${theme.colors.white};
	`}
`;

export const Footer = styled.div`
	${({ theme }) => css`
		display: flex;
		align-items: center;

		padding: ${theme.spacings.small};

		background: ${tint(0.2, theme.colors.lightGray)};
		color: ${theme.colors.black};

		font-weight: ${theme.font.bold};

		${ButtonStyles.Wrapper} {
			padding-left: ${theme.spacings.xxsmall};
			padding-right: ${theme.spacings.xxsmall};
			outline: 0;
		}
	`}
`;