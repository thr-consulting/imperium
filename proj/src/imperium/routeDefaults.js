import React from 'react';
import {Redirect} from 'react-router-dom';
// import AppLayout from '../client/components/AppLayout';

export const rootRoute = {
	path: '/',
	exact: true,
	content: () => <Redirect to="/dashboard"/>,
};

export default {
	// layout: AppLayout,
	redirect: true,
};
