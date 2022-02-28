import * as Apollo from '@apollo/client';
/* eslint-disable */
import type * as Types from '../../core/graphql';

import Operations from './mutate.graphql';
const defaultOptions = {} as const;
export type MutateMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type MutateMutation = { changeSubscriptionValue?: { id?: string | null | undefined } | null | undefined };


export type MutateType = { id?: string | null | undefined } | null | undefined;


export type MutateMutationFn = Apollo.MutationFunction<MutateMutation, MutateMutationVariables>;

/**
 * __useMutateMutation__
 *
 * To run a mutation, you first call `useMutateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMutateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mutateMutation, { data, loading, error }] = useMutateMutation({
 *   variables: {
 *   },
 * });
 */
export function useMutateMutation(baseOptions?: Apollo.MutationHookOptions<MutateMutation, MutateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MutateMutation, MutateMutationVariables>(Operations, options);
      }
export type MutateMutationHookResult = ReturnType<typeof useMutateMutation>;
export type MutateMutationResult = Apollo.MutationResult<MutateMutation>;
export type MutateMutationOptions = Apollo.BaseMutationOptions<MutateMutation, MutateMutationVariables>;