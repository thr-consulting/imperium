/* eslint-disable */
import type {LocalDate, LocalTime} from '@js-joda/core';
import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import type { Context } from '~core/context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CacheList: ResolverTypeWrapper<CacheList>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Email: ResolverTypeWrapper<Scalars['Email']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  LocalDate: ResolverTypeWrapper<Scalars['LocalDate']['output']>;
  LocalTime: ResolverTypeWrapper<Scalars['LocalTime']['output']>;
  Money: ResolverTypeWrapper<Scalars['Money']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  ObjectId: ResolverTypeWrapper<Scalars['ObjectId']['output']>;
  Password: ResolverTypeWrapper<Scalars['Password']['output']>;
  Permission: Permission;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<{}>;
  SubscriptionValue: ResolverTypeWrapper<SubscriptionValue>;
  URL: ResolverTypeWrapper<Scalars['URL']['output']>;
  UUID: ResolverTypeWrapper<Scalars['UUID']['output']>;
  Upload: ResolverTypeWrapper<Scalars['Upload']['output']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  CacheList: CacheList;
  DateTime: Scalars['DateTime']['output'];
  Email: Scalars['Email']['output'];
  Int: Scalars['Int']['output'];
  LocalDate: Scalars['LocalDate']['output'];
  LocalTime: Scalars['LocalTime']['output'];
  Money: Scalars['Money']['output'];
  Mutation: {};
  ObjectId: Scalars['ObjectId']['output'];
  Password: Scalars['Password']['output'];
  Query: {};
  String: Scalars['String']['output'];
  Subscription: {};
  SubscriptionValue: SubscriptionValue;
  URL: Scalars['URL']['output'];
  UUID: Scalars['UUID']['output'];
  Upload: Scalars['Upload']['output'];
}>;

export type CacheListResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CacheList'] = ResolversParentTypes['CacheList']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface EmailScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Email'], any> {
  name: 'Email';
}

export interface LocalDateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['LocalDate'], any> {
  name: 'LocalDate';
}

export interface LocalTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['LocalTime'], any> {
  name: 'LocalTime';
}

export interface MoneyScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Money'], any> {
  name: 'Money';
}

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  changeSubscriptionValue?: Resolver<Maybe<ResolversTypes['SubscriptionValue']>, ParentType, ContextType>;
  root?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export interface ObjectIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ObjectId'], any> {
  name: 'ObjectId';
}

export interface PasswordScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Password'], any> {
  name: 'Password';
}

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  getAuthData?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  getCacheList?: Resolver<Maybe<Array<Maybe<ResolversTypes['CacheList']>>>, ParentType, ContextType, RequireFields<QueryGetCacheListArgs, 'filter'>>;
  getData?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  getSubscriptionValue?: Resolver<Maybe<ResolversTypes['SubscriptionValue']>, ParentType, ContextType>;
  root?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type SubscriptionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  root?: SubscriptionResolver<Maybe<ResolversTypes['String']>, "root", ParentType, ContextType>;
  subscriptionValueChanged?: SubscriptionResolver<Maybe<ResolversTypes['SubscriptionValue']>, "subscriptionValueChanged", ParentType, ContextType>;
}>;

export type SubscriptionValueResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SubscriptionValue'] = ResolversParentTypes['SubscriptionValue']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface UrlScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['URL'], any> {
  name: 'URL';
}

export interface UuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UUID'], any> {
  name: 'UUID';
}

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type Resolvers<ContextType = Context> = ResolversObject<{
  CacheList?: CacheListResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Email?: GraphQLScalarType;
  LocalDate?: GraphQLScalarType;
  LocalTime?: GraphQLScalarType;
  Money?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  ObjectId?: GraphQLScalarType;
  Password?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  SubscriptionValue?: SubscriptionValueResolvers<ContextType>;
  URL?: GraphQLScalarType;
  UUID?: GraphQLScalarType;
  Upload?: GraphQLScalarType;
}>;


export function permissionLookup(value: string) {
  switch (value) {
    case 'getLoc': return Permission.GetLoc;
    case 'getMore': return Permission.GetMore;
    case 'getPing': return Permission.GetPing;
    case 'getStuff': return Permission.GetStuff;
    default: throw new Error('Cannot find enum value: Permission');
  }
}


