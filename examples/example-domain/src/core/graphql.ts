/* eslint-disable */
import type {LocalDate, LocalTime} from '@js-joda/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: Date; output: Date; }
  Email: { input: string; output: string; }
  LocalDate: { input: LocalDate; output: LocalDate; }
  LocalTime: { input: LocalTime; output: LocalTime; }
  Money: { input: any; output: any; }
  ObjectId: { input: any; output: any; }
  Password: { input: string; output: string; }
  URL: { input: any; output: any; }
  UUID: { input: string; output: string; }
  Upload: { input: any; output: any; }
};

export type CacheList = {
  __typename?: 'CacheList';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changeSubscriptionValue?: Maybe<SubscriptionValue>;
  root?: Maybe<Scalars['String']['output']>;
};

export enum Permission {
  GetLoc = 'getLoc',
  GetMore = 'getMore',
  GetPing = 'getPing',
  GetStuff = 'getStuff'
}

export type Query = {
  __typename?: 'Query';
  getAuthData: Scalars['String']['output'];
  getCacheList?: Maybe<Array<Maybe<CacheList>>>;
  getData?: Maybe<Scalars['Int']['output']>;
  getSubscriptionValue?: Maybe<SubscriptionValue>;
  root?: Maybe<Scalars['String']['output']>;
};


export type QueryGetCacheListArgs = {
  filter: Scalars['String']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  root?: Maybe<Scalars['String']['output']>;
  subscriptionValueChanged?: Maybe<SubscriptionValue>;
};

export type SubscriptionValue = {
  __typename?: 'SubscriptionValue';
  id?: Maybe<Scalars['String']['output']>;
};


export function permissionLookup(value: string) {
  switch (value) {
    case 'getLoc': return Permission.GetLoc;
    case 'getMore': return Permission.GetMore;
    case 'getPing': return Permission.GetPing;
    case 'getStuff': return Permission.GetStuff;
    default: throw new Error('Cannot find enum value: Permission');
  }
}

