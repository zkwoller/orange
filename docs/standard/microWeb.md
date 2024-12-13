---
group: 基础
order: 3
toc: content
---
# 微前端
> 而提到微前端就离不开微服务，大家对微服务都比较熟悉了，微服务允许后端体系结构通过松散耦合的代码库进行扩展，每个代码库负责自己的业务逻辑，并公开一个API，每个API均可独立部署，并且各自由不同的团队拥有和维护。
>

> 微前端的思路是把微服务的架构引入到前端，其核心都是要能够以业务为单元构建端到端的垂直架构，使得单个的团队能够独立自主的进行相关的开发，同时又具备相当的灵活性，按需求来组成交付应用。
>



## 微前端优势


在微前端之前的架构，所有的前端还是一个单体，前端团队会依赖所有的服务或者后台的API，前端开发会成为整个系统的瓶颈。使用微前端，就是要让前端业务从水平分层变为垂直应用的一部分，进入业务团队，剥离耦合。



+ 那么微前端有什么好处，为什么要采用微前端架构呢？



1. 各个团队独立开发，相互不影响，独立开发、独立部署，微应用仓库独立，前后端可独立开发，部署完成后主框架自动完成同步更新
2. 增量升级，在面对各种复杂场景时，通常很难对一个已经存在的系统做全量的技术栈升级或重构，而微前端是一种非常好的实施渐进式重构的手段和策略。因为是运行时加载，可以在没有重建的情况下添加，删除或替换前端的各个部分。
3. 不受技术影响，每个团队都应该能够选择和升级其技术栈，而无需与其他团队进行协调。也就是说A应用可以用React，而B应用使用Vue，大家可以通过同一个微前端来加载
4. 独立运行时，每个微应用之间状态隔离，运行时状态不共享。隔离团队代码，即使所有团队都使用相同的框架，也不要共享运行时。构建自包含的独立应用程序。不要依赖共享状态或全局变量。
5. 建立团队命名空间，对于CSS，事件，本地存储和Cookies，可以避免冲突并阐明所有权。



因此，微前端和微服务的本质都是关于去耦合。而只有当应用程序达到一定规模时，这才开始变得更有意义。



## 如何实现微前端架构


> 微前端不是一个库，是一种前端架构的设计思路，要实现微前端，本质上就是在运行时远程加载应用。
>



实现微前端，有几个思路，从构建的角度来看有两种，编译时构建微前端和运行时构建微前端：



+ 编译时微前端，通常将第三方库中的组件作为包，在构建时引入依赖。这种实现引入新的微前端需要重新编译，不够灵活。编译时的微前端可以通过Web Components，Monorepo等方式来实现。其中Monorepo非常流行，常见的工具有nx，rush，lerna等。
+ 运行时微前端，是一次加载或通过延迟加载按需动态将微型前端注入到容器应用程序中时。当引入新的微前端的时候，不需要构建，可以动态在代码中定义加载。我眼中的微前端更多是指这种运行时加载的微前端，因为独立构建，部署和测试是我们对于“微”的定义。



微前端通常由客户端工具来支持实现，有许多支持客户端开发微前端的实现工具，包括：Piral，Open Components，qiankun，Luigi，Frint.js等。其中qiankun是蚂蚁金服开发的。



在客户端还可以通过辅助库的方式来实现，辅助库可以为共享依赖项，路由事件或不同的微前端及其生命周期来提供一些基础架构。



## 实现方式


+ iframe



如果不考虑体验问题，iframe 几乎是最完美的微前端解决方案了。iframe 提供了浏览器原生的隔离方案，不论是样式隔离、js 隔离这类问题统统都能被完美解决。但它的最大问题也在于他的隔离性无法被突破，导致应用间上下文无法被共享，随之带来的开发体验、产品体验的问题。这里的主要问题包括：



1. url 不同步。浏览器刷新 iframe url 状态丢失、后退前进按钮无法使用。
2. UI 不同步，DOM 结构不共享。
3. 全局上下文完全隔离，内存变量不共享。
4. 慢。每次子应用进入都需要次浏览器上下文的重建、资源重新加载。



所以虽然使用iframe可以实现远程加载的效果，但是因为这些限制，很少会有应用会使用。



+ Nginx路由



利用Ngix路由，我们可以把不同的请求路由到不同的微前端的应用。



例如Nginx的路由能力，在前端可以动态请求不同的后端应用，而每一个后端应用独立运行，前端可以把这些不同的后端应用加载，编排在一起。下面的代码是一个Nginx的配置，customers/users/admins分别表示了三个不同的应用，前端通过路由来加载位于不同服务的后端应用。


