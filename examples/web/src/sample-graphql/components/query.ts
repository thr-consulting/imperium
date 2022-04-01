import * as Apollo from '@apollo/client';
/* eslint-disable */
import type * as Types from '../../core/graphql';

import Operations from './query.graphql';
const defaultOptions = {} as const;
export type QQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type QQuery = { getSubscriptionValue?: { id?: string | null } | null };



export type QType = { id?: string | null };



/**
 * __useQQuery__
 *
 * To run a query within a React component, call `useQQuery` and pass it any options that fit your needs.
 * When your component renders, `useQQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQQuery({
 *   variables: {
 *   },
 * });
 */
export function useQQuery(baseOptions?: Apollo.QueryHookOptions<QQuery, QQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QQuery, QQueryVariables>(Operations, options);
      }
export function useQLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QQuery, QQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QQuery, QQueryVariables>(Operations, options);
        }
export type QQueryHookResult = ReturnType<typeof useQQuery>;
export type QLazyQueryHookResult = ReturnType<typeof useQLazyQuery>;
export type QQueryResult = Apollo.QueryResult<QQuery, QQueryVariables>;