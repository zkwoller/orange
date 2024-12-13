---
group: 基础
order: 3
toc: content
---
# function

## 1. 手写call，apply，bind

call, apply 使用一个指定的this值调用某个函数
  1. 将函数设为对象属性
  2. 执行函数
  3. 删除该对象属性
```js
Function.prototype.newCall = function(context, ...args){
  if(typeof this !== 'function') throw new Error('no function')
  context = context || window

  const key = Symbol()
  context[key] = this

  const result = context[key](...args)
  delete context[key]
  return result
}
```
```js
Function.prototype.newApply = function(context, args){
  if(typeof this !== 'function') throw new Error('no function');
  context = context || window;

  const key = Symbol()
  context[key] = this;

  var result = context[key](...args);
  delete context[key];
  return result;
}
```
bind 
  1. 创建一个新函数，使用第一个参数作为运行新函数的 this  其他参数作为新函数的入参
  2. 新建一个函数 F() 作为参数返回值
  3. 创建一个 函数 f() f.prototype = this.prototype F.prototype = new f()
  4. 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
  5. 函数调用的时候，新传入的参数跟之前提取的参数合并为一个数组
  6. self.apply( this instanceof F ? this : context, arg ) '是否 new 调用', this instanceof fBound"
```js
Function.prototype.newBind = function(context, ...args){
  if(typeof this !== 'function') throw new Error('no function')
  const fn = this
  args = args ? args : []
  return function newFn(...newFnArgs) {
    if (this instanceof newFn) {
      return new fn(...args, ...newFnArgs)
    }
    return fn.apply(context, [...args,...newFnArgs])
  }
}
```
## 2. 手写 new 函数
  1. 创建一个用户定义的对象类型实例
  2. 先从 Object.prototype 克隆一个对象 O
  3. Constructor 是外部传入的构造器
  4. O.__proto__ = Constructor.prototype
  5. ret = Constructor.apply(O, arguments) 借用构造器给obj设置属性
  6. ret || O 总是返回一个对象
```js
function New(){
  var obj = new Object();
  var Constructor = Array.prototype.shift.call(arguments)
  obj.__proto__ = Constructor.prototype
  let ret =Constructor.apply(obj, arguments)
  return typeof ret === 'object' ? ret : obj
}
```
## 3. instanceof
```js
function instanceOf(l, r){
  while(true){
    if(l === null) return false
    if(l.__proto__ === r.prototype) return true
    l = l.__proto__
  }
}
```
## 4.  防抖
无论触发多少次，都是 N 秒后执行
  1. 定义一个定时器 变量
  2. 函数内，获取 this 参数
  3. 函数内，设置定时器
  4. 返回一个包装后的函数
```js
  function debounce(fn, wait, immediate) {
    var timeout, result
    var debounced = function(){
      var context = this
      var args = arguments
      // 如果存在，取消后 wait 秒后再调用
      if(timeout) clearTimeout(timeout)
      if(immediate){
        // 立即触发
        // 如果没有触发过，则直接触发
        var caller = !timeout
        timeout = setTimeout(function(){
          timeout = null
        }, wait)
        if(caller) result = fn.apply(context, args)
      }else{
        timeout = setTimeout(function(){
          result = fn.apply(context, args)
          timeout = null
        }, wait)
      }
      return result
    }
    // 取消
    debounced.cancel = function(){
        if(timeout) clearTimeout(timeout)
        timeout = null
    }
    return debounced
  }
```
## 5. 节流
一段时间内无论触发多少次，只执行一次
  1. 定义一个下次触发时间的变量
  2. 通过设置当前时间戳 + 时间间隔的方式来控制是否触发事件

 时间戳实现，会立刻执行，停止触发后没有办法再执行事件
```js
function throttle(fn, wait){
  var prev = 0
  var throttled = function(){
    var now = +new Date()
    var context = this
    var args = arguments
    if(now - prev > wait){
      fn.apply(context, args)
      prev = now
    }
  }
  return throttled
}
```
 定时器实现 n 秒后第一次执行，停止触发后依然会再执行一次事件
