---
nav: 规范
group: 基础
order: 3
toc: content
---
# 如何让代码更优雅

## 什么样的代码是优雅的代码
咱先聊聊，什么样的代码是优雅的代码，在我看来，优雅的代码包括以下方面，首先就是代码的简洁，能够使用一行代码解决的，就不要写两行及以上，其次就是便于阅读，代码不仅仅是用来让机器（服务器，浏览器）来运行的，而是需要用人来编写，维护的，可能是自己，也可能是现在的同事，未来的同事，这个就是代码的可维护性，还有一个就是我们很关注的就是性能，就比如我们经常写的循环，在满足业务功能条件的时候，能少一次循环就少一次循环，还有就是不再使用的引用类型的数据，要及时手动的进行内存的释放，（虽然有垃圾回收机制），但是早一点释放内存是不是更好呢

## 注释
注释，写代码少不了注释，尤其是优雅的代码，更少不了注释；注释是给人看的，可能是自己，也可能是同事以及未来的同事看的，（这几句话说了好多遍了），那么我们为什么要写注释，以及该怎么样去写注释呢？，接下来咱就先来聊聊注释

### 在哪些地方需要添加注释
通用的规则是在代码不清晰时需要添加注释，个人觉得包含以下几个方面：

1. 难于理解的代码添加注释（逻辑比较复杂，嵌套层级比较多，传递参数不明显等）
2. 可能被误认为错误的代码（没有按照正常套路出牌的代码
3. 数据的状态（就拿订单状态来说，订单可能有多钟状态，此时在写这段的叶落逻辑的时候，就把不同的状态表示的含义写上去，以后的维护，或者是有新人接收这个项目的时候能够更快的上手）
4. 其他注释（文档注释，变量注释，函数注释)

### 文档注释
简单描述当前js文件作用，是页面js逻辑处理，还是公共的方法等

### 变量注释
注明变量是用来做什么的，来进行语义化的命名，需要注释的则加上注释

```javascript
// difference
let uName = 'Symbol卢'; // 虽然用了驼峰，但是简写严重。无法直观看出变量的含义
// grace
let userName = 'Symbol卢'; // 语义化命名，不能过于缩写
```

### 函数的注释
参数注释包括参数的数据类型，参数的命名语义化，返回参数注释包括了默认值，已经返回参数的数据类型

```javascript
/**
 * @description: 数据类型的检测的第二种方式
 * @param {any} data 要检测数据类型的变量
 * @return {string} type 返回具体的类型名称【小写】
 */
export const $typeOf = (data) => {
  return Object.prototype.toString.call(data).replace(/\[object (\w+)\]/, '$1').toLowerCase()
}
```

### 定义变量
定义局部的变量的时候使用let ,定义全局的变量的时候使用var,要记住一个原则就是，变量的声明要只在其声明的代码块中有效,在window对象中定义全局的变量，容易污染全局的环境，在平时的工作中，多人协作，很有可能会出现小惊喜，所有要慎重慎重，再慎重

```javascript
  if (true) {
    let x = 'hello';
  }
  let name = () => {
    // ...  
  }
  // difference
  one.js
  window.name = 'Symbol卢';
  two.js
  window.name = 'Jack李';
  three.js
  window.name = 'Leo';
```

## 给常量赋值
对于引用数据类型(也包括接口中返回的数据)，要做好兜底（没有数据的话，给个默认值）你怎么却确定它里面一定有值?

```javascript
  let lastName = fullName[1] || ''
  let propertyValue=Object.attr || 0
```



（1）要按强类型风格写代码定义变量的时候要指明类型，并且在变量声明之后，不要随意的去更改变量的数据类型，改着改着搞不好就出问题了

```javascript
// 假设声明三个变量a,b,c
let a,b,c; // difference，定义变量时没有指明类型
let a = "", b = [], c = {}; // good
// difference
let a = ""; 
...
a = 100; // 改变了定义变量时的类型(容易出错问题哦！)
let b = 5;  
...
b = 200; // grace 定义了数据类型之后，就不要去随便的更改它
```



2、避免使用 == 进行逻辑判断（不要给自己的代码埋雷）  
大家也都知道，js是一门弱类型的语言，表达式的赋值运算等操作也都会导致数据类型的转换，==   表示只要值相等即为真，===  要求不仅值相等，而且也要求类型相同，这句话相信大家也都知道但是它们之前的运算规则是什么样的呢？咱们下一篇的js中的数据类型的时候再好好的聊聊；  
使用== 有时候会达不到预期的结果，埋下隐患,来看看下面的这些情况（你品，你细品