无论你采用哪一种的微前端架构，Nginx方向代理或者其它的API网关的解决方案都能够提供方便灵活的后端路由功能。但是通过这种方式，需要定义一个通用可扩展的路由规则，否则当引入新的应用的时候，还需要修改Nginx的路由配置，那就很不方便了。



+ Webpack 5 Module Federation



Webpack5 的Module Federation是一个令人兴奋的革新，它能够很方便的支持微前端的构建。模块联合允许JavaScript应用程序从另一个应用程序动态加载代码，并在此过程中能共享依赖关系。如果使用Module Federation的应用程序不具有联合代码所需的依赖关系，则Webpack将从该联合构建源中下载缺少的依赖关系。



Module Federation实现了类似动态链接库的能力，可以在运行时加载远程代码，远程代码本质上是一个加载在window上的全局变量，Module Federation可以帮助解决依赖的问题。Javascrip作为上古语言，没有提供依赖管理，导致留给各路大神各种发挥的空间。



Module Federation的缺点就是依赖Webpack 5，包直接挂载为全局变量。



EMP微前端是基于Module Federation的微前端解决方案。



+ Single SPA



单页面应用是当今为Web应用的主流，区别于传统的多页面应用，整个SPA只有一个页面，其内容都是通过Javascript的功能来加载。



SPA是一个Web应用程序，仅包含一个HTML页面。提供动态更新，它允许在不刷新页面的情况下与页面进行交互。利用单页应用程序，可以显着降低服务器负载并提高加载速度，从而获得更好的用户体验，因为SPA仅在先前加载整个页面时才按需导入数据。



除了开发复杂，对于SEO不友好，但页面应用的最大技术缺陷是URL不适合共享，因为SPA只有一个地址。



single-spa是一个框架，用于将前端应用程序中的多个JavaScript微前端组合在一起。



使用single-spa构建前端可以带来很多好处，例如：



+ 在同一页面上使用多个框架而无需刷新页面（React，AngularJS，Angular，Embe）
+ 独立部署微前端
+ 使用新框架编写代码，而无需重写现有应用程序
+ 延迟加载代码可缩短初始加载时间



## 微前端的问题和缺点


讲了这么多的优点和实现，那么微前端是不是解决前端开发问题的银弹呢？当然不是。所有的架构都是取舍和权衡，这个世界上并不存在银弹，微前端架构和微服务一样也存在他的弊端，单体架构未必就差。



1.  微前端的构建通常比较复杂，从工具，打包，到部署，微前端都是更为复杂的存在，天下没有免费的午餐，对于小型项目，它的成本太高。 
2.  每个团队可以使用不同的框架，这个听上去很美，但是实际操作起来，除了要支持历史遗留的应用，它的意义不大。同时也为带来体验上的问题。可以远程加载不同的框架代码是一回事，把它们都用好是另一回事。 



3 .性能上来看，如果优化得不好微前端的性能可能会存在问题，至少微前端框架是额外的一层加载。如果不同的微前端使用了不同的框架，那么每一个框架都需要额外的加载。



微前端架构还在发展之中，本文提到的iframe/nginx/module federation/single-spa只是诸多解决方案中的一小部分，前端的发展变化和生态系统实在是丰富，其他的方案诸如umd/乾坤，Piral，open comonent等等。当使用你也可以选择标准的Web Component或者ES Modules来构建微前端，但是这些标准的浏览器支持不是特别好，这个是前端开发永远的痛



前端架构师的核心工作是降低需求增长带来的技术实现的复杂性



因为运营页面需求的增长, 我们打造运营页面搭建系统来降低技术实现的复杂性



因为我们要在不同端实现相同的需求的增长, 我们开发各种通过 DSL 实现一次编写多端生成的系统来降低实现需求的复杂性



因为内部系统重构的需求的增长, 我们基于 Next.js 这样方案去打造中后台搭建系统, 降低实现这一类需求的复杂性



像字节这种因为大量 App 生产的需求, 内部肯定搞了 App 工厂系统这样的东西来降低这一类需求实现的复杂性



就像服务端实现微服务分布式有不同的技术选型, 前端也一样, 打造相同的 no-code 系统你可以选不同的技术栈来实现



一个有经验的服务端架构师可以快速搭建一套分布式系统来降低数据操作量增长的复杂性.



那么一个有经验的前端架构师就应该可以快速搞出上述这一套套东西来降低这类需求实现的复杂性.