```js
function throttle(fn, wait){
  var timeout
  var throttled = function(){
    var context = this
    var args = arguments
    if(!timeout){
      timeout = setTimeout(function(){
        timeout = null
        fn.apply(context, args)
      }, wait)
    }
  }
  return throttled
}
```
```js
/**
* 6.
* @param {function} fn 执行方法
* @param {number} wait 等待时间
* @param {配置} options leading：是否允许立即执行 trailing：是否允许最后一次执行
* @returns
*/
function throttle(fn, wait, options) {
  options = options || {}
  var result, context, args, timeout
  var prev = 0
  var later = function(){
    prev = options.leading === false ? 0 : +new Date()
    timeout = null
    result =fn.apply(context, args)
  }
  var t = function(){
    var now = +new Date()
    prev = !prev && options.leading === false ? now : prev
    var r = wait - (now - prev)
    context = this
    args = arguments
    if(r > wait || r <= 0){
      if(timeout){
        clearTimeout(timeout)
        timeout = null
      }
      prev = now
      result = fn.apply(context, args)
    }else if(!timeout && options.trailing !== false){
      timeout = setTimeout(later, r)
    }
    return result
  }
  t.cancel = function(){
    clearTimeout(timeout)
    timeout = null
    prev = 0
  }
  return t
}
```
## 6. 发布订阅 EventEmitter
 一对多
  消息的发送者（称为发布者）不会将消息直接发送给特定的接收者（称为订阅者）。
  而是将发布的消息分为不同的类别，然后分别发送给不同的订阅者。
```js
class EventEmitter{
  constructor(){
    this.cache = {}
    return this
  }
  on(type, event){
    if(!this.cache[type]) this.cache[type] = []
    if(this.cache[type].indexOf(event) == -1){
      this.cache[type].push(event)
    }
    return this
  }
  off(type, event){
    if(!this.cache[type]) return this
    this.cache[type] = this.cache[type].filter(e => e !== event)
    return this
  }
  once(type, event){
    let _event = function(){
      event.apply(this, arguments)
      this.off(type, _event)
    }
    this.on(type, _event)
    return this
  }
  emit(){
    let type = arguments[0]
    let args = Array.prototype.slice.call(arguments, 1)
    let list = this.cache[type] || []
    for (const event of list) {
      event.apply(this, args)
    }
    return this
  }
}
```
## 7. 观察者模式 Observer

观察者模式，它定义了一种一对多的关系，让多个观察者对象同时监听某一个主题对象，
这个主题对象的状态发生变化时就会通知所有的观察者对象，使得它们能够自动更新自己。
在观察者模式中有两个主要角色：Subject（主题）和 Observer（观察者）。
```js
class Observer {
  constructor(name){
    this.name = name
  }
  notify(){
    console.log(`${this.name} has been notified`)
  }
}
class Subject {
  observers = []
  addObserver(observer){
    console.log(observer.name, 'is push')
    this.observers.push(observer)
  }
  deleteObserver(observer){
    console.log('remove observer: ', observer.name)
    this.observers = this.observers.filter(o => o !== observer)
  }
  notifyObservers(){
    console.log('notify')
    this.observers.forEach(o => o.notify())
  }
}
```
## 8. 继承

### 1. 原型链继承

缺点
  * 引用类型的属性被所有实例共享
  * 创建 Child 实例无法向 Parent 传参
  * child.__proto__ === Child.prototype === new Parent
  * child.__proto__.constructor === Parent
```js
function Parent(){
  this.name = 'Parent'
}
Parent.prototype.say = function(){
  console.log(this.name)
}

function Child(){

}

Child.prototype = new Parent()

var child = new Child()
console.log(child.__proto__ === Child.prototype) // true
console.log(child.__proto__.constructor === Parent) // true
child.say()
```
### 2.借用构造函数继承

 优点
 * 避免了引用类型被共享的问题
 * Child 可以向 Parent 传参

 缺点
 * 每次创建实例都会创建一遍父类方法

 child.__proto__ === Child.prototype

 child.__proto__.constructor === Child
```js
 function Parent(name){
  this.name = name
  this.say = function(){
      console.log(this.name)
  }
}

function Child(){
  Parent.apply(this, arguments)
}

var child = new Child('child')
console.log(child.__proto__ === Child.prototype) // true
console.log(child.__proto__.constructor === Child) // true
child.say() // child
```
###  3. 组合模式
 优点：
 * 避免了引用被共享
 * 不需要重复创建方法

 缺点：
 * 需要多 new 一次
```js
 function Parent(name){
  this.name = name
}
Parent.prototype.say = function(){
  console.log(this.name)
}
function Child(name){
  Parent.apply(this, arguments)
}
Child.prototype = new Parent()
Child.prototype.constructor = Child
var child = new Child('child')
console.log(child.__proto__ === Child.prototype) // true
console.log(child.__proto__.constructor === Child) // true
child.say() // child
```
###  4. 原型式继承

 缺点
 * 引用类型共享

 child.__proto__ === parent
 child.__proto__.constructor === Object
