// 修复IOS搜狗输入法输入文字后不能回弹页面bug
export const fixWechatScrollBug = () => {
  setTimeout(() => {
    window.scrollTo(0, document.body.scrollTop + 1);
    document.body.scrollTop >= 1 && window.scrollTo(0, document.body.scrollTop - 1);
  }, 10)
};
