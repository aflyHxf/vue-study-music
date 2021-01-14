// 处理dom相关
/**
 * 获取/添加 元素的data属性值
 * @param {*} el dom节点
 * @param {*} name 属性名 data-name
 * @param {*} val 存在，添加data属性值，不存在则获取
 * @returns
 */
export function getData(el, name, val) {
  const prefix = "data-";
  name = prefix + name;
  if (val) {
    return el.setAttribute(name, val);
  }
  return el.getAttribute(name);
}