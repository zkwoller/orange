---
order: 2
toc: content
group: 基础
---
# 了解TypeScript
<h2 id="95420bd1">(一)、安装与编译</h2>


想要使用TS，得先会安装。Typescript需要node环境，确保你已经安装了node。如果还没有安装node，可以去[Node.js官网](Node.js下载，傻瓜式安装。



打开项目目录进行初始化：



```plain
npm init -y
```



官方推荐了npm，yarn，pnpm三种工具，任选其一即可（npm工具为node自带的包管理工具，可自由使用；yarn或pnpm工具需要提前安装）。



```plain
# with npm
npm install typescript --save-dev
# with yarn
yarn add typescript --dev
# with pnpm
pnpm add typescript -D
```



在安装ts时，编译工具tsc也会被自动安装。待安装完成，在项目根目录下新建一个app.ts。



```typescript
// app.ts
const str = 'app'
console.log(str.charAt(0))
```



即可通过以下任一方式运行tsc，编译成功后会在和app.ts同级目录下多出一个app.js文件。



```plain
# 当前目录下的app.ts文件编译为app.js
# npm
npx tsc app.ts
# yarn
yarn tsc app.ts
# pnpm
pnpm tsc app.ts
```



app.js：



```javascript
const str = 'app'
console.log(str.charAt(0))
```



这个js文件和app.ts看起来没有差别，这是因为我们没有在app.ts里没有进行类型约束。与类型的相关内容会在后面谈到。现在我们来让app.ts出一点“错误”，将str换成数组，编辑器会把错误代码用红色波浪线标出，如果此时在命令行运行yarn tsc app.ts，控制台便会报错。



```typescript
// app.ts
const str = ['a','p','p']
console.log(str.charAt(0))  // charAt会被
```



尽管如此，报错了的代码依旧会被编译成js文件。我们可以在tsc命令后加上编译的相关配置指令来进行控制。比如，加上**--noEmitOnError**之后，一旦报错便不会生成js文件。



```plain
tsc --noEmitOnError hello.ts
```



但是ts的编译配置项非常多，如果每次都通过在命令行加入指令来进行相关控制，无疑非常繁琐。因此我们可以在tsconfig.json里编写相关配置，这样我们执行tsc命令时，编译器会默认从当前目录逐步向上层目录查找并读取tsconfig.json里的配置项。



<h2 id="2852be20">(二)、配置文件：tsconfig.json</h2>


在运行tsc命令时，我们可以在后面添加指令来指定相关配置。但是我们会更倾向于在tsconfig.json里对相关指令进行配置，以减少重复、繁琐的操作。在Vue、React等框架搭建的项目里，一般都已生成初步配置好了的tsconfig.json文件。本篇只进行解基础内容的分享，有关配置的章节将在后续推出。



<h2 id="79a95a30">(三)、类型基础</h2>


这里介绍部分TS基础类型，关于类型的进阶将在后续篇章中单独介绍。注意不要将基础类型和js基本数据类型混为一谈。基础类型可以理解为ts内置的各种类型，而非我们人为定义出的类型。TS有多种基础类型，这些类型可以用来进行组合，从而得到我们需要的人为定义的类型。TS在声明变量时，在变量名后加上冒号: 和类型名来进行变量的类型注释。如果不添加类型注释，则TS会根据变量的初始值进行类型推论，自动推断出该变量属于什么类型。如果也没有初始值，则会被推断为any类型。



<h3 id="315703b9">1. 原有的基本数据类型</h3>


string：字符串类型，注意String在js里已经有特殊意义了，而小写的string才是Typescript用来表示字符串的类型名称，即在注释变量类型为字符串时，使用小写的string，而不是大写的String，注意不要混淆了两者；number和boolean同理。



number：数字类型；



boolean：布尔类型；



```typescript
// 声明变量类型，可以不赋初值，后续给num赋的值必须是number类型
let num: number;
let str: string = 'typescript';
// 类型推断：TS会自动推断出bool的类型为boolean
let bool = true;
```



<h3 id="51edfe9c">2. Array</h3>


Array是数组类型，属于对象类型的一种。由于数组内会有数组成员，因此，在声明数组变量的时候，还要给数组成员添加类型注释，一般有两种常见方式：Type[]、Array。后者涉及泛型概念，将在后续介绍。其中，Type指代数组成员的类型，可以是基础类型，也可以是人为定义的类型 (关于数组的变形，元组类型，将在对象类型的章节介绍)。例如，要声明一个存放字符串的数组变量：



```typescript
let arr1: string[];
// 也可以像下面
let arr2: Array<string>
```



<h3 id="ca947f08">3. object</h3>


对象类型是我们平时更为常见的类型。在本篇只给出一些简单定义，后续篇章中会进行单独介绍。一个对象类型的变量可以通过键值对来存储多个数据。定义一个对象类型，可以简单地列出它的各个属性及属性的类型：



```typescript
// 定义一个包含name, age, gender属性的变量obj
let obj: {name: string, age: number, gender?: 'gg' | 'mm'};

obj = {name: 'yy', age: 22, gender: 'mm'};
// 也正确，因为gender是可选的
obj = {name: 'yy', age: 22};
```



<h3 id="7d282592">4. Union Types 联合类型</h3>


Union Types是指使用 "|"符号来把多个类型联合成一个类型，一个联合类型的变量，其值可以是联合类型的任何一个子类型。



```typescript
// 定义a为联合类型，则a可以是string类型也可以是number类型
let a: string | number;
// a可以是string
a = 'union types';
// a也可以是number
let b: string;
let c: number;
// 当开启了严格空值检查时，以下两次赋值都不合法
b = a;
c = a;
```



当然，如果每个子类型都具有共同的方法，则可以调用该共同的方法。例如：数组和字符串都具有slice方法，则联合类型string | number[] 的变量可以调用slice方法。



```typescript
function func(obj: string | number[]){
  // 可以直接调用slice方法
  const a = obj.slice()
}
```



<h3 id="a869dfa5">5. Type Alias 类型别名</h3>


使用type关键字给你的类型起一个别名，以后就可以使用别名来指代这个类型。



```typescript
type Point = {
  x: number;
  y: number;
};

type ID = number | string;

// 使用类型别名Point
let p: Point = {
  x: 123,
  y: 222
}
```



<h3 id="f18e4de7">6. Interfaces</h3>


通过关键字interface，来定义一个接口，实际是一个对象类型，用于规定一个对象的形状。



```typescript
interface Point {
  x: number;
  y: number;
}

function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord({ x: 100, y: 100 });
```



简单说说interface与类型别名的区别：



+ interface 可以通过 extends关键字来继承另一个interface，而type通过 & 符号来连接不同的对象属性；



```typescript
interface Animal {
  name: string,
}
// 继承Animal接口
interface Dog extends Animal {
  skull: number,
}
// 继承了Animal接口的属性name
const dog:Dog = {
  skull: 10,
  name: 'wangcai'
}
// 类型别名通过&符号来拓展属性
type Dog2 = Animal & {
  skull: number
}
```



+ interface可以进行拓展，Type不可以



```typescript
interface Animal {
  name: string,
}

interface Dog extends Animal {
  skull: number,
}

// 拓展interface的内容
interface Dog {
  age:number
}

// 此时Dog类型包含name,skull,age三个
const dog:Dog = {
  name: 'wangcai',
  skull:12,
  age: 2
}

// 声明一个Dog2类型
type Dog2 = {
 skull:number
}

// 会报错，Dog2重复了
type Dog2 = {
 name: string
}
```



+ interface定义对象的形状，type不仅可以用于对象，也可以用于其它类型



```typescript
type TypeA = {
  name: string
}

type TypeB = string | number

type TypeC = TypeA | TypeB
```



<h3 id="2dc2eae2">7. Intersection Types 交叉类型</h3>


用 & 符号来连接多个类型，属于交叉类型 A & B 的变量，既满足A的约束，又满足B的约束。



```typescript
type TypeA = string | number;
type TypeB = Array<boolean> | number;
// TypeC既满足TypeA又满足TypeB，因此TypeC是number
type TypeC = TypeA & TypeB;
// a是number类型
let a: TypeC = 3;
// b是TypeA类型，它的值是个string，因此不能赋值给a
let b: TypeA = '123'
a = b;  // 报错
```



也可以用来拓展对象类型的属性：



```typescript
type A = {
  name: string
}
type B = {
  age: number,
  gender: "男" | "女"
}
// 类型C是既满足A又满足B，即C既包含A的所有属性，又包含B的所有属性，
// 从而实现属性拓展
type C = A & B
let c: C = {
  name: "cc",
  age: 18,
  gender: "男"
}
```



注意 & 和 | 的区别："&"可以合并多个对象类型的属性，使得到的新的对象类型包含其它所有类型的全部属性；"&"可以获得多个类型之间的公共子类型；"|"可以联合多个类型，得到的新类型的值，只需满足其中一种子类型即可。



<h3 id="89c5556c">8. Literal Types 字面量类型</h3>


通过字面量来定义类型，字面量的值可以是任意一个类型的值，可以将多个不同类型的字面量进行组合，此时得到的变量上的方法无法进行合法调用，因为变量可能为其它不含该方法的类型（与联合类型同理）。因此需要进行类型精简或类型断言。注意在变量声明时进行类型注释了的才能被字面量类型约束，如果没有类型注释，则会按照类型推论的结果来判定类型。



```typescript
// 定义gender只能取值为 '男' 或 '女' 中的一种
let gender: '男' | '女' = '男'
// gender2经类型推论string类型
let gender2 = '男'
// 多种类型字面量的组合
let x: '未知数' | 1 | {y: 1}
// 严格类型检查时不能合法调用
x.split('知')
// 进行类型断言后可合法
<string>x.split('知')
```



<h3 id="350f7f61">9. null 和 undefined 与 非空断言</h3>


两个空值类型，和在js里的区别一致。开启/关闭严格空值检查会影响到空值类型的行为。当我们知道一个变量不会为空时，可以在该变量后使用英文感叹号 "!" ，进行临时非空断言 （Non-null Assertion）。这点在函数中尤为重要。



```typescript
type MyType = string | number | undefined;
let value: MyType = 'I love China';
// 对value进行非空断言
value!.split(' ');
```



<h3 id="3dd8898a">10. Enums 枚举类型</h3>


枚举类型是一组被有意义地命名了的常量的集合。与其它类型本质上不同的是，其它的类型都只是类型，而枚举类型却是可以使用的值。通过enum关键字声明某个变量为枚举类型的值，使用枚举类型，可以让我们不去关注变量实际的值，而使用更有意义的名字来代表实际的值。例如，在表示性别时，我们可以简单地用数字 1 和 2 来表示 男 和 女。那么在实际使用中，我们需要知道到底是1代表男还是1代表女。当数据从前端传到后端，后端的小伙伴又需要去了解哪个数字代表哪个性别。这对我们来说就不太友好。所以，我们可以使用枚举类型来定义一组表示性别的常量，之后使用时，只需取常量的名字即可。



```typescript
enum Gender {
  male: 1,
  female: 2,
  secret: 3
}
```



枚举类型包括数字型枚举、字符串型枚举、异构枚举等等。此处只简要了解一下枚举类型的的存在，后续会写一篇枚举类型的深入。



<h4 id="1bc5bc91">11. any</h4>


any可以指代任何类型，可以被赋值给任意类型的变量。



```typescript
// 给变量anyscript一个any类型，其值为数字123
let anyscript: any = 123;
// 给变量typescript一个string类型
let typescript: string = 'typescript';

// 赋值操作后，typescript变成了123，其类型发生了改变
typescript = anyscript;

// 而编译器会认为typescript变量为string类型，且允许我们调用string类型的方法
typescript.split('c')
// 而事实上此时变量typescript的值已经变为了数字123，调用string的方法就会
```



这个看起来很便捷的any类型，在这种时候就会引发问题，造成类型污染。因此，我们应该避免使用any，以免走进Anyscript的误区。



<h3 id="ea8b794a">12. unknown与类型断言</h3>


unknown用来表示未知类型，和any相似，它的值可以是任何类型。不同的是，如果一个变量是unknown类型，那么它在被明确为某个确切的类型之前，不能调用任何方法，也不能被赋值给其它变量。你可以使用类型断言来临时人为明确一个unknown变量的确切类型。毕竟你永远比Typescript知道的多！类型断言一般有两种方式：使用 a as Type 或者 在需要进行类型断言的变量前使用尖括号：a，来明确变量a为Type类型。注意类型断言是临时的，因此它不会改变原来unknown变量的类型。



```typescript
// 声明一个unknown变量a，一个字符串变量b
let a: unknown = 'I am unknown type';
let b: string;

// 这里会报错，因为a为unknown类型，而且并没有明确它的具体类型，
// 不能被赋值给字符串变量b，哪怕a本身实际的值为字符串
b = a;
// 使用类型断言来明确a的具体类型为字符串string，
// 之后便可以赋值给字符串b
// 使用as进行类型断言，可以用括号将其整体包裹起来，以进行对断言之后的变量a的操作
b = a as string;
b = (a as string) + '!';
// 也可以使用<Type>a的形式进行类型断言
b = <string>a;
// 之后 a 的类型依然是unknown
```



也许你会觉得使用unknown类型有些繁琐。但相比起any类型容易引发的错误，unknown类型的使用足够安全。因此，如果有需要使用不明确的类型时，应该首选unknown而不是any。毕竟谁也不愿意，一杯茶，一个圈，一个BUG改一天(甚至还在排查错误原因)。



<h3 id="005b2bb3">13. never 和 void</h3>


void用于表示函数返回空值；never用于表示不该使用的值或者函数不应该有返回值，在我们平常的工作中never的应用场景较少。



<h3 id="a2fb0a9a">14.不常用的类型</h3>


Bigint和Symbol是ES6之后加入的基本数据类型，目前在日常工作中的使用并不多见。TS中的这两种类型和JS中一致。



```typescript
// 使用BigInt函数来创建一个bigint类型的变量
const oneHundred: bigint = BigInt(100);
 
// 使用字面量语法 数字 + n 来创建bigint类型的变量
const anotherHundred: bigint = 100n;
```



```typescript
// 使用Symbol函数创建Symbol类型的变量/常量
const first1 = Symbol("1");
const first2 = Symbol("1");

first1 === first2 // 永远是false
```



