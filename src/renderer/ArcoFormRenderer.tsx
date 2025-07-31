import { defineComponent, reactive, computed } from 'vue'
import type { PropType } from 'vue'
import { Form } from '@arco-design/web-vue'
import type { FieldSchema } from './types'
import { renderField } from './renderField'
import { setupRemoteWatcher } from './utils/setupRemoteWatcher'
import { applyGetValueMap, applySetValueMap } from './utils/applyValueMap'
import './styles/common.css'

export default defineComponent({
  name: 'ArcoFormRenderer',
  props: {
    schema: {
      type: Array as PropType<FieldSchema[]>,
      required: true,
    },
    modelValue: {
      type: Object as PropType<Record<string, unknown>>,
      required: true,
    },
    labelAlign: {
      type: String as PropType<'left' | 'right'>,
      default: 'left',
    },
    autoLabelWidth: {
      type: Boolean,
      default: true,
    },
  },

  setup(props, { emit }) {
    const model = computed({
      get: () => props.modelValue,
      set: (val) => emit('update:modelValue', val),
    })

    const extra = reactive({
      loading: {},
      options: {},
    })

    setupRemoteWatcher(props.schema, model, extra)

    applyGetValueMap(props.schema, model.value)

    emit('init', { extra })

    return () => {
      return (
        <Form
          model={model.value}
          labelAlign={props.labelAlign}
          autoLabelWidth={props.autoLabelWidth}
        >
          {props.schema.map((schema: FieldSchema) =>
            renderField({ schema, model: model.value, extra }),
          )}
        </Form>
      )
    }
  },
})
