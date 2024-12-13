---
order: 3
toc: content
group: 基础
---
# TS中的函数
函数在我们日常代码中占有绝对重要的地位，深入了解TS中函数的使用对我们的学习十分有利。如果你还不了解泛型函数、函数签名、函数重载，那么阅读本文将让你对TS中的函数有一个更加细致的理解，必能有所收获。



<h3 id="f62c6777">1. 返回值</h3>


我们在声明一个函数 / 方法时，可以在括号后加上类型注释，以约束其返回值的类型，如果没有明确约束返回值的类型，则将其推论为any类型。除了void和any之外，其它所有的类型都应该有相应类型的返回值。



+ 返回值如果不是约束的类型，或者约束了类型却没有return相应的类型，则会报错：



```typescript
// 声明变量时由初始值'cc'进行类型推论，得出_name为string类型
let _name = 'cc'
// 会报错，约束了返回值的类型，却没有return相应的类型,
function getName1():string {

}
// 约束了返回值类型只能时string
function getName1():string {
  return _name
}
// 定义一个number类型的变量_name2
let _name2 = 18
// 约束函数返回值类型为string
function getName2():string {
  // 会报错，返回值应该是string类型，而_name2是number类型
  return _name2
}
```



+ 当我们实际的返回值有可能不是约束的类型时，也是不正确的：



```typescript
let _name3: string | number = 'cc'
function getName3():string {
  // 不合法的返回值，因为_name3有可能是number类型，而返回值只能是string类型
  return _name3
}
//这种情况尤其容易发生在字面量类型上：
// _name4经类型推论判定为string类型
let _name4 = 'cc'
// 约束返回值只能为 'cc' | 'yy' 类型
function getName4():'cc' | 'yy' {
  // 会报错，虽然_name4的值为'cc'，但它是string类型，不符合要求
  // return _name4

  // 可以用类型断言来解决，后面我们将介绍类型来解决
  return _name4 as 'cc'
}
```



+ 函数的返回值为空时，使用void类型，此时可以return undefined，return null，也可以不写return，会默认返回undefined：



```typescript
let _name = 'cc'

// 返回空值undefined
function setName(name):void {
  _name = name
}
let a = setName('yy')  // a为undefined
```



<h3 id="14bb2348">二、参数</h3>


在TS中我们往往需要对函数的参数添加类型注释，如果不添加类型注释，则该参数将被类型推论为any。TS不仅约束了传参时实参的类型，也约束了在函数内部形参的类型。



```typescript
let _name = 'cc'
// 定义一个接收string类型，无返回值的函数
function setName2(name: string): void {
  _name = name
}
```



有时候，我们的参数比较复杂，例如多种类型的组合：string | number，这时候我们需要进行类型缩减，以防在return或参数调用方法等情况下出现问题。



```typescript
let _name = 'cc'

// 错误示例
function setName3(name: string | number): void {
  // 参数name有可能是number，因此不能直接赋值  
  _name = name
}

// 正确示例
function setName3(name: string | number): void {
  // name是string类型
  if(typeof name === 'string'){
    _name = name
  }else{
    // name是number类型，可强制转化
    _name = String(name)
  }
}
```



有时候，某个参数不是必须传的，就可以在形参后加上英文问号"?"来表示可选参数，如果调用函数时不传该参数，则该参数为undefined。因此，在函数体内部，该参数有可能是undefined，也需要进行类型缩减。



```typescript
let userInfo: {name:string, age:number, gender: 1 | 2 | 3};
function setUserInfo(name:string, age:number, gender?: 1 | 2 | 3){
  if(gender === undefined){
    userInfo.gender = 3
  }else{
    userInfo.gender = gender
  }
}
```



<h3 id="66dc856d">三、函数类型表达式</h3>


TS中可以使用箭头函数的形式来定义一个函数类型：(a: Type1, b: Type2, ...) => TypeN表示接收的参数名称为a, b , ...，类型分别为Type1, Type2,...，返回值类型为TypeN的函数



