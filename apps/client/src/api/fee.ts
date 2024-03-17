export const fee = {
  useBaseFee: defineDataEndpoint<
    void,
    {
      base: number
    }
  >({
    method: 'GET',
    url: '/api/v1/fees',
  }),
}
