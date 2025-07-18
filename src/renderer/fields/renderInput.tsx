import { FormItem, Input } from '@arco-design/web-vue'
import type { BaseFieldSchema } from '../types'
import { resolveValidationRules } from '../utils/resolveValidationRules'
import { renderFormItem } from './renderFormItem'

export const renderInput = ({
  schema,
  model,
  isInGroup = false,
}: {
  schema: BaseFieldSchema
  model: Record<string, any>
  isInGroup?: boolean
}) => {
  const content = () => <Input {...schema.props} v-model={model[schema.field]} />
  return renderFormItem({ schema, content, isInGroup })
}