```typescript
// 定义了类型Fn1是一个函数，接收一个string类型的name和number类型的age为参数，
// 返回一个sttring类型的值
type Fn1 = (name: string, age: number)=>string
   
// 给fn1添加Fn1类型，则参数和返回值都需要满足Fn1的约束
// 已经由Fn1约束了类型，因此无需再对参数和返回值进行类型注释
const fn1: Fn1 = function(name, age){
  return 'I am' + name
}

// 也可以使用箭头函数
const fn11: Fn1 = (name, age) => 'I am' + name
```



在声明对象的方法时，可以很方便地使用函数类型表达式：



```typescript
// 定义一个User接口，其中包含interest方法，需要传入一个string类型的参数，
interface User {
  name: string,
  age: number,
  interest: (something: string)=>void
}

const user: User = {
  name: 'cc',
  age: 18,
  interest(something){
    // ...
  }
}
```



<h3 id="42e70e9d">四、类型缩减</h3>


在函数中，我们会经常遇到形参是组合类型或可选参数的情况，这时候我们就需要进行类型缩减，对该参数的类型抽丝剥茧，从而在每个具体的子类型时做相应的操作，防止类型出错。在该过程中，越往后该参数可能的类型范围就越小。  
主要有 控制流分析：if-else 或 switch-case 。



<h4 id="aaf1d116">(一) 控制流分析</h4>


通过 if，else 等控制流语句来逐步缩减参数的类型范围。



+ typeof  type gurads



在下面的例子中，我们使用了typeof 这个 type gurads 类型守卫，typeof会返回一些列固定的字符串，我们根据这些字符串来减少类型范围。



```typescript
type Fn = (name?: string | number) => string

const fn: Fn = function(name){
  // 类型缩减
  if(name === undefined){
    return 'default name'
  // 接下来只能是string或者number
  }else if(typeof name === 'string'){
    return name
  // 接下来只能是number
  }else{
    return String(name)
  }
}

//typeof 的返回值："string" "numbrt" "bigint" "boolean" "symbol" "undefined" "object" "function"
```



可以看到，typeof无法检测出null这个空值，typeof null会返回"object"，因此，我们可以辅以“truthiness”检测进行真值校验



+ Truthiness narrowing 真值校验  
利用true和false来进行真值条件判断，从而达到类型缩减的目的。



```javascript
type Fn = (name?: string) => string
const fn2: Fn = function(name){
  // 真值校验
  if(name){
    return name
  }else{
    return 'default name'
  }
}
```



下面列举出使用 if 会得到 false 的值，根据tyscript官方文档的描述，除了以下列举的值之外，其它的值都会返回true。



1. 0
2. NaN
3. "" 空字符串
4. 0n 数字0 + 字母n，是bigint类型的 0
5. null
6. undefined  
如果我们想把任何值转化为相应的boolean类型，可以利用布尔否定符"!"，任何值经过双重否定之后都会转化为相应的布尔值。



+ Equality narrowing 等值校验



利用已知条件进行等值校验，从而TS可以推断出相应的参数类型，达到类型缩减的目的。



+ in 操作符



使用表达式 "value" in x，来判断对象里是否存在某个属性，来进行类型缩减



```typescript
type Fish = {
  swim: () => void
}

type Dog = {
  bark: () => void
}

function doSomething(obj: Fish | Dog){
  // 有bark方法的则是Dog
  if('bark' in obj){
    console.log('汪汪汪')
  }else{
    // 否则是Fish
    console.log('I am Fish')
  }
}
```



+ 使用 instanceof



用于Array，Date等引用类型。



<h3 id="67240f3c">(二) 类型预言</h3>


想要定义一个自定义的类型守卫，我们通常可以使用一个返回值是类型预言的函数。



类型预言格式：param is Type，随后我们可以用该函数来进行类型缩减。



```typescript
type Fish = {
  swim: () => void
}

type Dog = {
  bark: () => void
}

// 我可能不是人，才是真的狗
function isDog(obj: Fish | Dog): obj is Dog {
  return ('bark' in obj)
}

let animal: Fish | Dog = {
  swim: () => console.log('I am Fish')
}
// 进行类型缩减
if(isDog(animal)){
  animal.bark()
}else{
  animal.swim()
}
```



