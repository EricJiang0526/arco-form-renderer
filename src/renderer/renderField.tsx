import { renderInput } from './fields/renderInput'
import { renderSelect } from './fields/renderSelect'
import { renderGroup } from './fields/renderGroup'
import type { FieldSchema } from './types/schema'

export const renderField = (
  schema: FieldSchema,
  model: Record<string, any>,
  extra: Record<string, any>,
) => {
  switch (schema.type) {
    case 'input':
      return renderInput(schema, model)
    case 'select':
      return renderSelect(schema, model, extra)
    case 'group':
      return renderGroup(schema, model, extra)
    default:
      return null
  }
}
