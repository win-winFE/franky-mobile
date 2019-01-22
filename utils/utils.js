export const getParamsBySearch = (search) => {
  if (!search) return {};
  const vars = search.substring(1).split('&');
  const queryString = {};
  for (let i = 0; i < vars.length; i += 1) {
    const pair = vars[i].split('=');
    const key = decodeURIComponent(pair[0]);
    const value = decodeURIComponent(pair[1]);
    if (typeof queryString[key] === 'undefined') {
      queryString[key] = decodeURIComponent(value);
    } else if (typeof queryString[key] === 'string') {
      queryString[key] = [queryString[key], decodeURIComponent(value)];
    } else {
      queryString[key].push(decodeURIComponent(value));
    }
  }
  return queryString;
};

export const isClient = (() => {
  try {
    return !!window
  } catch (e) {
    return false;
  }
})();

// 滚动控制（默认滑动到顶部）
export const scrollControl = (stepNumber = 10, toTop = true) => {
  const isWebkit = navigator.userAgent.toLowerCase().match(/webkit\/([\d.]+)/);
  const requestAnimationFrame = window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.msRequestAnimationFrame;

  function step() {
    if (document.documentElement.scrollTop + document.body.scrollTop > 0) {
      if (isWebkit) {
        if (toTop) {
          document.body.scrollTop -= stepNumber;
        } else {
          document.body.scrollTop += stepNumber;
        }
      } else {
        if (toTop) {
          document.documentElement.scrollTop -= stepNumber;
        } else {
          document.documentElement.scrollTop += stepNumber;
        }
      }
      requestAnimationFrame(step);
    }
  }
  requestAnimationFrame(step);
};
