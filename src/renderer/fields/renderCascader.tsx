import { Cascader } from '@arco-design/web-vue'
import type { BaseFieldSchema } from '../types'
import { renderFormItem } from './renderFormItem'

export const renderCascader = ({
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

  const { layout } = schema

  const content = () => (
    <Cascader
      allowClear={true}
      allowSearch={true}
      {...schema.props}
      v-model={model[schema.field]}
      options={options}
      loading={loading}
      style={layout?.style}
    ></Cascader>
  )

  return renderFormItem({ schema, content, isInGroup })
}
