import { Story, Meta } from '@storybook/react/types-6-0';
import ExploreSidebar, { ExploreSidebarProps } from '.';

import mockItems from './mock';

export default {
	title: 'ExploreSidebar',
	component: ExploreSidebar,
	args: {
		items: mockItems,
	},
	parameters: {
		backgrounds: {
			default: 'won-dark',
		}
	}
} as Meta;

export const Basic: Story<ExploreSidebarProps> = (args) => <ExploreSidebar {...args}/>;

export const WithInitialValues: Story<ExploreSidebarProps> = (args) => <ExploreSidebar {...args} initialValues={{ windows: true, sort_by: 'low-to-high' }} onFilter={() => function(){}}/>;