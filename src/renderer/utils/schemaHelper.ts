import type { FieldSchema } from '@/renderer/types'

export const traverseSchema = (schema: FieldSchema[], action: (s: FieldSchema) => void) => {
  schema.forEach((field) => {
    action(field)
    if (field.type === 'group' && field.fields) {
      traverseSchema(field.fields, action)
    }
  })
}
