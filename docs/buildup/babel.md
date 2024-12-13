---
group: 基础
order: 10
toc: content
---
# babel
<font style="color:rgb(53, 53, 53);">babel只是提供了一个“平台”，让更多有能力的plugins入驻平台，是这些plugins提供了将 ES6+版本的代码转换为向后兼容的 JavaScript 语法的能力。</font>

##  babel的编译流程
<font style="color:rgb(53, 53, 53);">主要分为三步，流程主要为：</font>**parsing（解析）、transforming（转化）、generating（生成）**

+ parsing: babylon（babel 内部使用的解析类库叫做 babylon，现在改名叫@babel/parser） 负责将es6代码进行语法分析和词法分析后转换成抽象语法树AST
+ transforming: plugin插件使用 @babel/traverse 来遍历 AST 并进行节点的操作，用它提供的 API 来编写对 AST 的遍历和修改逻辑，由此来将一种AST转换为另一种AST
+ generating：@babel/generator负责通过AST树生成ES5代码

其中第二步的转化是重中之重，babel的插件机制也是在这一步发挥作用的，plugins在这里进行操作，转化成新的AST，再交给第三步的@babel/generator。 所以如果没有这些plugins进驻平台，那么babel这个“平台”是不具备任何能力的。

而这整个过程，由@babel/core 负责编译过程的控制和管理。它会调用其他模块来解析、转换和生成代码。

## 名词介绍
<font style="color:rgb(53, 53, 53);">Plugins 和 Presets 的运行顺序</font>

+ <font style="color:rgb(53, 53, 53);">Plugins 在 Presets 前运行</font>
+ <font style="color:rgb(53, 53, 53);">Plugins 顺序从前往后排列</font>
+ <font style="color:rgb(53, 53, 53);">Presets 顺序是颠倒的（从后往前）</font>

```typescript
    {
      "plugins": ["Tom", "Jack"],
      "presets": ["a", "b", "c"]
    }
```

<font style="color:rgb(53, 53, 53);">plugins运行顺序：</font>Tom<font style="color:rgb(53, 53, 53);">，</font>Jack

<font style="color:rgb(53, 53, 53);">presets运行顺序： </font>c<font style="color:rgb(53, 53, 53);"> ， </font>b<font style="color:rgb(53, 53, 53);"> ，然后 </font>a

## plugins：插件
正确转化源码，必须使用对应的 plugins。Babel 推崇功能的单一性，就是每个插件的功能尽可能的单一。比如想使用 ES6 的箭头函数，需要插件@babel/plugin-transform-arrow-functions，但是ES6、ES7...那么多新语法难不成一个个装？这时候presets就来了

+ 插件名可以缩写，把plugin省略：@babel/plugin-transform-runtime等价于@babel/transform-runtime

## presets：预设
<font style="color:rgb(53, 53, 53);">presets就是plugins的集合，就比如</font>@babel/preset-env<font style="color:rgb(53, 53, 53);">这个预设，里面装了这么多的plugins</font>

随便点一个plugin看看，可以看到这个plugin的全名叫@babel/plugin-transform-arrow-functions

<font style="color:rgb(53, 53, 53);">可以单独直接下载这个包名：pnpm i @babel/plugin-transform-arrow-functions -D进行使用</font>

+ <font style="color:rgb(53, 53, 53);">预设名可以缩写，把preset省略：@babel/preset-env等价于@babel/env</font>

## polyfill：垫片
polyfill 在英文中有垫片的意思，意为兜底的东西。在计算机科学中，指的是对未能实现的客户端上进行的"兜底"操作。

Polyfill的准确意思为：垫平不同浏览器或者不同环境下的差异，让新的内置函数、实例方法等在低版本浏览器中也可以使用，原理是把它不支持的方法通过用支持的方法重写来获得支持

本文提到的polyfill，均是core-js这个库提供的，如promises 、symbols等等

## 安装
**以下用"进化"的方式来演示Babel配置是怎么一步步进化的，先安装等下用到的包**

