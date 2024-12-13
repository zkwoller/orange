---
group: 基础
order: 2
toc: content
---
# tool

## 1. 生成指定范围随机数
```javascript
/**
* @param {*} min 
* @param {*} max 
* @returns 
*/
export const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
```
## 2. 数字千分位分隔
```js
/**
* @param {*} n 
* @returns 
*/
export const format = (n) => {
  let num = n.toString();
  let len = num.length;
  if (len <= 3) {
    return num;
  } else {
    let temp = '';
    let remainder = len % 3;
    if (remainder > 0) { // 不是3的整数倍
      return num.slice(0, remainder) + ',' + num.slice(remainder, len).match(/\d{3}/g).join(',') + temp;
    } else { // 3的整数倍
      return num.slice(0, len).match(/\d{3}/g).join(',') + temp;
    }
  }
}

export function numFormat(num){
  if(!Number(num))return num
  var res = num.toString().replace(/\d+/, function (n) { // 先提取整数部分
    return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
      return $1 + ",";
    });
  });
  return res;
}
```
## 4. 数组乱序
```js
/**
* @param {*} arr 
* @returns 
*/
export const arrScrambling = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    const randomIndex = Math.round(Math.random() * (arr.length - 1 - i)) + i;
    [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
  }
  return arr;
}
```
## 5. 数组扁平化
```js
/**
* @param {*} arr 
* @returns 
*/
export const flatten = (arr) => {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}
```
## 6. 数组中获取随机数
```js
/**
* @param {*} arr 
* @returns 
*/

export const sample = arr => arr[Math.floor(Math.random() * arr.length)];
```
## 7. 生成随机字符串
```js
/**
* @param {*} len 
* @returns 
*/
export const randomString = (len) => {
  let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789';
  let strLen = chars.length;
  let randomStr = '';
  for (let i = 0; i < len; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * strLen));
  }
  return randomStr;
  //return Math.random().toString(36).substr(2, 13)
};
```
## 8. 字符串首字母大写
```js
/**
* @param {*} str 
* @returns 
*/
export const fistLetterUpper = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
```
## 9. 手机号中间四位变成*
```js
/**

* @param {*} tel 
* @returns 
*/
export const telFormat = (tel) => {
  tel = String(tel);
  return tel.substr(0, 3) + "****" + tel.substr(7);
};
```
## 10. 驼峰命名转换成短横线命名
```js
/**
* @param {*} str 
* @returns 
*/
export const getKebabCase = (str) => {
  return str.replace(/[A-Z]/g, (item) => '-' + item.toLowerCase())
}

```
## 11. 短横线命名转换成驼峰命名
```js
/**
* 
* @param {*} str 
* @returns 
*/
export const getCamelCase = (str) => {
  return str.replace(/-([a-z])/g, (i, item) => item.toUpperCase())
}
```
## 12. 全角转换为半角
```js
/**
* 
* @param {*} str 
* @returns 
*/
export const toCDB = (str) => {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    code = str.charCodeAt(i);
    if (code >= 65281 && code <= 65374) {
      result += String.fromCharCode(str.charCodeAt(i) - 65248);
    } else if (code == 12288) {
      result += String.fromCharCode(str.charCodeAt(i) - 12288 + 32);
    } else {
      result += str.charAt(i);
    }
  }
  return result;
}
```
## 13. 半角转换为全角
```js
/**
*
* @param {*} str 
* @returns 
*/
export const toDBC = (str) => {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    code = str.charCodeAt(i);
    if (code >= 33 && code <= 126) {
      result += String.fromCharCode(str.charCodeAt(i) + 65248);
    } else if (code == 32) {
      result += String.fromCharCode(str.charCodeAt(i) + 12288 - 32);
    } else {
      result += str.charAt(i);
    }
  }
  return result;
}
```
## 14. 数字转化为大写金额
```js
/**
* @param {*} n 
* @returns 
*/
export const digitUppercase = (n) => {
  const fraction = ['角', '分'];
  const digit = [
    '零', '壹', '贰', '叁', '肆',
    '伍', '陆', '柒', '捌', '玖'
  ];
  const unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟']
  ];
  n = Math.abs(n);
  let s = '';
  for (let i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
  }
  s = s || '整';
  n = Math.floor(n);
  for (let i = 0; i < unit[0].length && n > 0; i++) {
    let p = '';
    for (let j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p;
      n = Math.floor(n / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }
  return s.replace(/(零.)*零元/, '元')
  .replace(/(零.)+/g, '零')
  .replace(/^整$/, '零元整');
};
```
## 15. 数字转化为中文数字
```js
/**
* @param {*} value 
* @returns 
*/
export const intToChinese = (value) => {
  const str = String(value);
  const len = str.length - 1;
  const idxs = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万', '十', '百', '千', '亿'];
  const num = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  return str.replace(/([1-9]|0+)/g, ($, $1, idx, full) => {
    let pos = 0;
    if ($1[0] !== '0') {
      pos = len - idx;
      if (idx == 0 && $1[0] == 1 && idxs[len - idx] == '十') {
      return idxs[len - idx];
      }
      return num[$1[0]] + idxs[len - idx];
    } else {
      let left = len - idx;
      let right = len - idx + $1.length;
      if (Math.floor(right / 4) - Math.floor(left / 4) > 0) {
        pos = left - left % 4;
      }
      if (pos) {
        return idxs[pos] + num[$1[0]];
      } else if (idx + $1.length >= len) {
        return '';
      } else {
        return num[$1[0]]
      }
    }
  });
}
```
## 16. 存储localStorage
```js
/**
* @param {*} key 
* @param {*} value 
* @returns 
*/
export const localStorageSet = (key, value) => {
  if (!key) return;
  if (typeof value !== 'string') {
    value = JSON.stringify(value);
  }
  window.localStorage.setItem(key, value);
};
```
## 17. 获取localStorage
```js
/**
* @param {*} key 
* @returns 
*/
export const localStorageGet = (key) => {
  if (!key) return;
  return window.localStorage.getItem(key);
};
```
## 18. 删除localStorage
```js
/**
* @param {*} key 
* @returns 
*/
export const localStorageRemove = (key) => {
  if (!key) return;
  window.localStorage.removeItem(key);
};
```
## 19. 存储sessionStorage
```js
/**
* @param {*} key 
* @param {*} value 
* @returns 
*/
export const sessionStorageSet = (key, value) => {
  if (!key) return;
  if (typeof value !== 'string') {
    value = JSON.stringify(value);
  }
  window.sessionStorage.setItem(key, value)
};
```
## 20. 获取sessionStorage
```js
/**
* @param {*} key 
* @returns 
*/
export const sessionStorageGet = (key) => {
  if (!key) return;
  return window.sessionStorage.getItem(key)
};
```
## 21. 删除sessionStorage
```js
/**
* @param {*} key 
* @returns 
*/
export const sessionStorageRemove = (key) => {
  if (!key) return;
  window.sessionStorage.removeItem(key)
};
```
## 22.设置cookie
```js
/**
* @param {*} key 
* @param {*} value 
* @param {*} expire 
*/
export const setCookie = (key, value, expire) => {
  const d = new Date();
  d.setDate(d.getDate() + expire);
  document.cookie = `${key}=${value};expires=${d.toUTCString()}`
};
```
## 23. 读取cookie
```js
/**
* 
* @param {*} key 
* @returns 
*/
export const getCookie = (key) => {
  const cookieStr = unescape(document.cookie);
  const arr = cookieStr.split('; ');
  let cookieValue = '';
  for (let i = 0; i < arr.length; i++) {
    const temp = arr[i].split('=');
    if (temp[0] === key) {
      cookieValue = temp[1];
      break
    }
  }
  return cookieValue
};
```
## 24. 删除cookie
```js
/** 
* @param {*} key 
*/
export const delCookie = (key) => {
document.cookie = `${encodeURIComponent(key)}=;expires=${new Date()}`
};
```
## 25 .校验身份证号码
```js
/**
* @param {*} value 
* @returns 
*/
export const checkCardNo = (value) => {
  let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return reg.test(value);
};
```
## 26. 校验是否包含中文
```js
/**
* 
* @param {*} value 
* @returns 
*/
export const haveCNChars = (value) => {
  return /[\u4e00-\u9fa5]/.test(value);
}
```
## 27. 校验是否为中国大陆的邮政编码
```js
/**
* 
* @param {*} value 
* @returns 
*/
export const isPostCode = (value) => {
  return /^[1-9][0-9]{5}$/.test(value.toString());
}
```
## 28. 校验是否为IPv6地址
```js
/**
* 
* @param {*} str 
* @returns 
*/
export const isIPv6 = (str) => {
  return Boolean(str.match(/:/g) ? str.match(/:/g).length <= 7 : false && /::/.test(str) ? /^([\da-f]{1,4}(:|::)){1,6}[\da-f]{1,4}$/i.test(str) : /^([\da-f]{1,4}:){7}[\da-f]{1,4}$/i.test(str));
}
```
## 29. 校验是否为邮箱地址
```js
/**
* 
* @param {*} value 
* @returns 
*/
export const isEmail = (value) => {
  return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);
}
```
## 30. 校验是否为中国大陆手机号
```js
/**
* 
* @param {*} value 
* @returns 
*/
export const isTel = (value) => {
  return /^1[3,4,5,6,7,8,9][0-9]{9}$/.test(value.toString());
}
```
## 31.校验是否包含emoji表情
```js
/**
* 
* @param {*} value 
* @returns 
*/
export const isEmojiCharacter = (value) => {
  value = String(value);
  for (let i = 0; i < value.length; i++) {
    const hs = value.charCodeAt(i);
    if (0xd800 <= hs && hs <= 0xdbff) {
      if (value.length > 1) {
        const ls = value.charCodeAt(i + 1);
        const uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
        if (0x1d000 <= uc && uc <= 0x1f77f) {
          return true;
        }
      }
    } else if (value.length > 1) {
      const ls = value.charCodeAt(i + 1);
      if (ls == 0x20e3) {
        return true;
      }
    } else {
      if (0x2100 <= hs && hs <= 0x27ff) {
        return true;
      } else if (0x2B05 <= hs && hs <= 0x2b07) {
        return true;
      } else if (0x2934 <= hs && hs <= 0x2935) {
        return true;
      } else if (0x3297 <= hs && hs <= 0x3299) {
        return true;
      } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030
      || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b
      || hs == 0x2b50) {
        return true;
      }
    }
  }
  return false;
}
```
## 32. 获取URL参数列表
```js
/**
* @returns 
*/
export const GetRequest = () => {
  let url = location.search;
  const paramsStr = /.+\?(.+)$/.exec(url)[1]; // 将 ? 后面的字符串取出来
  const paramsArr = paramsStr.split('&'); // 将字符串以 & 分割后存到数组中
  let paramsObj = {};
  // 将 params 存到对象中
  paramsArr.forEach(param => {
    if (/=/.test(param)) { // 处理有 value 的参数
      let [key, val] = param.split('='); // 分割 key 和 value
      val = decodeURIComponent(val); // 解码
      val = /^\d+$/.test(val) ? parseFloat(val) : val; // 判断是否转为数字
      if (paramsObj.hasOwnProperty(key)) { // 如果对象有 key，则添加一个值
        paramsObj[key] = [].concat(paramsObj[key], val);
      } else { // 如果对象没有这个 key，创建 key 并设置值
        paramsObj[key] = val;
      }
    } else { // 处理没有 value 的参数
      paramsObj[param] = true;
    }
  })
  return paramsObj;
};
```
## 33. 检测URL是否有效
```js
/**
* 
* @param {*} URL 
* @returns 
*/
export const getUrlState = (URL) => {
  let xmlhttp = new ActiveXObject("microsoft.xmlhttp");
  xmlhttp.Open("GET", URL, false);
  try {
    xmlhttp.Send();
  } catch (e) {
  } finally {
    let result = xmlhttp.responseText;
    if (result) {
      if (xmlhttp.Status == 200) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
```
## 34. 键值对拼接成URL参数
```js
/**
* 34.键值对拼接成URL参数
* @param {*} obj 
* @returns 
*/
export const params2Url = (obj) => {
  let params = []
  for (let key in obj) {
    params.push(`${key}=${obj[key]}`);
  }
  return encodeURIComponent(params.join('&'))
}
```
## 35. 修改URL中的参数
```js
/**
* 35.修改URL中的参数
* @param {*} paramName 
* @param {*} replaceWith 
* @returns 
*/
export const replaceParamVal = (paramName, replaceWith) => {
  const oUrl = location.href.toString();
  const re = eval('/(' + paramName + '=)([^&]*)/gi');
  location.href = oUrl.replace(re, paramName + '=' + replaceWith);
  return location.href;
}
```
## 36. 删除URL中指定参数
```js
/**
* 36.删除URL中指定参数
* @param {*} name 
* @returns 
*/
export const funcUrlDel = (name) => {
  const baseUrl = location.origin + location.pathname + "?";
  const query = location.search.substr(1);
  if (query.indexOf(name) > -1) {
    const obj = {};
    const arr = query.split("&");
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].split("=");
      obj[arr[i][0]] = arr[i][1];
    }
    delete obj[name];
    return baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g, "").replace(/\:/g, "=").replace(/\,/g, "&");
  }
}
```
## 37. 判断是移动还是PC设备
```js
/**
* 37.判断是移动还是PC设备
* @returns 
*/
export const isMobile = () => {
  if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i))) {
    return 'mobile';
  }
  return 'desktop';
}
```
## 38. 判断是否是苹果还是安卓移动设备
```js
/**
* 38.判断是否是苹果还是安卓移动设备
* @returns 
*/
export const isAppleMobileDevice = () => {
  let reg = /iphone|ipod|ipad|Macintosh/i;
  return reg.test(navigator.userAgent.toLowerCase());
}
```
## 39. 判断是否是安卓移动设备
```js
/**
* 39.判断是否是安卓移动设备
* @returns 
*/
export const isAndroidMobileDevice = () => {
  return /android/i.test(navigator.userAgent.toLowerCase());
}
```
## 40.判断是Windows还是Mac系统
```js
/**
* 40.判断是Windows还是Mac系统
* @returns 
*/
export const osType = () => {
  const agent = navigator.userAgent.toLowerCase();
  const isMac = /macintosh|mac os x/i.test(navigator.userAgent);
  const isWindows = agent.indexOf("win64") >= 0 || agent.indexOf("wow64") >= 0 || agent.indexOf("win32") >= 0 || agent.indexOf("wow32") >= 0;
  if (isWindows) {
    return "windows";
  }
  if (isMac) {
    return "mac";
  }
}
```
## 41. 判断是否是微信/QQ内置浏览器
```js
/**
* 41.判断是否是微信/QQ内置浏览器
* @returns 
*/
export const broswer = () => {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    return "weixin";
  } else if (ua.match(/QQ/i) == "qq") {
    return "QQ";
  }
  return false;
}
```
## 42. 浏览器型号和版本
```js
/**
* 42.浏览器型号和版本
* @returns 
*/
export const getExplorerInfo = () => {
  let t = navigator.userAgent.toLowerCase();
  return 0 <= t.indexOf("msie") ? { //ie < 11
    type: "IE",
    version: Number(t.match(/msie ([\d]+)/)[1])
  } : !!t.match(/trident\/.+?rv:(([\d.]+))/) ? { // ie 11
    type: "IE",
    version: 11
  } : 0 <= t.indexOf("edge") ? {
    type: "Edge",
    version: Number(t.match(/edge\/([\d]+)/)[1])
  } : 0 <= t.indexOf("firefox") ? {
    type: "Firefox",
    version: Number(t.match(/firefox\/([\d]+)/)[1])
  } : 0 <= t.indexOf("chrome") ? {
    type: "Chrome",
    version: Number(t.match(/chrome\/([\d]+)/)[1])
  } : 0 <= t.indexOf("opera") ? {
    type: "Opera",
    version: Number(t.match(/opera.([\d]+)/)[1])
  } : 0 <= t.indexOf("Safari") ? {
    type: "Safari",
    version: Number(t.match(/version\/([\d]+)/)[1])
  } : {
    type: t,
    version: -1
  }
}
```
## 43. 滚动到页面顶部
```js
/**
* 43.滚动到页面顶部
*/
export const scrollToTop = () => {
  const height = document.documentElement.scrollTop || document.body.scrollTop;
  if (height > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, height - height / 8);
  }
}
```
## 44. 滚动到页面底部
```js
/**
* 44.滚动到页面底部
*/
export const scrollToBottom = () => {
  window.scrollTo(0, document.documentElement.clientHeight);
}
```
45.滚动到指定元素区域
```js
/**
* 45.滚动到指定元素区域
* @param {*} element 
*/
export const smoothScroll = (element) => {
  document.querySelector(element).scrollIntoView({
    behavior: 'smooth'
  });
};
```
## 46. 获取可视窗口高度
```js
/**
* 46.获取可视窗口高度
* @returns 
*/
export const getClientHeight = () => {
  let clientHeight = 0;
  if (document.body.clientHeight && document.documentElement.clientHeight) {
    clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
  }
  else {
    clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
  }
  return clientHeight;
}
```
## 47. 获取可视窗口宽度
```js
/**
* 47.获取可视窗口宽度
* @returns 
*/
export const getPageViewWidth = () => {
  return (document.compatMode == "BackCompat" ? document.body : document.documentElement).clientWidth;
}
```
## 48. 打开浏览器全屏
```js
/**
* 48.打开浏览器全屏
*/
export const toFullScreen = () => {
  let element = document.body;
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen()
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullScreen()
  }
}
```
## 49. 退出浏览器全屏
```js
/**
* 49.退出浏览器全屏
*/
export const exitFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  }
}
```
## 50.当前时间
```js
/**
* 50.当前时间
* @returns 
*/
export const nowTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const date = now.getDate() >= 10 ? now.getDate() : ('0' + now.getDate());
  const hour = now.getHours() >= 10 ? now.getHours() : ('0' + now.getHours());
  const miu = now.getMinutes() >= 10 ? now.getMinutes() : ('0' + now.getMinutes());
  const sec = now.getSeconds() >= 10 ? now.getSeconds() : ('0' + now.getSeconds());
  return +year + "年" + (month + 1) + "月" + date + "日 " + hour + ":" + miu + ":" + sec;
}
```
## 51. 格式化时间
```js
/**
* 51.格式化时间
* @param {*} formatter 
* @param {*} time 
* @returns 
*/
export const dateFormatter = (formatter, time) => {
  let date = time ? new Date(time) : new Date(),
  Y = date.getFullYear() + '',
  M = date.getMonth() + 1,
  D = date.getDate(),
  H = date.getHours(),
  m = date.getMinutes(),
  s = date.getSeconds();
  return formater.replace(/YYYY|yyyy/g, Y)
  .replace(/YY|yy/g, Y.substr(2, 2))
  .replace(/MM/g, (M < 10 ? '0' : '') + M)
  .replace(/DD/g, (D < 10 ? '0' : '') + D)
  .replace(/HH|hh/g, (H < 10 ? '0' : '') + H)
  .replace(/mm/g, (m < 10 ? '0' : '') + m)
  .replace(/ss/g, (s < 10 ? '0' : '') + s)
}
```
## 52. 阻止冒泡事件
```js
/**
* 52.阻止冒泡事件
* @param {*} e 
*/
export const stopPropagation = (e) => {
  e = e || window.event;
  if (e.stopPropagation) {    // W3C阻止冒泡方法 
  e.stopPropagation();
  } else {
  e.cancelBubble = true; // IE阻止冒泡方法 
  }
}
```
## 53.防抖函数
```js
/**
* 53.防抖函数
* 触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。
* @param {*} fn 
* @param {*} wait 
* @returns 
*/
export const debounce = (fn, wait) => {
  let timer = null;
  return function () {
    let context = this,
    args = arguments;

    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
}
```
## 54.节流函数
```js
/**
* 54.节流函数
* 就是指连续触发事件但是在 n 秒中只执行一次函数
* @param {*} fn 
* @param {*} delay 
* @returns 
*/
export const throttle = (fn, delay) => {
  let curTime = Date.now();
  return function () {
    let context = this,
    args = arguments,
    nowTime = Date.now();

    if (nowTime - curTime >= delay) {
      curTime = Date.now();
      return fn.apply(context, args);
    }
  };
}
```
## 55.数据类型判断
```js
/**
* 55.数据类型判断
* @param {*} value 
* @returns 
*/
export const getType = (value) => {
  if (value === null) {
    return value + "";
  }
  // 判断数据是引用类型的情况
  if (typeof value === "object") {
    let valueClass = Object.prototype.toString.call(value),
    type = valueClass.split(" ")[1].split("");
    type.pop();
    return type.join("").toLowerCase();
  } else {
    // 判断数据是基本数据类型的情况和函数的情况
    return typeof value;
  }
}
```
## 56. 对象深拷贝
```js
/**
* 56.对象深拷贝
* @param {*} obj 
* @param {*} hash 
* @returns 
*/
export const deepClone = (obj, hash = new WeakMap()) => {
  // 日期对象直接返回一个新的日期对象
  if (obj instanceof Date) {
    return new Date(obj);
  }
  //正则对象直接返回一个新的正则对象     
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  //如果循环引用,就用 weakMap 来解决
  if (hash.has(obj)) {
    return hash.get(obj);
  }
  // 获取对象所有自身属性的描述
  let allDesc = Object.getOwnPropertyDescriptors(obj);
  // 遍历传入参数所有键的特性
  let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc)

  hash.set(obj, cloneObj)
  for (let key of Reflect.ownKeys(obj)) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      cloneObj[key] = deepClone(obj[key], hash);
    } else {
      cloneObj[key] = obj[key];
    }
  }
  return cloneObj
}
```
## 57. 深拷贝
```js
/**
* 57.深拷贝
* @export
* @param {*} obj
* @returns
*/
export function deepCopy(obj) {
  if (typeof obj != 'object') {
    return obj
  }
  if (obj == null) {
    return obj
  }
  return JSON.parse(JSON.stringify(obj))
}
```
## 58. 获取文件后缀名
```js
/**
* 58.获取文件后缀名
* @param {String} filename
*/
export function getExt(filename) {
  if (typeof filename == 'string') {
    return filename
    .split('.')
    .pop()
    .toLowerCase()
  } else {
    throw new Error('filename must be a string type')
  }
}
```
## 59. 复制内容到剪贴板
```js
/**
* 59.复制内容到剪贴板
* @param {*} value 
* @returns 
*/
export function copyToBoard(value) {
  const element = document.createElement('textarea')
  document.body.appendChild(element)
  element.value = value
  element.select()
  if (document.execCommand('copy')) {
    document.execCommand('copy')
    document.body.removeChild(element)
    return true
  }
  document.body.removeChild(element)
  return false
}
```
## 60. 休眠xxxms
```js
/**
* 60.休眠xxxms
* @param {Number} milliseconds
*/
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
```
## 61. 数组去重
```js
/**
* 61.数组去重
* @param {*} arr
*/
export function uniqueArray(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('The first parameter must be an array')
  }
  if (arr.length == 1) {
    return arr
  }
  return [...new Set(arr)]
}
```
## 62.对象转化为formData
```js
/**
* 62.对象转化为formData
* @param {Object} object
*/
export function getFormData(object) {
  const formData = new FormData()
  Object.keys(object).forEach(key => {
  const value = object[key]
    if (Array.isArray(value)) {
      value.forEach((subValue, i) =>
        formData.append(key + `[${i}]`, subValue)
      )
    } else {
      formData.append(key, object[key])
    }
  })
  return formData
}
```
## 63. 保留小数点以后几位，默认2位
```js
/**
* 63.保留小数点以后几位，默认2位
* @param {*} number 
* @param {*} no 
* @returns 
*/
export function cutNumber(number, no = 2) {
  if (typeof number != 'number') {
    number = Number(number)
  }
  return Number(number.toFixed(no))
}

```
## 64.文档流导出
```js
/**
* 64.文档流导出
* @param {*} stream 
* @param {*} type 
* @param {*} postfix 
* @param {*} name 
*/
export const ab2str=(stream,type,postfix,name)=>{//导出Excel
  var b = new Blob([stream]);
  var r = new FileReader();
  r.readAsText(b, 'utf-8');
  r.onload = function (){
    try{
      const response = JSON.parse(r.result)
      if(!response.success){
        message.error(response.message)
        return
      }
    }catch(e){}
    let fileName = name;
    const blob = new Blob([stream], { type });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName + postfix;
    link.click();
  }
}
```
## 65. 获取浏览器Cookie的值
```js
/**
* 65.获取浏览器Cookie的值
* @param {*} name 
* @returns 
*/
export const cookie = name => `; ${document.cookie}`.split(`; ${name}=`).pop().split(';').shift();
```
## 66. 将RGB转换为十六进制
```js
/**
* 66.将RGB转换为十六进制
* @param {*} r 
* @param {*} g 
* @param {*} b 
* @returns 
*/
export const rgbToHex = (r, g, b) =>"#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
```
## 67.生成随机十六进制
```js
/**
* 67.生成随机十六进制
* @returns 
*/
export const randomHex = () => `#${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0")}`;
```
## 68. 滚动到顶部
```js
/**
* 68.滚动到顶部
* @returns 
*/
export const goToTop = () => window.scrollTo(0, 0);
```
## 70. 获取当前页面的滚动位置
```js
/**
* 70获取当前页面的滚动位置
* @param {*} el 
* @returns 
*/
export const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});
// 事例
//getScrollPosition(); // {x: 0, y: 200}
```
## 71.获得两个日期之间的差异（以天为单位
```js
/**
* 71.获得两个日期之间的差异（以天为单位
* @param {*} dateInitial 
* @param {*} dateFinal 
* @returns 
*/
export const getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
(dateFinal - dateInitial) / (1000 * 3600 * 24);
```
## 72.获得给定毫秒数的可读格式
```js
/**
* 72.获得给定毫秒数的可读格式
* @param {*} ms 
* @returns 
*/
export const formatDuration = ms => {
  if (ms < 0) ms = -ms;
  const time = {
    day: Math.floor(ms / 86400000),
    hour: Math.floor(ms / 3600000) % 24,
    minute: Math.floor(ms / 60000) % 60,
    second: Math.floor(ms / 1000) % 60,
    millisecond: Math.floor(ms) % 1000
  };
  return Object.entries(time)
  .filter(val => val[1] !== 0)
  .map(([key, val]) => `${val} ${key}${val !== 1 ? 's' : ''}`)
  .join(', ');
};
```
## 73. 将一组表单元素转化为对象
```js
/**
* 73.将一组表单元素转化为对象
* @param {*} form 
* @returns 
*/
export const formToObject = form =>
Array.from(new FormData(form)).reduce((acc, [key, value]) => ({
  ...acc,
  [key]: value
}),{});
// 事例
// formToObject(document.querySelector('#form')
```
## 74. 创建一个包含当前URL参数的对象
```js
/**
* 74.创建一个包含当前URL参数的对象
* @param {*} url 
* @returns 
*/
export const getURLParameters = url =>
(url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
(a, v) => ((a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a),{});
```
## 75.检查指定的元素在视口中是否可见
```js
/**
* 75.检查指定的元素在视口中是否可见
* @param {*} el 
* @param {*} partiallyVisible 
* @returns 
*/
export const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
  const { top, left, bottom, right } = el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;
  return partiallyVisible
  ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
    ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
  : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};
