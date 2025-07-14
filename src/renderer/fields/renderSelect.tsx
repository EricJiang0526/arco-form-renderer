import { Select } from '@arco-design/web-vue'
import type { BaseFieldSchem } from '../types'
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
  const options = extra.options?.[schema.field] || schema.props?.options
  const loading = extra.loading[schema.field] || false

  const content = () => (
    <Select
      {...schema.props}
      v-model={model[schema.field]}
      options={options}
      loading={loading}
    ></Select>
  )

  return renderFormItem({ schema, content, isInGroup })

  // return (
  //   <FormItem
  //     field={schema.field}
  //     hideLabel={hideLabel}
  //     label={schema.label}
  //     rules={resolveValidationRules(schema.validation)}
  //   >
  //     <Select
  //       {...schema.props}
  //       v-model={model[schema.field]}
  //       options={options}
  //       loading={loading}
  //     ></Select>
  //   </FormItem>
  // )
}
