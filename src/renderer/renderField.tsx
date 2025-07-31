import { renderInput } from './fields/renderInput'
import { renderSelect } from './fields/renderSelect'
import { renderGroup } from './fields/renderGroup'
import { renderRadio } from './fields/renderRadio'
import { renderCascader } from './fields/renderCascader'
import { renderCheckboxGroup } from './fields/renderCheckboxGroup'
import { renderTreeSelect } from './fields/renderTreeSelect'
import { renderRangePicker } from './fields/renderRangePicker'
import type { FieldSchema } from '@/renderer/types'
import { traverseSchema } from './utils/schemaHelper'

export const renderField = ({
  schema,
  model,
  extra,
  isInGroup = false,
}: {
  schema: FieldSchema
  model: Record<string, any>
  extra: Record<string, any>
  isInGroup?: boolean
}) => {
  const isVisible =
    typeof schema.visible === 'function' ? schema.visible(model) : schema.visible !== false

  if (!isVisible) {
    const shouldReset = schema.resetOnHide !== false // 默认 true
    if (shouldReset) {
      if (schema.type === 'group') {
        traverseSchema(schema.fields, (s) => {
          if (s.type !== 'group') {
            delete model[s.field]
            if (s.valueMap?.valueParser) {
              s.valueMap?.valueParser(null, model)
            }
          }
        })
      } else {
        delete model[schema.field]
        if (schema.valueMap?.valueParser) {
          schema.valueMap?.valueParser(null, model)
        }
      }
    }
    return null
  }

  switch (schema.type) {
    case 'input':
      return renderInput({ schema, model, isInGroup })
    case 'select':
      return renderSelect({ schema, model, extra, isInGroup })
    case 'group':
      return renderGroup({ schema, model, extra, isInGroup })
    case 'radio':
      return renderRadio({ schema, model, extra, isInGroup })
    case 'cascader':
      return renderCascader({ schema, model, extra, isInGroup })
    case 'checkboxGroup':
      return renderCheckboxGroup({ schema, model, extra, isInGroup })
    case 'treeSelect':
      return renderTreeSelect({ schema, model, extra, isInGroup })
    case 'rangePicker':
      return renderRangePicker({ schema, model, extra, isInGroup })
    default:
      return null
  }
}
