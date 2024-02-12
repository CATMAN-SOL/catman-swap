import { z } from 'zod'
import { config as configDotenv } from 'dotenv'

configDotenv()

const ConfigSchema = z.object({
  SERVER_PORT: z.coerce.number().default(4000),
  RPC_URL: z.string().url(),
  DATABASE_URL: z.string(),
  FEE_ACCOUNT: z.string().optional(),
})

export const config = ConfigSchema.parse(process.env)
