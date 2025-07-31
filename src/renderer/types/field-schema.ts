export type FieldType =
  | 'input'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'checkboxGroup'
  | 'date'
  | 'password'
  | 'cascader'
  | 'treeSelect'
  | 'rangePicker'
  | 'group'

export interface Option {
  label: string
  value: any
}

export interface LayoutConfig {
  /**
   * 栅格跨度（默认 24）对应 <a-col :span="">
   */
  span?: number

  /**
   * 栅格偏移量（对应 <a-col :offset="">）
   */
  offset?: number

  /**
   * 元素之间的间距（用于 group 横/纵布局时的 gap）
   */
  gap?: number

  /**
   * 排列方向，仅用于 group 类型
   * - horizontal：水平排列（一般用于 inline 表单）
   * - vertical：垂直排列（默认）
   */
  direction?: 'horizontal' | 'vertical'

  /**
   * 标签宽度，可用于统一控制 FormItem 的 label 宽度
   * 示例：labelWidth: 120 或 '100px'
   */
  labelWidth?: number | string

  /**
   * 自定义内联样式，精细控制每个字段容器（如宽度、margin）
   */
  style?: Partial<CSSStyleDeclaration>

  /**
   * 自定义类名（用于样式挂钩）
   */
  className?: string

  /**
   * 自定义透传给 <a-col> 的额外属性（如 responsive 设置）
   */
  colProps?: Record<string, any>
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

export interface ValueMap {
  valueFormatter?: (model: any) => any
  valueParser?: (value: any, model: any) => void
}

export interface RemoteConfig {
  /**
   * 监听哪些字段变化触发远程请求
   */
  watch?: (string | ((model: Record<string, any>, context?: any) => any))[]

  /**
   * 异步选项获取函数
   * 可以是一个 Promise，也可以直接返回数组
   */
  asyncOptions: (model: Record<string, any>, context?: any) => Promise<Option[]>

  /**
   * 当依赖字段变化时是否重置选中值
   */
  resetOnChange?: boolean

  /**
   * 自动选择选项（first: 默认选第一项）
   */
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
  resetOnHide?: boolean
  validation?: ValidationSchema
  remoteConfig?: RemoteConfig
  options?: Option[]
  valueMap?: ValueMap
  virtual?: boolean
}

export interface GroupFieldSchema {
  type: 'group'
  label?: string
  layout?: LayoutConfig // ✅ 可指定 gap、direction、columns 等
  fields: FieldSchema[]
  validation?: boolean
  visible?: boolean | ((model: Record<string, any>) => boolean)
  resetOnHide?: boolean
}

export type FieldSchema = BaseFieldSchema | GroupFieldSchema
