---
order: 8
toc: content
group: 进阶
---
# 内置泛型

<font style="color:rgb(56, 56, 56);">TS提供了许多实用的全局内置类型，可以极大地方便我们的操作。</font>

##### 1. Partial 可选类型接口
<font style="color:rgb(56, 56, 56);">通过Partial可以通过将传入的类型的所有属性变为可选属性，从而得到一个新的类型。</font>

```typescript
interface Person {
  name: string,
  age: number
}

type PartialPerson = Partial<Person>
/*
PartialPerson 为 {
  name?: string,
  age?: number
}
*/
```

##### 2. Required 必需类型接口
<font style="color:rgb(56, 56, 56);">与 Partial 相反，Required 把传入的类型T的所有属性都变为必需的，得到一个新的类型。</font>

```typescript
interface Person {
  name?: string,
  age?: number
}

type RequiredPerson = Required<Person>
/*
RequiredPerson为 {
  name: string,
  age: number
}
*/
```

##### 3. Readonly 只读类型接口
<font style="color:rgb(56, 56, 56);">将传入的类型的所有属性都变为只读属性，得到一个新的类型。</font>

```typescript
interface Person {
  name: string,
  age: number
}

type ReadonlyPerson = Readonly<Person>
/*
ReadonlyPerson 为 {
  readonly name: string,
  readonly age: number
}
*/
```

##### 4. Record<Key, Type>
<font style="color:rgb(56, 56, 56);">创建一个 key 为 Key 类型、value 为 Type类型的对象类型。</font>

```typescript
interface Person {
  name: string,
  age: number
}
type Partners = 'cc' | 'yy' | 'princess'

type PartnerInfo = Record<Partners, Person>
/*
PartnerInfo 为 {
  cc: {name: string, age: number},
  yy: {name: string, age: number},
  princess: {name: string, age: number}
}
*/
```

##### 5. Pick<Type, Keys>
<font style="color:rgb(56, 56, 56);">挑选出 Type类型 中的 Keys 类型的属性，得到一个新的类型。一般来说，Keys为联合类型</font>

```typescript
interface Person {
  name: string,
  age: number,
  gerder: 1 | 2,
  interests: string[]
}

type PickedPerson = Pick<Person, 'name' | 'interests'>
/*
PickedPerson 为 {
  name: string,
  interests: string[]
}
*/
```

##### 6. Omit<Type, Keys>
<font style="color:rgb(56, 56, 56);">与 </font>**<font style="color:rgb(56, 56, 56);">Pick</font>**<font style="color:rgb(56, 56, 56);"> 相反，移除掉 Type类型 中的 Keys 类型的属性，得到一个由剩下的属性组成一个新的类型。</font>

```typescript
interface Person {
  name: string,
  age: number,
  gerder: 1 | 2,
  interests: string[]
}

type OmitedPerson = Omit<Person, 'name' | 'interests'>
/*
PickedPerson 为 {
  age: number,
  gerder: 1 | 2
}
*/
```

##### 7. Exclude<UnionType, ExcludeMember>
<font style="color:rgb(56, 56, 56);">从联合类型 UnionType 中移除某些类型，得到一个新的类型。</font>

```typescript
type MyType = Exclude<'cc' | 'yy' | 'princess', 'princess'>
// MyType 为 'cc' | 'yy'
```

##### 8. Extract<Type, Union>
<font style="color:rgb(56, 56, 56);">提取出 Type 类型中能符合 Union 联合类型的类型，得到一个新的类型。很迷惑，这不就是用 "&" 连接两个类型么？</font>

```typescript
// A 为 (x: string) => void
type A = Extract<'cc' | 'yy' | ((x: string) => void), Function>
// B 为 {name: string, age: number}
type B = Extract<{name: string, age: number}, string | {name: string}>
// C 为 {name: string, age: number}
type C = {name: string, age: number} & string | {name: string}
```

##### 9. NonNullable 非空类型
<font style="color:rgb(56, 56, 56);">移除 Type 类型中的 null 和 undefined ，得到一个新的类型。</font>

```typescript
type Person = 'cc' | 'yy' | undefined
type NonNullPerson = NonNullable<Person>  // 'cc' | 'yy'
```

##### 10. Parameters
<font style="color:rgb(56, 56, 56);">提取函数类型（或 any，never 等类型）中的参数，得到一个新的 元组 类型 (或never)。</font>

