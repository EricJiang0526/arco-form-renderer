import type { ValidationSchema, ValidateTypeItem } from '../types'

const validateTypeMap = {
  phone: {
    match: /^1[3-9]\d{9}$/,
    message: '手机号格式不正确',
  },
  idcard: {
    match: /(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/,
    message: '身份证号格式不正确',
  },
}

const getRuleByValidateType = (validateType: ValidateTypeItem) => {
  if (typeof validateType === 'string') {
    return validateTypeMap[validateType] || null
  } else if (typeof validateType === 'object' && validateType.type) {
    return {
      ...validateTypeMap[validateType.type],
      message: validateType.message || validateTypeMap[validateType.type]?.message,
    }
  }
  return null
}

export const resolveValidationRules = (validation: ValidationSchema = {}) => {
  const rules = []

  if (validation.required) {
    rules.push({
      required: true,
      message: validation.message || '该字段为必填项',
    })
  }

  if (validation.validateType?.length) {
    for (const item of validation.validateType) {
      const rule = getRuleByValidateType(item)
      if (rule) {
        rules.push(rule)
      }
    }
  }

  if (validation.rules?.length) {
    rules.push(...validation.rules)
  }

  return rules
}
