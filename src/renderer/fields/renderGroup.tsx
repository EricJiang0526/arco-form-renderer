import { FormItem, Input } from '@arco-design/web-vue'
import type { BaseFieldSchema, FieldSchema } from '../types/schema'
import { renderField } from '../renderField'

export const renderGroup = (
  schema: BaseFieldSchema,
  model: Record<string, any>,
  extra: Record<string, any>,
) => {
  const { fields, label = '', layout = {}, validation } = schema
  const { gap = 8, direction = 'horizontal' } = layout

  const hasValidation = validation ?? fields.some((field: FieldSchema) => field.validation)

  console.log(11, schema)

  return (
    <FormItem label={label} required={hasValidation}>
      {schema.fields.map((schema: FieldSchema) => renderField(schema, model, extra))}
    </FormItem>
  )
}
