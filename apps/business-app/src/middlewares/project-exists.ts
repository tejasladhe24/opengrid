import { createMiddleware } from '@tanstack/react-start'
import { db } from '@/lib/db'
import { schema as projectSchema } from '@db/project'
import { authMiddleware } from './auth'
import { eq } from 'drizzle-orm'
import { and } from 'drizzle-orm'

export const projectExistsMiddleware = createMiddleware({
  type: 'request',
})
  .middleware([authMiddleware])
  .server(async ({ next, context, request }) => {
    const getProjectId = async () => {
      switch (request.method) {
        case 'POST':
          const body = await request.json()
          return body.projectId as string
        case 'GET':
          const projectId = new URL(request.url).searchParams.get('projectId')
          return projectId as string
        default:
          return undefined
      }
    }

    const projectId = await getProjectId()

    const project = await db.query.project.findFirst({
      where: and(
        eq(projectSchema.project.id, projectId as string),
        eq(projectSchema.project.ownerId, context.user.id),
      ),
    })

    return await next({
      context: {
        ...context,
        project,
      },
    })
  })