> pnpm i @babel/core @babel/cli @babel/preset-env @babel/plugin-transform-runtime regenerator-runtime @babel/polyfill -D
>

> pnpm i core-js@3 @babel/runtime @babel/runtime-corejs3 -S
>

项目根目录新建文件：babel.config.json

```typescript
  //babel.config.json
    {
      //先不写任何配置，看下babel在这种情况能干什么
      "presets": [],
      "plugins": []
    }
```

## 使用
<font style="color:rgb(53, 53, 53);">举个例子，写段ES6+语法的代码，看看babel把ES6+的语法转成ES5要经历什么过程</font>

<font style="color:rgb(53, 53, 53);">建立两个文件，input.js用于准备ES6+的语法例子，output.js是babel的输出文件</font>

<font style="color:rgb(53, 53, 53);">用@babel/cli来运行babel命令，这个babel命令写成script放在package.json</font>

```typescript
    //意思是用babel来将babel目录下的input.js转成支持ES5语法，输出到babel目录下的output.js
    "babel": "babel babel/input.js --out-file babel/output.js"
```

```typescript
    //测试文件，index.js
    const arrow = () => {
      console.log('测试箭头函数')
    }
    
    const p = new Promise((resolve, reject) => {
      resolve('测试Promise')
    })
    
    const list = [1, 2, 3, 4].map((item) => item * 2)

```

然后注意你的项目目录下有没有以下这种限定浏览器版本范围的文件，先删掉它，以免干扰babel判定支持的浏览器范围

+ 项目根目录的 **.browserslistrc**文件
+ package.json的**browserslist**配置
+ babel.config.json配置中的**targets**选项

然后就可以用命令pnpm run babel来进行babel测试，得到结果：

```typescript
    const arrow = () => {
      console.log('测试箭头函数');
    };
    const p = new Promise((resolve, reject) => {
      resolve('测试Promise');
    });
    const list = [1, 2, 3, 4].map(item => item * 2);
```

可以看到没有任何变化。箭头函数、promise还是原封不动

这就印证了前面说的：babel只是提供了一个**平台**，Babel 本身不具有任何转化功能，它把转化的功能都分解到一个个 plugin 里面。因此当我们不配置任何插件时，经过 babel 的代码和输入是相同的，现在加入plugins。

在加入plugins测试之前需要知道一些前置知识，babel将ES6+版本的代码分为了两种情况处理：

+ 语法层： let、const、class、箭头函数等，这些需要在构建时进行转译，是指在语法层面上的转译
+ api方法层：Promise、includes、map等，这些是在全局或者Object、Array等的原型上新增的方法，**它们可以由相应es5的方式重新定义**

<font style="color:rgb(53, 53, 53);">babel对这两种情况的转译是不一样的，接下来需要给出相应的配置</font>

## babel配置第一次进化
<font style="color:rgb(53, 53, 53);">上面的例子中const、箭头函数属于语法层面的，而promise和map属于api方法层面的，现在加入预设 </font>**@babel/preset-env**<font style="color:rgb(53, 53, 53);">看看效果</font>

```typescript
    //babel.config.json
    {
      //@babel/preset-env其实是有提供polyfills能力的，但是默认为关闭
      //这里先不开启，仅让它起到转化语法层面的能力
      "presets": ["@babel/preset-env"],
      "plugins": []
    }
```

<font style="color:rgb(53, 53, 53);">再次跑一下babel命令，得到结果：</font>

```typescript
    "use strict";
    
    var arrow = function arrow() {
      console.log('测试箭头函数');
    };
    var p = new Promise(function (resolve, reject) {
      resolve('测试Promise');
    });
    var list = [1, 2, 3, 4].map(function (item) {
      return item * 2;
    });

```

<font style="color:rgb(53, 53, 53);">发现语法层面的代码都降级了。那么api层面要如何处理呢？ 下面有请</font><font style="color:rgb(53, 53, 53);"> </font>@babel/polyfill<font style="color:rgb(53, 53, 53);">（这东西现在已经被弃用了，但是现在按照历史进度来讲解它曾经的辉煌）的加入，</font>

