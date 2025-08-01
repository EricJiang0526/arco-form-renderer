<template>
  <div style="height: 600px; width: 600px; margin: 20px auto; margin-top: 800px">
    <ArcoFormRenderer ref="formRef" v-model="formData" :schema="schema"></ArcoFormRenderer>
  </div>
</template>

<script setup lang="ts">
import ArcoFormRenderer from '@/renderer/ArcoFormRenderer'
import { ref } from 'vue'

const formData = ref({})

/**
 * 生成一个schema，表单有以下内容 1、姓名输入框，限制50个字，字段为name；2、性别选择radio，男、女，字段为gender；3、工作单位下拉框，数据从后台获取，字段为company；4、有效期rangepicker，开始日期字段是startDate，结束日期是endDate
 */

const schema = [
  // {
  //   field: 'name',
  //   label: '姓名',
  //   type: 'input',
  //   props: {
  //     placeholder: '请输入姓名',
  //     maxLength: 50,
  //   },
  //   validation: [{ required: true, message: '姓名不能为空' }],
  // },
  {
    field: 'gender',
    label: '性别', // 1、字段标题
    type: 'select', // 2、字段类型映射
    layout: {
      style: {
        width: '200px', // 3、样式
      },
    },
    props: {
      placeholder: '请选择性别', // 4、组件属性
    },
    options: [
      { label: '男', value: 'male' },
      { label: '女', value: 'female' }, // 5、选项注入
    ],
    validation: { required: true, message: '请选择性别' }, // 6、校验规则应用
  },
  // {
  //   field: 'company',
  //   label: '工作单位',
  //   type: 'select',
  //   props: {
  //     placeholder: '请选择工作单位',
  //     allowClear: true,
  //   },
  //   remoteConfig: {
  //     asyncOptions: async () => {
  //       // 实际开发中替换为真实API调用
  //       // 示例: return fetch('/api/companies').then(res => res.json())
  //       return [] // 返回 { label, value } 格式的数组
  //     },
  //     watch: [], // 不依赖其他字段
  //     resetOnChange: true,
  //   },
  //   validation: [{ required: true, message: '请选择工作单位' }],
  // },
  // {
  //   field: 'validPeriod', // 虚拟字段名
  //   label: '有效期',
  //   type: 'rangePicker',
  //   virtual: true,
  //   valueMap: {
  //     valueFormatter(model) {
  //       return [model.startDate, model.endDate]
  //     },
  //     valueParser(value, model) {
  //       model.startDate = value?.[0]
  //       model.endDate = value?.[1]
  //     },
  //   },
  //   props: {
  //     placeholder: ['开始日期', '结束日期'],
  //   },
  //   validation: [{ required: true, type: 'array', message: '请选择有效日期范围' }],
  // },
]

const formRef = ref()

setTimeout(() => {
  formRef.value.validate()
}, 2000)
</script>