注意如果animal的的方法不是swim而是bark，则TS将会进行类型推论，得到这个animal是Dog，便已经排除了Fish类型。此时，在我们的if分支里包含了animal是Dog的情况，而在else分支里 animal 就是never类型了。



<h3 id="84ee5036">(三) 解析联合类型</h3>


在上面的例子中，我们分析了一些较为简单的类型。但是实际上，稍微复杂些的类型也是非常常见的。在官方文档中，给了一个例子：我们定义一个用于表示形状的接口Shape，用 kind 属性来表示是圆形circle还是正方形square（字面量联合类型，防止单词拼写错误），圆形仅需要一个半径radius属性，正方形仅需要边长属性 side_length。因此我们使用可选属性，如果是circle，则有radius属性而没有side_length属性，反之同理。



```typescript
interface Shape {
  kind: 'circle' | 'square',
  radius?: number,
  side?: number
}
```



接下来我们需要一个求面积的函数，参数为Shape类型。由于参数radius和side都是可选的，因此都可能为空值。按照常理，我们会根据 kind 属性的值来判断是圆形还是方形，从而使用不同的面积公式：



```typescript
function getArea(obj: Shape){
  if(obj.kind  === 'circle'){
    // 圆形面积，会报错，obj.radius可能是空的
    return Math.PI * obj.radius ** 2
  }else{
    // 方形面积，会报错，obj.side可能是空的
    return obj.side ** 2
  }
}
```



但是此时你会发现，在严格空值检查下，这段代码会报错。因为radius和side都是可选属性，因此它们都可能为空值。当然，这里我们可以使用非空断言，但是也许我们可以用更合理的方式：给circle和square定义不同的接口，毕竟它们是两个完全不同的东西。此时我们的getArea函数就不会再出现上述的问题。



```typescript
interface Circle {
  kind: 'circle',
  radius: number
}

interface Square {
  kind: 'square',
  side: number
}

type Shape = Circle | Square

function getArea(obj: Shape){
  if(obj.kind === 'circle'){
    // 是Circle，必然有radius属性
    return Math.PI * obj.radius ** 2
  }else{
    // 是Square，必然有side属性
    return obj.side ** 2
  }
}
```



通过合理设计接口，能使问题得到更加优雅的解决方案。



<h3 id="920ea7f7">(四) never 类型</h3>


当我们进行类型缩减时，一旦所有可能的类型都被缩减完了，如果继续缩减，例如再加一个else分支，我们就会得到一个never类型。TS使用never类型来告诉我们，当前的情况是tan ( Math.PI / 2 )。never类型可以被赋值给任意类型，但是任意其它类型都不能被赋值给never类型(除了never本身之外)。这个特性常用于穷举校验。



<h3 id="b18002e1">(五) 穷举校验</h3>


我们在进行类型缩减时，有时候无法考虑到所有的情况。因此，可以使用穷举校验，为了避免有类型被遗漏。穷举校验利用了上述never类型的特性，在控制流的最后一个分支里，(如switch语句的default分支，if 语句末尾的else分支)，尝试把 进行类型缩减的参数 赋值给一个 never 类型的变量。由于只有never类型可以被赋值给never类型，一旦有我们考虑不周全，参数有类型遗漏了，那么在最后的分支里，该参数的类型就不会是never，无法被赋值给never类型的变量，TS便会报错来提示我们。而如果我们考虑完了所有的类型情况，则该参数在最后一个分支里便是never类型，可以被赋值给never类型的变量，TS就不会报错。因此，通过穷举检查的方式，我们只需要关注最后一个分支里是否有相应的报错，就能知晓我们是否考虑到了所有的类型情况。



```typescript
interface Circle {
  kind: 'circle',
  radius: number
}

interface Square {
  kind: 'square',
  side: number
}

interface Triangle {
  kind: 'triangle',
  side: number
}

type Shape = Circle | Square

function getArea(obj: Shape){
  if(obj.kind === 'circle'){
    // 是Circle，必然有radius属性
    return Math.PI * obj.radius ** 2
  }else if(obj.kind === 'square'){
    // 是Square，必然有side属性
    return obj.side ** 2
  }else{
    // 在最后一个分支进行穷举校验
    const _isExhaustive: never = shape
    return _isExhaustive
  }
}
```



