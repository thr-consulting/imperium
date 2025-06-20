import * as Apollo from '@apollo/client';
/* eslint-disable */
import type * as Types from '../../core/graphql';

import Operations from './query.graphql';
const defaultOptions = {} as const;
export type GetCacheListQueryVariables = Types.Exact<{
  filter: Types.Scalars['String']['input'];
}>;


export type GetCacheListQuery = { getCacheList?: Array<{ id: string, name: string, type: string } | null> | null };



export type GetCacheListType = { id: string, name: string, type: string };



/**
 * __useGetCacheListQuery__
 *
 * To run a query within a React component, call `useGetCacheListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCacheListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCacheListQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetCacheListQuery(baseOptions: Apollo.QueryHookOptions<GetCacheListQuery, GetCacheListQueryVariables> & ({ variables: GetCacheListQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCacheListQuery, GetCacheListQueryVariables>(Operations, options);
      }
export function useGetCacheListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCacheListQuery, GetCacheListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCacheListQuery, GetCacheListQueryVariables>(Operations, options);
        }
export function useGetCacheListSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCacheListQuery, GetCacheListQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCacheListQuery, GetCacheListQueryVariables>(Operations, options);
        }
export type GetCacheListQueryHookResult = ReturnType<typeof useGetCacheListQuery>;
export type GetCacheListLazyQueryHookResult = ReturnType<typeof useGetCacheListLazyQuery>;
export type GetCacheListSuspenseQueryHookResult = ReturnType<typeof useGetCacheListSuspenseQuery>;
export type GetCacheListQueryResult = Apollo.QueryResult<GetCacheListQuery, GetCacheListQueryVariables>;