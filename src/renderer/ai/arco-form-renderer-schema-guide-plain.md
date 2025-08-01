# Arco Form Renderer Schema 使用指南

本指南用于帮助 AI 智能体或开发者理解如何基于自然语言描述生成 arco-form-renderer 所需的 schema 配置。

---

## 基础字段说明

- `field`: 表单字段的唯一标识（key）。必须唯一，建议使用英文命名。
- `label`: 字段在表单中展示的名称，可为中文。
- `type`: 字段类型，决定渲染的组件。支持如 `input`, `select`, `radio`, `checkboxGroup`, `rangePicker`, `cascader`, `treeSelect` 等。
- `props`: 传入组件的属性，遵循 ArcoDesign 对应组件的属性规范。例如：`placeholder`, `maxLength`, `disabled` 等，注意 `options` 字段不要写在这里，要作为基础字段放在外层。
- `options`: 可选项数组，通常包含 `{ label, value }` 或其他结构的对象。适用于如 `select`、`radio`、`checkboxGroup`、`treeSelect` 等字段类型。可直接静态配置，或通过 `extra.options[field]` 动态传入。当字段配置了 `remoteConfig.asyncOptions` 时，组件将从外部动态获取 `options`，并赋值给 `extra.options[field]`，无需写入 props。
- `validation`: 表单校验规则，结构与 ArcoDesign 的 `<a-form-item>` 中 `rules` 一致。
- `layout`: 控制该字段在表单布局中的样式，如栅格宽度、偏移、margin、内联方式等。
- `visible`: 是否显示该字段，可以为布尔值，也可以为函数 `(model) => boolean`。
- `virtual`: 是否为虚拟字段，虚拟字段不会出现在最终的 formData 中。

---

## 高级功能字段

### valueMap

用于实现虚拟字段与真实字段之间的值映射。适用于如时间范围、坐标对、复合输入等情况。

- `valueFormatter(model)`: 从多个字段生成虚拟字段值。
- `valueParser(value, model)`: 将组件值解析写入多个真实字段。
- 示例：
  ```ts
  {
    field: 'dateRange',
    label: '时间范围',
    type: 'rangePicker',
    virtual: true,
    valueMap: {
      valueFormatter(model) {
        return [model.startDate, model.endDate];
      },
      valueParser(value, model) {
        model.startDate = value?.[0];
        model.endDate = value?.[1];
      }
    }
  }
  ```

### remoteConfig

配置该字段如何基于其他字段动态加载选项（如远程接口依赖）。

- `asyncOptions`: 远程获取选项的方法。可为一个异步函数或其他形式，只要能最终返回一个 `options` 数组（例如包含 `{ label, value }` 的数组）。实际获取逻辑由开发者根据业务自行实现。
- `watch`: 依赖字段变化时触发 asyncOptions，支持字段名数组或函数。
- `resetOnChange`: 依赖字段变化时是否清空当前字段的值。
- `autoSelect`: 设置选项加载后是否默认选中值（可选 'first' 或函数）。

### resetOnHide

- `resetOnHide`: 字段隐藏时是否清空其值，默认值为 `true`。

---

## 示例 schema 输出

```ts
;[
  {
    field: 'username',
    label: '用户名',
    type: 'input',
    props: {
      placeholder: '请输入用户名',
      maxLength: 20,
    },
    validation: [{ required: true, message: '必填项' }],
  },
  {
    field: 'gender',
    label: '性别',
    type: 'radio',
    props: {
      options: [
        { label: '男', value: 'male' },
        { label: '女', value: 'female' },
      ],
    },
  },
  {
    field: 'dateRange',
    label: '时间范围',
    type: 'rangePicker',
    virtual: true,
    valueMap: {
      valueFormatter(model) {
        return [model.startDate, model.endDate]
      },
      valueParser(value, model) {
        model.startDate = value?.[0]
        model.endDate = value?.[1]
      },
    },
  },
]
```

---

## 使用说明

1. 可作为 prompt 模板提供给 AI 智能体生成 schema。
2. 也可作为团队统一表单结构设计参考规范。
3. 推荐结合自然语言描述如：“表单中需要一个用户名输入框（必填，最多 20 个字），性别选择（男/女单选），以及时间范围（开始和结束日期）。”
