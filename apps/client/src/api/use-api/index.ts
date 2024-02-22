import { Method } from 'axios'
import { ref } from 'vue'
import { sendRequest } from './send-request'
import { ErrorOr, isError, ResponseError } from './types'

export const plainQueryBuilder = (input: unknown) => input

interface UseApiParameters<TInputData, TResult> {
  requireAuthentication?: boolean
  method: Method
  url: string | ((inputData: TInputData) => string)
  dataBuilder?: (inputData: TInputData) => unknown
  queryBuilder?: (inputData: TInputData) => unknown
  transformResponseData?: (responseData: unknown) => TResult
}

export const defineDataEndpoint =
  <TInputData, TResult>(parameters: UseApiParameters<TInputData, TResult>) =>
  () => {
    const error = ref<ResponseError | null>(null)
    const loading = ref<boolean>(false)
    const result = ref<TResult>()
    const status = ref<number>()
    const fetchedOnce = ref<boolean>(false)

    let controller: AbortController | undefined

    const fetch = async (inputData: TInputData) => {
      if (controller && loading.value === true) {
        controller.abort()
      }
      controller = new AbortController()

      loading.value = true

      const url =
        typeof parameters.url === 'function'
          ? parameters.url(inputData)
          : parameters.url

      const sendRequestFunc = sendRequest

      const data = parameters.dataBuilder
        ? parameters.dataBuilder(inputData)
        : undefined

      const query = parameters.queryBuilder
        ? parameters.queryBuilder(inputData)
        : undefined

      const response = await sendRequestFunc<ErrorOr<TResult>>({
        method: parameters.method,
        url,
        signal: controller.signal,
        data,
        params: query,
      })

      if (response === 'cancelled') {
        return result.value
      }

      const responseData = response.data

      if (isError(responseData)) {
        error.value = responseData
        loading.value = false
        status.value = responseData.status
        throw responseData
      }

      const transformedResponseData = parameters.transformResponseData
        ? parameters.transformResponseData(responseData)
        : responseData

      result.value = transformedResponseData
      status.value = response.status
      error.value = null
      loading.value = false
      fetchedOnce.value = true

      return transformedResponseData
    }

    const fetchOnce = async (inputData: TInputData) => {
      if (!fetchedOnce.value) return await fetch(inputData)
      return result.value
    }

    const fetchImmediate = (inputData: TInputData) => {
      fetch(inputData)

      return { error, loading, result, fetch, status }
    }

    return { error, loading, result, fetch, status, fetchImmediate, fetchOnce }
  }

export const defineActionEndpoint =
  <TInputData, TResult = void>(
    parameters: UseApiParameters<TInputData, TResult>
  ) =>
  () => {
    const error = ref<ResponseError | null>(null)
    const loading = ref<boolean>(false)
    const status = ref<number>()

    const fetch = async (inputData: TInputData) => {
      loading.value = true

      const url =
        typeof parameters.url === 'function'
          ? parameters.url(inputData)
          : parameters.url

      const sendRequestFunc = sendRequest

      const data = parameters.dataBuilder
        ? parameters.dataBuilder(inputData)
        : undefined

      const query = parameters.queryBuilder
        ? parameters.queryBuilder(inputData)
        : undefined

      const response = await sendRequestFunc<ErrorOr<TResult>>({
        method: parameters.method,
        url,
        data,
        params: query,
      })

      if (response === 'cancelled') {
        return 'cancelled'
      }

      const responseData = response.data

      if (isError(responseData)) {
        error.value = responseData
        loading.value = false
        status.value = responseData.status
        throw responseData
      }

      const transformedResponseData = parameters.transformResponseData
        ? parameters.transformResponseData(responseData)
        : responseData

      loading.value = false
      error.value = null

      return transformedResponseData
    }

    return { error, loading, fetch, status }
  }
