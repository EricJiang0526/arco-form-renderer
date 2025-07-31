import { traverseSchema } from './schemaHelper'
import type { FieldSchema } from '@/renderer/types'

export function getCleanFormData(
  schema: FieldSchema[],
  model: Record<string, any>,
): Record<string, any> {
  const result: Record<string, any> = model

  traverseSchema(schema, (field) => {
    if (field.type === 'group') {
      return
    }
    console.log(field)

    if (field.field && field.virtual) {
      console.log(field)

      delete result[field.field]
    }
  })

  return result
}
