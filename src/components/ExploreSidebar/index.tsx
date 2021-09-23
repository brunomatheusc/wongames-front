import { useState } from 'react';
import { Close, FilterList } from '@styled-icons/material-outlined';

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

type Values = {
	[field: string]: boolean | string;
}

export type ExploreSidebarProps = {
	items: ItemProps[];
	initialValues?: Values;
	onFilter: (values: Values) => void;
}

export default function ExploreSidebar({ items, initialValues = {}, onFilter }: ExploreSidebarProps) {
	const [values, setValues] = useState(initialValues);
	const [isOpen, setIsOpen] = useState(false);

	function handleFilter() {
		onFilter(values);
		setIsOpen(false);
	}

	function handleChangeValues(name: string, value: boolean | string) {
		console.log({name, value});
		setValues((s) => ({...s, [name]: value}));
	}

	return (
		<S.Wrapper isOpen={isOpen}>
			<S.Overlay aria-hidden={isOpen} />

			<S.IconWrapper>
				<FilterList aria-label="open filters" onClick={() => setIsOpen(true) } />
				<Close aria-label="close filters" onClick={() => setIsOpen(false)} />
			</S.IconWrapper>

			<S.Content>
			{ items.map((item) => (
				<S.Items>
					<Heading lineBottom lineColor="secondary" size="small">{item.title}</Heading>

					{item.type === 'checkbox' && (
						item.fields.map((field) =>
						<Checkbox
							key={field.name}
							name={field.name}
							label={field.label}
							labelFor={field.name}
							isChecked={!!values[field.name]}
							onCheck={(v) => handleChangeValues(field.name, v)}
						/>)
					)}

					{item.type === 'radio' && (
						item.fields.map((field) =>
							<Radio
								key={field.name}
								id={field.name}
								name={item.name}
								label={field.label}
								labelFor={field.name}
								value={field.name}
								defaultChecked={field.name === values[item.name]}
								onChange={() => handleChangeValues(item.name, field.name)}
							/>)
					)}
				</S.Items>
			))}
			</S.Content>

			<S.Footer>
				<Button fullWidth size="medium" onClick={handleFilter}>Filter</Button>
			</S.Footer>
		</S.Wrapper>
	);
};