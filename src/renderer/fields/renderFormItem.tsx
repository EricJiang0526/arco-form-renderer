import { FormItem, Col } from '@arco-design/web-vue'
import type { BaseFieldSchema } from '@/renderer/types'
import { resolveValidationRules } from '@/renderer/utils/resolveValidationRules'

export const renderFormItem = ({
  schema,
  content,
  isInGroup = false,
}: {
  schema: BaseFieldSchema
  content: () => JSX.Element
  isInGroup?: boolean
}) => {
  const { field, label = '', layout = {}, validation } = schema

  const hideLabel = !!isInGroup

  const { span = 24, offset = 0, className, colProps = {} } = layout

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
