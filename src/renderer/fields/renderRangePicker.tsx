import { RangePicker } from '@arco-design/web-vue'
import type { BaseFieldSchema } from '../types'
import { renderFormItem } from './renderFormItem'
import { wrapModelValue } from '@/renderer/utils/applyValueMap'

export const renderRangePicker = ({
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
    <RangePicker
      {...schema.props}
      modelValue={wrapModelValue(schema, model)}
      onUpdate:modelValue={(val) => {
        schema.valueMap?.valueParser?.(val, model)
      }}
      options={options}
      loading={loading}
      style={layout?.style}
    ></RangePicker>
  )

  return renderFormItem({ schema, content, isInGroup })
}
