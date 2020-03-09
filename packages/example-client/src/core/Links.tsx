import React from 'react';
import {Link} from 'react-router-dom';
import {Label, LabelGroup, Segment} from 'semantic-ui-react';

export default function Links() {
	return (
		<Segment>
			<LabelGroup>
				<Label as={Link} to="/">
					Route to Home
				</Label>
				<Label as={Link} to="sample">
					Sample Route
				</Label>
				<Label as={Link} to="/graphqltest">
					GraphQL Test
				</Label>
				<Label as={Link} to="/login">
					Login
				</Label>
				<Label as={Link} to="/useAuth">
					useAuth
				</Label>
			</LabelGroup>
		</Segment>
	);
}
