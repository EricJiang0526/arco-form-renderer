import { Select } from '@arco-design/web-vue'
import type { BaseFieldSchema } from '../types'
import { renderFormItem } from './renderFormItem'

export const renderSelect = ({
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
  const layout = schema.layout

  const content = () => (
    <Select
      {...schema.props}
      v-model={model[schema.field]}
      options={options}
      loading={loading}
      style={layout?.style}
    ></Select>
  )

  return renderFormItem({ schema, content, isInGroup })
}
