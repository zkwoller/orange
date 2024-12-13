---
group: 基础
order: 11
toc: content
---
# webpack

## 1.什么是webpack？
<font style="color:rgb(43, 43, 43);">概念：</font>**Webpack** <font style="color:rgb(43, 43, 43);">是一种用于构建 JavaScript 应用程序的静态模块打包器，它能够以一种相对一致且开放的处理方式，加载应用中的所有资源文件（图片、CSS、视频、字体文件等），并将其合并打包成浏览器兼容的 Web 资源文件。</font>

<font style="color:rgb(43, 43, 43);">功能：</font>

+ <font style="color:rgb(43, 43, 43);">模块的打包：通过打包整合不同的模块文件保证各模块之间的引用和执行</font>
+ <font style="color:rgb(43, 43, 43);">代码编译：通过丰富的</font><font style="color:rgb(43, 43, 43);">loader</font><font style="color:rgb(43, 43, 43);">可以将不同格式文件如</font><font style="color:rgb(43, 43, 43);">.sass/.vue/.jsx</font><font style="color:rgb(43, 43, 43);">转译为浏览器可以执行的文件</font>
+ <font style="color:rgb(43, 43, 43);">扩展功能：通过社区丰富的plugin可以实现多种强大的功能，例如</font>**代码分割、代码混淆、代码压缩、按需加载.....等等**

## 2.webpack原理是什么？
### 核心概念
+ <font style="color:rgb(43, 43, 43);">entry：一个可执行模块或者库的入口。</font>
+ <font style="color:rgb(43, 43, 43);">chunk：多个文件组成一个代码块。可以将可执行的模块和他所依赖的模块组合成一个chunk，这是打包。</font>
+ <font style="color:rgb(43, 43, 43);">loader：文件转换器。例如把es6转为es5，scss转为css等</font>
+ <font style="color:rgb(43, 43, 43);">plugin：扩展webpack功能的插件。在webpack构建的生命周期节点上加入扩展hook，添加功能。</font>
+ <font style="color:rgb(43, 43, 43);">output：编译结果文件输出</font>

### 构建流程
Webpack 的运⾏流程是⼀个串⾏的过程，从启动到结束会依次执⾏以下流程：

1. <font style="color:rgb(43, 43, 43);">初始化参数：解析webpack配置参数，合并shell传入和webpack.config.js文件配置的参数，形成最后的配置结果。</font>
2. <font style="color:rgb(43, 43, 43);">开始编译：上一步得到的参数初始化compiler对象，注册所有配置的插件，插件监听webpack构建生命周期的事件节点，做出相应的反应，执行对象的 run 方法开始执行编译。</font>
3. <font style="color:rgb(43, 43, 43);">确定入口：从配置的entry入口，开始解析文件构建AST语法树，找出依赖，递归下去。</font>
4. <font style="color:rgb(43, 43, 43);">编译模块：递归中根据文件类型和loader配置，调用所有配置的loader对文件进行转换，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理。</font>
5. <font style="color:rgb(43, 43, 43);">完成模块编译：在经过第4步使⽤ Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；</font>
6. <font style="color:rgb(43, 43, 43);">输出资源：根据⼊⼝和模块之间的依赖关系，组装成⼀个个包含多个模块的 Chunk，再把每个 Chunk 转换成⼀个单独的⽂件加⼊到输出列表，这步是可以修改输出内容的最后机会；</font>
7. <font style="color:rgb(43, 43, 43);">输出完成：在确定好输出内容后，根据配置确定输出的路径和⽂件名，把⽂件内容写⼊到⽂件系统。</font>

注意：

> _在以上过程中，Webpack 会在特定的时间点，⼴播出特定的事件，插件在监听到感兴趣的事件后，会执⾏特定的逻辑。并且插件可以调⽤ Webpack 提供的 API ，改变 Webpack 的运⾏结果。比如UglifyPlugin，会在loader转换递归完，对结果使用UglifyJs压缩，覆盖之前的结果。_
>

## 扩展：还知道哪些构建工具？有什么优缺点？
> <font style="color:rgb(89, 89, 89);">大致了解下就好 ，现在主流的是webpack、rollup、vite</font>
>

