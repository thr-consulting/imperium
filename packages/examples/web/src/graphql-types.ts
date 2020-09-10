/* eslint-disable */
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
// Generated on 2020-09-10T10:42:53-05:00

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The Email scalar type represents E-Mail addresses compliant to RFC 822. */
  Email: any;
  /** The URL scalar type represents URL addresses. */
  URL: any;
  /** The DateTime scalar type represents date time strings complying to ISO-8601. */
  DateTime: any;
  /** A password string. Has to be between 6 and 64 characters long. May only contain the following characters: ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890`~!@#$%^&*()-_=+[{]}\|;:'",<.>/? Has to be mixed case. */
  Password: any;
  /** The UUID scalar type represents a UUID. */
  UUID: any;
  /** JS-Joda LocalDate */
  LocalDate: any;
  /** JS-Joda LocalTime */
  LocalTime: any;
  /** JS-Money object */
  Money: any;
  /** The `ObjectId` scalar type represents a mongodb unique ID */
  ObjectId: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Category = {
  __typename?: 'Category';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type Comment = {
  __typename?: 'Comment';
  id?: Maybe<Scalars['String']>;
  comment?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  photo?: Maybe<Photo>;
};





export type Metadata = {
  __typename?: 'Metadata';
  location?: Maybe<Scalars['String']>;
  privateData?: Maybe<Scalars['String']>;
};


export type Mutation = {
  __typename?: 'Mutation';
  root?: Maybe<Scalars['String']>;
  changeSubscriptionValue?: Maybe<SubscriptionValue>;
};



export type Photo = {
  __typename?: 'Photo';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  public?: Maybe<Scalars['Boolean']>;
  metadata?: Maybe<Metadata>;
  categories?: Maybe<Array<Maybe<Category>>>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  owner?: Maybe<User>;
};

export type Query = {
  __typename?: 'Query';
  root?: Maybe<Scalars['String']>;
  getData?: Maybe<Scalars['Int']>;
  getPhoto?: Maybe<Photo>;
  getSubscriptionValue?: Maybe<SubscriptionValue>;
};


export type QueryGetPhotoArgs = {
  name?: Maybe<Scalars['String']>;
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



export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};


export type Unnamed_1_MutationVariables = Exact<{ [key: string]: never; }>;


export type Unnamed_1_Mutation = (
  { __typename?: 'Mutation' }
  & { changeSubscriptionValue?: Maybe<(
    { __typename?: 'SubscriptionValue' }
    & Pick<SubscriptionValue, 'id'>
  )> }
);

export type Unnamed_2_QueryVariables = Exact<{ [key: string]: never; }>;


export type Unnamed_2_Query = (
  { __typename?: 'Query' }
  & { getSubscriptionValue?: Maybe<(
    { __typename?: 'SubscriptionValue' }
    & Pick<SubscriptionValue, 'id'>
  )> }
);

export type OnStuffSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnStuffSubscription = (
  { __typename?: 'Subscription' }
  & { subscriptionValueChanged?: Maybe<(
    { __typename?: 'SubscriptionValue' }
    & Pick<SubscriptionValue, 'id'>
  )> }
);
