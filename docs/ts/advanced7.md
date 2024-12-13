---
order: 11
toc: content
group: 进阶
---

# 声明文件

在接触TS的过程中，时常能看到使用declare关键字来进行声明，而它基本都是出现在.d.ts文件中。你是否好奇过，使用declare关键字到底有什么作用？它与不使用declare关键字的声明又有何不同？本文与你一同探索declare的奥秘，讲述如何写好一个声明文件 (.d.ts文件)，需要小伙伴们拥有一定的typescript基础。如果阅读本文过程中遇到不了解的知识点，可查阅我之前的基础篇的文章。

## 一、Declaration Reference 声明指南
我们先来了解到如何**根据****API****文档和用法示例**来编写相关的声明。这部分内容十分简单，基本看一遍过去就ok了。

### 1. 对象和属性
我们通常使用命名空间来声明对象。

+ 文档：全局变量myLib，它有一个greet方法来创建问候语，一个numberOfGreetings属性来记录创建的问候语的数量。
+ 示例：

```typescript
let greeting = myLib.greet("hello, cc!")
console.log(greeting)
let count = myLib.numberOfGreetings
```

+ **声明**：

```typescript
declare namespace myLib {
  function greet(greeting: string): string;
  numberOfGreetings: number;
}
```

### 2. 重载函数
+ 文档：函数printName，接收一个字符串并打印该字符串，或者接收一个字符串数组，打印其中所有的字符串，以逗号连接，最终都返回打印的名字的数量；
+ 示例：

```typescript
let x = printName("cc");	// x=1，控制台输出 "cc"
let y = printName(["cc", "yy"]);	// y=2，控制台输出 "cc","yy"
```

+ **声明**：

```typescript
declare function printName(name: string): number;
declare function printName(name: string[]): number;
```

### 3. 类型 / 接口
先来看interface的声明。

+ 文档：使用greet函数指定问候语时，需要传递一个Option类型的对象作为参数，其具有以下几个属性：
    1. greeting：问候语的内容，为一个字符串；
    2. color：问候语的颜色，为一个表示颜色的字符串，可选；
+ 示例：

```typescript
// color 可选
greet({greeting: "hello, cc!", color: "#ccc"});
greet({greeting: "hello, yy!"});
```

+ **声明**：

```typescript
interface Option {
  greeting: string;
  color?: string;
}
declare function greet(opt: Option): void;
```

很简单对不对，类型别名也很几乎一样，就演示了。

### 4. 类 classes
+ 文档：可以创建一个Greeter实例，也可以通过继承来自定义一个类；
+ 示例：

```typescript
const myGreeter = new Greeter("hello, world");
myGreeter.greeting = "hello, cc!";
myGreeter.showGreeting();
// 自定义类
class SpecialGreeter extends Greeter {
  constructor() {
    super("Very special greetings");
  }
}
```

+ **声明**：

```typescript
// 使用 declare class 来声明
declare class Greeter {
  constructor(greeting: string);
  greeting: string;
  showGreeting(): void;
}
```

### 5. 全局变量
+ 文档：全局变量foo表示函数的总数量；
+ 示例：

```typescript
console.log(`一共有 ${foo} 个函数。`)
```

+ **声明**：

```typescript
declare var foo: number;
```

### 6. 全局函数
+ 文档：传入一个字符串来调用greet；
+ 示例：

```typescript
greet("hello, cc!")
```

## 二、Library Structures库的结构
广义而言，声明文件的构建方式取决于库的使用方式。而在JavaScript中，库的使用方式有多种，因此，我们需要鉴别不同的使用方式，并编写匹配的声明文件。

### 1. 如何识别库的种类
编写声明文件的第一步便是识别库的结构。下面我们来了解一下如何根据库的 **用法** 和 **代码** 来识别库的种类。查看库时主要注意两点：

1. 如何获取该库？例如，是否只能通过npm或者CDN来获取；
2. 如何导入该库？该库是否添加了一个全局对象？是否使用require或者import/export语句。

现代的库基本都属于 **模块**系列。从 **代码** 方面识别，我们可以关注以下的关键字和语句：

+ 无条件调用require或define；
+ 声明语句，如import * as x from "ModuleX"或export x；
+ 赋值给exports或module.exports；
+ 赋值给全局变量window或global。

