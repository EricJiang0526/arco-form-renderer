export type FieldType =
  | 'input'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'date'
  | 'password'
  | 'group'

export interface LayoutConfig {
  span?: number // 对应 a-col 的 span（24 栅格）
  offset?: number // 偏移栅格数
  gap?: number // 垂直/水平间距（用于 group）
  direction?: 'horizontal' | 'vertical' // group 专用
  labelWidth?: number | string
  style?: Partial<CSSStyleDeclaration> // 用于精确控制宽度、margin 等
}

export type ValidateTypeLiteral = 'phone' | 'idcard'

export type ValidateTypeItem =
  | ValidateTypeLiteral
  | {
      type: ValidateTypeLiteral
      message?: string
    }

export interface ValidationSchema {
  required?: boolean
  message?: string
  validateType?: ValidateTypeItem[]
  rules?: Rule[]
}

export interface RemoteConfig {
  watch?: (string | ((model: Record<string, any>, context?: any) => any))[]
  asyncOptions: (
    model: Record<string, any>,
    context?: any,
  ) => Promise<{ label: string; value: any }[]>
  resetOnChange?: boolean
  autoSelect?: 'first' | ((option: Option) => any)
}

export interface BaseFieldSchema {
  field: string
  label?: string // ✅ 支持无 label 的输入
  type: Exclude<FieldType, 'group'>
  props?: Record<string, any>
  layout?: LayoutConfig
  disabled?: boolean | ((model: Record<string, any>) => boolean)
  visible?: boolean | ((model: Record<string, any>) => boolean)
  validation?: ValidationSchema
  remoteConfig?: RemoteConfig
}

export interface GroupFieldSchema {
  type: 'group'
  label?: string
  layout?: LayoutConfig // ✅ 可指定 gap、direction、columns 等
  fields: FieldSchema[]
  validation?: boolean
  visible?: boolean | ((model: Record<string, any>) => boolean)
}

export type FieldSchema = BaseFieldSchema | GroupFieldSchema
