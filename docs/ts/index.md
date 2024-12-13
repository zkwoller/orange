---
order: 1
toc: content
nav:
  title: ts
  order: 11
---

# 设计原则 

### 1. 开闭原则  -- 对修改关闭对扩展开放是软件设计的基石；
### 2. 单一职责
    - 一个类的功能要尽可能单一，不要太复杂
    - 如果一个类代码行数超过100，方法超过10个，可以考虑拆分
    - 但也不是越细越好，高内聚低耦合

```typescript
class Product{
  public name:string;
  public price:string;
  public category:Category;
  public updateName(){};
  public updatePrice(){};
  public updateCategory(){};
}
class Category{
  public name:string;
  public icon:string;
}
```

### 3. 里氏替换原则-多态是里氏替换的基础 子类继承父类，单独调完全可以运行；
    - 尽可能使用父类或抽象类
    - 任何在使用父类的地方都要可以使用子类
    - 要求子类不能违反父类原则，不能更改父类的功能逻辑



```typescript
abstract class AbstractDrink{
  abstract getPrice():number;
}
class CocaCola extends AbstractDrink{
  getPrice(): number {
    return 3
  }
}
class Sprite extends AbstractDrink{
  getPrice(): number {
    return 4
  }
}
class Fanta extends AbstractDrink{
  getPrice(): number {
    return 3
  }
}
class Customer{
  drink(abstractDrink:AbstractDrink){
    console.log(abstractDrink.getPrice())
  }
}
let c1 = new Customer()

c1.drink(new CocaCola())
```

### 4. 依赖倒置 -- 引用一个对象，如果对象有底层类型，直接引用底层；
    - 依赖抽象，而非依赖具体的实现
    - 要求我们在程序代码中传递参数或在关联关系中，尽量引用层次高的抽象层类
    - 使用方只关注接口而不关注具体类的实现



```typescript
interface GirlFriend{
  age:number;
  height:number;
  cook():void;
}
class LinChiLing implements GirlFriend{
  height: number = 175;
  age:number = 35;
  cook(): void {
    throw new Error("Method not implemented.");
  }
}
class HanMeiMei implements GirlFriend{
  height: number = 175;
  age:number = 35;
  cook(): void {
    throw new Error("Method not implemented.");
  }
}
class SingDog{
  constructor (public girlFriend:GirlFriend){

  }
}

let dog1 = new SingDog(new LinChiLing())
```

### 5. 接口隔离原则 -- 每一个接口应该是一种角色；
    - 1.复用2.低耦合3.单一功能
    - 保持接口的单一独立，避免出现胖接口
    - 类似于单一职责，更关注接口

```typescript
interface Running{
  run():void;
}
interface Flying{
  fly():void;
}
interface Swimming{
  swim():void;
}
class Automobile implements Running, Flying, Swimming{
  run(){}
  fly(){}
  swim(){}
}
```

### 6. 迪米特法则 - 最少知识原则 --一个对象应对其他对象有尽可能少的了解；
    - 一个软件尽可能少的与其他实体发生相互作用
    - 降低类之间的耦合
    - 定义时尽可能实现内聚，少用public，尽量使用 private ，protected等



```typescript
class Salesman{
  constructor(public name:string){}
  sale(){

  }
}
class SaleManager{
  private salesmen:Array<Salesman>=[new Salesman('123'),new Salesman('456')]
  sale(){
    this.salesmen.forEach(salesman=>salesman.sale())
  }
}
class CEO{
  private saleManager :SaleManager = new SaleManager()
  sale(){
    this.saleManager.sale()
  }
}
```

### 7. 合成复用原则 -- 新的对象应使用一些已有的对象，使之成为新对象的一部分
    - 类和类之间的关系 - 关联(聚合和组合)，泛化和依赖
    - 组合 心脏与人
    - 聚合 如班级与学生关系
    - 关联 产品类有一个实例属性-分类，那么就认为产品关联了分类，双向关联
    - 依赖 学生->读 书
    - 尽量使用组合或聚合 而不要使用继承



```typescript
class Cooker{
  cook(){}
}
//继承耦合性太强
class Person2{
  private cooker:Cooker;
  cook(){
    this.cooker.cook()
  }
}
```



### 写好代码标准

+ 可维护性  BUG是否好改
+ 可读性  是否容易看懂
+ 可扩展性 是否可以添加新功能
+ 灵活性 添加新功能是否容易 老地方和接口是否容易复用
+ 简洁性 代码是否简单清晰
+ 可复用性 相同的代码不要写两遍
+ 可测试性 是否方便单元测试和集成测试


### 总结
+ 开闭原则是核心，对修改关闭对扩展开放是软件设计的基石；
+ 单一职责要求我们设计接口和模块功能的时候尽量保证单一性和原子性，修改一条不影响全局和其他模块
+ 里氏替换原则和依赖倒置原则要求面向接口和抽象编程，不要依赖具体实现，否则实现一改，上层调用者就要对应修改