### 1.构建工具有哪些？
[webpack](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.docschina.org%2F)<font style="color:rgb(43, 43, 43);"> 与 </font>[grunt](https://link.juejin.cn/?target=https%3A%2F%2Fwww.gruntjs.net%2F)<font style="color:rgb(43, 43, 43);">、</font>[gulp](https://link.juejin.cn/?target=https%3A%2F%2Fwww.gulpjs.com.cn%2F)<font style="color:rgb(43, 43, 43);">、</font>[FIS3](https://link.juejin.cn/?target=https%3A%2F%2Ffex.baidu.com%2Ffis3%2F%25EF%25BC%2589)<font style="color:rgb(43, 43, 43);">等</font>

### 2.他们有什么不同？
+ <font style="color:rgb(89, 89, 89);">都是前端构建工具，grunt和gulp在早期比较流行，FIS3停止维护了，现在webpack相对来说比较主流，不过一些轻量化的任务，还是会用gulp来处理，比如单独打包CSS文件等。</font>
+ <font style="color:rgb(89, 89, 89);">grunt和gulp是基于</font>_**任务**__和__**流**_<font style="color:rgb(89, 89, 89);">（Task、Stream）的。类似</font>**jQuery**<font style="color:rgb(89, 89, 89);">，找到一个（或一类）文件，对其做一系列链式操作，更新流上的数据， 整条</font>**链式操作**<font style="color:rgb(89, 89, 89);">构成了一个</font>**任务**<font style="color:rgb(89, 89, 89);">，多个任务就构成了整个web的构建</font>**流程**<font style="color:rgb(89, 89, 89);">。</font>
+ <font style="color:rgb(89, 89, 89);">webpack是基于</font>_**入口**_<font style="color:rgb(89, 89, 89);">的。webpack会自动地</font>**递归解析**<font style="color:rgb(89, 89, 89);">入口所需要加载的所有</font>**资源文件**<font style="color:rgb(89, 89, 89);">，然后用不同的</font>**Loader**<font style="color:rgb(89, 89, 89);">来处理不同的文件，用</font>**Plugin**<font style="color:rgb(89, 89, 89);">来扩展webpack功能。</font>
+ <font style="color:rgb(89, 89, 89);">webpack优点是专注于处理模块化的项目，尤其适合单页应用。Webpack的缺点是只能用于采用模块化开发的项目。</font>
+ <font style="color:rgb(89, 89, 89);">FIS3并没有</font>**入口**<font style="color:rgb(89, 89, 89);">(entry)的概念，在FIS3中，构建流程不单单根据js来，而是分析每一个文件的依赖关系，生成一个资源表‘sourceMap’，你可以根据资源表定义任何的产出规则</font>
+ <font style="color:rgb(89, 89, 89);">Fis3的</font>**优点**<font style="color:rgb(89, 89, 89);">是集成了各种Web开发所需的构建功能，配置简单、开箱即用。其</font>**缺点**<font style="color:rgb(89, 89, 89);">是目前官方已经</font>**不再更新和维护**<font style="color:rgb(89, 89, 89);">，</font>**不支持**<font style="color:rgb(89, 89, 89);">最新版本的Node.js。Fis3是一种专注于Web开发的完整解决方案，如果将Grunt、Gulp比作汽车的</font>**发动机**<font style="color:rgb(89, 89, 89);">，则可以将Fis3比作一辆完整的</font>**汽车**<font style="color:rgb(89, 89, 89);">。</font>

总结：

> **从构建思路来说**<font style="color:rgb(89, 89, 89);">：gulp和grunt需要开发者将整个前端构建过程拆分成多个Task，并合理控制所有Task的调用关系； webpack需要开发者找到入口，并需要清楚对于不同的资源应该使用什么Loader做何种解析和加工；FIS3任何文件都可以作为入口</font>
>
> **对于知识背景**：<font style="color:rgb(43, 43, 43);">gulp更像后端开发者的思路，需要对于整个流程了如指掌； webpack更倾向于前端开发者的思路。</font>
>

### 3.有类似webpack的工具么？
同样是**基于入口**的打包工具还有以下几个：webpack，[rollup](https://link.juejin.cn?target=https%3A%2F%2Fwww.rollupjs.com%2F)，[parcel](https://link.juejin.cn?target=https%3A%2F%2Fwww.parceljs.cn%2F)，[vite](https://link.juejin.cn?target=https%3A%2F%2Fvitejs.cn%2F)，[snowpack](https://link.juejin.cn?target=http%3A%2F%2Fwww.snowpack.cn%2F)

<font style="color:rgb(89, 89, 89);">从应用场景上来看：</font>

+ <font style="color:rgb(89, 89, 89);">webpack：适合大型复杂的前端站点构建，尤其是模块化的，单页应用。</font>
+ <font style="color:rgb(89, 89, 89);">rollup：专门针对类库进行打包，它的优点是小巧而专注。因此现在很多我们熟知的库都都使用它进行打包，比如：Vue、React和three.js等。</font>
+ <font style="color:rgb(89, 89, 89);">parcel：零配置，傻瓜式。适用于简单的实验室项目，打包出错很难调试。不支持Tree Shaking。更多优点：</font>[<font style="color:rgb(89, 89, 89);">传送门</font>](https://link.juejin.cn?target=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F350601275)<font style="color:rgb(89, 89, 89);">。</font>
+ <font style="color:rgb(89, 89, 89);">vite：灵活、复杂度适中，未来趋势。开发期间无需打包，越大型体验感越好。</font>
+ <font style="color:rgb(89, 89, 89);">snowpack与vite类似。</font>

<font style="color:rgb(89, 89, 89);">rollup、vite、snowpack，都是基于ESM，开发期间无需构建，浏览器直用。</font>

## vite和webpack的区别？
**Webpack** 是一个打包模块化 JavaScript 的工具，在 Webpack 里一切文件皆模块，通过 Loader 转换文件，通过 Plugin 注入钩子，最后输出由多个模块组合成的文件。Webpack 专注于构建模块化项目。

<font style="color:rgb(43, 43, 43);">一切文件：JavaScript、CSS、SCSS、图片、模板，在 Webpack 眼中都是一个个模块，这样的好处是能清晰的描述出各个模块之间的依赖关系，以方便 Webpack 对模块进行组合和打包。 经过 Webpack 的处理，最终会输出浏览器能使用的静态资源。因此</font>**每次编译都需要重新构建**<font style="color:rgb(43, 43, 43);">。</font>

**vite**主要遵循的是使用**ESM**(Es modules模块)的规范来执行代码，由于现代浏览器基本上都支持了ESM规范，所以在**开发阶段**并不需要将代码打包编译成es5模块，即可**直接在浏览器上运行**。我们只需要从入口文件出发， 在遇到对应的 import 语句时，将对应的模块加载到浏览器中就可以了。当项目越大，文件越多时，vite的开发时优势越明显。vite**热更新**比webpack，**vite**在HRM方面，当某个模块内容改变时，让_**浏览器直接重新请求该模块即可，而不是像webpack重新将该模块的所有依赖重新编译**_。

<font style="color:rgb(43, 43, 43);">Vite的使用简单，只需执行初始化命令，就可以得到一个预设好的开发环境，开箱即获得一堆功能，包括：CSS预处理、html预处理、异步加载、分包、压缩、HMR等。使用</font>**复杂度介于Parcel和Webpack的中间**<font style="color:rgb(43, 43, 43);">，只是暴露了极少数的配置项和plugin接口，既不会像Parcel一样配置不灵活，又不会像Webpack一样需要了解庞大的loader、plugin生态，灵活适中、复杂度适中。</font>

<font style="color:rgb(43, 43, 43);">总体来说，Vite在前端构建工具领域上开辟了一条和webpack完全不同的道路，很好地解决了前端开发阶段构建速度慢的问题。</font>

## <font style="color:rgb(77, 208, 225);">webpack基本配置</font>
### 安装
全局安装

npm install -g webpack

npm install -g webpack-cli

项目依赖

npm install --save-dev webpack

npm install --save-dev webpack-cli

### 1. 基本配置-入口：
<font style="color:rgb(43, 43, 43);">入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。</font>

### <font style="color:rgb(43, 43, 43);">2.基本配置-出口</font>
<font style="color:rgb(43, 43, 43);">output 属性告诉 webpack 在哪里输出它所创建的 bundles</font>

### <font style="color:rgb(43, 43, 43);">3.基本配置-loaders</font>
<font style="color:rgb(43, 43, 43);">loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理。</font>

### <font style="color:rgb(43, 43, 43);">4.基本配置-plugins</font>
<font style="color:rgb(43, 43, 43);">webpack插件(自动打开浏览器、热更新等)</font>

### 5.基本配置-模式
<font style="color:rgb(43, 43, 43);">package.json中设置：</font>

```typescript
”scripts": {
    "dev": "webpack --mode development",  // 开发环境
     "build": "webpack --mode production",  // 生产环境
  }
```

<font style="color:rgb(43, 43, 43);">webpack.config.js中设置：</font>

```typescript
module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    mode: 'development' // 设置mode
}
```

<font style="color:rgb(43, 43, 43);">development：有内置的调试功能；</font>**<font style="color:rgb(38, 198, 218);">打包后的代码可阅读，没被压缩</font>**

<font style="color:rgb(43, 43, 43);">production：内置生产阶段的很多优化功能；</font>**<font style="color:rgb(38, 198, 218);">代码被压缩</font>**

### 6.基本配置-启动本地服务
#### 方式一：
在package.json里的script属性里配置，完了执行npm run xxx

例如vue项目中

_**package.json**_

```typescript
"scripts": {
  "dev": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
}
```

#### 方式二：
通过npx

例如vue项目中

_**命令行：**_

npx cli-service serve

<font style="color:rgb(43, 43, 43);">npx：</font>[www.npmjs.com/package/npx](https://link.juejin.cn/?target=https%3A%2F%2Flinks.jianshu.com%2Fgo%3Fto%3Dhttps%253A%252F%252Fwww.npmjs.com%252Fpackage%252Fnpx)

### 7.模块化
<font style="color:rgb(43, 43, 43);">webpack 默认使用commonjs规范</font>

<font style="color:rgb(43, 43, 43);">如果只是使用import 导入模块后，浏览器是不能直接识别的，必须导入webpack才行。</font>

## 其他基本常用配置
### 1.webpack跨域解决方案
proxy

### 2.ES6转ES5
babel

### 3.less转css
<font style="color:rgb(43, 43, 43);">less-loader</font>

> **<font style="color:rgb(38, 198, 218);">注意</font>**<font style="color:rgb(43, 43, 43);">：配置时执行顺序默认是</font>**<font style="color:rgb(38, 198, 218);">从右到左，从下到上</font>**<font style="color:rgb(43, 43, 43);">。</font>
>

### 4.处理图片
#### 方式一：url-loader
小于limit限制的转base64<font style="color:rgb(43, 43, 43);">  
</font>**说明**：url-loader处理的图片一般比较小，会把图片转换成**base64**代码，直接添加页面。提供了一个方便的选择 **limit**，该选项用于控制当文件大小小于 limit 时才使用 url-loader。通常会设置**5-8kb**。

**扩展**<font style="color:rgb(43, 43, 43);">：哈希的作用是</font>**命中缓存**<font style="color:rgb(43, 43, 43);">，使返回更快些。</font>

#### 方式二：file-loader
<font style="color:rgb(43, 43, 43);">把图片转换成路径。</font>

### 5.拆分配置和merge
> <font style="color:rgb(89, 89, 89);">背景：''四-5基本配置-模式''，里面介绍过模式之间的区别，为了解决手动更改mode带来的不便，所以，要将这些打包的配置，拆分到不同的文件里面来。</font>
>

+ webpack.dev.config.js 开发环境的配置；
+ webpack.prod.config.js生产环境的配置；
+ webpack.base.config.js是开发环境和生产环境都会使用的配置；
+ 通过**webpack-merge**模块将不同配置的代码合并；

_**<font style="color:rgb(77, 208, 225);">webpack.dev.config.js</font>**_

```typescript
const commonConfig = require('./webpack.base.config')
// webpack-merge 将公共的配置 和 开发的配置合并结合
const { smart: merge } = require('webpack-merge')
const devConfig = {
  mode: 'development'
}
module.exports = merge(commonConfig, devConfig)

```

_**<font style="color:rgb(77, 208, 225);">webpack.prod.config.js</font>**_

```typescript
const commonConfig = require('./webpack.base.config')
const { smart: merge } = require('webpack-merge')
const prodConfig = {
  mode: 'production'
}
module.exports = merge(commonConfig, prodConfig)
```

## 业务场景
<font style="color:rgb(43, 43, 43);">1、单页应用</font>

<font style="color:rgb(43, 43, 43);">2、一个项目管理多个单页面</font>

<font style="color:rgb(43, 43, 43);">3、代码分隔优化，一个好的代码分割对浏览器首屏效果提升很大。</font>

<font style="color:rgb(43, 43, 43);">4、构建服务端渲染</font>

<font style="color:rgb(43, 43, 43);">5、热更新</font>

<font style="color:rgb(43, 43, 43);">6、优化开发编译、生产环境打包速度</font>

<font style="color:rgb(43, 43, 43);">7、优化首屏速度</font><font style="color:rgb(43, 43, 43);">  
</font>

<font style="color:rgb(43, 43, 43);">  
</font>

## 常见的loader及其作用
+ babel-loader：将es6转译为es5
+  file-loader：可以指定要复制和放置资源文件的位置，以及如何使用版本哈希命名以获得更好的缓存，并在代码中通过**URL**去引用输出的文件
+ url-loader：和file-loader功能相似，但是可以通过指定阈值来根据文件大小使用不同的处理方式（小于阈值则返回base64格式编码并将文件的 data-url内联到bundle中）
+ raw-loader：加载文件原始内容

> webpack5自身内置了file-loader/ url-loader/ raw-loader等loader，所以我们不需要再显示引入loader 只需要指定对应的type即可实现相同的功能 如file-loader等价于 type= "asset/resource"'
>

+ image-webpack-loader： 加载并压缩图片资源
+ awesome-typescirpt-loader: 将typescript转换为javaScript 并且性能由于ts-loader
+ sass-loader: 将SCSS/SASS代码转换为CSS
+ css-loader: 加载CSS代码 支持模块化、压缩、文件导入等功能特性
+ style-loader: 把CSS代码注入到js中，通过DOM 操作去加载CSS代码

> <font style="color:rgb(89, 89, 89);">当我们使用类似于 </font><font style="color:rgb(38, 198, 218);">less</font><font style="color:rgb(89, 89, 89);"> 或者 </font><font style="color:rgb(38, 198, 218);">scss</font><font style="color:rgb(89, 89, 89);"> 等预处理器的时候，通常需要多个 </font>**<font style="color:rgb(38, 198, 218);">loader</font>**<font style="color:rgb(89, 89, 89);"> 的配合使用如</font><font style="color:rgb(38, 198, 218);">test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']</font>
>

+ source-map-loader: 加载额外的Source Map文件
+ eslint-loader: 通过ESlint 检查js代码
+ tslint-loader
+ cache-loader: 可以在一些开销较大的Loader之前添加可以将结果缓存到磁盘中，提高构建的效率
+ thread-loader: 多线程打包，加快打包速度

##  常见的plugin及作用
+ define-plugin: 定义环境变量（webpack4之后可以通过指定mode：production/development实现同样效果）
+ web-webpack-plugin：为单页面应用输出HTML 性能优于html-webpack-plugin
+ clean-webpack-plugin: 每次打包时删除上次打包的产物, 保证打包目录下的文件都是最新的
+ webpack-merge： 用来合并公共配置文件,常用（例如分别配置webpack.common.config.js/ webpack.dev.config.js/webpack.production.config.js并将其合并）
+ ignore-plugin: 忽略指定的文件，可以加快构建速度
+ terser-webpack-plugin：压缩ES6的代码（tree-shaking）
+ uglifyjs-webpack-plugin: 压缩js代码
+ mini-css-extract-plugin: 将CSS提取为独立文件，支持按需加载
+ css-minimize-webpack-plugin：压缩CSS代码

> css文件的压缩需要mini-css-extract-plugin和css-minimize-webpack-plugin 的配合使用 即先使用mini-css-extract-plugin将css代码抽离成单独文件，之后使用 css-minimize-webpack-plugin对css代码进行压缩
>

+ serviceworker-webpack-plugin: 为离线应用增加离线缓存功能
+ ModuleconcatenationPlugin: 开启Scope Hositing 用于合并提升作用域， 减小代码体积
+ copy-webpack-plugin： 在构建的时候，复制静态资源到打包目录。
+ compression-webpack-plugin: 生产环境采用gzip压缩JS和CSS
+ ParalleUglifyPlugin： 多进程并行压缩js
+ webpack-bundle-analyzer: 可视化webpack输出文件大小的根据
+ speed-measure-webpack-plugin: 用于分析各个loader和plugin的耗时，可用于性能分析
+ webpack-dashboard: 可以更友好地展示打包相关信息

## 过好用的工具/plugin
+ splitChunkPlugin：用于代码分割
+ webpack-merge: 提取公共配置，用于分别编写不同环境的配置文件（ `` ）
+ HotModuleReplacementPlugin:支持模块热替换
+ ignore-plugin: 忽略指定文件，可以加快构建速度
+ clean-webpack-plugin: 每次打包时删除上次打包的产物， 保证打包目录下的文件都是最新的
+ speed-measure-webpack-plugin: 分析出Webpack打包过程中的Loader和Plugin的耗时，用于性能分析
+ mini-css-extract-plugin: 将CSS代码抽离为独立文件，支持按需加载， 配合 css-minimize-webpack-plugin使用
+ terser-webpack-plugin: 实现更精细的代码压缩功能
+ SourceMapDevtoolPlugin:精细度配置SourceMap， 不能和devtool选项同时使用
+ UnusedWebpackPlugin: 反向查找项目中没被用到的文件，日常工作经常用到，可在重构或者性能分析时使用
+ webpack-dashboard: [webpack-dashboard](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fwebpack-dashboard) 是一个命令行可视化工具，能够在编译过程中实时展示编译进度、模块分布、产物信息等相关信息，性能分析时很有用。
+ Webpack Analysis：[Webpack Analysis](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.github.io%2Fanalyse%2F) 是 webpack 官方提供的可视化分析工具。
+ BundleAnalyzerPlugin：性能分析插件，可以在运行后查

## loader和plugin有啥区别？
### Loader：
Loader本质上是一个函数，负责代码的转译，即对接收到的内容进行转换后将转换后的结果返回 配置Loader通过在 modules.rules中以数组的形式配置

### Plugin：
Plugin本质上是一个带有apply(compiler)的函数，基于[tapable](https://link.juejin.cn?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Ftapable)这个事件流框架来监听**webpack**构建/打包过程中发布的hooks来通过自定义的逻辑和功能来改变输出结果。 Plugin通过plugins 以数组的形式配置

### 总结：
**Loader**主要负责将代码转译为**webpack** 可以处理的JavaScript代码，而 **Plugin** 更多的是负责通过接入**webpack** 构建过程来影响构建过程以及产物的输出，**Loader**的职责相对比较**单一**简单，而**Plugin**更为丰富多样

## 如何保证众多Loader按照想要的顺序执行？
<font style="color:rgb(43, 43, 43);">可以通过</font><font style="color:rgb(38, 198, 218);">enforce</font><font style="color:rgb(43, 43, 43);">来强制控制Loader的执行顺序 （</font><font style="color:rgb(38, 198, 218);">pre</font><font style="color:rgb(43, 43, 43);"> 表示在所有正常的loader执行之前执行，</font><font style="color:rgb(38, 198, 218);">post</font><font style="color:rgb(43, 43, 43);">则表示在之后执行）</font>

> Loader的执行有以下两个阶段：
>
> 1. **Pitching** 阶段: loader 上的 pitch 方法，按照 后置(post)、行内(inline)、普通(normal)、前置(pre) 的顺序调用。更多详细信息，请查看 [Pitching Loader](https://link.juejin.cn?target=https%3A%2F%2Fwebpack.docschina.org%2Fapi%2Floaders%2F%23pitching-loader)。
> 2. **Normal** 阶段: loader 上的 常规方法，按照 前置(pre)、普通(normal)、行内(inline)、后置(post) 的顺序调用。模块源码的转换， 发生在这个阶段。
>

## 如何编写Loader
+ loader支持链式调用，上一个loader的执行结果会作为下一个loader的入参。
    - 根据这个特性，我们知道我们的**loader**想要有返回值，并且这个返回值必须是标准的JavaScript字符串或者AST代码结构，这样才能保证下一个**loader**的正常调用。
+ loader的主要职责就是将代码转译为**webpack**可以理解的js代码。
    - 根据这个特性，loader内部一般需要通过return / this.callback来返回转换后的结果
+ 单个loader一把只负责单一的功能。
    - 根据这个特性，我们的loader应该符合**单一职责**的原则，尽量别让单个loader执行太多职责
+ 善于利用开发工具
    - **loader-utils**： [loader-utils](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fwebpack%2Floader-utils) 是一个非常重要的 Loader 开发辅助工具，为开发中提供了诸如读取配置、requestString的序列化和反序列化、getOptions/getCurrentRequest/parseQuery等核心接口....等等功能，对于loader的开发十分有用
    - **schema--utils**：[schema-utils](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fschema-utils)是用于校验用户传入loader的参数配置的校验工具，也是在开发中十分有用
+ loader是无状态的
    - 根据此特性，我们不应该在loader保存状态
+ webpack默认缓存loader的执行结果
    - **webpack**会默认**缓存**loader的执行结果直到资源/所依赖的资源发生变化 如果想要loader不缓存 可以通过this.cacheble 显式声明不做缓存
+ Loader接收三个参数
    - source： 资源输入 对于第一个执行的loader为资源文件的内容 后续执行的loader则为前一个loader的执行结果 也可能是字符串 或者是代码的AST结构
    - sourceMap： 可选参数 代码的sourcemap结构
    - data： 可选参数 其他需要在Loader链中传递的信息
+ 正确上报loader的异常信息
    - 一般尽量使用logger.error 减少对用户的干扰
    - 对于需要明确警示用户的错误 优先使用 this.emitError
    - 对于已经严重到不能继续往下编译的错误 使用 callback
+ loader函数中的this 由webpack提供 并且指向了loader-runtime的loaderContext 对象
    - 可以通过this来获取loader需要的各种信息 **Loader Context**提供了许多实用的接口，我们不仅可以通过这些接口获取需要的信息，还可以通过这些接口改变webpack的运行状态（相当于产生 **Side Effect**）
+ loader由pitch和normal两个阶段
    - 根据此特性，我们可以在pitch阶段预处理一些操作

> <font style="color:rgb(89, 89, 89);">webpack会按照 </font><font style="color:rgb(38, 198, 218);">use</font><font style="color:rgb(89, 89, 89);"> 定义的顺序从前往后执行</font><font style="color:rgb(38, 198, 218);">Pitch</font><font style="color:rgb(89, 89, 89);"> Loader 从后往前执行</font><font style="color:rgb(38, 198, 218);">Normal</font><font style="color:rgb(89, 89, 89);"> </font><font style="color:rgb(38, 198, 218);">Loader</font><font style="color:rgb(89, 89, 89);"> 我们可以将一些预处理的逻辑放在</font><font style="color:rgb(38, 198, 218);">Pitch</font><font style="color:rgb(89, 89, 89);">中</font>
>

+ 正确处理日志 使用 Loader Context``的getLogger接口（支持verbose/log/info/warn/error 五种级别的日志 用户可以通过[infrastructureLogging.level](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Fconfiguration%2Fother-options%2F%23level) 配置项筛选不同日志内容 ）
+ 充分调试你编写的**loader**
    - 创建出**webpack**实例 并运行**laoder**
    - 获取**loader**执行结果 对比、分析判断是否符合预期
    - 判断执行过程中是否出错

以上便是开发loader需要的知识以及常规步骤，相信答出这些内容后，面试官变不会再为难你了！说完如何开发**loader**，接下来就趁热打铁讲解一下如何开发**plugin**

## 如何编写Plugin
我们都知道**Plugin**是通过监听webpack构建过程中发布的hooks来实施对应的操作从而影响更改构建逻辑以及生成的产物，而在这个过程中compiler和compilation可以说是最核心的两个对象了，其中compiler可以暴露了整个构建流程的200+个hooks，而compilation则暴露了更细粒度的hooks。

compiler对象是一个全局单例，代表了webpack从开启到关闭的整个生命周期，负责启动编译和监听文件，而compilation是每次构建过程的上下文对象，包含当次构建所需要的信息

> <font style="color:rgb(89, 89, 89);">每次热更新和重新编译都会创建一个新的</font><font style="color:rgb(38, 198, 218);">compilation</font><font style="color:rgb(89, 89, 89);">对象，</font><font style="color:rgb(38, 198, 218);">compilation</font><font style="color:rgb(89, 89, 89);">对象只代表当次编译</font>
>

我们都知道插件是通过监听webpack构建过程中发布的hooks从而在特定阶段去执行特定功能来达到改变构建逻辑以及产物的目的，而这些都离不开[tapable](https://link.juejin.cn?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Ftapable) （一个专门用于处理各种发布订阅的库 有同步异步、熔断、循环、瀑布流等钩子），关于了解**tapable**的使用，这里推荐这篇文章：[Webpack tapable 使用研究 - 掘金 (juejin.cn)](https://juejin.cn/post/6844903895584473096#comment)。 讲完plugin的前置知识，接下来就让我们正式开始学习如何开发插件

+ 插件是通过监听webpack发布的hooks来工作的
    - 根据这个特性，我们的plugin一定是一个函数或者一个包含apply（） 的对象，这样才可以监听compiler 对象
+ 传递给插件的compiler  和compilation 都是同一个引用
    - 根据此特性，我们知道我们的插件是会影响到其他插件的，所以我们在编写插件的时候应该分析会对其他插件造成啥影响
+ 基于**tapable**来完成对hooks的复杂的订阅以及响应
    - 编译过程的特定节点会分发特定钩子，插件可以通过这些钩子来执行对应的操作
    - 通过 **tapable**的回调机制以参数形式传递上下文信息
    - 可以通过上下文的众多接口来影响构建流程
+ 监听一些具有特定意义的hook来影响构建
    - compiler.hooks.compilation:**webpack**刚启动完并创建compilation对象后触发
    - compiler.hooks.make:**webpack**开始构建时触发
    - compiler.hooks.done:**webpack** 完成编译时触发，此时可以通过stats对象得知编译过程中的各种信息
+ 善于使用开发工具
    - 使用schema-utils用于校验参数（关于schema-utils的使用方法读者可以自行查阅）
+ 正确处理插件日志信息以及插件信息
    - 使用 stats汇总插件的统计数据
    - 使用 ProgressPlugin插件的 reportProgress接口上报执行进度
    - 通过 compilation.getLogger获取分级日志管理器
    - 使用 compilation.errors/warining处理异常信息（**eslint-webpack-plugin**的做法）
+ 测试插件
    - 通过分析compilation.error/warn 数组来判断webpack是否运行成功
    - 分析构建产物判断插件功能是否符合预期

以上便是如何编写plugin所需的知识和常规流程，建议可以阅读一些插件例如eslint-webpack-plugin / DefinePlugin 等插件的源码来更深入地学习插件开发的知识和流程

## 什么是文件指纹？文件指纹有什么作用？怎么用？
概念：文件指纹是指文件打包后的一连串后缀

作用：

+ **版本管理：**  在发布版本时，通过文件指纹来区分 修改的文件 和 未修改的文件。
+ **使用缓存：**  浏览器通过文件指纹是否改变来决定使用缓存文件还是请求新文件。

种类：

+ Hash：和整个项目的构建相关，只要项目有修改（compilation实例改变），Hash就会更新
+  Contenthash：和文件的内容有关，只有内容发生改变时才会修改
+  Chunkhash：和**webpack**构架的chunk有关 不同的**entry**会构建出不同的**chunk** （不同 ChunkHash之间的变化互不影响）

如何使用：

+ JS文件：使用Chunkhash 
+ CSS文件：使用Contenthash 
+ 图片等静态资源： 使用hash 

> <font style="color:rgb(89, 89, 89);">生产环境的</font>**<font style="color:rgb(38, 198, 218);">output</font>**<font style="color:rgb(89, 89, 89);">为了区分版本变动，通过</font><font style="color:rgb(38, 198, 218);">Contenthash</font><font style="color:rgb(89, 89, 89);">来达到清理缓存及时更新的效果，而开发环境中为了加快构建效率，一般不引入</font><font style="color:rgb(38, 198, 218);">Contenthash</font>
>

## Babel的原理
**babel** 可以将代码转译为想要的目标代码，并且对目标环境不支持的**api** 自动 polyfill。而**babel**实现这些功能的流程是 解析（parse）-转换（transfrom）-生产（generator），接下来我们就看看每个流程都做了啥工作

+ 解析：根据代码生成对应的AST结构 
    - 进行代码分析，将代码分割成**token**流（语法单元数组），再根据**token**流生成对应的AST
+  转换：遍历AST节点并生成新的AST节点
+ 生成：根据新的AST生成目标代码

## 文件监听的原理
开启文件监听后，webpack会轮询访问文件的最后修改时间，当发现文件修改时间发生变化后，会先缓存起来等到aggregateTimeout再统一执行

开启文件监听方式：可以在构建时带上--watch 参数或者设置watch：true，而watchOptions则可以对监听的细节进行定制

```typescript
watch: true,
watchOptions: {
    //不监听的文件或者文件夹 忽略一些大型的不经常变化的文件可以提高构建速度
    ignored: /node_modules/,
    //监听到变化会等多少时间再执行
    aggregateTimeout: 300,
    //判断文件是否发生变化是通过不断轮询指定文件有没有变化实现的
    poll: 1000
}
```

## 什么是Source map？如何使用
**<font style="color:rgb(38, 198, 218);">source map</font>**<font style="color:rgb(43, 43, 43);">是将编译打包后的代码映射回源码 可以通过</font>**<font style="color:rgb(38, 198, 218);">devtool</font>**<font style="color:rgb(43, 43, 43);">配置项来设置，还可以通过</font>[SourceMapDevToolPlugin](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.docschina.org%2Fplugins%2Fsource-map-dev-tool-plugin)<font style="color:rgb(43, 43, 43);">实现更加精细粒度的控制</font>

> **<font style="color:rgb(38, 198, 218);">devtool</font>**<font style="color:rgb(89, 89, 89);">配置项和 </font>[<font style="color:rgb(43, 43, 43);">SourceMapDevToolPlugin</font>](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.docschina.org%2Fplugins%2Fsource-map-dev-tool-plugin)<font style="color:rgb(89, 89, 89);">不能同时使用，因为</font>**<font style="color:rgb(38, 198, 218);">devtool</font>**<font style="color:rgb(89, 89, 89);">选项已经内置了这些插件，如果同时使用相当于应用了两次插件</font>
>

## HMR（热更新）的原理
这个可以说是**webpack**的最高频考点之一了，同时也是**webpack**的难点，也是**webpack**的核心功能之一！接下来我将带大家先学习如何使用**HMR**再逐步分析**HMR**的原理。

**如何开启HMR**： 通过设置devServer: {hot: true} 开启 开启后便可以在发生改变后局部刷新改变的部分

**原理：**

+ 使用 webpack-dev-server（WDS） 托管静态资源 同时以Runtime方式注入**HMR**客户端代码
+ 浏览器加载页面后 与**WDS**建立WebSocket连接
+ webpack监听到文件变化后 增量构建发生变更的模块 并通过**WebSocket**发送hash事件
+ 浏览器接收到 hash事件后 请求 manifest资源文件 确认增量变更范围
+ 浏览器加载发生变更的增量模块
+ **webpack**运行时触发变更模块的module.hot.accept回调 执行代码变更逻辑
+ done：构建完成，更新变化

**总结**就是**webpack**将静态资源托管在 **WDS** 上，而 **WDS** 又和浏览器通过 webSocket 建立联系，而当**webpack**监听到文件变化时，就会向浏览器推送更新并携带新的hash 与之前的hash进行对比，浏览器接收到hash事件后变化加载变更的增量模块并触发变更模块的 module.hot.accept回调执行变更逻辑。

## Tree shaking的原理
### 什么是 Tree shaking？
**Tree-Shaking** 是一种基于 ES Module 规范的 **Dead Code Elimination** 技术，它会在运行过程中静态分析模块之间的导入导出，确定 ESM 模块中哪些导出值未曾其它模块使用，并将其删除，以此实现打包产物的优化。

### 使用 Tree shaking
使用 Tree shaking的三个必要条件

+ 使用ESM规范编写模块代码
+ 配置 optimization.usedExports为 true 启动标记功能
+ 启动代码优化功能 可以通过如下方法实现
    - 配置 mode = production
    - 配置 optimization.minimize = true
    - 提供 optimization.minimizer数组

> 对于使用了babel-loader loader或者根据对代码进行转译的时候，注意应该关闭对于**导入/导出**语句的转译，因为这会影响到后续的 **tree shaking** 比如应该将 babel-loader 的 babel-preset-env的modules配置为false
>

### 必要条件：
<font style="color:rgb(43, 43, 43);">所有导入导出语句只能在模块顶层 且导入导出的模块名必须为字符串常量 不能动态导入的（ESM模块之间的依赖关系是高度确定的 与运行状态无关 编译工具只需要对ESM模块做静态分析就可以从代码字面量中推断出哪些模块值没被使用）</font>

### Tree shaking的原理
Tree shaking的工作流程可以分为

1.**标记**哪些导出值没有被使用； 2. 使用**Terser**将这些没用到的导出语句删除

**标记**的流程如下：

1. **make**阶段：收集模块导出变量并记录到模块依赖关系图中
2. **seal**阶段：遍历模块依赖关系图并标记那些导出变量有没有被使用
3. **构建**阶段：利用**Terser**将没有被用到的导出语句删除

### 开发中如何利用Tree shaking？
+ 避免无作用的重复赋值
+ 使用 #pure标记函数无副作用（这种做法在开源项目的源码中经常出现，如**pinia、reactive....等**）
+ 禁止转译 **导入/导出**语句（使用了babel-loader需要将 babel-preset-env的modules配置为false ）
+ 使用支持 **Tree shaking**的包
+ 优化导出值的粒度

```typescript
//正确做法
const a = 'a';
const b = 'b';
export {
a,
b
}
//错误做法
export default {
a: 'a',
b: 'b'
}
```

## 如何用webpack来优化项目的性能
说到优化，我们应该想到可以分为**开发环境**和**生产环境**的不同优化。

+ **开发**环境：开发环境我们需要的是更快的构建速度、模块热替换、更加友好的**Source map**
    - 通过cache： { type: 'systemfile'}  开启缓存构建可以加快二次构建的效率
    - 通过模块热替换可以做到局部更新变化，提高开发效率
    - 根据设置 devtool： cheap-eval-source-map 在保证构建效率的同时又能进行代码调试
    - 使用[Thread-loader](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Floaders%2Fthread-loader%2F)以多进程的方式运行资源加载逻辑
    - 通过 **stats** 来分析性能做优化
+ **生产**环境：生产环境我们需要的是更小的体积，更稳定又快的性能 
    - 压缩代码：使用UglifyJsPlugin和ParallelUglifyPlugin来压缩代码 利用cssnano(css-loader? minimize)来压缩css
    - 利用**CDN**：可以使用**CDN**来加快对静态资源的访问，提高用户的使用体验
    - Tree Shaking: 删除没用到的代码
    - 提取公共第三方库： 使用SplitChunksPlugin插件来进行公共模块抽取
    - 使用[TerserWebpackPlugin](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fterser-webpack-plugin%23terseroptions)多进程执行代码压缩、uglify 功能

## webpack构建流程是什么？
### 构建流程
+ **初始化参数**： 从配置文件和Shell语句中读取与合并并计算出最终的参数
+ **开始编译**： 用上一步得到的初始化参数初始化Complier对象，加载所有配置的插件，执行compiler对象的run方法开始编译流程
+ **确定入口**： 根据entry找出入口文件
+ **编译模块**：从入口文件开始，根据配置的 loader 对模块进行转译，如果该模块还有依赖的模块，则**递归**对这些模块进行翻译，通过递归上述操作直到对所有模块都进行转译
+ **完成模块编译**： 在经过Loader翻译完所有模块后，得到了每个模块转译后的内容以及模块之间的依赖关系图（**ModuleGraph**）
+ **输出资源**： 根据入口和模块之间的依赖关系 生成一个个包含多个模块的Chunk， 再把每个Chunk转换成一个单独的文件加入到输出列表中
+ **输出完成**： 根据输出项的配置，将文件内容写到文件系统

### 流程简化：
**初始化阶段**： 合并计算配置参数，创建Compiler、Compilation等基础对象，并初始化**Plugin**，并最终根据entry配置，找到所有入口模块

**构建模块**： 从entry开始，调用loader转译对应的模块，调用 Acorn将代码转换为AST结构， 遍历AST从中 构建出完整的模块依赖关系图（递归操作）

**生成阶段**： 根据entry配置，根据模块生成一个个chunk对象，之后转译Chunk代码并封装为Asset， 最后写出到文件系统

> <font style="color:rgb(89, 89, 89);">单次构建过程</font>**<font style="color:rgb(38, 198, 218);">自上而下</font>**<font style="color:rgb(89, 89, 89);">按顺序执行 如果启动了</font><font style="color:rgb(38, 198, 218);">watch</font><font style="color:rgb(89, 89, 89);"> 则构建完成后不会退出webpack进程 而是持续监听文件内容 发生变化时回到构建阶段重新执行构建</font>
>

### 从资源转换角度看
+ compiler.make阶段
    - entry 文件以 dependence 对象形式加入 compilation 的依赖列表 ，dependence 对象记录了 entry 的相关信息
    - 根据 dependency 创建 对应的module 对象，之后读入 module 对应的文件内容， 调用 loader-runner对内容做转化， 转化结果若有对其他依赖则继续读入依赖资源， 重复此过程直到所有的依赖均被转换为 module
+ compilation.seal 阶段
    - 遍历 module 集合， 根据 entry配置以及引入资源的方式， 将 module 分配到不同的 Chunk
    - Chunk之间最终形成ChunkGraph结构
    - 遍历ChunkGraph 调用 compilation.emitAssets 方法标记 chunk 的输出规则， 及转换为 assets集合
+ compiler.emitAssets阶段
    - 将 assets写入文件系统

## 优化webpack构建的手段或者知识
梳理完**webpack**的整体构建流程后，接下来让我们看看日常工作中如何优化**webpack**的配置来提高我们的性能！！！

+ 使用高版本的 **webpack** 和**node**
+ 多进程构建：使用**thread-loader**（**HappyPack**不维护了，这里不推荐）
+ 使用**Tree shaking** 删除多余模块导出
    - 配置 optimization.usedExports为 true 启动标记功能
    - 启动代码优化功能 可以通过如下方法实现 
        * 配置 mode = production
        * 配置 optimization.minimize = true
        * 提供 optimization.minimizer数组
+ 使用**Scope Hoisting**合并模块
    - **Scope Hoisting**用于 **将符合条件的多个模块合并到同一个函数空间** 中，从而减少产物体积，优化性能。
    - 开启方法： 
        *  mode = 'production'开启生产模式
        * 使用 optimization.concatenateModules配置项
        * 使用 ModuleConcatenationPlugin 插件
+ 开启模块热替换
    - 可以通过 devServer：{hot：true}或者 使用 HotModuleReplacementPlugin开启模块热替换
    - 忽略部分很少变化的大文件如**node_modules**提高构建效率
+ 监控产物体积
    - 监控产物体积可以帮助我们分析项目的性能，避免项目体积过大带来的资源消耗
    - 通过 **performance** 配置项来自定义各种阈值或参数

> <font style="color:rgb(89, 89, 89);">业内认为一般情况下应该保证关键路径的资源体积始终小于 </font>**<font style="color:rgb(38, 198, 218);">170kb</font>**<font style="color:rgb(89, 89, 89);">，如果超过这个大小，可能就需要考虑优化来减小体积</font>
>

+ 缩小文件的搜索范围
    - 优化loader配置：可以通过test/ include / exclude来指定文件的loader命中的文件范围，可以通过指定include来使 loader只处理那些需要被处理的模块
    - 优化 resolves.modules 配置:用于指定**webpack**去哪些路径下寻找第三方模块
    - 例如当所有第三方模块都放在 **node_modules**时 可以配置resolve: {modules: path.resolve(__dirname, 'node_modules')} 
    - 优化resolve.mainFilelds配置：用于配置第三方模块使用哪个入口文件 -为了减少搜索范围，可以使用resolve: {mainFields: ['main']}-如果想优先使用ESModule版本的话，设置resolve: {mainFields: ['jsnext:main', 'main']} 
    - 配置resolve.alias:resolve.alias通过别名将原导入路径映射成一个新的导入路径
    - 配置resolve.extensions : 引入文件时省略数组内的后缀名
    - 配置resolve.noParse : 省略对指定文件的处理，如（**JQuery**等大型库）可以提高构建性能（被忽略的文件不能包含导入语句如require / import / define）
+ 设置环境
    - 设置mode: production/development 可以开启对应的优化
+ 代码压缩
    - 使用 terser-webpack-plugin压缩ES6代码
    - 使用ParalleUglifyPlugin多进程压缩代码
    - 使用 css-minimize-webpack-plugin对css代码进行压缩
    - 使用html-minimizer-webpack-plugin 压缩html代码
+ 使用**CDN**加速
    - 将静态资源存储在 **CDN**上可以加快对静态资源的访问速度，减少流量消耗 
        * 通过output.publicPath设置JavaScript文件地址
        * 通过WebPlugin.stylePublicPath设置CSS文件的地址
        * 通过css-loader.publicPath设置被CSS导入的资源的地址
+ 为不同的环境配置对应的配置文件
    - 使用webpack-merge  分别书写**development/ production / test**环境下的配置文件
+ 使用缓存构建
    - 配置cache: {type: 'systemfile'} 开启构建缓存，可以大幅提高二次构建的速度
+ 使用DllPlugin：使用**DllPlugin**进行分包，使用 DllReferencePlugin引用mainfext.json , 通过将一些很少变动的代码先打包成静态资源，避免重复编译来提高构建性能
+ 提取公共代码
    - 使用splitChunkPlugin  提取公共代码，减少代码体积 （webpack3通过CommonsChunkPlugin）
+ 动态Polyfill：使用polyfill-service只返回给用户需要的**polyfill**
+ 使用可视化工具来分析性能
    - 使用**UnusedWebpackPlugin**分析未被使用到的文件
    - 使用**Webpack Dashboard** 以命令行的形式输出编译过程的各种信息
    - 使用**Webpack Bundle Analyzer**分析重复的模块或者没被用到的模块
    - 使用 --json=stats,json将构建过程中的信息都输出到指定文件
    - 使用[Webpack Analysis](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.github.io%2Fanalyse%2F)：官方提供的可视化分析工具

### 使用缓存
<font style="color:rgb(51, 51, 51);">可以在 webpack 配置文件中使用 cache-loader 或者 hard-source-webpack-plugin 来缓存编译依赖项。</font>

<font style="color:rgb(51, 51, 51);">使用 cache-loader:</font>

```typescript
module.exports = {
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: ['cache-loader', 'babel-loader'],
      },
    ],
  },
};

```

<font style="color:rgb(51, 51, 51);">使用 hard-source-webpack-plugin:</font>

```typescript
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
  plugins: [
    new HardSourceWebpackPlugin(),
  ],
};

```

### 减少模块热重载
可以在 webpack 配置文件中对模块热重载的行为进行调整。

```typescript
module.exports = {
  devServer: {
    hot: true,
    hotOnly: true,
  },
};
```

在 devServer 启用 hot 和 hotOnly，hot 热更新失败时刷新页面，hotOnly 只找到模块热更新失败不会刷新页面。  
大部分项目中，node_modules的变换频率都是极低的，所以我们在使用watch功能的时候可以通过配置 ignored来忽略node_modules从而减少性能压力

```typescript
"watchOptions": {
    "ignored": /node_modules/
}
```

### 使用 Tree Shaking 和 Dead Code Elimination
<font style="color:rgb(51, 51, 51);">可以使用 mode: 'production' 和 UglifyJSPlugin 来优化代码。</font>

```typescript
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'production',
  optimization: {
    minimizer: [
      new UglifyJSPlugin(),
    ],
  },
};
```

### 使用 Code Splitting 和动态加载模块
<font style="color:rgb(51, 51, 51);">可以使用 import() 异步加载和 SplitChunksPlugin 进行代码分割。</font>

```typescript
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'async',
    },
  },
};
```

<font style="color:rgb(51, 51, 51);">使用 chunks: 'async' 实现动态加载，只加载需要的模块。</font>

```typescript
import(/* webpackChunkName: "my-chunk-name" */ './my-module')
  .then(module => {
    // 使用模块
  })
  .catch(error => {
    // 处理错误
  });
```

也可以使用 React.lazy + Suspense 懒加载 React 组件。

```javascript
import React, { lazy, Suspense } from 'react';

const MyComponent = lazy(() => import('./MyComponent'));

function App() {
  return (
    <div>
    <Suspense fallback={<div>Loading...</div>}>
    <MyComponent />
    </Suspense>
    </div>
  );
}

```

### 优化 Loader
可以通过配置 options 对 Loader 进行优化。

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
    ],
  },
};

```

<font style="color:rgb(51, 51, 51);">可以使用 HappyPack 通过多进程并行处理 Loader。</font>

```javascript
const HappyPack = require('happypack');
const os = require('os');

module.exports = {
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: ['happypack/loader'],
      },
    ],
  },
  plugins: [
    new HappyPack({
      loaders: ['babel-loader'],
      threads: os.cpus().length,
    }),
  ],
};

```

### 使用外部资源
<font style="color:rgb(51, 51, 51);">使用 externals 避免打包不必要的外部依赖项。</font>

```javascript
module.exports = {
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
};
```

### 指定构建环境
<font style="color:rgb(51, 51, 51);">使用 webpack --mode development 或 webpack --mode production 来指定构建环境。</font>

<font style="color:rgb(51, 51, 51);">也可以在 webpack 配置文件的 mode 中进行指定。</font>

```javascript
module.exports = {
  mode: 'development',
};
```

### 优化 bundle 文件大小
使用 mini-css-extract-plugin 分离 CSS 文件。

```javascript
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};

