import * as Apollo from '@apollo/client';
/* eslint-disable */
import type * as Types from '../../core/graphql';

import Operations from './getData.graphql';
const defaultOptions = {} as const;
export type GetDataQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetDataQuery = { getSubscriptionValue?: { id?: string | null } | null };



export type GetDataType = { id?: string | null };



/**
 * __useGetDataQuery__
 *
 * To run a query within a React component, call `useGetDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDataQuery(baseOptions?: Apollo.QueryHookOptions<GetDataQuery, GetDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDataQuery, GetDataQueryVariables>(Operations, options);
      }
export function useGetDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDataQuery, GetDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDataQuery, GetDataQueryVariables>(Operations, options);
        }
export function useGetDataSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDataQuery, GetDataQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDataQuery, GetDataQueryVariables>(Operations, options);
        }
export type GetDataQueryHookResult = ReturnType<typeof useGetDataQuery>;
export type GetDataLazyQueryHookResult = ReturnType<typeof useGetDataLazyQuery>;
export type GetDataSuspenseQueryHookResult = ReturnType<typeof useGetDataSuspenseQuery>;
export type GetDataQueryResult = Apollo.QueryResult<GetDataQuery, GetDataQueryVariables>;