<font style="color:rgb(53, 53, 53);">在测试代码中导入它：</font>

```typescript
    import '@babel/polyfill'
    const arrow = () => {
      console.log('测试箭头函数')
    }
    
    const p = new Promise((resolve, reject) => {
      resolve('测试Promise')
    })
    
    const list = [1, 2, 3, 4].map((item) => item * 2)

```

<font style="color:rgb(53, 53, 53);">再跑一下babel看下结果：</font>

```typescript
    "use strict";

    require("@babel/polyfill");
    var arrow = function arrow() {
      console.log('测试箭头函数');
    };
    var p = new Promise(function (resolve, reject) {
      resolve('测试Promise');
    });
    var list = [1, 2, 3, 4].map(function (item) {
      return item * 2;
    });

```

<font style="color:rgb(53, 53, 53);">就多了一行</font>**require("@babel/polyfill")**<font style="color:rgb(53, 53, 53);"> ，但是已经包含了整个ES6+环境所需要的API了，会变得臃肿，所以有进化的空间</font>

## babel配置第二次进化
<font style="color:rgb(53, 53, 53);">上面通过 </font>import "@babel/polyfill"<font style="color:rgb(53, 53, 53);"> 的方式来实现针对api层面的“无脑解决”。然而从 babel 7.4.0版本开始就不建议采取这样的方式了。 因为引入 @babel/polyfill 就相当于在代码中引入下面两个库</font>

```typescript
import "core-js/stable";
import "regenerator-runtime/runtime";
```

这意味着不仅不能按需加载还有全局变量被污染的问题（因为他是通过向全局对象和内置对象的prototype上添加方法来实现的）

因此 babel 决定把这两个家伙的工作一并交给上面提到的 **@babel/preset-env**，即通过设置useBuiltIns的方式来提供polyfill的能力，且支持按需加载

```typescript
    //babel.config.json
    {
      "presets": [
        [
          "@babel/preset-env",
          {
            // 实现按需加载
            "useBuiltIns": "usage", 
            "corejs": {
              "version": 3
            }
          }
        ]
      ],
      "plugins": []
    }

```

```typescript
    //input.js
    //不用导入任何文件，因为这里使用usage，原因后面useBuiltIns配置项有解析
    const arrow = () => {
      console.log('测试箭头函数')
    }

    const p = new Promise((resolve, reject) => {
      resolve('测试Promise')
    })

    const list = [1, 2, 3, 4].map((item) => item * 2)

```

再看一下结果：

```typescript
    "use strict";

    require("core-js/modules/es.object.to-string.js");
    require("core-js/modules/es.promise.js");
    require("core-js/modules/es.array.map.js");
    var arrow = function arrow() {
      console.log('测试箭头函数');
    };
    var p = new Promise(function (resolve, reject) {
      resolve('测试Promise');
    });
    var list = [1, 2, 3, 4].map(function (item) {
      return item * 2;
    });

```

<font style="color:rgb(53, 53, 53);">可以看到只require了需要的方法，压力确实小多了。</font>

<font style="color:rgb(53, 53, 53);">但是我想得寸进尺，请问还能不能再进化一下？</font>

## babel配置第三次进化
<font style="color:rgb(53, 53, 53);">这次进化需要改一下样例代码来说明，换个使用场景，let、const这些对比不出问题，所以用class</font>

```typescript
    // input.js
    class Person {
      constructor(name) {
        this.name = name;
      }
      say() {
        console.log(this.name);
      }
    }
```

<font style="color:rgb(53, 53, 53);">看下babel转化结果：</font>

除了require的部分，还多了好多定义的函数，这些是辅助函数（比如上边的_classCallCheck函数），是在编译阶段辅助 Babel 的函数；问题来了，现在只有一个JS文件需要转换，然而实际项目开发中会有大量的需要转换的文件，如果每一个转换后的文件中都存在相同的函数，那代码总体积肯定会无意义的增大。所以有没有哪位英雄可以抽离出来复用以减少空间？

