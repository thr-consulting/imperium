import type {DefineRouteOptions} from '@imperium/router';
import {useTForm} from '@thx/controls';
import debug from 'debug';
import {Button, Form, Icon, Message, Popup} from 'semantic-ui-react';
import type {ActionFormSidebarItem, ContentData} from '../types';

const d = debug('imperium.layout.content.components.ActionForm');

interface ActionFormProps<T extends DefineRouteOptions, K extends keyof T> {
	item: ActionFormSidebarItem<T, K>;
	data: ContentData<T, K>;
	onHideForm: () => void;
}

export function ActionForm<T extends DefineRouteOptions, K extends keyof T>({item, data, onHideForm}: ActionFormProps<T, K>) {
	// Get initial values
	let initialValues = {};
	if (item.initialValues) {
		if (typeof item.initialValues === 'function') {
			initialValues = item.initialValues(data);
		} else {
			initialValues = item.initialValues;
		}
	}

	// TForm
	const {hasErrors, hasWarnings, handleSubmit, handleChange, values, resetForm, errors, fieldError} = useTForm({
		initialValues,
		onSubmit: submitValues => {
			if (item.onSubmit) {
				item.onSubmit(submitValues, data);
			}
			onHideForm();
		},
		enableReinitialize: true,
		validationSchema: item.validationSchema,
	});

	const saveButton = hasWarnings ? (
		<Popup
			trigger={
				<Button positive type="submit" floated="right" icon labelPosition="left">
					<Icon name="exclamation circle" color="red" />
					Save
				</Button>
			}
			content={<Message error list={Object.values(errors)} />}
			on="hover"
		/>
	) : (
		<Button positive type="submit" floated="right">
			Save
		</Button>
	);

	// Render form
	return (
		<Form error={hasErrors} warning={hasWarnings} onSubmit={handleSubmit}>
			{item.form({handleChange, values, data, fieldError})}
			{saveButton}
			<Button
				type="button"
				onClick={() => {
					resetForm();
					onHideForm();
				}}
			>
				Cancel
			</Button>
		</Form>
	);
}
