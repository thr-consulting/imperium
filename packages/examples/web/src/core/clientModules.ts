import router from '@imperium/router';
import graphql from '@imperium/graphql-client';
import {authClient} from '@imperium/auth-client';
import authGraphql from '@imperium/auth-graphql-client';
import sample from '../sample';
import authsample from '../authsample';
// import todo from '../todo';

export default [graphql, authClient, router, sample, authsample, authGraphql];
