/* eslint-disable */
import type {LocalDate, LocalTime} from '@js-joda/core';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type NotMaybe<T> = T extends null | undefined ? never : T;
export type UnArray<T> = T extends Array<infer U> ? U : T;
export type ExtractArray<A> = NonNullable<UnArray<NonNullable<A>>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: Date;
  Email: string;
  LocalDate: LocalDate;
  LocalTime: LocalTime;
  Money: any;
  ObjectId: any;
  Password: string;
  URL: any;
  UUID: string;
  Upload: any;
};

export type CacheList = {
  __typename?: 'CacheList';
  id: Scalars['String'];
  name: Scalars['String'];
  type: Scalars['String'];
};






export type Mutation = {
  __typename?: 'Mutation';
  changeSubscriptionValue?: Maybe<SubscriptionValue>;
  root?: Maybe<Scalars['String']>;
};



export type Query = {
  __typename?: 'Query';
  getCacheList?: Maybe<Array<Maybe<CacheList>>>;
  getData?: Maybe<Scalars['Int']>;
  getSubscriptionValue?: Maybe<SubscriptionValue>;
  root?: Maybe<Scalars['String']>;
};


export type QueryGetCacheListArgs = {
  filter: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  root?: Maybe<Scalars['String']>;
  subscriptionValueChanged?: Maybe<SubscriptionValue>;
};

export type SubscriptionValue = {
  __typename?: 'SubscriptionValue';
  id?: Maybe<Scalars['String']>;
};




export const scalarTypePolicies = {};
