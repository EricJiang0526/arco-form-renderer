import { TreeSelect } from '@arco-design/web-vue'
import type { BaseFieldSchema } from '../types'
import { renderFormItem } from './renderFormItem'

export const renderTreeSelect = ({
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
    <TreeSelect
      allowClear={true}
      allowSearch={true}
      {...schema.props}
      v-model={model[schema.field]}
      data={options}
      loading={loading}
      style={layout?.style}
    ></TreeSelect>
  )

  return renderFormItem({ schema, content, isInGroup })
}
