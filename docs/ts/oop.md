---
order: 1
toc: content
---
# 面向对象特征

## 抽象
1. 抽象类和抽象方法一般用来定义某种标准，可以用来实现多态
2. 抽象类中可以有实例方法，但是必须包含一个抽象方法，否则没有意义
3. 抽象方法只能存在于抽象类中
4. 继承抽象类的子类，必须实现抽象类中定义的抽象方法
5. 抽象类无法被实例化 下面我们依然用动物的案例来展示

```typescript
// extends（继承）和 implements（实现）
// 1.类继承类
// 2.接口继承接口/类
// 3.类实现接口/类
// interface IStorage {
//   save(key:string,value:any):void;
//   read(key:string):any;
// }
//抽象类
abstract class IStorage{
  abstract save(key:string,value:any):void;
  abstract read(key:string):any;
}


class UserInfo{
  public name:string;
  constructor(name:string, public storage:IStorage){
    this.name = name;
  }
  save(key: string, value: any): void {
    this.storage.save(key,value)
  }
  read(key: string) {
    return this.storage.read(key)
  }
}

class LocalStorage implements IStorage{
  save(key: string, value: any): void {
    localStorage.setItem(key,value)
  }
  read(key: string) {
    return localStorage.getItem(key)
  }
}
class MysqlStorage implements IStorage{
  save(key: string, value: any): void {
    localStorage.setItem(key,value)
  }
  read(key: string) {
    return localStorage.getItem(key)
  }
}


let local = new LocalStorage()
let mysql = new MysqlStorage()
let userInfo1 = new UserInfo('lp',local)
let userInfo2 = new UserInfo('zk',mysql)
console.log(userInfo1.name)
```

## 继承

优点 -- 1.复用代码，减少类的冗余代码，减少开发工作量。2.使得类与类之间产生关系，为多态的实现打下基础。

缺点 -- 层次过深，类和类出现耦合

```typescript
class Animal {
  name:string;
  age:number;

  constructor(name:string,age:number){
    this.name = name
    this.age = age
  }

  eat(){
    console.log(this.name)
  }
}

class Dog extends Animal {
  
}
```

## 封装
把内部属性封装起来，不让外部直接访问

优点--1.提供易用性2.保护类的隐私

缺点--层次过深，类和类出现耦合



```typescript
class Car {
  static lastName:string = 'b';
  //共有属性 可以在本类，子类，其他类中访问
  public name:string;
  //受保护的属性 可以在本类，子类访问，其他类不可以
  protected age:number;
  //受保护的 可以在本类访问，子类，其他类不可以
  private weight:number;
  constructor(name:string,age:number,weight:number){
    this.name = name
    this.age = age
    this.weight = weight
  }
}

class BusCar extends Car {
  private balance: number;

  constructor(name:string,age:number,weight:number,balance:number){
    super(name,age,weight)
    this.balance = balance
  }
}

const busCar = new BusCar('a',12,60,0)
```
## 多态

定义：为不同数据类型的实体（子类实体）提供统一的接口（父类类型的引用）

父类定义方法，但是不实现，让其子类去实现，每个子类都有不同的表现 多态属于继承



```typescript
// 创建 父类
class Plant {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  say(): void {
    console.log(this.name);
  }
}

// 创建 子类一
class Tree extends Plant {
  age: number;
  constructor(age: number, name: string) {
    super(name);
    this.age = age;
  }
  say(): void {
    console.log(this.name + this.age);
  }
}
// 创建 子类二
class Grass extends Plant {
  grade: string;
  constructor(grade: string, name: string) {
    super(name);
    this.grade = grade;
  }
  say(): void {
    console.log(this.name + this.grade);
  }
}

// 常规：父类类型引用指向父类实例
let plant: Plant = new Plant("人");

// 多态一：父类类型引用指向子类实例对象
let tree: Plant = new Tree(18, "小明");

// 多态二：父类类型引用指向子类实例对象
let grass: Plant = new Grass("高二", "张老师");

// 多态的作用：不同类型的对象（必须是父子关系）针对相同的方法，产生了不同的行为
function sayWhat(who: Plant) {
  who.say(); // 执行共有的方法
}

sayWhat(plant); // 传入 父类实例对象
sayWhat(tree); // 传入 子类实例对象
sayWhat(grass); // 传入 子类实例对象


//类的成员方法可以直接返回 this，这样可以方便的实现链式调用
class WorkFlow {
  step1() {
    return this
  }
  step2() {
    return this
  }
}

new WorkFlow().step1().step2()

// 可以实现多态
class MyFlow extends WorkFlow {
  next() {
    return this
  }
}

new MyFlow().next().step1().next().step2()
```