属于模块系列的模板大概有基础模块modue.d.ts，函数模块module-function.d.ts，类模块module-class.d.ts，和插件模块module-plugin.d.ts，这些将在后面的 **声明模板** 小节来介绍。

### 2. Global Libraries全局库
全局库是无需使用import等语句导入，便可以在全局作用域下使用的库。有些库会暴露一个或多个全局变量来供我们使用。例如，用过jQuery的同学应该会知道全局变量$。往常，我们使用这些全局库，可以通过在html文件中使用<script scr="xxx">标签来提供相应全局变量。但是现在，许多流行的全局库都是当作通用模块化方案UMD的库来写的，且不容易与UMD区分开来。在编写全局库的声明文件之前，一定要确保它们实际上并不是UMD的库。

从 **代码** 层面识别全局库：

+ 全局作用域声明的变量、函数等；
+ 添加给window，global，globalThis等全局对象的属性，如window.xxx；
+ 存在于document等全局DOM变量上的属性；

### 3. UMD
UMD为通用模块化方案，采用该方案的库，既能用作模块（使用导入语句），也可以直接通过暴露的全局变量来使用。UMD模块会检查是否存在模块加载器环境。

```typescript
(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["libName"], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory(require("libName"));
  } else {
    root.returnExports = factory(root.libName);
  }
}(this, function (b) {
  // xxx
})
```

UMD的库往往会在文件的顶层使用typeof define，typeof module，typeof window等来测试运行环境，如果我们看到使用了这些语句的，那么大概率就是UMD的库。文档中一般也会为使用require导入的注明 “Using in Node.js” ，为使用<script>标签来引入的注明"Using in the browser"。

## 三、Consuming Dependencies依赖处理
声明文件中可能需要用到各种相关的依赖，这里介绍如何导入这些依赖。

