/* eslint-disable */
import type {LocalDate, LocalTime} from '@js-joda/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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

export enum Permission {
  GetLoc = 'getLoc',
  GetMore = 'getMore',
  GetPing = 'getPing',
  GetStuff = 'getStuff'
}

export type Query = {
  __typename?: 'Query';
  getAuthData: Scalars['String'];
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


export function permissionLookup(value: string) {
  switch (value) {
    case 'getLoc': return Permission.GetLoc;
    case 'getMore': return Permission.GetMore;
    case 'getPing': return Permission.GetPing;
    case 'getStuff': return Permission.GetStuff;
    default: throw new Error('Cannot find enum value: Permission');
  }
}