<h2 id="0c3fc8e0">五、函数进阶</h2>


前面已经介绍了函数类型表达式，下面我们来了解下更多关于函数的知识。



<h3 id="d088cbe0">(一) 函数签名</h3>


+ 调用签名  
函数也是一种对象，可以有自己的属性。但是使用函数类型表达式的时候无法同时声明函数的属性。调用签名描述了一种函数类型，包含了函数的属性、调用函数时应传递的参数以及返回值。使用调用签名可以很方便地解决函数类型表达式的不足



```typescript
// 声明调用签名，调用签名是一种类型，其名字可以任意取
type CallSignatureFn = {
  // 函数的属性
  grade: string,
  // 函数的形参和返回值
  (arg1: number, arg2: string): string
}

function logInfo(fn: CallSignatureFn) {
  console.log(fn.grade + " returned " + fn(6, 'A'));
}
```



调用签名 vs 函数类型表达式：



+ 函数类型表达式十分简洁
+ 调用签名可以声明函数的属性
+ 调用前面在 参数列表 和 返回值 之间使用冒号 ":" ，而函数类型表达式使用箭头 "=>"



2. 构造签名  
函数除了可以被直接调用之外，还可以使用 new 操作符来调用。构造签名描述了函数在使用 new 操作符调用时的传参和返回值。



```typescript
type ConstructSignatureFn = {
  new (_type: string, _num: number): string[]
}

function fn(ctor: ConstructSignatureFn) {
  return new ctor("hello", 2);
}
```



3. 混合签名  
对于有些比较特殊的函数比如Date，直接调用和使用new操作符调用得到的结果是一样的，这种函数类型可以使用混合签名，将调用签名和构造签名写在一个类型对象里。



```typescript
interface CallOrConstruct {
  new (s: string): Date;
  (n?: number): number;
}
```



4. 重载签名 和 实现签名  
将在函数重载章节介绍。



<h3 id="0ad31732">(二) 泛型函数</h3>


1. 基础



此前，我们在声明函数时，会直接给 形参 和 返回值 添加类型注释，在调用时传入相应类型的值。以这样的形式声明的函数，其传参和返回值的类型都是固定的。那有没有什么方式，能让我们调用函数时传参的类型能灵活多样呢？泛型函数正是我们想要的。  
泛型函数：高度抽象化的类型。在声明函数时将类型抽象化( 可以是多个类型 )：在函数名后面加上尖括号，里面为抽象化的类型名 (例如：<T, K, U, ... >，其中 T, K, U 是类型参数，各代表一种类型，至于具体是什么类型，在调用函数时由传入的类型决定。)，在调用函数时再具体化，传入实际的类型，一旦传入类型，所有出现该泛型的地方，都会替换为这个传入的类型。如果没有传入明确的类型，则TS会进行类型推论，自动判断Type的类型。(T，K，U 等可以用任何你喜欢的词来替代，不过用这些字母会显得比较简洁。)



```typescript
// <Type>为泛型，Tpye任意代表一种类型，
// 在调用函数时，需要传入实际的类型，一旦传入类型，所有出现Type的地方都会替换
function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}
```



调用函数时可以传入任意实际类型：



```typescript
// 类型推论判断Type为string
const s = firstElement(["a", "b", "c"]);
// 类型推论判断Type为number
const n = firstElement([1, 2, 3]);
// 类型推论判断Type为undefined类型
const u = firstElement([]);
```



泛型的概念将类型进行了抽象化，使得函数可以在调用时传入需要的类型，从而增加了函数的通用性。泛型的名字Type可以随意取，注意相同的泛型代表着同一种类型。



2. 泛型约束



我们知道，泛型可以定义多个，例如<Type1, Type2, ...>，每个泛型都代表着一种类型，它们可以相同，也可以不同，具体分别是什么类型，都由该函数调用时传入的类型来决定。然而，到目前为止，我们定义的泛型都是和其它类型无关的。很多时候，我们会希望给泛型做一定的约束，让它只能是某些类型之中的一种。这时候，可以使用extends关键字，来实现泛型约束。