```

<font style="color:rgb(51, 51, 51);">使用 terser-webpack-plugin 压缩文件。</font>

```javascript
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
    ],
  },
};
```

### DLL 模式
Webpack 中的 DLL（Dynamic Link Library）优化是一种基于缓存和分离应用程序的代码库的技术，它可以显著提高构建性能和开发体验。具体来说，DLL 技术可以将某些模块打包成一个 DLL 文件，该文件可以在多次构建中重复使用，从而减少打包时间和文件大小。

具体实现方法如下：

1. 首先，在项目中新建一个 webpack.dll.js 配置文件用于打包 DLL 包。
2. 在 webpack.dll.js 中设置 entry，将需要提取出来的第三方库等代码，作为 entry 中的值。如下所示：

```javascript
entry: {
   vendors: ['react', 'react-dom', 'jquery']
},
```

3. 接着，在 plugins 中加入 webpack.DllPlugin，配置生成的 DLL 文件的名称、路径和映射关系，代码如下所示<font style="color:rgb(51, 51, 51);">：</font>

```javascript
const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
       vendors: ['react', 'react-dom', 'jquery']
    },
    output: {
        filename: '[name].dll.js',
        path: path.resolve(__dirname, './dll'),
        library: '[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]',
            path: path.resolve(__dirname, './dll/[name].manifest.json')
        })
    ]
}

