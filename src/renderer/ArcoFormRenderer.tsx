import { defineComponent, reactive, watch, toRefs, computed } from 'vue'
import { Form, FormItem } from '@arco-design/web-vue'
import type { FieldSchema } from './types/schema'
import { renderField } from './renderField'
import { setupRemoteWatcher } from './utils/setupRemoteWatcher'

export default defineComponent({
  name: 'ArcoFormRenderer',
  props: {
    schema: {
      type: Array as () => FieldSchema,
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

    const extra = reactive({})

    watch(
      () => model,
      (newModel, oldModel) => {
        emit('update:modelValue', { ...newModel })
      },
      { deep: true },
    )

    return () => {
      return (
        <Form model={model} labelAlign={props.labelAlign} autoLabelWidth={props.autoLabelWidth}>
          {props.schema.map((field: FieldSchema) => renderField(field, model, extra))}
        </Form>
      )
    }
  },
})
