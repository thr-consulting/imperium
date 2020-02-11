import debug from 'debug';
import {LocalDate, LocalTime} from '@js-joda/core';
import Money from 'js-money';
import {IImperiumServer} from '@imperium/server';
import {IResolvers} from '@imperium/graphql-server';
import MyCounter from '../models/MyCounter';
import Sample from './Sample.graphqls';
import {ContextManager} from '../../serverTypes';

const d = debug('app.sample.graphql');

export const schema = [Sample];

type SampleResolvers = IResolvers<any, ContextManager>;

export function resolvers(server: IImperiumServer): SampleResolvers {
	const {pubsub} = server.connectors;

	const res = {
		Query: {
			getCounter() {
				return MyCounter.getCounter();
			},
			getLocalDate() {
				return LocalDate.now();
			},
			getLocalTime() {
				return LocalTime.now();
			},
			getMoney() {
				return new Money(0, Money.CAD);
			},
		},
		Mutation: {
			incCounter() {
				const newNumber = MyCounter.inc();
				d(`New counter: ${newNumber}`);
				if (pubsub) pubsub.publish('counterChanged', {counterChanged: newNumber});
				return newNumber;
			},
			setLocalDate(obj, {date}) {
				d(date);
				return true;
			},
			setLocalTime(obj, {time}) {
				d(time);
				return true;
			},
			setMoney(obj, {amount}) {
				d(amount);
				return true;
			},
		},
	};

	if (pubsub) {
		res.Subscription = {
			counterChanged: {
				subscribe: () => pubsub.asyncIterator('counterChanged'),
			},
		};
	}

	return res;
}