```

1. <font style="color:rgb(51, 51, 51);">运行 </font>**<font style="color:rgb(0, 127, 255);background-color:rgb(230, 243, 255);">webpack.dll.js</font>**<font style="color:rgb(51, 51, 51);"> 配置文件，生成 DLL 文件和 manifest 文件。</font>
2. <font style="color:rgb(51, 51, 51);">在正常的项目构建中，通过 </font>**<font style="color:rgb(0, 127, 255);background-color:rgb(230, 243, 255);">webpack.DllReferencePlugin</font>**<font style="color:rgb(51, 51, 51);"> 引入 DLL 文件，加速构建时间。如下所示：</font>

```javascript
const webpack = require('webpack');
const path = require('path');

const dllPath = path.resolve(__dirname, './dll');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './build')
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: process.cwd(),
            manifest: require(`${dllPath}/vendors.manifest.json`)
        })
    ]
}

```

### gzip
开启 Gzip 压缩可以大幅度减小文件大小，提高网络传输速度，加快网站的加载速度，而在 Webpack 中开启 Gzip 压缩的方式如下：

1. 安装 **<font style="color:rgb(0, 127, 255);background-color:rgb(230, 243, 255);">compression-webpack-plugin</font>** 插件：

```javascript
npm install compression-webpack-plugin --save-dev
```

2. <font style="color:rgb(51, 51, 51);">在 Webpack 配置文件中引入该插件，代码如下所示</font><font style="color:rgb(51, 51, 51);">：</font>

```javascript
const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = {
  // ...
  plugins: [
    new CompressionWebpackPlugin({
      filename: '[path][base].gz',
      algorithm: 'gzip',
      test: /.(js|css|html)$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
};
```

+ 上述插件的配置项含义如下：
+ filename：Gzip 压缩后的文件名称。
+ algorithm：Gzip 压缩算法。
+ test：需要压缩的文件类型。
+ threshold：当文件超过指定大小时才会被压缩。在本例中，只有当文件大于等于 10KB 时才被压缩。
+ minRatio：只有当压缩之后的文件大小比原始文件减少了一定比例时，才会被保留。在本例中，只有当压缩之后的文件大小比原始文件减少了 80% 以上时，才会被保留。
3. 在 Webpack 配置文件中开启 Gzip 压缩，代码如下所示：

```javascript
module.exports = {
  // ...
  devServer: {
    compress: true,
  },
};

```

<font style="color:rgb(51, 51, 51);">设置 </font>**<font style="color:rgb(0, 127, 255);background-color:rgb(230, 243, 255);">devServer</font>**<font style="color:rgb(51, 51, 51);"> 配置项的 </font>**<font style="color:rgb(0, 127, 255);background-color:rgb(230, 243, 255);">compress</font>**<font style="color:rgb(51, 51, 51);"> 属性为 </font>**<font style="color:rgb(0, 127, 255);background-color:rgb(230, 243, 255);">true</font>**<font style="color:rgb(51, 51, 51);">，即可启用 Gzip 压缩</font>

<font style="color:rgb(51, 51, 51);"></font>
