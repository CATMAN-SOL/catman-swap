import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { API_BASE_URL, REQUEST_DELAY } from '../config'

const asyncTimeout = (milis: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), milis)
  })
}

export const sendRequest = async <TOutput, TInput = any>(
  config: AxiosRequestConfig<TInput>
): Promise<AxiosResponse<TOutput, TInput>> => {
  const requestConfig: AxiosRequestConfig<TInput> = {
    baseURL: API_BASE_URL,
    ...config,
  }

  try {
    if (REQUEST_DELAY && import.meta.env.DEV) {
      await asyncTimeout(REQUEST_DELAY)
    }

    // eslint-disable-next-line @typescript-eslint/return-await
    return await axios.request<TOutput>(requestConfig)
  } catch (e) {
    const axiosError = e as AxiosError<TOutput, TInput>

    if (axiosError.response) return axiosError.response

    throw e
  }
}
