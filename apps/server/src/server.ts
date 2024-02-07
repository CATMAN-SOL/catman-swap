import { createCoreFastify } from '~core/fastify'
import { autoRoute } from '~core/auto-route'
import { createPlugin } from '~core/create-plugin'
import { resolve as resolvePath } from 'path'

export const createServer = async () => {
  const fastify = await createCoreFastify(logger)

  const autoRoutePluginConfig = await autoRoute(
    resolvePath(__dirname, './routes')
  )
  const autoRoutePlugin = createPlugin(autoRoutePluginConfig)

  await fastify.register(autoRoutePlugin)

  return fastify
}
