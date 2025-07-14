import { defineComponent, reactive, watch, toRefs, computed } from 'vue'
import type { PropType } from 'vue'
import { Form } from '@arco-design/web-vue'
import type { FieldSchema } from './types'
import { renderField } from './renderField'
import { setupRemoteWatcher } from './utils/setupRemoteWatcher'
import './styles/common.css'

export default defineComponent({
  name: 'ArcoFormRenderer',
  props: {
    schema: {
      type: Array as PropType<FieldSchema[]>,
      required: true,
    },
    modelValue: {
      type: Object as () => Record<string, any>,
      required: true,
    },
    labelAlign: {
      type: String as () => 'left' | 'right',
      default: 'left',
    },
    autoLabelWidth: {
      type: Boolean,
      default: true,
    },
  },

  setup(props, { emit }) {
    const model = reactive({ ...props.modelValue })

    const extra = reactive({
      options: {} as Record<string, any>,
      loading: {} as Record<string, boolean>,
    })

    setupRemoteWatcher(props.schema, model, extra)

    return () => {
      return (
        <Form model={model} labelAlign={props.labelAlign} autoLabelWidth={props.autoLabelWidth}>
          {props.schema.map((schema: FieldSchema) => renderField({ schema, model, extra }))}
        </Form>
      )
    }
  },
})
