export const swap = {
  useCreateSwapTransaction: defineDataEndpoint<
    {
      quote: any
      publicKey: string
      useWrappedSol: boolean
      prioritizationFee: number
    },
    {
      tx: string
    }
  >({
    method: 'POST',
    url: '/api/v1/swap/create',
    dataBuilder: (input) => input,
  }),
  useExecuteSwapTransaction: defineDataEndpoint<
    {
      txHash: string
      senderPublicKey: string
    },
    string
  >({
    method: 'POST',
    url: '/api/v1/swap/execute',
    dataBuilder: (input) => input,
  }),
}