```javascript
0  == ''          // true
0  == '0'         // true
'' == 0           // true
'' == '0'         // false
false == '0'        // true
false == 'false'    // false
false == undefined  // false
false == null       // false
null == undefined   // true
true == 1           // true
```



如果确定了这个变量的数据类型，那么就没必要使用 == 多巧一个等号，给程序多一份保障，又不要钱，怕啥？？干就完了；判断调试的时候就使用===，那数据类型不确定咋办，，，，（小声逼逼，数据类型不确定，那就动动发财手，转换一下数据类型呗）  
如果变量的数据类型不确定，那咱就手动的转换一下，让它确定

```javascript
let total = "6";
if(total == 6) {} // difference
if(parseInt(total) === 6){} // grace 手动转换一下数据类型
```

## 数组
在对数组进行操作的时候，推荐优先使用ES6+中的新的语法

```javascript
// 数组拷贝
// difference
let items=['1','2','3'];
let items2=['4','5','6'];
for (i = 0; i < items.lenght; i++){
    items.push(items2[i]);
}
// grace
const itemsCopy = [...items];


// 扩展运算符简写
// joining arrays 
const odd = [1, 3, 5];
const nums = [2 ,4 , 6].concat(odd);
// cloning arrays 
const arr = [1, 2, 3, 4]; 
const arr2 = arr.slice()

// joining arrays 
const odd = [1, 3, 5 ]; 
const nums = [2 ,4 , 6, ...odd]; 
console.log(nums); // [ 2, 4, 6, 1, 3, 5 ]
// cloning arrays 
const arr = [1, 2, 3, 4]; 
const arr2 = [...arr];
```



使用数组成员对变量赋值时，优先使用解构赋值。

```javascript
const Arr = [1, 2, 3, 4];

// difference
const first = Arr[0];
const second = Arr[1];

// grace
const [first, second] = Arr; // 有简单的方法。肯定要用简单的方法啦
```

## 函数
函数是我们工作当中用到非常多的，但是如何写出优雅的函数呢？？接下来咱就来用函数的命名，函数的入参，参数校验，函数的出参等几个方面来一起聊聊如何让你写的函数更加的优雅

### 函数的命名
函数的命名，我们首先就是需要语义化 （功能性命名，也就是说，这个函数是为干什么事情而生的），比如：返回布尔值函数应以is/can/has等单词开头，能够让人更直观的了解到这个函数的功能；获取接口中的数据使用get开头进行命名。

```javascript
let isEmpty = () => {...}
let canCreateDocuments = () => {...}
let hasLicense = () => {...}

// 不用「否定」语法命名函数
//difference
let isNotSupport = () => {};
let canNotUpdate = () => {};

// grace
let isSupport = () => {};
let canUpdate = () => {};
```



动作函数要以动词开头

```javascript
  let sendEmailToUser = (user) => {
    ....
  }
  let geUserInfo = (user) => {
    ....
  }
  let setUserInfo = (user) => {
    ....
  }
```

### 优先使用箭头函数
箭头函数相比于传统的函数（function）而言，箭头函数更简洁，并且也绑定好 了this（箭头函数不会去改变this的指向）。

```javascript
let arr [18, 19, 20, 21, 22,23,24,25]
// commonly
function findAge (arr, age) {
    return arr.filter(function (num) {
        return num === age
    })
}
// grace 是不是看着更简介优雅了
let findAge = (arr, age)=> arr.filter(num => num === age)
```

### 函数的入参
函数的入参，是能够让使用者，在调用这个函数的时候，能够更加的清晰明了的把这个函数所需要的参数传递给函数，不容易出现，参数传递错误（参数的顺序颠倒等）一些低级，而又不好查找的问题，

```javascript
// difference
function getImages(api, true, false); // true和false啥意思，没有个注释的话，看上去就是一脸懵逼
// grace
function getImages({
  imageApi: api,
  includePageBackground: true, // 一目了然，知道这些true和false是啥意思
  compress: false,
})
```

### 接收参数
如果函数的的参数是对象，也要优先使用解构赋值，上代码

```javascript
// 假设现在的场景是获取用户的信息上的现用名，和曾用名
// difference
function getFullName(user) {
  const firstName = user.firstName;
  const lastName = user.lastName;
}
// commonly
function getFullName(obj) {
  const { firstName, lastName } = obj;
}
// grace
function getFullName({ firstName, lastName }) {
}

// grace 给它个默认值
function getFullName({firstName, lastName = '无'}) {
}
 
// 觉得参数的名称太长，咱再来个重命名  解构时重命名简化命名
// grace
function getFullName ({firstName: first, lastName: last}) {
 
}
```

