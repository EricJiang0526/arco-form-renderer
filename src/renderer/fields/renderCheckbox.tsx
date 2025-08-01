import { Checkbox } from '@arco-design/web-vue'
import type { BaseFieldSchema } from '../types'
import { renderFormItem } from './renderFormItem'

export const renderCheckbox = ({
  schema,
  model,
  extra,
  isInGroup = false,
}: {
  schema: BaseFieldSchema
  model: Record<string, any>
  extra: Record<string, any>
  isInGroup?: boolean
}) => {
  const options = schema.options || extra.options?.[schema.field] || []
  const loading = extra.loading[schema.field] || false

  const content = () => (
    <Checkbox.Group {...schema.props} v-model={model[schema.field]} loading={loading}>
      {options?.map((option) => (
        <Checkbox key={option.value} value={option.value}>
          {option.label}
        </Checkbox>
      ))}
    </Checkbox.Group>
  )

  return renderFormItem({ schema, content, isInGroup })
}
