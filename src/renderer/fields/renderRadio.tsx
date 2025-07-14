import { Radio } from '@arco-design/web-vue'
import type { BaseFieldSchema } from '../types'
import { renderFormItem } from './renderFormItem'

export const renderRadio = ({
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
  const options = extra.options?.[schema.field] || schema.props?.options
  const loading = extra.loading[schema.field] || false

  const content = () => (
    <Radio.Group
      {...schema.props}
      v-model={model[schema.field]}
      options={options}
      loading={loading}
    ></Radio.Group>
  )

  return renderFormItem({ schema, content, isInGroup })
}
