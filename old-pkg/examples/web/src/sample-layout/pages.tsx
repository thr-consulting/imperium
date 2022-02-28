import {createPages, dividerSidebarItem} from '@imperium/layout';
import debug from 'debug';
import {Button, Form, Icon, Label} from 'semantic-ui-react';
import {object, string} from 'yup';
import ContentExample from './components/ContentExample';
import LayoutExample from './components/LayoutExample';
import {ParamTest} from './components/ParamTest';
import {useOverrideGetData} from './hooks/useOverrideGetData';
import {routes} from './routes';
import {useLayoutState} from './state';

const d = debug('imperium.examples.web.sample-layout.pages');

const formValidation = object().shape({
	name: string().required('Name is required'),
	id: string().required('ID is required'),
});

export const routeProps = createPages(routes, {
	noParam: {
		dataHooks: [useOverrideGetData],
		content: () => <LayoutExample />,
		header: 'No Parameters',
	},
	withParam: {
		stateSelectorHook: useLayoutState,
		header: ({params: {myParam}, state}) => {
			return {title: `With Parameters: ${myParam} - ${state.id}`};
		},
		content: () => {
			return <ParamTest />;
		},
		sidebar: [
			{
				text: 'Click Me',
				icon: 'google plus',
				to: routes.to.withParam({myParam: 'testParamAction'}),
			},
			{
				render: ({state: {text}}) => (
					<Label color="teal">
						<Icon name="mail" />
						Text: {text}
					</Label>
				),
			},
			{
				render: () => (
					<Button fluid compact color="orange">
						Custom
					</Button>
				),
			},
			dividerSidebarItem,
			{
				stateSelectorHook: useLayoutState,
				text: 'Click',
				color: 'purple',
				onClick: dat => {
					// eslint-disable-next-line no-console
					console.log(dat.params, dat.state);
				},
			},
			{
				// stateSelectorHook: useLayoutState,
				text: 'Edit Form',
				color: 'olive',
				initialValues: ({state: {id}}) => {
					return {
						name: '',
						id,
					};
				},
				form: ({handleChange, values, fieldError}) => {
					return (
						<>
							<Form.Input
								error={fieldError('name')}
								autoFocus
								loading={false}
								label="Name"
								name="name"
								onChange={handleChange}
								value={values.name || ''}
							/>
							<Form.Input error={fieldError('id')} loading={false} label="ID" name="id" onChange={handleChange} value={values.id || ''} />
						</>
					);
				},
				onSubmit: values => {
					d(values);
				},
				validationSchema: formValidation,
			},
		],
	},
	content: {
		content: () => <ContentExample />,
		full: true,
	},
});
