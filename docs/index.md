
## <font style="color:rgb(37, 41, 51);">HTTP</font>
对于Http，我们前端首先需要了解其网络协议分层：OSI七层协议，TCP/IP四层协议和五层协议，这有助于我们了解应用层和传输层及网络层的工作流程；同时我们也要了解应用层的核心http1.0、http1.1、http2.0及https的区别；还要了解传输层的TCP、UDP，webSocket。

+ 在前后端交互方面必须了解GET和POST的请求方式，以及浏览器返回状态200、3xx、4xx、5xx的区别；还有前后端通信传输的request header头、响应报文体response body，通信的session和cookie。
+ 网络安全方面需要了解https，了解非对称算法rsa和对称算法des，登录认证的JWT（JSON Web Token）；同时也需要了解怎么防范XSS、CSRF、SQL注入、URL跳转漏洞、点击劫持和OS命令注入攻击。

## <font style="color:rgb(37, 41, 51);">Nginx</font>
我们的网页都是存储在web服务器上的，公司一般都会进行nginx的配置，可以对资源进行<font style="background-color:rgb(255, 245, 245);">gzip</font>压缩，<font style="background-color:rgb(255, 245, 245);">redirect</font>重定向，解决<font style="background-color:rgb(255, 245, 245);">CROS</font>跨域问题，配置<font style="background-color:rgb(255, 245, 245);">history</font>路由拦截。技术方面，我们还要了解其安装、常用命令、反向代理、正向代理和负载均衡。

## html
html的历史可以自行了解，我们需要更关注文档声明、各种标签元素、块级元素及非块级元素、语义化、src与href的区别、WebStorage和HTML5的新特性。复杂的页面和功能会更依赖于我们的canvas。

## css
css方面主要了解布局相关盒子模型、position、伪类和伪元素、css选择器优先级、各种水平垂直居中方法、清除浮动、CSS3新特性、CSS动画、响应式布局相关的rem、flex、@media。当然也有部分公司非常重视用户的交互体验和UI效果，那会更依赖我们CSS3的使用。

## JS
js在现代开发过程中确实是最重要的，我们更关心其底层原理、使用的方法、异步的处理及ES6的使用。

+ 在底层方面我们需要了解其作用域及作用域链、闭包、this绑定、原型和原型链、继承和类、属性描述符defineProperty和事件循环Event Loop。
+ 在使用方面我们需要了解值和类型的判断、内置类型的null、undefined、boolean、number、string、object和symbol，其中对象类型是个复杂类型，数组、函数、Date、RegExp等都是一个对象；数组的各种API是我们开发中最常用的，了解Dom操作的API也是必要的。
+ ES6方面要了解let、const声明、块作用域、解构赋值、箭头函数、class、promise、async await、Set、WeakSet、Map、WeakMap、proxy和Reflect。

## React
开发react，也就是在写all in js，或者说是JSX，那就必须了解其底层JSX是如何转化成虚拟节点VDom的。在转换jsx转换成VDom，VDom在转换成真实Dom，react的底层做了很多优化，其中大家熟悉的就是Fiber、diff、声明周期以及事件绑定。

那我们写react都是在写组件化的东西，组件通信的各种方式也是需要了解的；还要了解PureComponent、memo、forwardRef等组件类的方法；了解createElement、cloneElement、createContext等工具类的方法；了解useState、useEffect、useMemo、useCallback、useRef等hooks的使用；还有了解高阶组件HOC及自定义hooks。

了解react16、react17、react18做了哪些优化。

## Vue
vue方面，我们需要了解MVVM原理、template的解析、数据的双向绑定、vue2和vue3的响应式原理、其数据更新的diff算法；使用方面要了解其声明周期、组件通信的各种方式和vue3的新特性。

## 前端工程化
上面写到了前端框架，在使用框架开发的过程中，我们必不可少的在整个开发过程向后端看齐，工程化的思想也深入前端。代码提交时可以使用git的钩子hooks进行流水线的自动化拉取，然后使用webpack、rollup、gulp以及vite进行代码编译打包，最后使用jenkins、AWS、阿里云效等平台进行自动化部署，完成整个不同环境的打包部署流程。

## webpack
在代码编译打包这块儿，webpack是最重要的，也是更复杂的，所以我们有必要多了解它。

在基础配置方面，我们要了解mode、entry、output、loader和plugin，其中loader和plugin是比较复杂的，webpack默认只支持js，那意味着要使用es6就要用babel-loader，css方面要配置css-loader、style-loader、less-loader、sass-loader等，图片文件等资源还要配置file-loader；

plugin方面要配置antd的相关配置、清空打包目录的clean-webpack-plugin、多线程打包的HappyPack、分包的splitChunks等等配置。

在不同环境配置方面要基于cross-env配置devServer和sourcemap。

在构建优化方面要配置按需加载、hash、cache、noParse、gzip压缩、tree-shaking和splitChunks等。

幸运的是，现在很多脚手架都自动的帮你配置了很多，并且支持你选择什么模版去配置。

## 环境部署
环境部署方面，第一家公司我用的软件FileZilla进行手动上传FTP服务器，虽然也没出过啥错，但不智能，纯依靠人工，如果项目多，时间匆忙，很容易部署错环境，而且还要手动备份数据。后面学了点终端命令，使用SSH远程上传文件，其实还没有软件上传来的直接，也容易出错。后面换了公司，也用上了CI/CD持续集成，其本质就是平台帮你自动的执行配置好的命令，有git拉取代码的命令、npm run build的打包命令，最后SSH远程存到服务器的目录文件，并重启nginx的web服务器。

CI/CD 可让持续自动化和持续监控贯穿于应用的整个生命周期（从集成和测试阶段，到交付和部署）。

## 后端服务
为了更好的完成整个应用，了解后端技术也是必要的，我们可以从nodejs、MongoDB、MySQL等入手。如果有余力，了解java、c#、c++也可以帮助我们更好的开发安卓和IOS应用。前后端都通了话，不管对于我们工作、面试、接活儿或者做独立开发者都是很必要的。

## 数据结构
常见的数据结构有8种：数组、栈、队列、链表、树、散列表、堆和图。

## 设计模式
设计模式方面我们需要了解：

+ 六大原则：单一职责原则、开放封闭原则、里氏替换原则、依赖倒置原则、接口隔离原则和迪米特原则（最少知道原则）
+ 创建型设计模式：单例模式、原型模式、工厂模式、抽象工厂模式和建造者模式
+ 结构型设计模式：适配器模式、装饰器模式、代理模式、外观模式、桥接模式、组合模式和享元模式
+ 行为型设计模式：观察者模式、迭代器模式、策略模式、模板方法模式、职责链模式、命令模式、备忘录模式、状态模式、访问者模式、中介者模式和解释器模式

## 算法
算法方面我们需要了解：

+ 基础概念：时间复杂度和空间复杂度
+ 排序方法：初级排序的选择排序、插入排序和冒泡排序，高级排序的快速排序、归并排序、堆排序
+ 搜索：深度优先搜索和广度优先搜索
+ 其他：递归、分治、回溯、动态规划和贪心算法

