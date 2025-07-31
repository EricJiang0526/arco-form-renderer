import type { FieldSchema, BaseFieldSchema } from '@/renderer/types'
import { computed } from 'vue'

/**
 * 初始化虚拟字段值（组件显示用）
 * 根据 schema 中的 valueMap.valueFormatter
 */
export function applyGetValueMap(schemaList: FieldSchema[], model: Record<string, any>) {
  for (const schema of schemaList) {
    // group 内递归
    if (schema.type === 'group' && Array.isArray(schema.fields)) {
      applyGetValueMap(schema.fields, model)
    }
    if (
      schema.type !== 'group' &&
      schema.valueMap?.valueFormatter &&
      typeof schema.field === 'string'
    ) {
      model[schema.field] = schema.valueMap.valueFormatter(model)
    }
  }
}

/**
 * 当某个组件字段 v-model 值发生变化时
 * 根据 schema.valueMap.valueParser 写入 model
 */
export function applySetValueMap(schema: BaseFieldSchema, value: any, model: Record<string, any>) {
  if (schema.valueMap?.valueParser && typeof schema.field === 'string') {
    schema.valueMap.valueParser(value, model)
  } else if (typeof schema.field === 'string') {
    model[schema.field] = value
  }
}

/**
 * 用于 JSX 里统一处理 v-model 双向绑定
//  */
export function wrapModelValue(schema: BaseFieldSchema, model: Record<string, any>) {
  if (schema.valueMap?.valueFormatter) {
    return schema.valueMap.valueFormatter(model)
  }
  return model[schema.field]
}
