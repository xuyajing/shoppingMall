/**
 * Created by youyu on 2018/8/17.
 */
/*
  存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
}

/*
  获取localStorage
 */
export const getStore = name => {
  if (!name) return;
  return window.localStorage.getItem(name);
}

/*
  删除localStorage
 */
export const removeStore = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
}


/*
  加载更多
 */
export const loadMore = (element, callback) => {

}

export const getRect = (el) => {
  if (el instanceof window.SVGElement) {
    let rect = el.getBoundingClientRect()
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    }
  } else {
    return {
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight
    }
  }
}
