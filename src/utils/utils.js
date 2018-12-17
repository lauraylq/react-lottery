/**
 * 常用工具函数（ES6语法）
 * cookie
 * url params
 * date
 * time
 * 身份证校验
 * more……
 * 此文件中的函数需注明作者
 */

const Utils = {};

/**
 * [设置cookie]
 * @param {[string]} cookie key
 * @param {[string]} cookie value
 * @author lichun
 */
Utils.setCookie = (name, value) => {
  const now = new Date();
  now.setDate(now.getDate() + (1000 * 60 * 60 * 24 * 30));
  const str = `${name}=${value};expires=${now.toGMTString()};path=/;`;
  document.cookie = str;
};

/**
 * [得到cookie]
 * @param {[string]} cookie key
 * @returns {[string]} value
 * @author lichun
 */
Utils.getCookie = (name) => {
  let start;
  let end;

  if (document.cookie.length > 0) {
    start = document.cookie.indexOf(`${name}=`);

    if (start !== -1) {
      start = start + name.length + 1;
      end = document.cookie.indexOf(';', start);
      if (end === -1) {
        end = document.cookie.length;
      }
      return unescape(document.cookie.substring(start, end));
    }
  }
  return '';
};

export default Utils;
