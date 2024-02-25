export const dca = {
  useCreateDcaTransaction: defineDataEndpoint<
    {
      publicKey: string

      cycleSeconds: number
      inAmount: number
      inAmountPerCycle: number

      tokenFrom: string
      tokenTo: string

      minOutAmountPerCycle?: number
      maxOutAmountPerCycle?: number
    },
    {
      tx: string
    }
  >({
    method: 'POST',
    url: '/api/v1/dca/create',
    dataBuilder: (input) => input,
  }),
  useExecuteDcaTransaction: defineActionEndpoint<
    {
      txHash: string
      senderPublicKey: string
    },
    {
      txSignature: string
    }
  >({
    method: 'POST',
    url: '/api/v1/dca/execute',
    dataBuilder: (input) => input,
  }),
}
