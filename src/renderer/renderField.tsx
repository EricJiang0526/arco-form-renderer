import { renderInput } from './fields/renderInput'
import { renderSelect } from './fields/renderSelect'
import { renderGroup } from './fields/renderGroup'
import { renderRadio } from './fields/renderRadio'

import type { FieldSchema } from '@/types'

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
  switch (schema.type) {
    case 'input':
      return renderInput({ schema, model, isInGroup })
    case 'select':
      return renderSelect({ schema, model, extra, isInGroup })
    case 'group':
      return renderGroup({ schema, model, extra, isInGroup })
    case 'radio':
      return renderRadio({ schema, model, extra, isInGroup })
    default:
      return null
  }
}
