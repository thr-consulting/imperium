/* eslint-disable */
export type Maybe<T> = T | null;
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
  LocalDate: any;
  LocalTime: any;
  Money: any;
  ObjectId: any;
  Password: string;
  URL: any;
  UUID: string;
  Upload: any;
};






export type Mutation = {
  __typename?: 'Mutation';
  root?: Maybe<Scalars['String']>;
};



export type Query = {
  __typename?: 'Query';
  root?: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  root?: Maybe<Scalars['String']>;
};