### 参数校验
更少的嵌套，不满足条件尽早 return，尽可能的减少嵌套，嵌套的层级越少，函数看着越简洁优雅

```javascript
function test(name, sex = 1) {
  if (!name){ // 不满足条件尽早抛出错误
      throw new Error('没有传递name参数');
  }
  // ...
}
```

### 函数的出参
聊完了函数的入参，咱在聊聊函数的出参，在函数的出参中，首先就是要保证函数出参的数据类型是固定的，如果函数返回多个值，优先推荐优先使用对象作为返回值，而不是数组。为什么呢？？？因为对象作为返回值，更便于以后添加返回值，以及更改返回值的顺序，相对于数组更加的灵活，更便于扩展

```javascript
  // 注意，返回参数的数据类型要是固定的，
// difference返回了不同的数据类型
function getResult(cont) {
	if(count < 0) {
		return "";
	} else {
		return count * 10;
	}
}

// grace
function getResult(cont) {
	if(count < 0) {
		return -1;
	} else {
		return count * 10;
	}
}

// 函数返回多个值，推荐使用对象作为函数的返回值
// commonly
function processInput(input) {
  return [left, right, top, bottom];
}

// grace
function processInput(input) {
  return { left, right, top, bottom };
}
const { left, right } = processInput(input);
```

### 优先使用函数式编程
```javascript
// difference
for(i = 1; i <= 10; i++) {
   a[i] = a[i] +1;
}
// grace
let b = a.map(item => ++item) //是不是更简洁了
```

### 函数中过多的采用if else ..
```javascript
  // commonly
if (a === 1) {
    //...
} else if (a ===2) {
   // ...
} else if (a === 3) {
    //...
} else {
   //...
}
// 一般
switch(a) {
  case 1:
  //....
  case 2:
  //....
  case 3:
  //....
  default:
  //....
} 
// grace ===》》》 Object
const fruit = {
    1: ['1', '11'],
    2: ['2', '22'],
    3: ['3', '33']
 };
let test = (a) => {
  return fruit[a] || [];
}
// grace ===》》》 Map
const fruit = newMap()
  .set('张三', ['张三丰', '张三力'])
  .set('李四', ['李思维', '李素丽'])
let test = (a) => {
	return fruit.get(a) || [];
}

// grace ===》》》filter
const fruits = [
    { name: '张三', work: 'js' }, 
    { name: '李四', work: 'php' }, 
    { name: '王五', work: 'java' }, 
];
let test = (a) => {
  return fruits.filter(item => item.name === a);
}

// grace===》》》策略模式
let handler = {
    1: () => {
        //....
    },
    2: () => {
        //....
    },
    3: () => {
        //....
    },
    default: () => {
        //....
    }
}
handler[a]() || handler['default']()
```



一个函数完成一个独立的功能，不要一个函数混杂多个功能，在项目开发中有一条非常重要的原则【单一原则】所谓的单一原则就是，一个函数（文件），只做一件事情，在开发当中，没有那个项目是开发完成之后，就结束了。需要不断的更新，维护，那么单一原则，就是为了方便开发，和维护的，不要让一个函数“又当爹，又当妈”，这样代码的耦合性太高了，不好维护.

## 逻辑运算符
```javascript
if (a === 1) {
    b()
}
//可以写成
a === 1 && b()


const arr = [1,2,3];
if(!arr.length){
   b()
 }
//可以写出
arr.length || b()

// &&判断依赖的键是否存在，防止报错'xxx of undfined'
let user = {
    name: 'Symbol卢',
    age: 18,
    children: {
        name: '小Symbol卢'
    }
}
let childrenName = user.children && user.childre.name
//能使用三目运算符（三元运算符）就使用，留着舍不得用，要留着过年用嘛
// difference
const a = '';
let b;
if( a === '' ){
    b = 'no'
} else {
    b = 'ok'
}

const a = ''
let b = a ? 'no' : 'ok'; // 'ok'
```



判断元素是否存在，当类型为undefined或null或空的string（' '）或0时,可以直接使用if(a)/if(!a)的形式。当类型为array或object时，就可以使用if(a instanceof Array)或if(a instanceof String)的形式进行判断,这里也送上笔者之前写的一个关于数据类型判断的一个函数

```javascript
/**
 * @description: 数据类型的检测的第二种方式
 * @param {any} data 要检测数据类型的变量
 * @return {string} type 返回具体的类型名称【小写】
 */
export const isTypeOf = (data) => {
    return Object.prototype.toString.call(data).replace(/\[object (\w+)\]/, '$1').toLowerCase()
}
```

## 总结
在自己完成某一个功能之后，问问自己，除了自己当前的写法，还有没有其他更简洁的写法呢？？？

