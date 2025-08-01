import { FormItem, Col } from '@arco-design/web-vue'
import type { BaseFieldSchema } from '@/renderer/types'
import { resolveValidationRules } from '@/renderer/utils/resolveValidationRules'
import type { VNode } from 'vue'

export const renderFormItem = ({
  schema,
  content,
  isInGroup = false,
}: {
  schema: BaseFieldSchema
  content: () => VNode
  isInGroup?: boolean
}) => {
  const { field, label = '', layout = {}, validation } = schema

  const hideLabel = !!isInGroup

  const { span = 24, offset = 0, className, colProps = {} } = layout

  console.log(resolveValidationRules(validation))

  const item = (
    <FormItem
      field={field}
      hideLabel={hideLabel}
      label={label}
      rules={resolveValidationRules(validation)}
    >
      {content()}
    </FormItem>
  )

  return (
    <Col span={span} offset={offset} {...colProps} class={className}>
      {item}
    </Col>
  )
}
