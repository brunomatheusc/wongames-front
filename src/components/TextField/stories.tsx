import { Story, Meta } from '@storybook/react/types-6-0';
import { Email } from '@styled-icons/material-outlined';
import TextField, { TextFieldProps } from '.';

export default {
	title: 'TextField',
	component: TextField,
	args: {
		label: 'E-mail',
		name: 'Email',
		icon: <Email />,
		initialValue: '',
		placeholder: 'jonh.doe@gmail.com'
	},
	argTypes: {
		onInput: { action: 'changed' },
		icon: { type: '' }
	}
} as Meta;

export const Default: Story<TextFieldProps> = (args) => (
	<div style={{ maxWidth: 300, padding: 15 }}>
		<TextField {...args}/>
	</div>
);