@babel/plugin-transform-runtime<font style="color:rgb(53, 53, 53);">就可以做到</font>

<font style="color:rgb(53, 53, 53);">该插件会开启对 Babel 注入的辅助函数的复用，以节省代码体积，这些辅助函数被统一隔离在</font>@babel/runtime<font style="color:rgb(53, 53, 53);">中提供的helper模块中，编译时，直接从helper模块加载</font>

所以还需要安装@babel/runtime（在对一些语法进行编译的时候，babel需要借助一些辅助函数）

<font style="color:rgb(53, 53, 53);">@babel/plugin-transform-runtime</font><font style="color:rgb(53, 53, 53);"> 通常仅在开发时使用，但是运行时最终代码需要依赖 </font><font style="color:rgb(53, 53, 53);">@babel/runtime</font><font style="color:rgb(53, 53, 53);">，所以 </font><font style="color:rgb(53, 53, 53);">@babel/runtime</font><font style="color:rgb(53, 53, 53);"> 必须要作为生产依赖被安装</font>

```typescript
    // babel.config.json
    {
      "presets": [ "@babel/preset-env"],
      // 注意，runtime没有设置core-js的话，默认是false,即不提供polyfill，现在这个class Person例子没关系，因为没用到Promise那些
      "plugins": ["@babel/plugin-transform-runtime"]
    }
```

<font style="color:rgb(53, 53, 53);">注意：如果使用</font>@babel/plugin-transform-runtime<font style="color:rgb(53, 53, 53);">，则不得设置</font>@babel/preset-env<font style="color:rgb(53, 53, 53);">的</font>useBuiltIns

<font style="color:rgb(53, 53, 53);">官网警告：</font>

> <font style="color:#ED740C;">启用此插件时，不得设置@babel/preset-env中的useBuiltIns选项。否则，这个插件可能无法完全沙盒环境。</font>
>

## babel配置终极进化
<font style="color:rgb(53, 53, 53);">终极进化意思不是每个项目都应该无脑复制粘贴这个配置，像Vue、React等等框架的作者早已考虑到这点，会在此基础上作了封装、改进优化等等，以更好适配他们自己的JS框架</font>

```typescript
    //babel.config.json
    {
      "presets": ["@babel/preset-env"],
      "plugins": [
        [
          "@babel/plugin-transform-runtime",
          {
            // 不同版本区别后面会说
            "corejs": { "version": 3 }
          }
        ]
      ]
    }
```

综上所述，@babel/plugin-transform-runtime实现了下面几个重要的功能

+ 对辅助函数的复用，解决代码冗余问题
+ 解决全局变量污染问题
+ 提供polyfill，并且是根据代码使用情况导入+目标浏览器来提供，相当于@babel/preset-env中的"useBuiltIns": "usage"【后面的@babel/plugin-transform-runtime章节会验证】

## 全局变量污染
这里试验一下怎么个污染法，先是不用@babel/plugin-transform-runtime的情况：

IE 11不支持String.prototype.includes，拿它来试验下，在F12控制台试着用includes方法，结果正常输出，说明全局变量被更改了

<font style="color:rgb(53, 53, 53);">然后是用了之后的情况，项目代码正常输出，但是在控制台输出不行，做到了防止全局变量污染：</font>

#### babel-cli
<font style="color:rgb(53, 53, 53);">Babel附带了一个内置的CLI，可用于从命令行编译文件。</font>

```typescript
pnpm i @babel/core @babel/cli -D
// 这将把编译后的结果直接输出至终端。使用 --out-file 或着 -o 可以将结果写入到指定的文件。.
babel example.js --out-file compiled.js
//或者缩写
babel example.js -o compiled.js

//如果我们想要把一个目录的文件全都编译成一个新的目录，可以使用 --out-dir 或者 -d。.
babel src --out-dir lib
//或者缩写
babel src -d lib

```

