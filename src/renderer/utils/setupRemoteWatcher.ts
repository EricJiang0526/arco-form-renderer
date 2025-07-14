import { watch } from 'vue'
import type { Reactive } from 'vue'
import type { FieldSchema } from '@/types'

export const setupRemoteWatcher = (
  schema: FieldSchema[],
  model: Reactive<Record<string, any>>,
  extra: Reactive<Record<string, any>>,
) => {
  const watchFields: Record<string, ((model: Record<string, any>, context?: any) => any)[]> = {}
  traverseSchema(schema, (field) => {
    if (!field.remoteConfig) {
      return
    }
    const { watch, asyncOptions, resetOnChange = false, autoSelect = 'first' } = field.remoteConfig

    if (!asyncOptions) {
      console.warn(
        `Field "${field.field}" has remoteConfig.watch but no asyncOptions defined. Please check your schema.`,
      )
      return
    }

    const getOptions = async (model: Record<string, any>) => {
      if (resetOnChange) {
        model[field.field] = null
      }
      extra.loading[field.field] = true
      extra.options[field.field] = await asyncOptions(model).catch((e) => {
        console.error(`Error fetching options for field "${field}":`, e)
        return []
      })
      extra.loading[field.field] = false
      if (autoSelect === 'first' && extra.options[field.field]?.length > 0) {
        model[field.field] = extra.options[field.field][0].value
      } else if (typeof autoSelect === 'function') {
        const selected = autoSelect(extra.options[field.field])
        if (selected !== undefined) {
          model[field.field] = selected
        } else {
          console.log(`Field "${field.field}" autoSelect function did not return a valid value.`)
        }
      }
    }

    if (Array.isArray(watch)) {
      watch.forEach((f: (model: Record<string, any>, context?: any) => any) => {
        const watchField = typeof f === 'string' ? f : f(model)

        if (!watchFields[watchField]) {
          watchFields[watchField] = [getOptions]
        } else {
          watchFields[watchField].push(getOptions)
        }
      })
    } else {
      getOptions(model)
    }
  })

  console.log('setupRemoteWatcher watchFields:', watchFields)

  Object.entries(watchFields).forEach(([field, getOptionList]) => {
    watch(
      () => model[field],
      () => {
        getOptionList.forEach((getOptions) => getOptions(model))
      },
    )
  })
}

export const traverseSchema = (schema: FieldSchema[], action: (s: FieldSchema) => void) => {
  schema.forEach((field) => {
    action(field)
    if (field.type === 'group' && field.fields) {
      traverseSchema(field.fields, action)
    }
  })
}
