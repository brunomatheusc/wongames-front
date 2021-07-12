import Link from 'next/link';
import { Email, Lock } from '@styled-icons/material-outlined';
import Button from 'components/Button';
import TextField from 'components/TextField';
import * as S from './styles';

export default function FormSignIn() {
	return (
		<S.Wrapper>
            <form action="">
				<TextField name="email" placeholder="Email" type="email" icon={<Email />} />
				<TextField name="password" placeholder="password" type="password" icon={<Lock />} />

				<S.ForgotPassword>Forgot your password?</S.ForgotPassword>

				<Button size="large" fullWidth>Sign in now</Button>

				<S.FormLink>
					Don't have an account? <Link href="/sign-up"><a>Sign up</a></Link>
				</S.FormLink>
			</form>
		</S.Wrapper>
	);
};