```typescript
interface Person {
  name: string,
  age: number
}
// 泛型T继承了Person类型，因此T必须有name和age属性
function getInfo<T extends Person>(user: T): string {
  return user.name
}

const user1 = {age: 16}
const user2 = {name: 'cc', age: 18, gender: 1}
// 报错，user1中没有name属性，不符合类型要求
getInfo(user1)
// ok
getInfo(user2)
```



3. 指定类型参数



在前面的例子中，我们都没有手动传入类型，来指定泛型的实际类型，而是由TS自动进行类型推论得出的。有一说一，TS确实够机智。不过有些时候，由于泛型太抽象，仅仅靠TS的类型推论，可能无法得出正确的结果。这时候，我们可以在调用函数时手动传入类型，来指定类型参数。毕竟我们永远比TS知道的更多。下面来看一个官方的示例：



```typescript
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2);
}

// 会报错，TS根据第一个参数数组[1,2,3]，将Type推论为number，
// 于是第二个字符串数组就无法通过类型校验, 因为Type[]此时应为number[]
combine([1,2,3],['a','b','c'])
```



这种情况下，便需要指定参数类型：



```typescript
const arr = combine<string | number>([1, 2, 3], ["hello"]);
```



4. 三个小细节写好泛型函数



+ 尽可能少地使用泛型约束，让TS进行类型推论
+ 尽可能少地使用类型参数
+ 不要将没有重复使用的类型作为类型参数



<h3 id="70aa32b7">(三) 函数重载</h3>


1. 函数的可选参数



在前面的类型缩减章节中，我们知道，函数可以有可选参数，调用函数时，如果没有给可选参数传值，那么该参数的值便是undefined, 这容易引发意想不到的错误。在函数中，我们可以通过真值校验来解决，也可以给参数一个默认值来解决 (同JS)。但是，如果一个函数的参数中有回调函数，且该回调函数也有可选参数，则尤其容易引发错误。偷个懒，继续搬运官方的栗子：



```typescript
function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
  for (let i = 0; i < arr.length; i++) {
    // 如果调用callback时没有传入index参数，则index为undefined
    callback(arr[i]);
  }
}

myForEach([1, 2, 3], (a, i) => {
  // 即此处的i为undefined，undefined上没有toFixed方法，便会报错
  console.log(i.toFixed());
});
```



可见，使用可选参数不仅处理起来会有些麻烦，而且容易引发错误。因此，函数当有有限个不定数量或不同类型的参数时，更好的方案是函数重载。



2. 函数重载  
规定函数的形参与返回值的是重载签名，可以有多个重载签名；  
兼容多个重载签名并进行逻辑处理的是实现签名，由于要兼容多套重载签名，因此会出现可选参数；  
我们可以通过编写多套重载签名，来规定函数的不同调用方式 (传入不同数量或不同类型的参数以及不同类型的返回值)。然后通过实现签名来进行兼容的逻辑处理.



```typescript
// 定义两套重载签名
// 允许调用函数时只传入name参数
function setUserInfo(name: string): boolean;
// 允许调用函数时传入name, age, gender三个参数
function setUserInfo(name:string, age:number, gender: 1 | 2):string;
// 实现签名，统一处理逻辑
function setUserInfo(name:string, age?:number, gender?: 1 | 2){
  // 真值校验，由于两套重载签名规定，调用函数时要么传入三个参数
  // 因此，传入了age，则必定也传入了gender
  if(age){
    return `我叫 ${name}, 今年 ${age} 岁啦！`
  }else{
    return false
  }
}

// 传入一个参数，正确
setUserInfo('cc')
// 传入三个参数，正确
setUserInfo('cc', 18, 2)
// 传入两个参数，报错，因为没有定义两个参数的重载签名
setUserInfo('cc', 18)
```



可以看到，实现签名 和 我们之前普通地使用可选参数的处理很相似，区别也很明显：尽管age和gender都是可选参数，但是通过重载签名，规定了age和gender必须同时传入或同时都不传，即规定了该函数的调用只能传入一个或三个参数。如果不进行函数重载，那么将多出一种只传入name和age这两个参数的情况要进行处理。可见，通过函数重载来规定函数不同的调用方式，可以使逻辑与结构更加清晰优雅。当我们进行函数重载时，一定要注意让实现签名兼容所有的重载签名(参数和返回值都要兼容处理)。