```typescript
declare function f1(arg: { a: number; b: string }): void;

type T0 = Parameters<() => string>;
// T0 = []

type T1 = Parameters<(s: string) => void>;
// T1 = [s: string]

type T2 = Parameters<<T>(arg: T) => T>;
// T2 = [arg: unknown]

type T3 = Parameters<typeof f1>;
/* 
T3 = [arg: {
  a: number;
  b: string;
}]
*/

type T4 = Parameters<any>;
// T4 = unknown[]

type T5 = Parameters<never>;
// T5 = never
```

##### 11. ConstructorParameters
<font style="color:rgb(56, 56, 56);">提取构造函数中的所有参数，得到一个新的 元组 或 数组 类型(或 never )</font>

```typescript
type T0 = ConstructorParameters<ErrorConstructor>;
// T0 = [message?: string]
type T1 = ConstructorParameters<FunctionConstructor>;
//  T1 = string[]
type T2 = ConstructorParameters<RegExpConstructor>;
// T2 = [pattern: string | RegExp, flags?: string]
```

##### 12. ReturnType
<font style="color:rgb(56, 56, 56);">得到一个由函数类型的返回值类型 组成的新类型。</font>

```typescript
declare function f1(): { a: number; b: string };

type T0 = ReturnType<() => string>;
// T0 = string

type T1 = ReturnType<(s: string) => void>;
// T1 = void

type T2 = ReturnType<<T>() => T>;
// T2 = unknown

type T3 = ReturnType<<T extends U, U extends number[]>() => T>;
// T3 = number[]

type T4 = ReturnType<typeof f1>;
/*
T4 = {
    a: number;
    b: string;
}
*/

type T5 = ReturnType<any>;
// T5 = any

type T6 = ReturnType<never>;
// T6 = never
```

##### 13. InstanceType
<font style="color:rgb(56, 56, 56);">得到Type 类型中的构造函数实例的类型。</font>

```typescript
class C {
  x = 0;
  y = 0;
}

type T0 = InstanceType<typeof C>;
// T0 = C
type T1 = InstanceType<any>;
// T1 = any
type T2 = InstanceType<never>;
// T2 = never
```

##### 14. ThisParameterType
<font style="color:rgb(56, 56, 56);">得到函数类型 Type 中的 this 参数的类型，如果没有 this 参数，则为unknown类型。</font>

```typescript
function toHex(this: Number) {
  return this.toString(16);
}

// P = Number
type P = ThisParameterType<typeof toHex>
```

##### 15. OmitThisParameter
<font style="color:rgb(56, 56, 56);">移除函数类型 Type 中的 this 参数，得到一个新的类型。如果没有 this 参数，则直接返回 Type 类型；如果有 this 参数，则返回一个移除了 this 参数的新的函数类型。</font>

```typescript
function toHex(this: Number) {
  return this.toString(16);
}

const fiveToHex: OmitThisParameter<typeof toHex> = toHex.bind(5);
```

##### 16. ThisType
<font style="color:rgb(56, 56, 56);">不会返回新的类型，而是用于指定上下文中的 this 的类型为 Type。</font>

```typescript
type ObjectDescriptor<D, M> = {
  data?: D;
  methods?: M & ThisType<D & M>; // methods 中的 this 类型为 D & M
};
```

##### 17. Uppercase
<font style="color:rgb(56, 56, 56);">将 string 字面量类型 全部转化为大写，得到一个新的类型；</font>

```typescript
type UpperStr = Uppercase<'cc' | 'yy'>
// 'CC' | 'YY'
```

##### 18. Lowercase
<font style="color:rgb(56, 56, 56);">将 string 字面量类型 全部转化为小写，得到一个新的类型；</font>

```typescript
type LowerStr = Lowercase<'CC' | 'YY'>
// 'cc' | 'yy'
```

##### 19. Capitalize
<font style="color:rgb(56, 56, 56);">将 string 字面量类型 首字母转化为大写，得到一个新的类型；</font>

```typescript
type CapitalizeStr = Capitalize<'cc' | 'yy'>
// 'Cc' | 'Yy'
```

##### 20. Uncapitalize
<font style="color:rgb(56, 56, 56);">将 string 字面量类型 首字母转化为小写，得到一个新的类型；</font>

```typescript
type UncapitalizeStr = Uncapitalize<'CCcc' | 'YYyy'>
// 'cCcc' | 'yYyy'
```

