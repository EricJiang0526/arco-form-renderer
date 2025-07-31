/**
 * 根据parentId字段将列表数据转换为树形结构
 * @param list 需要转换的列表数据
 * @param fieldNames 字段映射配置对象，用于指定id、parentId和children字段名
 * @returns 转换后的树形结构数据
 */
export function generateTreeFromListByParentId<T extends Record<string, any>>(
  list: T[],
  fieldNames: { id?: string; parentId?: string; children?: string } = {},
) {
  // 提取字段配置，默认id字段为'id'，parentId字段为'parentId'
  const { id = 'id', parentId = 'parentId', children = 'children' } = fieldNames
  // 构建以id为键的节点映射表，方便快速查找节点
  const nodeMap = list.reduce(
    (acc, cur) => {
      acc[cur[id]] = cur
      return acc
    },
    {} as Record<string | number, T>,
  )
  const res: T[] = []
  // 遍历所有节点，构建树形结构
  list.forEach((node) => {
    if (!node[parentId]) {
      // 如果没有父节点id，则为根节点
      res.push(node)
    } else {
      // 将当前节点添加到父节点的子节点列表中
      const parentNode = nodeMap[node[parentId]]
      if (parentNode[children]) {
        parentNode[children].push(node)
      } else {
        ;(parentNode[children] as T[]) = [node]
      }
    }
  })

  return res
}