### 1. 对全局库的依赖
如果我们的编写的库，依赖于其它的全局库，可以使用 [三斜杠指令](https://juejin.cn/post/7075243725210779684)/// <reference types="xxx" />来引入。

```typescript
/// <reference types="someLib" />
function getThing(): someLib.something;
```

### 2. 对模块的依赖
如果我们的库依赖与其它模块，则使用import来导入该模块。

```typescript
import * as moment from "moment";
function getThing(): moment;
```

### 3. 对UMD库的依赖
对UMD库的依赖也分为全局库(以UMD方式构建的全局库) 和 UMD库。

如果我们的库依赖于UMD的全局库 ，也使用[三斜杠指令](https://juejin.cn/post/7075243725210779684)/// <reference types="xxx" />来引入。

```plain
/// <reference types="moment" />
function getThing(): moment;
```

如果依赖于其它的 **模块** 或者严格意义上的UMD**库** ，则使用import来导入。

```typescript
import * as someLib from "someLib";
```

**切勿使用三斜杠指令来引入****UMD****库**，因此，需要分清到底是使用了UMD方式的全局库，还是实际上的UMD库。

## 四、.d.ts 声明文件模板
这里介绍模块相关的.d.ts文件模板。声明模版是用于为库进行声明的，而不是起实际作用的库，真正起作用的是全局修改模块，而不是声明文件本身。

### (一) 模块基础声明模板	modules.d.ts
#### 1. 常见的CommonJs模式
直接上简单的栗子，如下导出一个常量和一个函数：

```typescript
const maxInterval = 12;
function getArrayLength(arr) {
  return arr.length;
}
module.exports = {
  getArrayLength,
  maxInterval,
};
```

则.d.ts声明文件可以如下编写：

```typescript
export function getArrayLength(arr: any[]): number;
export const maxInterval: 12;
```

可以看见，在.d.ts文件中导出的语法，和ES6语法相似。此外，也有**默认导出**。

在CommonJs中可以默认导出任何值。如下默认导出一个正则表达式：

```typescript
module.exports = /hello( world)?/;
```

则在.d.ts文件中，使用export default来进行默认导出。

```typescript
// xxx.d.ts
declare const helloWorld: RegExp;
export default helloWorld;
```

**在****CommonJs****中导出函数**比较特别，因为函数也是一个对象，可以给它添加属性。因此，CommonJs**导出的函数也会包含所添加的属性，但是****.d.ts****文件中需要分别描述**。

```typescript
function getArrayLength(arr) {
  return arr.length;
}
getArrayLength.maxInterval = 12;
module.exports = getArrayLength;	// 包含了getArrayLength.maxInterval属性
```

则在.d.ts文件中如下描述：

```typescript
// 分开导出
export default function getArrayLength(arr: any[]): number;
export const maxInterval: 12;
```

需要注意，在.d.ts文件中使用export default需要我们开启esModuleInterop: true ，如果无法开启，则只能使用旧语法export = xxx来代替。例如，上面的栗子用export = xxx语法来写：

```typescript
declare function getArrayLength(arr: any[]): number;
declare namespace getArrayLength {
  declare const maxInterval: 12;
}
export = getArrayLength;
```

#### 2. 各种导入方式的处理
我们知道，模块的导入有很多写法，如果要支持这些写法，那么我们的库需要做相应的处理。

```typescript
class FastifyInstance {}
function fastify() {
  return new FastifyInstance();
}
fastify.FastifyInstance = FastifyInstance;
// 允许使用 { fastify } 来导入
fastify.fastify = fastify;
// 提供严格的ES Module支持
fastify.default = fastify;
// 设置默认导出项
module.exports = fastify;
```

#### 3. 模块代码中的命名空间
当我们使用类ES6语法难以描述导出时，就可以使用命名空间来描述。如下，通过 [声明合并](https://juejin.cn/post/7073383136213598222) 来合并class和namespace，导出的class中可以访问namespace中暴露的成员。

```typescript
export class API {
  constructor(baseURL: string);
  getInfo(opts: API.InfoRequest): API.InfoResponse;
}
// 命名空间和类会被合并
declare namespace API {
  // 通过export关键字暴露的成员，可以在其它同名的namespace/class中访问
  export interface InfoRequest {
    id: string;
  }
  export interface InfoResponse {
    width: number;
    height: number;
  }
}
```

至于namespace在.d.ts文件中起什么作用，会在后面的 **深入理解** 小节中介绍。

#### 4. 可选的全局用法
使用export as namespace MyModule来声明，则在UMD上下文中，可在全局作用域下访问MyModule。

```typescript
export as namespace MyModule;
```

#### 5. 文件示例.d.ts
```typescript
// Type definitions for [~库的名字~] [~版本号(可选)~]
// Project: [~工程名字~]
// Definitions by: [~你的名字~] <[~你的主页链接~]>

/*~这是个示例，我们在写自己的声明文件时，应该重命名为：index.d.ts，
 *~并放在与模块名相同的名字的目录下，例如，模块名为 ModuleA，
 *~则此文件：ModuleA/index.d.ts
 */

/*~ 如果本模块是暴露了全局对象的UMD模块，
 *~ 则在此处进行全局库的声明，
 *~ 否则，删掉这个声明
 */
export as namespace myLib;

/*~ 如果本模块导出了函数，则声明如下 */
export function myFunction(a: string): string;
export function myOtherFunction(a: number): number;

/*~ 类型的声明如下 */
export interface SomeType {
  name: string;
  length: number;
  extras?: string[];
}
/*~ 使用const，let，var等关键字声明属性 */
export const myField: number;
```

#### 6. 库的目录结构
一个库往往由许多个模块组成，清晰的目录结构十分重要。例如，当我们的库包含如下模块时：

myLib

	+---- index.js 

	+---- foo.js

	+---- bar

		+---- index.js

		+---- baz.js

使用该库时，就有不同的导入：

```typescript
var a = require("myLib");
var b = require("myLib/foo");
var c = require("myLib/bar");
var d = require("myLib/bar/baz");
```

则相应的，我们的声明文件应该在如下的目录结构中：

@types/myLib 

	+---- index.d.ts

	+---- foo.d.ts

	+---- bar

		+---- index.d.ts

		+---- baz.d.ts

#### 7. 类型文件测试
+ 如果我们希望自己的库提交到DefinitelyTyped供所有人使用，则需要做如下操作：
    1. 在node_modules/@types/[libname]处创建新的文件夹；
    2. 在该文件夹下创建一个index.d.ts文件，并将上面的参考示例复制进去；
    3. 根据我们对模块使用中断的地方，来把index.d.ts填充完整；
    4. 当index.d.ts文件填充至满意时，下载[DefinitelyTyped/DefinitelyTyped](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FDefinitelyTyped)]并按README的指导来操作。
+ 其它情况，例如只需要在自己的项目中使用，则只需做一些简单操作：
    1. 在项目根目录下创建一个[libname].d.ts文件；
    2. 在该文件中添加declare module "[libname]" { }；
    3. 将参考示例复制到"{ }"中，并根据模块中断的地方进行填充至满意。

### (二) 模块插件声明模板 module-plugin.d.ts
举个栗子，有时候我们想拓展其它库的功能。

```typescript
import { greeter } from "super-greeter";
// 平常的Greeter API
greeter(2);
greeter("Hello world");
// hyper-super-greeter是我们拓展后得到的库，提供了拓展API
import "hyper-super-greeter";
// 拓展API
greeter.hyperGreet();
```

假设super-greeter的定义如下：

```typescript
/*~ 演示通过函数签名来进行函数重载 */
export interface GreeterFunction {
  (name: string): void
  (time: number): void
}
/*~ 演示函数的导出 */
export const greeter: GreeterFunction;
```

则hyper-super-greeter作为插件模块，拓展super-greeter的API，其定义为：

```typescript
// Type definitions for [~库的名字~] [~版本号(可选)~]
// Project: [~工程名字~]
// Definitions by: [~你的名字~] <[~你的主页链接~]>

/*~这是个模块插件示例，我们在写自己的声明文件时，应该重命名为：index.d.ts，
 *~并放在与模块名相同的名字的目录下，例如，模块名为 hyper-super-greeter，
 *~则此文件：hyper-super-greeter/index.d.ts
 */

/*~ 导入要继承的模块 */
import { greeter } from "super-greeter";
/*~ 导出模块，其名称需要和导入的模块名称相同，
 *~ 如此，便对原模块的API进行了拓展
 */
export module "super-greeter" {
  export interface GreeterFunction {
    /** Greets even better! */
    hyperGreet(): void;
  }
}
```

依照官方文档给出的示例，在vscode中进行编辑，却发现对export关键字报错：'export' modifier cannot be applied to ambient modules and module augmentations since they are always visible。此外，我无需进行import "hyper-super-greeter"，就可以直接调用greeter.hyperGreet()，这和说好的不一样！先埋个坑，等解决了回来更新，如果有知道如何解决的同学，还望不吝赐教。

### (三) 模块类 声明模板
在模块中声明类，为了能使模块类按UMD方式导入和按 **模块** 方式导入，需要分别处理。

```typescript
// Type definitions for [~库的名字~] [~版本号，可选~]
// Project: [~工程名字~]
// Definitions by: [~你的名字~] <[~你的主页链接~]>
/*~ 这是个模块类的示例.
 *~ 记得重命名为 index.d.ts 并放在与模块名同名的文件夹下！
 *~ 你如，你编写的模块名为 "super-greeter", 
 *~ 则这个文件的路径为 'super-greeter/index.d.ts'
 */
// 注意，ES6 模块 不能直接导出 类 对象.
// 本模块应该按照CommonJs风格来导入:
//   import x = require('[~THE MODULE~]');
//
// 或者，如果开启了 --allowSyntheticDefaultImports 或
// --esModuleInterop , 则本模块也支持默认导入：
//   import x from '[~THE MODULE~]';
//
/*~ 如果这是个UMD模块，且暴露了一个全局变量 'myGreeter' 用来在模块加载器环境之外来加载本模块，
 *~ 则在这里声明这个全局变量，
 *~ 否则删除这个声明.
 */
export as namespace MyGreeter;
/*~ 导出类构造函数
 */
export = Greeter;
/*~ 编写类的属性和方法 */
declare class Greeter {
  constructor(customGreeting?: string);
  greet: void;
  myMethod(opts: MyClass.MyClassMethodOptions): number;
}
/*~ 如果想要导出相关的类型，则可以写在这里。
 *~
 *~ 需要注意，如果导出了这个命名空间，
 *~ 除非启用了 --esModuleInterop，
 *~ 则本模块不能正确地作为命名空间对象来导入：
 *~   import * as x from '[~THE MODULE~]'; // 错误
 */
declare namespace MyClass {
  export interface MyClassMethodOptions {
    width?: number;
    height?: number;
  }
}
```

### (四) 模块函数 声明模板
在模块中声明函数，为了能使模块类按UMD方式导入和按 **模块** 方式导入，需要分别处理。

```typescript
// Type definitions for [~库的名字~] [~版本号，可选~]
// Project: [~工程名字~]
// Definitions by: [~你的名字~] <[~你的主页链接~]>
/*~ 这是个模块函数的模板，
 *~ 记得重命名为 index.d.ts 并置于与模块同名的的文件夹下，
 *~ 例如，模块名为 "super-greeter", 
 *~ 则本文件的路径为 'super-greeter/index.d.ts'
 */
// 注意，ES6 模块不能直接导出类对象，因此，
// 本文件应该使用CommonJs风格来导入:
//   import x = require('[~THE MODULE~]');
//
// 或者, 如果启用了 --allowSyntheticDefaultImports 或 --esModuleInterop ，
// 则也可以使用默认导入:
//   import x from '[~THE MODULE~]';
//
/*~ 如果这是个暴露了全局变量"myFuncLib"的UMD模块，
 *~ 则在这里声明该全局变量，
 *~ 否则，删除此声明
 */
export as namespace myFuncLib;
/*~ 这里声明导出的对象
 */
export = Greeter;
/*~ 演示如何声明多个函数重载 */
declare function Greeter(name: string): Greeter.NamedReturnType;
declare function Greeter(length: number): Greeter.LengthReturnType;
/*~ 如果要导出相应的类型，则在这里进行声明，
 *~ 通常来说，我们会在这里声明函数返回值的类型，示例如下
 *~
 *~ 注意，一旦声明了这个命名空间, 除非启用了 --esModuleInterop ， 
 *~ 否则模块将无法正确按照命名空间对象来导入：
 *~   import * as x from '[~THE MODULE~]'; // 错误!
 */
declare namespace Greeter {
  export interface LengthReturnType {
    width: number;
    height: number;
  }
  export interface NamedReturnType {
    firstName: string;
    lastName: string;
  }
  /*~ 如果函数本身具有属性，则在这里进行声明，
   *~ 本声明表示如下操作是ok的:
   *~   import f = require('super-greeter');
   *~   console.log(f.defaultName);
   */
  export const defaultName: string;
  export let defaultLength: number;
}
```

### (五) 全局声明文件 Global.d.ts
**全局声明的库可以无需导入便能使用**。在 **二、库的结构** 中提到，如今很多流行的全局库都采用UMD的方式来编写，且不易与实际上的UMD库区分开来，也提到了如何从代码层面识别全局库。我们在编写全局库的声明文件时，务必要保证这不是一个UMD的库。

如下给出一个全局库的声明模板：

```typescript
// Type definitions for [~库的名字~] [~版本号，可选~]
// Project: [~工程名~]
// Definitions by: [~汝名~] <[~你的主页链接~]>
/*~ 如果这个库可以直接进行调用（类似模块函数）,
 *~ 则在此声明调用签名，
 *~ 否则，移除这一段。
 */
declare function myLib(a: string): string;
declare function myLib(a: number): number;
/*~ 如果希望这个库的名字可以作为有效的类型名,
 *~ 则在此处编写，
 *~ 否则可移除本段。
 *~
 *~ 如下示例将允许我们定义变量 'var x: myLib';
 */
interface myLib {
  name: string;
  length: number;
  extras?: string[];
}
/*~ 如果这个库暴露的全局变量上有其它属性,
 *~ 则在这里进行声明.
 *~ 当然也要声明相应的类型(接口或类型别名)。
 */
declare namespace myLib {
  //~ 变量，'myLib.timeout = 50;'
  let timeout: number;
  //~ 常量
  const version: string;
  //~ 命名空间中嵌套类，可以通过new来创建：'let c = new myLib.Cat(42)'
  //~ 或者引用其构造函数，如：'function f(c: myLib.Cat) { ... }
  class Cat {
    constructor(n: number);
    //~ 类的只读实例属性
    readonly age: number;
    //~ 类的实例方法
    purr(): void;
  }
  //~ 使用interface声明包含的类型，使得如下操作是ok的：
  //~   'var s: myLib.CatSettings = { weight: 5, name: "Maru" };'
  interface CatSettings {
    weight: number;
    name: string;
    tailLength?: number;
  }
  //~ 使用类型别名来声明类型：
  type VetID = string | number;
  //~ 声明方法，本示例可以通过如下方式调用：
  //~ 'myLib.checkCat(c)' or 'myLib.checkCat(c, v);'
  function checkCat(c: Cat, s?: VetID);
}
```

我们可以看到区别，全局库都是使用的declare而不是export，因此其声明的库无需导入，全局可用。

### (六) 全局修改模块
全局修改模块用于在导入时更改全局范围内现有的值。例如，可能存在某个全局修改模块gLib，在导入该模块时给Object.prototype添加成员。由于运行时可能存在的冲突，这个模式有一定的危险性，不过我们依然可以为其编写声明。

+ 识别全局修改模块

全局修改模块很好识别，它们往往了类似于全局插件，不过需要使用require来导入，使其作用生效。

其用法示例可能类似如下所示：

```typescript
// 使用require导入，但是一般不会用到返回值，即unused后续一般不会使用。
var unused = require("magic-string-time");
/* 或者不赋值给某个变量，而直接require */
require("magic-string-time");
var x = "hello, world";
// 导入时为某个内置类型添加了新的方法，
// 如这里给字符串类型添加了startsWithHello方法，因此这里可以直接使用
console.log(x.startsWithHello());
```

+ 全局模块 声明模板：

再次强调，声明模版是用于为库进行声明的，而不是起实际作用的库，真正起作用的是全局修改模块，而不是声明文件本身。

```typescript
// Type definitions for [~库的名字~] [~版本号，可选~]
// Project: [~工程名~]
// Definitions by: [~汝名~] <[~主页链接~]>
/*~ 这是个全局修改模块的模板，本文件应该被重命名为 index.d.ts
 *~ 并置于与模块同名的文件夹下，
 *~ 例如，模块名为 "super-greeter", 
 *~ 则本文件路径为 'super-greeter/index.d.ts'
 */
/*~ 注意，如果你的全局修改模块可以直接调用或者用作构造函数，
 *~ 则应在此结合模块函数或者模块类的模板文件。
 */
declare global {
  /*~ 此处声明的成员将被置于全局global命名空间中，
   *~ 或用于增强该命名空间中已有的成员。
   */
  interface String {
    fancyFormat(opts: StringFormatOptions): string;
  }
}
/*~ 如果你的模块需要导出值或者类型，照常写就ok */
export interface StringFormatOptions {
  fancinessLevel: number;
}
/*~ 例如声明一个方法 */
export function doSomething(): void;
/*~ 如果你的模块啥也不导出，则写下面这句话，否则，删掉这句话 */
export {};
```

## 五、注意事项
1. 不要使用String，Number，Boolean，Object，Symbol来作为类型，相应的，应该使用string，number，boolean，object，symbol，但是其它的**诸如****Array****等，却可以使用**；
2. 使用泛型时，应确保每个泛型参数都有使用，**不应该存在未使用的泛型参数**；
3. **不要使用****any****类型，如果有需要，应使用****unknown****替代**；
4. 无返回值的回调函数，其返回值类型不应使用any，而应使用void；
5. 回调函数避免存在可选参数；
6. 避免写仅有参数不同的回调函数的重载；
7. 明确的函数重载应置于泛型函数重载之前；
8. 避免写仅有尾随参数不同的函数重载，相应地，使用可选参数来替代；
9. 在只有一个参数是联合类型时，不要使用函数重载，而应使用联合类型；

## 六、深入
本小节介绍编写拥有友好的API的复杂声明文件。

### (一) 核心概念
理解这些核心概念，就能了解如何编写任何形状的声明。

#### 1. 类型 Types
在看本文之前，应该已经理解了在TS中什么是类型，什么是值。这里就不再赘述。如果还不太了解类型和值，可以参考我之前的文章 [声明合并](https://juejin.cn/post/7073383136213598222) 。

#### 2. 值	Values
同上。

#### 3. 命名空间 Namepaces
值和类型都可以存在于命名空间中。关于命名空间，也可以参考我之前的文章 [Namepaces](https://juejin.cn/post/7074880866341617694) 。

### (二) 简单组合：一个名字，多种含义
一个名字A，可以对应最多三种含义：类型、值 和 命名空间。使用该名字的上下文决定了名字当时的解释含义。例如，在let m: A.A = A中，出现的第一个A是命名空间，第二个A是类型，第三个A是值。

#### 1. 内置组合
可以参考我之前的文章 [声明合并](https://juejin.cn/post/7073383136213598222) ，有些声明能同时创建值、类型、命名空间中的两者。例如，class A {}声明可以同时创建一个值A和一个同名的类型A。值A表示类，可以通过new A()来创建实例。类型A表示new A()创建的实例的类型。

#### 2.自定义组合
此外，也可以根据需要自定义值、类型、命名空间之间的组合。

### (三) 高级组合
有些种类的声明可以跨声明组合。例如，class A {}和interface A {}可以共存，两者相互对类型A进行扩充。值、类型 和 命名空间 的表现有所不同：

+ 对于值，会和其它同名的值发生冲突，除非是由命名空间创建的值；
+ 对于类型，如果是有类型别名type A = xxx创建的，则会产生冲突；
+ 对于命名空间，永远不会有冲突。

下面通过示例来进行一些演示，也可以参考我之前的文章 [声明合并](https://juejin.cn/post/7073383136213598222) 。

#### 1. 通过interface来添加类型的成员
可以使用同名的interface来添加属性。

```typescript
interface Foo {
  x: number;
}
// 同名的interface，用来添加属性y
interface Foo {
  y: number;
}
let a: Foo = ...;
console.log(a.x + a.y); // 即具有x属性，又具有y属性
```

class和interface创建的同名类型，也可以相互拓展属性：

```typescript
class Foo {
  x: number;
}
// 使用interface来为类型Foo添加属性y
interface Foo {
  y: number;
}
let a: Foo = ...;
console.log(a.x + a.y); // OK
```

注意，不能使用类型别名type Foo = {y: number}来添加属性，而应该使用interface，因为类型别名声明同名类型会引起冲突。

#### 2. 使用namespace来添加成员
namespace可以用来添加类型、值或者命名空间的成员；但是命名空间namespace X {}不会创建类型X，只会创建一个值X和一个命名空间X。

```typescript
class C {}
namespace C {
  // 通过namespace给值C添加成员x
  export let x: number;
  // 通过namespace给类型C添加类型成员CC
  export interface CC {
    name: string;
  }
}
let y = C.x; // OK
let yy: C.CC; // ok
```

可以看到，命名空间是用来扩充已有的类型、值或者命名空间的强大工具。我们可以写出更多有趣的组合(尽管现实上很难遇见这种需求)：

```typescript
namespace X {
  export interface Y {}
  export class Z {}
}
// 通过namespace来扩充
namespace X {
  // 添加一个与已有类型同名的值
  export var Y: number;
  // 嵌套一个namespace来对之前同名的class做扩充
  export namespace Z {
    export class C {}
  }
}
type X = string;	// ok
const x1 = new X.Z();	// ok
const x2 = new X.Z.C();	// ok
```

## 七、发版
既然跟着我一起写好了自己的声明文件，现在是时候了解一下如何把自己的类型声明包发布到npm上啦。发版类型声明有两个途径：

1. 与相应的npm包绑定；
2. 发版到npm上的 [@types organization](https://link.juejin.cn?target=https%3A%2F%2Fwww.npmjs.com%2F~types) 。

如果我们的类型声明是基于自己的包的源代码生成的，那么最好是绑定到相应的npm包中进行发布；否则，推荐发版到npm上的@types机构。

### (一) 绑定到npm包的源代码中发布
#### 1. 设置types属性
如果我们的包里有main.js文件，则需要在package.json中指示，且设置types属性来指定包里相应的声明文件：

```typescript
{
  "name": "awesome",
    "author": "Vandelay Industries",
    "version": "1.0.0",
    "main": "./lib/main.js",
    "types": "./lib/main.d.ts"
}
```

其中，**types****字段名也可以用****typings****来替代**，两者同义。此外，如果我们的main声明文件的名字为index.d.ts，且位于包的根目录下（在index.js旁边），则也可以不设置types属性，但是建议添加该属性。

#### 2. 依赖
所有声明的依赖应该在package.json的dependencies属性中注明，例如：

```typescript
{
  "name": "browserify-typescript-extension",
    "author": "Vandelay Industries",
    "version": "1.0.0",
    "main": "./lib/main.js",
    "types": "./lib/main.d.ts",
    "dependencies": {
    "browserify": "latest",
      "@types/browserify": "latest",
      "typescript": "next"
  }
}
```

可以看见，browserify-typescript-extension依赖于browserify和typescript这两个包。browserify包的源代码没有和相应的声明文件绑定，因此需要额外依赖于@types/browserify来提供声明；而typescript包的源代码中已有相应的声明文件，因此无需额外@types包。

注意这里使用的是dependencies字段而不是devDependencies字段，因此browserify-typescript-extension每个用户都需要有dependencies里的包。

#### 3. 红线！！
在声明文件中不要使用/// <reference path="..." />，而应使用/// <reference types="..." />来替代。

如果我们的类型声明依赖于其它的包：

+ 不要将其与我们的文件内容合并，保持各个文件独立；
+ 不要将其声明复制到我们的包中；
+ 如果该依赖没有打包其类型声明文件，则我们可以依赖于npm的类型声明包。

#### 4. 指定TypeScript版本：typesVersions字段
TypeScript打开一个package.json文件来查看需要读取的内容时，首先注意到的就是typesVersions字段，我们可以通过该字段指定要求的TS版本。

例如，下面的栗子中，如果符合要求，则该包的import导入会解析为/node_modules/package-name/ts3.1/index.d.ts文件，如果当前TS版本不合要求，则会回落到types字段指定的文件。

```typescript
{
  "name": "package-name",
    "version": "1.0.0",
    "types": "./index.d.ts",
    "typesVersions": {
    ">=3.1": { "*": ["ts3.1/*"] }
  }
}
```

#### 5. 文件重定向
上面的栗子演示了整个文件夹下的内容的分辨，如果指向指定单个文件时，可以确切地传入该文件名。

```typescript
{
  "name": "package-name",
    "version": "1.0.0",
    "types": "./index.d.ts",
    "typesVersions": {
    "<4.0": { "index.d.ts": ["index.v3.d.ts"] }
  }
}
```

当TS版本低于4.0时，import导入会解析为index.v3.d.ts，否则解析为@types属性指定的index.d.ts。

#### 6. 多个字段
typeVersions属性可以包含多个字段，来明确不同的TS版本，但是要注意顺序，越是明确的版本，书写位置就越是靠前，否则将无法生效。

```typescript
{
  "name": "package-name",
    "version": "1.0",
    "types": "./index.d.ts",
    "typesVersions": {
    ">=3.2": { "*": ["ts3.2/*"] },
    ">=3.1": { "*": ["ts3.1/*"] }
  }
}
```

例如，以下的书写顺序是无效的：

```typescript
{
  "name": "package-name",
    "version": "1.0",
    "types": "./index.d.ts",
    "typesVersions": {
    // 这个书写顺序无效
    ">=3.1": { "*": ["ts3.1/*"] },
    ">=3.2": { "*": ["ts3.2/*"] }
  }
}
```

在npm包中做了如上几项处理后，当npm包发布之后，相应的声明文件也被包含在npm包里了，如此一来，我们编写的声明文件也就发布出去了。

### (二) 发版到 [@types](https://link.juejin.cn?target=https%3A%2F%2Fwww.npmjs.com%2F~types)
在 [DefinitelyTyped](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FDefinitelyTyped%2FDefinitelyTyped) 中的包，会通过 [types-publisher tool](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fmicrosoft%2FDefinitelyTyped-tools%2Ftree%2Fmaster%2Fpackages%2Fpublisher) 工具自动发版到 [@types](https://link.juejin.cn?target=https%3A%2F%2Fwww.npmjs.com%2F~types) 机构。如果想让自己的类型声明翻版为@types包，则需要给 [DefinitelyTyped](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FDefinitelyTyped%2FDefinitelyTyped) 提交一份 pull request，在贡献指导页 [contribution guidelines page](https://link.juejin.cn?target=https%3A%2F%2Fdefinitelytyped.org%2Fguides%2Fcontributing.html) 可以查看更多详情。

## 八、使用
### 1. 下载
获取类型声明只需要npm，以lodash库为例：

```shell
npm install --save-dev @types/lodash
```

当然，如果在发版时已经包含了类型声明，则无需再下载@types包。

### 2. 使用
安装了@types类型声明包之后，就能使用相应的模块了。

```typescript
import * as _ from "lodash";
_.padStart("Hello TypeScript!", 20, " ");
```

如果不是使用模块，也可以通过暴露的全局变量来使用。如lodash暴露的全局变量为_。

```typescript
_.padStart("Hello TypeScript!", 20, " ");
```

### 3. 查找
通常来说，类型声明包应该与对应的npm上的包具有相同的名字，只不过类型声明包前面要加上@type/前缀。不过如果有需要，也可以在 [类型查找](https://link.juejin.cn?target=https%3A%2F%2Faka.ms%2Ftypes) 来搜索需要的包的类型声明。

如上，本指南写到这里就结束咯，但愿大家都能有所收获，我们始终在一同进步！如此一来，我的TypeScript进阶篇只剩下 **模块化** 和 **编译原理** 篇了，希望能坚持完成！

