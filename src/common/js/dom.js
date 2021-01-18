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

/**
 * 生产一个 element
 */
const elementStyle = document.createElement("div").style;

/**
 * 检测浏览器的产商
 */
let vendor = (() => {
  let transformNames = {
    webkit: "webkitTransform",
    Moz: "MozTransform",
    O: "OTransform",
    ms: "msTransform",
    standard: "transform",
  };

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key;
    }
  }
  return false;
})();

/**
 * 添加浏览器的兼容
 * @param {string} style 
 * @returns
 */
export function prefixStyle(style) {
  if (!vendor) return false;
  if (vendor === "standard") return style;

  return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}
