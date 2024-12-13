---
nav:
  title: 模式
  order: 8
toc: content
---
# 设计模式

1. 如何将代码分散到不同的类中；
2. 为什么要有接口；
3. 何谓针对抽象编程；
4. 何时不应该使用继承；
5. 如何不修改源代码增加新功能；

学习中需知道：

1. 这个模式的意图是什么；
2. 它要解决一个什么问题，什么时候使用；
3. 它是如何解决问题的，掌握结构图，记住关键代码；
4. 这个模式优缺点是什么，使用时需注意什么；
5. 能够想到两个以上应用实例；

## 面向对象设计原则

1. 单一职责原则：一个类只负责一个功能领域中的相应职责；
2. 开闭原则：对软件实体开放，对修改关闭；
3. 里氏替换原则：所有引用基类对象的地方能够透明地使用其子类对象；
4. 依赖倒置原则：抽象不应该依赖于细节，细节应该依赖于抽象；
5. 接口隔离原则：使用多个专门的接口，而不使用单一的总接口；
6. 合成/组合复用原则：尽量使用对象组合，而不是继承来达到复用的目的；
7. 迪米特原则（最少知识原则）：一个软件实体应当尽可能少的与其他实体发生相互作用；

## 创建型模式

创建型模式将创建与使用分离，在使用对象时无需关心对象的创建细节，从而降低系统耦合，每个创建模式都可以通过不同的解决方案回答3个问题：创建什么，由谁创建，何时创建；

1. 单例模式-确保对象的唯一：确保某一个类只有一个实例，而且自行实例化并向整个系统提供这个实例；
2. 简单工厂模式-集中式工厂实现：定义一个工厂类，他可以根据参数的不同返回不同类的实例，被创建的实例通常都具有共同的父类；
3. 工厂方法模式-多态工厂实现：定义一个用于创建对象的接口，让子类决定将哪一个类实例化；
4. 抽象工厂模式-产品族的创建：提供一个创建一系列相关或相互依赖对象的接口，而无需指定他们具体的类；
5. 原型模式-对象的克隆：使用原型实例指定创建对象的种类，并且通过复制这些原型创建新的对象；
6. 建造者模式-复杂对象的组装与创建：将一个复杂对象的构建与它的表示分离，使得同样的构建过程可以创建不同的表示；

## 结构型模式

1. 适配器模式-不兼容结构的协调
2. 桥接模式-处理多维变化
3. 组合模式-树形结构的处理
4. 装饰模式-扩展系统功能
5. 外观模式-提供统一接口
6. 享元模式-实现对象的复用
7. 代理模式-对象的间接访问

## 行为模式

1. 职责链模式-请求的链接处理
2. 命令模式-请求发送与接收解藕
3. 解释器模式-自定义语言的实现
4. 迭代器模式-遍历聚合对象中的元素
5. 中介模式-协调多个对象之间的元素
6. 备忘录模式-撤销功能的实现
7. 观察者模式-对象间的联动
8. 状态模式-对象状态及其联动
9. 策略模式-算法封装与切换
10. 模版方法模式-定义算法框架
11. 访问者模式-操作复杂对象结构
