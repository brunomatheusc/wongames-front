import { Fragment } from 'react';
import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import Heading from 'components/Heading';
import Radio from 'components/Radio';

import * as S from './styles';

export type ItemProps = {
	title: string;
	name: string;
	type: 'checkbox' | 'radio';
	fields: Field[];
}

type Field = {
	label: string;
	name: string;
}

export type ExploreSidebarProps = {
	items: ItemProps[];
}

export default function ExploreSidebar({ items }: ExploreSidebarProps) {
	return (
		<S.Wrapper>
			{ items.map((item) => (
			<Fragment key={item.title}>
				<Heading lineBottom lineColor="secondary" size="small">{item.title}</Heading>

				{item.type === 'checkbox' && (
					item.fields.map((field) => <Checkbox key={field.name} name={field.name} label={field.label} labelFor={field.name} />)
				)}

				{item.type === 'radio' && (
					item.fields.map((field) => <Radio key={field.name} id={field.name} name={item.name} label={field.label} labelFor={field.name} value={field.name} />)
				)}
			</Fragment>
			))}

			<Button fullWidth size="medium">Filter</Button>
		</S.Wrapper>
	);
};