## @babel/preset-env
### useBuiltIns选项
如果用了插件@babel/plugin-transform-runtime，就不能设置这个选项

```typescript
"presets": [
    [
      "@babel/preset-env",
      //配置样例
      {
        "useBuiltIns": "usage",
        "corejs": { "version": 3 }
      }
    ]
  ]
```

<font style="color:rgb(53, 53, 53);">这个配置提供了三个选项告诉</font>babel<font style="color:rgb(53, 53, 53);">该如何引入</font>polyfill<font style="color:rgb(53, 53, 53);">包</font>

#### usage
**代码中不用主动****import**<font style="color:rgb(53, 53, 53);">，需要指定corejs版本</font>

<font style="color:rgb(53, 53, 53);">用usage选项的话</font>babel<font style="color:rgb(53, 53, 53);">会自动将有以下特征的</font>polyfill<font style="color:rgb(53, 53, 53);">导入</font>

+ browserslist<font style="color:rgb(53, 53, 53);">环境（目标浏览器）不支持的</font>
+ <font style="color:rgb(53, 53, 53);">代码里已使用到的</font>

#### entry
**代码中需要主动****import 'core-js/stable'** ，需要指定corejs版本

并且如果在使用7.18.0 版本以下的 @babel/core，还需要额外再引入一个包，安装：

npm i regenerator-runtime -D

引入：**import 'regenerator-runtime/runtime'**

用entry选项的话babel会自动将有以下特征的polyfill导入

+ browserslist环境（目标浏览器）不支持的

<font style="color:rgb(53, 53, 53);">entry打包大小是usage的两倍，这是因为entry下即便是项目并不会用到的polyfill，它也给打包进去了</font>

#### <font style="color:rgb(53, 53, 53);">false（默认选项）</font>
<font style="color:rgb(53, 53, 53);">只做了语法转换，不会导入任何</font><font style="color:rgb(53, 53, 53);">polyfill</font><font style="color:rgb(53, 53, 53);">进来，并且</font><font style="color:rgb(53, 53, 53);">corejs</font><font style="color:rgb(53, 53, 53);">配置将无效</font>

<font style="color:rgb(53, 53, 53);">按照上面的解释，那usage岂不是吊打entry？并不是，因为一些第三方库或框架可能依赖于特定的 polyfill，这些 polyfill 可能无法通过 </font><font style="color:rgb(53, 53, 53);">usage</font><font style="color:rgb(53, 53, 53);"> 自动导入</font>

### corejs选项
Type: string 或 { version: string, proposals: boolean } ，默认为 "2.0" 。 version 字符串可以是任何支持的 core-js 版本。例如 "3.8" 或 "2.0" 。

此选项仅在与 useBuiltIns: usage 或 useBuiltIns: entry 一起使用时才有效

<font style="color:rgb(53, 53, 53);">所以有需求的话建议指定子版本号</font>

<font style="color:rgb(53, 53, 53);">proposals的意思是还在提案中，但是还没有正式发布的语法，设为true即可使用这些语法</font>

### targets选项
Type: string | Array<string> | { [string]: string }

