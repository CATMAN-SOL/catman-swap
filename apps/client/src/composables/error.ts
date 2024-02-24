import { ErrorObject } from '@vuelidate/core'

export const useErrorDestruct = (props: {
  error?: ErrorObject[] | ErrorObject | string
}) => {
  const displayedError = computed(() => {
    if (!props.error) return undefined

    if (typeof props.error === 'string') {
      return props.error
    }

    if (Array.isArray(props.error)) {
      if (props.error.length > 0) {
        return props.error[0].$message
      }

      return undefined
    }

    return props.error.$message
  })

  const hasError = computed(() => {
    return !!displayedError.value
  })

  return {
    displayedError,
    hasError,
  }
}
