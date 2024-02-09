import { z } from 'zod'
import { config as configDotenv } from 'dotenv'

configDotenv()

const ConfigSchema = z.object({
  SERVER_PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string(),
})

export const config = ConfigSchema.parse(process.env)