// 事例
// elementIsVisibleInViewport(el); // 需要左右可见
// elementIsVisibleInViewport(el, true); // 需要全屏(上下左右)可以见
```
## 76. 检查父元素是否包含子元素
```js
/**
* 76.检查父元素是否包含子元素
* @param {*} parent 
* @param {*} child 
* @returns 
*/
export const elementContains = (parent, child) => parent !== child && parent.contains(child);
// 事例
//elementContains(document.querySelector('head'), document.querySelector('title'));// true
```
## 77. html类操作
```js
/**
* 77.
* @param {*} el 
* @param {*} className 
* @returns 
*/
export const toggleClass = (el, className) => el.classList.toggle(className)
export const hasClass = (el, className) => el.classList.contains(className)
```
## 78. 转base64
```js
/**
* 78
* @param {*} img 
* @param {*} callback 
*/
export const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
```
## 79. 转base64_2
```js
/**
* 79. 转base64_2
* @param {*} file 
* @returns 
*/
export const getBase64_2 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
```
## 80. 生成uuid
```js
/**
* 80
* uuid
* @returns 
*/
export const uuid = () => {
  const temp_url = URL.createObjectURL(new Blob())
  const uuid = temp_url.toString()
  URL.revokeObjectURL(temp_url) //释放这个url
  return uuid.substring(uuid.lastIndexOf('/') + 1)
}
```
## 81. 判断两个页面是否相同
```js
/**
* 81
* @param {*} obj1 
* @param {*} obj2 
* @returns 
*/
export const isObjectEqual = (obj1, obj2) => {
  let o1 = obj1 instanceof Object;
  let o2 = obj2 instanceof Object;
  if(!o1 || !o2) {    // 如果不是对象 直接判断数据是否相等
    return obj1 === obj2
  }
  // 判断对象的可枚举属性组成的数组长度
  if(Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }
  for(let attr in obj1) {
    let a1 = Object.prototype.toString.call(obj1[attr]) == '[object Object]'
    let a2 = Object.prototype.toString.call(obj2[attr]) == '[object Object]'
    let arr1 = Object.prototype.toString.call(obj1[attr]) == '[object Array]'
    if(a1 && a2) {
    // 如果是对象继续判断
      return isObjectEqual(obj1[attr], obj2[attr])
    } else if(arr1){
      // 如果是对象 判断
      if(obj1[attr].toString() != obj2[attr].toString()){
        return false;
      }
    } else if(obj1[attr] !== obj2[attr]) {
    // 不是对象的就判断数值是否相等
      return false
    }
  }
  return true
}
```
## 82. 下载文件
```js
/**
* 82
*/
const downloadFile = (api, params, fileName, type = 'get') => {
  axios({
    method: type,
    url: api,
    responseType: 'blob', 
    params: params
  }).then((res) => {
    let str = res.headers['content-disposition']
    if (!res || !str) {
      return
    }
    let suffix = ''
    // 截取文件名和文件类型
    if (str.lastIndexOf('.')) {
      fileName ? '' : fileName = decodeURI(str.substring(str.indexOf('=') + 1, str.lastIndexOf('.')))
      suffix = str.substring(str.lastIndexOf('.'), str.length)
    }
    //  如果支持微软的文件下载方式(ie10+浏览器)
    if (window.navigator.msSaveBlob) {
      try {
        const blobObject = new Blob([res.data]);
        window.navigator.msSaveBlob(blobObject, fileName + suffix);
      } catch (e) {
        console.log(e);
      }
    } else {
      //  其他浏览器
      let url = window.URL.createObjectURL(res.data)
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', fileName + suffix)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(link.href);
    }
  }).catch((err) => {
    console.log(err.message);
  })
  }
