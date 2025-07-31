import type { CSSProperties } from 'vue'
import { FormItem } from '@arco-design/web-vue'
import type { GroupFieldSchema, FieldSchema } from '../types'
import { renderField } from '../renderField'

export const renderGroup = ({
  schema,
  model,
  extra,
  isInGroup = false,
}: {
  schema: GroupFieldSchema
  model: Record<string, any>
  extra: Record<string, any>
  isInGroup?: boolean
}) => {
  const { fields, label = '', layout = {}, validation } = schema
  const { gap = 8, direction = 'horizontal' } = layout

  const hasValidation = validation ?? fields.some((field: FieldSchema) => field.validation)
  const hideLabel = !!isInGroup

  const style: CSSProperties = {
    width: '100%',
    display: 'flex',
    gap: `${gap}px`,
    flexDirection: direction === 'vertical' ? 'column' : 'row',
  }

  const content = () =>
    fields.map((schema: FieldSchema) => renderField({ schema, model, extra, isInGroup: true }))

  return (
    <FormItem hideLabel={hideLabel} label={label} required={hasValidation} class="form-item-group">
      <div style={style}>{content()}</div>
    </FormItem>
  )
}
