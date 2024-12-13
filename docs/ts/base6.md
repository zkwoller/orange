---
order: 7
toc: content
group: 基础
---
# TS模块化

<font style="color:rgb(56, 56, 56);">TS模块化是建立在JS模块化的基础上，与JS中的写法有许多的不同之处。TS极大地支持了主流的ESM和CommomJs，也对其他的模块化方案有所兼容。</font>

## 一、ES 模块化语法
### 1.export 导出
<font style="color:rgb(56, 56, 56);">TS支持ES模块化方案，写法和JS中一致。</font>

```typescript
// ModuleA.ts
export var a = 1
export const b = function(){
  // ...
}
export let c = () => {
  // ...
}
// 设置默认导出项，仅TS中可导出interface、type等
export default interface Person {
  name: string,
    age: number
}
```

### 2. import 导入
+ <font style="color:rgb(56, 56, 56);">使用import加载其它模块，和JS中一致，可以使用 </font>**<font style="color:rgb(56, 56, 56);">as</font>**<font style="color:rgb(56, 56, 56);"> 重命名。</font>

```typescript
// main.ts
import { a, b, c as RenamedC } from './ModuleA'
import Person from './ModuleA'
```

+ <font style="color:rgb(56, 56, 56);">可以混合导入，但是默认项必须写在前面。</font>

```typescript
// main.ts
import Person, { a, b, c as RenamedC } from './ModuleA'
```

+ <font style="color:rgb(56, 56, 56);">可以使用 **import *** 来导入所有内容，并用 </font>**<font style="color:rgb(56, 56, 56);">as</font>**<font style="color:rgb(56, 56, 56);"> 重命名。</font>

```typescript
// main.ts
import * as M from './ModuleA'
```

+ <font style="color:rgb(56, 56, 56);">可以使用 import + 文件名 来导入一个文件，这种情况下，被导入的文件中的代码会被执行，可能会对当前作用域中的变量产生影响。</font>

```typescript
// main.ts
import './ModuleA'
```

+ <font style="color:rgb(56, 56, 56);">TS特有的语法</font>

<font style="color:rgb(56, 56, 56);">   JS中没有interface、type等概念，没有相应的关键字。因此，interface和type语句是TS特有的导出语法。</font>

```typescript
// ModuleB.ts
export type Cat = { breed: string; yearOfBirth: number };

export interface Dog {
  breeds: string[];
  yearOfBirth: number;
}

export const c = 1
```

<font style="color:rgb(56, 56, 56);">导入时正常导入就行了。</font>

_**<font style="color:rgb(56, 56, 56);">import type</font>**_<font style="color:rgb(56, 56, 56);"> </font><font style="color:rgb(56, 56, 56);">语法</font>

<font style="color:rgb(56, 56, 56);">该语法只能用来导入类型。</font>

```typescript
// 不能导入变量c
import type {Cat, Dog} from './ModuleB'
```

+ <font style="color:rgb(56, 56, 56);">具有 CommonJs 表现的 ES 语法</font>

<font style="color:rgb(56, 56, 56);">使用 </font>**<font style="color:rgb(56, 56, 56);">export = { // ... }</font>**<font style="color:rgb(56, 56, 56);"> 来导出的模块，既可以用CommonJs语法导入，也可以用ESM的兼容语法 import a = require('./xxx') 语法导入。</font>

```typescript
// ModuleX.ts
export = {
  name: 'x'
}

// app.ts
const a = require('./ModuleX')  // 不推荐
import b = require('./ModuleX')  // 推荐写法
```

## 二、CommonJs 模块化语法
**<font style="color:rgb(56, 56, 56);">通过 全局变量 module 上的 exports 属性来设置导出的内容</font>**<font style="color:rgb(56, 56, 56);">。</font>

```typescript
// MathModule.ts
module.exports = {
  pi: 3.14,
  squareTwo: 1.41,
  phi: 1.61,
};
```

<font style="color:rgb(56, 56, 56);">对应的，使用 </font>**<font style="color:rgb(56, 56, 56);">require</font>**<font style="color:rgb(56, 56, 56);"> 来导入。</font>

```typescript
// main.ts
const math = require('./MathModule')
// 或者也可以解构
const {pi, squareTwo} = require('./MathModule')
```

<font style="color:rgb(56, 56, 56);">TS系列基础篇就写到这儿了，累了，TS进阶篇再见。另外，想进一步了解TS模块化的知识，可以参考我的</font>**<font style="color:rgb(56, 56, 56);">TS进阶系列</font>**<font style="color:rgb(56, 56, 56);">：</font>[深入理解TS模块](./advanced8)<font style="color:rgb(56, 56, 56);">。</font>

