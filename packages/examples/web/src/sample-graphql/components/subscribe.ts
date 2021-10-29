import * as Apollo from '@apollo/client';
/* eslint-disable */
import type * as Types from '../../core/graphql';

import Operations from './subscribe.graphql';
const defaultOptions =  {}
export type OnStuffSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type OnStuffSubscription = { subscriptionValueChanged?: Types.Maybe<{ id?: Types.Maybe<string> }> };



export type OnStuffType = { id?: Types.Maybe<string> };



/**
 * __useOnStuffSubscription__
 *
 * To run a query within a React component, call `useOnStuffSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnStuffSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnStuffSubscription({
 *   variables: {
 *   },
 * });
 */
export function useOnStuffSubscription(baseOptions?: Apollo.SubscriptionHookOptions<OnStuffSubscription, OnStuffSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<OnStuffSubscription, OnStuffSubscriptionVariables>(Operations, options);
      }
export type OnStuffSubscriptionHookResult = ReturnType<typeof useOnStuffSubscription>;
export type OnStuffSubscriptionResult = Apollo.SubscriptionResult<OnStuffSubscription>;