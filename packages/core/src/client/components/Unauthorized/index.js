/* eslint-disable global-require */
import React from 'react';
import {Grid, Header, Image} from 'semantic-ui-react';
import styled from 'styled-components';

// language=LESS prefix=dummy{ suffix=}
const StyledGrid = styled(Grid)`
	margin-top: 2rem !important;
`;

export default function Unauthorized() {
	return (
		<StyledGrid container relaxed centered stackable columns="equal">
			<Grid.Column verticalAlign="middle" width="5">
				<Header as="h2">Not Authorized</Header>
				<p>You have insufficient permissions to access this page.</p>
			</Grid.Column>
			<Grid.Column textAlign="center" width="5">
				<Image size="small" src={require('./police.png')} alt="No Authorized"/>
			</Grid.Column>
		</StyledGrid>
	);
}
