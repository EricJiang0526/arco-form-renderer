<template>
  <div style="height: 600px; width: 600px; margin: 20px auto">
    <ArcoFormRenderer v-model="formData" :schema="schema"></ArcoFormRenderer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ArcoFormRenderer from '@/renderer/ArcoFormRenderer'
import type { FieldSchema } from '@/renderer/types'
import { mockRemote } from '@/renderer/utils/mock'

const formData = ref({
  name: '',
  org: '',
  owner: '',
})

const schema: FieldSchema[] = [
  {
    field: 'name',
    label: '数据源名称',
    type: 'input',
    props: {
      placeholder: '请输入数据源名称',
      allowClear: true,
      maxLength: 20,
    },
    validation: {
      required: true,
      message: '请输入数据源名称',
      validateType: ['idcard'],
    },
  },
  {
    label: '责任人',
    type: 'group',
    layout: {
      direction: 'horizontal',
      gap: 16,
    },
    fields: [
      {
        field: 'org',
        type: 'select',
        props: {
          placeholder: '请选择责任人所属组织',
          allowClear: true,
        },
        validation: {
          required: true,
          message: '请选择责任人所属组织',
        },
        layout: {
          span: 8,
        },
        remoteConfig: {
          asyncOptions: () =>
            mockRemote(1000, () => [
              { label: '组织1', value: 'org1' },
              { label: '组织2', value: 'org2' },
              { label: '组织3', value: 'org3' },
            ]),
          autoSelect: 'first',
        },
      },
      {
        field: 'owner',
        type: 'select',
        props: {
          placeholder: '请选择责任人',
          allowClear: true,
        },
        validation: {
          required: true,
          message: '请选择责任人',
        },
        layout: {
          span: 16,
        },
        remoteConfig: {
          watch: ['org'],

          asyncOptions: (model) =>
            mockRemote(1000, () => {
              console.log('fetching owners for org:', model.org)

              const org = model.org
              const list = [
                { label: '责任人1', value: 'owner1', org: 'org1' },
                { label: '责任人2', value: 'owner2', org: 'org2' },
                { label: '责任人3', value: 'owner3', org: 'org3' },
              ]
              return list.filter((item) => item.org === org)
            }),
          resetOnChange: true,
          autoSelect: 'first',
        },
      },
    ],
  },
  {
    field: 'loginType',
    label: '登录方式',
    type: 'radio',
    remoteConfig: {
      asyncOptions: async () => [
        { label: '账号密码', value: 'password' },
        { label: '验证码', value: 'code' },
      ],
      autoSelect: 'first',
    },
    validation: {
      required: true,
      message: '请选择登录方式',
    },
  },
]
</script>
