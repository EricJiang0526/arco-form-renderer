import { FormItem, Input } from '@arco-design/web-vue'
import type { BaseFieldSchema } from '../types/schema'
import { resolveValidationRules } from '../utils/resolveValidationRules'

export const renderInput = (schema: BaseFieldSchema, model: Record<string, any>) => (
  <FormItem
    field={schema.field}
    label={schema.label}
    rules={resolveValidationRules(schema.validation)}
  >
    <Input {...schema.props} v-model={model[schema.field]} />
  </FormItem>
)