<font style="color:rgb(53, 53, 53);">查浏览器状态、某版本人群使用覆盖率、更多语法网站：</font>[browsersl.ist/](https://link.juejin.cn/?target=https%3A%2F%2Fbrowsersl.ist%2F)

默认值： {}。未指定目标时：Babel会假设你的目标是尽可能的最老的浏览器

```typescript
    //这里先不用终极进化版配置，用@babel/preset-env举例，因为@babel/preset-env可以配置targets
    //而@babel/plugin-transform-runtime目前不支持
    "presets": [
        [
          "@babel/preset-env",
          {
            "useBuiltIns": "usage",
            "corejs": { "version": 3 },
            //指定浏览器范围为：基于全球使用率大于0.25%的浏览器版本范围  
            //2年内仍有官方支持或更新的浏览器（兼容IE就把not dead去掉）
            "targets": ["> 0.25%","not dead"]
          }
        ]
      ]

```

这个配置下，用babel处理前面的样例代码的运行结果是：

```typescript
    'use strict'

    const arrow = () => {
      console.log('测试箭头函数')
    }
    const p = new Promise((resolve, reject) => {
      resolve('测试Promise')
    })
    const list = [1, 2, 3, 4].map((item) => item * 2)
```

<font style="color:rgb(53, 53, 53);">可以看到它没有进行任何处理，像是箭头函数、promise等等都原封不动。这是因为targets上面指定了为not dead状态的浏览器，即主流浏览器。而这些浏览器本身就是支持较新语法的。但如果把not dead去掉，结果是：</font>

```typescript
    'use strict'

    require('core-js/modules/es.object.to-string.js')
    require('core-js/modules/es.promise.js')
    require('core-js/modules/es.array.map.js')
    let arrow = function arrow() {
      console.log('测试箭头函数')
    }
    let p = new Promise(function (resolve, reject) {
      resolve('测试Promise')
    })
    let list = [1, 2, 3, 4].map(function (item) {
      return item * 2
    })
```

## @babel/plugin-transform-runtime
### corejs
<font style="color:rgb(53, 53, 53);">可选值：</font>false<font style="color:rgb(53, 53, 53);">、</font>2<font style="color:rgb(53, 53, 53);">、</font>3<font style="color:rgb(53, 53, 53);">， 默认是</font>false

<font style="color:rgb(53, 53, 53);">选择不同的值，安装的包也不一样</font>

<font style="color:rgb(53, 53, 53);">注意：有些函数只有3才会有：</font>

> <font style="color:rgb(53, 53, 53);">指定一个数字将重写需要polyfillable API来引用该（主）版本core js中的助手的助手。请注意，corejs:2只支持全局变量（例如Promise）和静态属性（例如Array.from），而corejs:3也支持实例属性（例如[].includes）。</font>
>

> <font style="color:rgb(53, 53, 53);">默认情况下，@babel/plugin-transform运行时不会polyfill提议。如果您使用的是corejs:3，您可以通过启用properties:true选项来选择。</font>
>

## 验证导入polyfill
@babel/plugin-transform-runtime是根据项目代码使用情况自动导入polyfill，还是根据corejs选择的值全部导入？比如corejs: 2不支持[].includes，3才支持，是不是意味着我用了corejs: 3之后，即使我项目用不到，它也给我导入polyfill来支持[].includes？

<font style="color:rgb(53, 53, 53);">可以看到是直接原封不动输出了，因为目标浏览器兼容性好，支持</font>includes

<font style="color:rgb(53, 53, 53);">综上所述，该Babel配置下对polyfill的导入效果约等于</font>@babel/preset-env<font style="color:rgb(53, 53, 53);">中的</font>"useBuiltIns": "usage"

## 如何进行Babel配置
<font style="color:rgb(43, 43, 43);">配置babel一共有三种方式</font>

1. 配置文件（Recommended）：创建一个名为 .babelrc 或者 babel.config.js 的配置文件。

  + babel.config.js

    ```js
      module.exports = function (api) {
        api.cache(true);
        return {
          presets: ["@babel/preset-env"],
          plugins: ["@babel/plugin-proposal-class-properties"]
        };
      };
    ```
  + .babelrc
    
    ```json
      {
        "presets": ["@babel/preset-env"],
        "plugins": ["@babel/plugin-proposal-class-properties"]
      }
    ```

2. 命令行参数：在命令行中直接使用Babel CLI工具时，通过命令行参数传递配置。
```bash
babel --presets @babel/preset-env --plugins @babel/plugin-proposal-class-properties script.js
```

3. 环境变量：通过设置环境变量来配置Babel，例如 BABEL_ENV 或 NODE_ENV
```bash
BABEL_ENV=development babel script.js
```