```
## 83 获取 base URL
```JS
const getBaseURL = (url) => url.replace(/[?#].*$/, '')

getBaseURL('http://url.com/page?name=Adam&surname=Smith')
// 'http://url.com/page'
```
## 84. 检查 URL 是否为绝对路径
```js
const isAbsoluteURL = (str) => /^[a-z][a-z0-9+.-]*:/.test(str)

isAbsoluteURL('https://google.com') // true
isAbsoluteURL('ftp://www.myserver.net') // true
isAbsoluteURL('/foo/bar') // false
```
## 85. 检查一个元素是否包含另一个元素
```js
  const elementContains = (parent, child) =>
  parent !== child && parent.contains(child)

  elementContains(document.querySelector('head'), document.querySelector('title'))
  // true
  elementContains(document.querySelector('body'), document.querySelector('body'))
  // false
```
## 86. 获取元素的所有祖先元素
```js
const getAncestors = (el) => {
  let ancestors = []
  while (el) {
    ancestors.unshift(el)
    el = el.parentNode
  }
  return ancestors
}

getAncestors(document.querySelector('nav'))
// [document, html, body, header, nav]

```
## 87. 点击元素外部的事件
```js
const onClickOutside = (element, callback) => {
  document.addEventListener('click', (e) => {
    if (!element.contains(e.target)) callback()
  })
}

onClickOutside('#my-element', () => console.log('Hello'))
// 当用户点击#my-element外部时将输出'Hello'

```
## 88. 获取选定的文本
```js
const getSelectedText = () => window.getSelection().toString()

getSelectedText() // 'Lorem ipsum'

```
## 89. 将文本复制到剪贴板
```js
const copyToClipboard = (str) => {
  if (navigator && navigator.clipboard && navigator.clipboard.writeText)
    return navigator.clipboard.writeText(str)
  return Promise.reject('The Clipboard API is not available.')
}
```
## 89. 为 HTML 元素添加样式
```js
const addStyles = (el, styles) => Object.assign(el.style, styles)

addStyles(document.getElementById('my-element'), {
  background: 'red',
  color: '#ffff00',
  fontSize: '3rem',
})

```
## 90. 日期获取时间
```js
const getColonTimeFromDate = (date) => date.toTimeString().slice(0, 8)

getColonTimeFromDate(new Date()) // '08:38:00'

```
## 91. 从日期生成 UNIX 时间戳
```js
const getTimestamp = (date = new Date()) => Math.floor(date.getTime() / 1000)

getTimestamp() // 1602162242

```
## 92. 检查当前用户的首选语言
```js
const detectLanguage = (defaultLang = 'en-US') =>
  navigator.language ||
  (Array.isArray(navigator.languages) && navigator.languages[0]) ||
  defaultLang

detectLanguage() // 'nl-NL'

```
## 93. 检查当前用户的首选颜色方案
```js
const prefersDarkColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches

prefersDarkColorScheme() // true

```
## 94. 检查设备是否支持触摸事件
```js
const supportsTouchEvents = () => window && 'ontouchstart' in window

supportsTouchEvents() // true
```
## 94. 缓存结果，防止多次使用相同参数调用计算代价高昂
```js
function memoize(func) {
  const cache = new Map();
  return function() {
    const key = JSON.stringify(arguments);
    if (cache.has(key)) {
        return cache.get(key);
    }
    const result = func.apply(this, arguments);
    cache.set(key, result);
    return result;
  };
}
```
## 95. curry
```js
function curry(func, arity = func.length) {
  return function curried(...args) {
    if (args.length >= arity) return func(...args);
    return function(...moreArgs) {
      return curried(...args, ...moreArgs);
    };
  };
}
```
## 96. partial
```js
function partial(func, ...args) {
  return function partiallyApplied(...moreArgs) {
    return func(...args, ...moreArgs);
  }
}
```
## 97. pipe
```js
function pipe(...funcs) {
  return function piped(...args) {
    return funcs.reduce((result, func) => [func.call(this, ...result)], args)[0];
  };
}
```
## 98. Compose
```js
function compose(...funcs) {
  return function composed(...args) {
    return funcs.reduceRight((result, func) => [func.call(this, ...result)], args)[0];
  };
}
```
## 99. pick
```js
function pick(obj, keys) {
  return keys.reduce((acc, key) => {
    if (obj.hasOwnProperty(key)) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
}
```
## 100. omit
```js
function omit(obj, keys) {
  return Object.keys(obj)
    .filter(key => !keys.includes(key))
    .reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {});
}
```