```js
 function CreateObj(o){
  function F(){}
  F.prototype = o
  return new F()
}
var parent = {
  name: 'parent',
  say: function(){
      console.log(this.name)
  }
}
var child = CreateObj(parent)
child.say()
console.log(child.__proto__ === parent)
console.log(child.__proto__.constructor === Object)
```
###  5. 寄生式继承
创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来做增强对象，最后返回对象。
```js
 function CreateObj(o){
  function F(){}
  F.prototype = o
  return new F()
}
var parent = {
  name: 'parent',
  say: function(){
      console.log(this.name)
  }
}
var Child = function(o, name){
  var clone = CreateObj(o)
  clone.name = name
  return clone
}
var child = Child(parent, 'child')
child.say()
console.log(child.__proto__ === parent)
console.log(child.__proto__.constructor === Object)
```
### 6. 寄生组合式继承

 优点
 * 只调用了一次父类的构造函数
 * 避免了在 Parent.prototype 上面创建不必要的、多余的属性
 * 原型链还能保持不变；因此，还能够正常使用 instanceof 和 isPrototypeOf
```js
 function inherit(Child, Parent){
  function F(){}
  F.prototype = Parent.prototype
  Child.prototype = new F()
  Child.prototype.constructor = Child
}
function Parent(name){
  this.name = name
}
Parent.prototype.say = function(){
  console.log(this.name)
}
function Child(){
  Parent.apply(this, arguments)
}
inherit(Child, Parent)
var child = new Child('child')
child.say()
console.log(child.__proto__ === Child.prototype)
console.log(child.__proto__.constructor === Child)
```
## 9. 创建对象

### 1. 工厂模式

函数 factory 能够接受参数来构建一个包含必要信息的对象，可以无数次的调用这个函数。而每次都返回一个对象

优点：
  * 批量生成相似对象

缺点：
  *  对象指向同一个原型 ，生成对象无法识别
  * 每个方法都需要创建一次
```js
function factory(name, age){
  var o = new Object()
  o.name = name
  o.age = age
  o.say = function(){
      console.log(`name=${this.name}, age=${this.age}`)
  }
  return o
}

var a = factory('a', 20)
var b = factory('b', 10)
a.say()
b.say()
```
### 2. 构造函数模式
通过构造函数来创建特定类型的对象 要通过 new 操作符
优点：
  * 实例都可以被识别成一种特定类型

缺点：
  * 每次创建实例 每个实例方法都需要被创建一次
```js
function create(name, age){
  this.name = name
  this.age = age
  this.say = function(){
    console.log(`name=${this.name}, age=${this.age}`)
  }
}

var a = new create('a', 20)
var b = new create('b', 10)
a.say()
b.say()
```
### 3. 原型模式
每个函数都有一个 prototype，可以使用原型对象，让所有的对象实例共享它所包含的属性方法
优点：
  *  方法不会重复创建

缺点：
  *  所有属性方法共享，不能初始化参数
```js
function Prototype(){

}
Prototype.prototype = {
    constructor: Prototype,
    name: 'a',
    say:function(){
        console.log(this.name)
    }
}

var a = new Prototype()
var b = new Prototype()
a.say()
b.say()
```
### 4. 组合模式
构造函数跟原型模式双剑合璧。构造函数模式用于定义实例属性，原型属性定义方法和共享属性。

优点
  *  该共享的共享，该私有的私有

缺点
  *  封装性不足
```js
  function Create(name, age){
  this.name = name;
  this.age = age;
}
Create.prototype.say = function(){
  console.log(`name=${this.name}, age=${this.age}`)
}

var a = new create('a', 20)
var b = new create('b', 10)
a.say()
b.say()
```
### 5. 动态原型模式
为了解决独立的构造函数和原型，动态原型模式，把信息封装到构造函数中，而且通过在构造函数初始化原型

优点：
  *  组合模式的优点，且封装性更好

缺点：
  *  多判断一次
```js
function CreatePrototype(name, age){
  this.name = name
  this.age = age
  if(typeof this.say !== 'function'){
    CreatePrototype.prototype.say = function(){
      console.log(`name=${this.name}, age=${this.age}`)
    }
  }
}

var a = new CreatePrototype('a', 20)
var b = new CreatePrototype('b', 10)
a.say()
b.say()
```
### 6. 寄生构造函数模式

创建一个函数，该函数的作用仅仅在封装创建对象的代码，然后返回新创建的对象

缺点：
  *  工厂模式 + new
```js
function NewFactory(name, age){
  var o = new Object();
  o.name = name;
  o.age = age;
  o.say = function () {
    console.log(`name=${this.name}, age=${this.age}`)
  };
  return o;
}

var a = new NewFactory('a', 20)
var b = new NewFactory('b', 10)
a.say()
b.say()
```
### 7. 稳妥函数模式
那些没有公共属性，而且其方法不引用this

优点：
  *  不需要 new 不引用 this

缺点：
  *  生成对象无法识别
```js
function StaticCreate(name, age){
  var o = new Object()
  o.say = function () {
    console.log(`name=${name}, age=${age}`)
  }
  return o
}

var a = new StaticCreate('a', 20)
var b = new StaticCreate('b', 10)
a.say()
b.say()
```
