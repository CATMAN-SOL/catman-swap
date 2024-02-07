import { z } from 'zod'

const ConfigSchema = z.object({
  SERVER_PORT: z.coerce.number().default(4000),
})

export const config = ConfigSchema.parse(process.env)