<h3 id="af7ee806">(四) 在函数中声明 this</h3>


一般而言，TS会如同JS一样，自动推断this的指向。JS中不允许this作为参数，不过TS允许我们在函数中声明this的类型，这种情况尤其在函数的回调参数callback中较为常见。



```typescript
// filterUser个方法，其后是其调用签名
interface Data {
  filterUsers(filter: (this: User) => boolean): User[];
}
```



起初这个官方的示例我看了好几分钟没看懂，后来发现它的filterUsers就是一个函数的调用签名，੯ੁૂ‧̀͡u\。这里声明了this是User类型，如果在该方法执行时，callback中的this不是User类型，TS就会提示我们代码写的有误。在函数中声明this时，需要注意一点是，虽然在构造签名中，callback使用箭头形式，但是在我们实际调用该方法时，callback不能使用箭头函数，只能用function关键字。毕竟众所周知，箭头函数没有自己作用域的this，它使用的的this同定义箭头函数时的上下文的this。  
(五) 其它的类型



+ void  
函数的返回值设置为void，则返回空值。void不等同于undefined。  
返回值为void类型的函数，并不一定不能写return 语句。如果是通过函数表达式、函数签名等定义的函数类型，该类型的实例函数体中可以有return语句，并且后面可以接任意类型的值，只不过它的返回值会被忽略。如果我们把这样的函数调用结果赋值给某个变量，则该变量的类型依然是void



```typescript
type voidFunc = () => void;

const f1: voidFunc = () => {
  // 可以return任意类型的值，但是会被忽略
  return true;
};

// v1 的类型依然是void
const v1 = f1();
```



但是，如果是通过字面量声明函数的返回值为void，则函数体内不能有return语句。虽然官方文档里这么说，下面的栗子也摘自官方文档，但是我的vs code编辑器里这样写并没有报错 ？。



```typescript
function f2(): void {
  // @ts-expect-error
  return true;
}
 
const f3 = function (): void {
  // @ts-expect-error
  return true;
};
```



+ object



是小写的object，而不是大写的Object。这两者意义不同。



+  unknown 
+  never 



有的函数永远没有返回值，例如在函数体内 return 之前抛出错误。never类型也常用来做穷举校验。



+ Funtion



<h3 id="7679899a">(六) 剩余参数</h3>


+  我才发现，原来parameters表示形参，arguments表示实参。 
+  剩余形参  
剩余形参的使用基本同JS一致，偷个懒直接拿官方栗子： 



```typescript
// 倍乘函数，第一个参数为倍数，会返回后续所有参数各自乘以倍数而形成的数组
function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}
// a 的值
const a = multiply(10, 1, 2, 3, 4);
```



+ 剩余实参  
剩余实参常用于函数调用时对传递的参数 (数组、对象等) 进行展开，然而这里容易踩坑。以数组为例：



```typescript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
arr1.push(...arr2);
```



数组的push可以接收无限制个参数，因此可以直接展开参数arr2。但是有的方法只能接收指定数量的参数，而在一般情况下，TS认为数组的是可变的。如果直接对这类方法的进行数组参数的展开，会引起报错，因为TS会认为数组里的成员数量可能是0个或者多个，不符合该方法只接受指定数量的参数的要求。



```typescript
// 虽然数组现在只有两个成员，但是它的类型被推断为 number[]，
// 即args数组可能会发生变化，可能有0个或多个参数
// 而Math.atan2方法只接收两个参数，因此会报错
const args = [8, 5];
const angle = Math.atan2(...args);
```



解决的办法也很简单，使用 as const将数组的类型断言为不可变类型。此时的数组便被推论为元组类型。有关元组类型的内容，会在下一篇 对象类型篇中介绍。



```typescript
// 此时args长度不可变，被推论为元组类型
const args = [8, 5] as const;
// ok
const angle = Math.atan2(...args);
```



+ 形参结构



没啥好说的，直接上官方示例。



```javascript
type NumberABC = { a: number; b: number; c: number };
function sum({ a, b, c }: NumberABC) {
  console.log(a + b + c);
}
```
