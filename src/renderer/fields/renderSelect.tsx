import { watch } from 'vue'
import { FormItem, Select } from '@arco-design/web-vue'
import type { BaseFieldSchema, FieldSchema } from '../types/schema'
import { resolveValidationRules } from '../utils/resolveValidationRules'

export const renderSelect = (
  schema: BaseFieldSchema,
  model: Record<string, any>,
  extra: Record<string, any>,
) => {
  const options = schema.props?.options || []

  return (
    <FormItem
      field={schema.field}
      label={schema.label}
      rules={resolveValidationRules(schema.validation)}
    >
      <Select {...schema.props} v-model={model[schema.field]} options={options}></Select>
    </FormItem>
  )
}
