import debug from 'debug';
import React from 'react';
import {Button, Segment} from 'semantic-ui-react';
import {useMutation} from '@apollo/client';
import decimal from './decimal.graphql';
import float from './float.graphql';

const d = debug('app.sample.GraphqlTypes');

export default function GraphqlTest() {
	const [doDecimal, {data: dec, loading: decLoading}] = useMutation(decimal);
	const [doFloat, {data: flt, loading: fltLoading}] = useMutation(float);

	if (!decLoading && dec) {
		d('Decimal');
		d(dec.getDecimal * 100);
		d(typeof dec.getDecimal);
		d((dec.getDecimal * 100).toString(10));
		d((dec.getDecimal * 100).toFixed(100));
		d((dec.getDecimal * 100).toFixed(100));
		d((dec.getDecimal * 100).toFixed(100));
		d((dec.getDecimal * 100).toFixed(100));
		d((dec.getDecimal * 100).toPrecision(2));
		d((0.07 * 100) === 7);
	}
	if (!fltLoading && flt) {
		d('Float');
		d(flt.getFloat * 100);
		d(typeof flt.getFloat);
	}

	return (
		<>
			<h1>Graphql Types Test</h1>
			<Segment inverted>
				<Button
					color="orange"
					onClick={() => {
						doDecimal();
					}}
				>
					Test Decimal
				</Button>
				<Button
					color="orange"
					onClick={() => {
						doFloat({variables: {num: 0.07}});
					}}
				>
					Test Float
				</Button>
			</Segment>
		</>
	);
}
