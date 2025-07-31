<template>
  <div style="height: 600px; width: 600px; margin: 20px auto">
    {{ JSON.stringify(formData) }}
    <ArcoFormRenderer v-model="formData" :schema="schema"></ArcoFormRenderer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ArcoFormRenderer from '@/renderer/ArcoFormRenderer'
import type { FieldSchema } from '@/renderer/types'
import { generateTreeFromListByParentId } from './helper'
import api from './api'

const formData = ref({})

const schema: FieldSchema[] = [
  {
    type: 'group',
    label: '数据覆盖范围',
    fields: [
      {
        field: 'coverAreaCodes',
        type: 'cascader',
        visible: (model) => !model.coverAreaCodes?.includes('000000'),
        resetOnHide: false,
        props: {
          fieldNames: {
            label: 'dmmc',
            value: 'dmz',
          },
          multiple: true,
          checkStrictly: true,
        },
        remoteConfig: {
          asyncOptions: async () => {
            const { data } = await api.getSjzdxListByBmList({
              zdbmList: ['XZQH'],
            })
            return generateTreeFromListByParentId(data?.data?.XZQH || [], {
              id: 'dmz',
              parentId: 'sjzdxdmz',
            })
          },
        },
        layout: {
          style: {
            width: '328px',
          },
        },
      },
      {
        field: 'coverAreaCodes',
        type: 'checkboxGroup',
        resetOnHide: false,
        options: [
          {
            label: '全国',
            value: '000000',
          },
        ],
        visible: (model) =>
          !model.coverAreaCodes?.length || model.coverAreaCodes?.includes('000000'),
      },
    ],
  },
  {
    field: 'industryCodes',
    type: 'treeSelect',
    label: '行业分类',
    props: {
      fieldNames: {
        title: 'dmmc',
        key: 'dmz',
      },
      multiple: true,
      checkStrictly: true,
      treeProps: {
        virtualListProps: {
          height: 200,
        },
        defaultExpandAll: false,
      },
    },
    remoteConfig: {
      asyncOptions: async () => {
        const { data } = await api.getSjzdxListByBmList({
          zdbmList: ['HYFL'],
        })
        return generateTreeFromListByParentId(data?.data?.HYFL || [], {
          id: 'dmz',
          parentId: 'sjzdxdmz',
        })
      },
    },
    layout: {
      style: {
        width: '328px',
      },
    },
  },
  {
    field: 'dataRegistType',
    label: '数据登记类型',
    type: 'radio',
    options: [
      {
        label: '公共数据资源',
        value: '1',
      },
      {
        label: '公共数据产品和服务',
        value: '2',
      },
    ],
  },
  {
    field: 'dataCoverageTimeStart-dataCoverageTimeEnd',
    label: '数据覆盖时间',
    type: 'rangePicker',
    virtual: true,
    visible: (model) => model.dataRegistType === '1',
    valueMap: {
      valueFormatter: (model) => [model.dataCoverageTimeStart, model.dataCoverageTimeEnd],
      valueParser(value, model) {
        model.dataCoverageTimeStart = value?.[0]
        model.dataCoverageTimeEnd = value?.[1]
      },
    },
  },
]
</script>
