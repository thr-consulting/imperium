import graphql from '@imperium/graphql-server';
import auth from '@imperium/auth-server';
import sample from '../sample';
import todo from '../todo';
import sampleuser from '../sampleuser';
import mytypeorm from '../mytypeorm';

export default [auth, graphql, sample, todo, sampleuser, mytypeorm];
