(window.webpackJsonp=window.webpackJsonp||[]).push([[82],{479:function(t,s,a){"use strict";a.r(s);var v=a(56),e=Object(v.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("p",[a("code",[t._v("Nodejs")]),t._v("成功离不开 "),a("code",[t._v("npm")]),t._v(" 优秀的依赖管理系统。在介绍整个依赖系统之前，必须要了解 "),a("code",[t._v("npm")]),t._v("如何管理依赖包的版本，本文将介绍 "),a("code",[t._v("npm包")]),t._v(" 的版本发布规范以、何管理各种依赖包的版本以及一些关于包版本的最佳实践。")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://lsqimg-1257917459.cos.ap-beijing.myqcloud.com/20191104120006.png",alt:""}})]),t._v(" "),a("h2",{attrs:{id:"查看npm包版本"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#查看npm包版本"}},[t._v("#")]),t._v(" 查看npm包版本")]),t._v(" "),a("p",[t._v("你可以执行 "),a("code",[t._v("npm view package version")]),t._v(" 查看某个 "),a("code",[t._v("package")]),t._v(" 的最新版本。")]),t._v(" "),a("p",[t._v("执行 "),a("code",[t._v("npm view conard versions")]),t._v(" 查看某个 "),a("code",[t._v("package")]),t._v(" 在npm服务器上所有发布过的版本。")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://lsqimg-1257917459.cos.ap-beijing.myqcloud.com/20191102180031.png",alt:""}})]),t._v(" "),a("p",[t._v("执行 "),a("code",[t._v("npm ls")]),t._v(" 可查看当前仓库依赖树上所有包的版本信息。")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://lsqimg-1257917459.cos.ap-beijing.myqcloud.com/20191103204351.png",alt:""}})]),t._v(" "),a("h2",{attrs:{id:"semver规范"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#semver规范"}},[t._v("#")]),t._v(" SemVer规范")]),t._v(" "),a("p",[a("code",[t._v("npm包")]),t._v(" 中的模块版本都需要遵循 "),a("code",[t._v("SemVer")]),t._v("规范——由 "),a("code",[t._v("Github")]),t._v(" 起草的一个具有指导意义的，统一的版本号表示规则。实际上就是 "),a("code",[t._v("Semantic Version")]),t._v("（语义化版本）的缩写。")]),t._v(" "),a("blockquote",[a("p",[t._v("SemVer规范官网： https://semver.org/")])]),t._v(" "),a("h3",{attrs:{id:"标准版本"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#标准版本"}},[t._v("#")]),t._v(" 标准版本")]),t._v(" "),a("p",[a("code",[t._v("SemVer")]),t._v("规范的标准版本号采用 "),a("code",[t._v("X.Y.Z")]),t._v(" 的格式，其中 X、Y 和 Z 为非负的整数，且禁止在数字前方补零。X 是主版本号、Y 是次版本号、而 Z 为修订号。每个元素必须以数值来递增。")]),t._v(" "),a("ul",[a("li",[t._v("主版本号("),a("code",[t._v("major")]),t._v(")：当你做了不兼容的API 修改")]),t._v(" "),a("li",[t._v("次版本号("),a("code",[t._v("minor")]),t._v(")：当你做了向下兼容的功能性新增")]),t._v(" "),a("li",[t._v("修订号("),a("code",[t._v("patch")]),t._v(")：当你做了向下兼容的问题修正。")])]),t._v(" "),a("p",[t._v("例如："),a("code",[t._v("1.9.1 -> 1.10.0 -> 1.11.0")])]),t._v(" "),a("h3",{attrs:{id:"先行版本"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#先行版本"}},[t._v("#")]),t._v(" 先行版本")]),t._v(" "),a("p",[t._v("当某个版本改动比较大、并非稳定而且可能无法满足预期的兼容性需求时，你可能要先发布一个先行版本。")]),t._v(" "),a("p",[t._v("先行版本号可以加到“主版本号.次版本号.修订号”的后面，先加上一个连接号再加上一连串以句点分隔的标识符和版本编译信息。")]),t._v(" "),a("ul",[a("li",[t._v("内部版本("),a("code",[t._v("alpha")]),t._v("):")]),t._v(" "),a("li",[t._v("公测版本("),a("code",[t._v("beta")]),t._v("):")]),t._v(" "),a("li",[t._v("正式版本的候选版本"),a("code",[t._v("rc")]),t._v(": 即 "),a("code",[t._v("Release candiate")])])]),t._v(" "),a("h3",{attrs:{id:"react的版本"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#react的版本"}},[t._v("#")]),t._v(" React的版本")]),t._v(" "),a("p",[t._v("下面我们来看看 "),a("code",[t._v("React")]),t._v(" 的历史版本：")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://lsqimg-1257917459.cos.ap-beijing.myqcloud.com/reactversion.gif",alt:""}})]),t._v(" "),a("p",[t._v("可见是严格按照 "),a("code",[t._v("SemVer")]),t._v(" 规范来发版的：")]),t._v(" "),a("ul",[a("li",[t._v("版本号严格按照 "),a("code",[t._v("主版本号.次版本号.修订号")]),t._v(" 格式命名")]),t._v(" "),a("li",[t._v("版本是严格递增的，："),a("code",[t._v("16.8.0 -> 16.8.1 -> 16.8.2")])]),t._v(" "),a("li",[t._v("发布重大版本或版本改动较大时，先发布"),a("code",[t._v("alpha")]),t._v("、"),a("code",[t._v("beta")]),t._v("、"),a("code",[t._v("rc")]),t._v("等先行版本")])]),t._v(" "),a("h3",{attrs:{id:"发布版本"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#发布版本"}},[t._v("#")]),t._v(" 发布版本")]),t._v(" "),a("p",[t._v("在修改 "),a("code",[t._v("npm")]),t._v(" 包某些功能后通常需要发布一个新的版本，我们通常的做法是直接去修改 "),a("code",[t._v("package.json")]),t._v(" 到指定版本。如果操作失误，很容易造成版本号混乱，我们可以借助符合 "),a("code",[t._v("Semver")]),t._v(" 规范的命令来完成这一操作：")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("npm version patch")]),t._v(" : 升级修订版本号")]),t._v(" "),a("li",[a("code",[t._v("npm version minor")]),t._v(" : 升级次版本号")]),t._v(" "),a("li",[a("code",[t._v("npm version major")]),t._v(" : 升级主版本号")])]),t._v(" "),a("h2",{attrs:{id:"版本工具使用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#版本工具使用"}},[t._v("#")]),t._v(" 版本工具使用")]),t._v(" "),a("p",[t._v("在开发中肯定少不了对一些版本号的操作，如果这些版本号符合 "),a("code",[t._v("SemVer")]),t._v("规范 ，我们可以借助用于操作版本的npm包"),a("code",[t._v("semver")]),t._v("来帮助我们进行比较版本大小、提取版本信息等操作。")]),t._v(" "),a("blockquote",[a("p",[t._v("Npm 也使用了该工具来处理版本相关的工作。")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("npm install semver\n")])])]),a("ul",[a("li",[t._v("比较版本号大小")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("semver"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("gt")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'1.2.3'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'9.8.7'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// false")]),t._v("\nsemver"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("lt")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'1.2.3'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'9.8.7'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// true")]),t._v("\n")])])]),a("ul",[a("li",[t._v("判断版本号是否符合规范，返回解析后符合规范的版本号。")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("semver"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("valid")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'1.2.3'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// '1.2.3'")]),t._v("\nsemver"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("valid")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'a.b.c'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// null")]),t._v("\n")])])]),a("ul",[a("li",[t._v("将其他版本号强制转换成semver版本号")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("semver"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("valid")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("semver"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("coerce")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'v2'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// '2.0.0'")]),t._v("\nsemver"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("valid")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("semver"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("coerce")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'42.6.7.9.3-alpha'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// '42.6.7'")]),t._v("\n")])])]),a("ul",[a("li",[t._v("一些其他用法")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("semver"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("clean")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'  =v1.2.3   '")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// '1.2.3'")]),t._v("\nsemver"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("satisfies")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'1.2.3'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'1.x || >=2.5.0 || 5.0.0 - 7.2.3'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// true")]),t._v("\nsemver"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("minVersion")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'>=1.0.0'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// '1.0.0'")]),t._v("\n")])])]),a("p",[t._v("以上都是semver最常见的用法，更多详细内容可以查看 semver文档：https://github.com/npm/node-semver")]),t._v(" "),a("h2",{attrs:{id:"依赖版本管理"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#依赖版本管理"}},[t._v("#")]),t._v(" 依赖版本管理")]),t._v(" "),a("p",[t._v("我们经常看到，在 "),a("code",[t._v("package.json")]),t._v(" 中各种依赖的不同写法：")]),t._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[t._v("  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"dependencies"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"signale"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"1.4.0"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"figlet"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"*"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"react"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"16.x"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"table"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"~5.4.6"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"yargs"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"^14.0.0"')]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("前面三个很容易理解：")]),t._v(" "),a("ul",[a("li",[a("code",[t._v('"signale": "1.4.0"')]),t._v(": 固定版本号")]),t._v(" "),a("li",[a("code",[t._v('"figlet": "*"')]),t._v(": 任意版本（"),a("code",[t._v(">=0.0.0")]),t._v("）")]),t._v(" "),a("li",[a("code",[t._v('"react": "16.x"')]),t._v(": 匹配主要版本（"),a("code",[t._v(">=16.0.0 <17.0.0")]),t._v("）")]),t._v(" "),a("li",[a("code",[t._v('"react": "16.3.x"')]),t._v(": 匹配主要版本和次要版本（"),a("code",[t._v(">=16.3.0 <16.4.0")]),t._v("）")])]),t._v(" "),a("p",[t._v("再来看看后面两个，版本号中引用了 "),a("code",[t._v("~")]),t._v(" 和 "),a("code",[t._v("^")]),t._v(" 符号：")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("~")]),t._v(": 当安装依赖时获取到有新版本时，安装到 "),a("code",[t._v("x.y.z")]),t._v(" 中 "),a("code",[t._v("z")]),t._v(" 的最新的版本。即保持主版本号、次版本号不变的情况下，保持修订号的最新版本。")]),t._v(" "),a("li",[a("code",[t._v("^")]),t._v(": 当安装依赖时获取到有新版本时，安装到 "),a("code",[t._v("x.y.z")]),t._v(" 中 "),a("code",[t._v("y")]),t._v(" 和 "),a("code",[t._v("z")]),t._v(" 都为最新版本。 即保持主版本号不变的情况下，保持次版本号、修订版本号为最新版本。")])]),t._v(" "),a("p",[t._v("在 "),a("code",[t._v("package.json")]),t._v(" 文件中最常见的应该是 "),a("code",[t._v('"yargs": "^14.0.0"')]),t._v(" 这种格式的 依赖, 因为我们在使用 "),a("code",[t._v("npm install package")]),t._v(" 安装包时，"),a("code",[t._v("npm")]),t._v(" 默认安装当前最新版本，然后在所安装的版本号前加 "),a("code",[t._v("^")]),t._v(" 号。")]),t._v(" "),a("p",[t._v("注意，当主版本号为 "),a("code",[t._v("0")]),t._v(" 的情况，会被认为是一个不稳定版本，情况与上面不同：")]),t._v(" "),a("ul",[a("li",[t._v("主版本号和次版本号都为 "),a("code",[t._v("0")]),t._v(": "),a("code",[t._v("^0.0.z")]),t._v("、"),a("code",[t._v("~0.0.z")]),t._v(" 都被当作固定版本，安装依赖时均不会发生变化。")]),t._v(" "),a("li",[t._v("主版本号为 "),a("code",[t._v("0")]),t._v(": "),a("code",[t._v("^0.y.z")]),t._v(" 表现和 "),a("code",[t._v("~0.y.z")]),t._v(" 相同，只保持修订号为最新版本。")])]),t._v(" "),a("blockquote",[a("p",[t._v("1.0.0 的版本号用于界定公共 API。当你的软件发布到了正式环境，或者有稳定的API时，就可以发布1.0.0版本了。所以，当你决定对外部发布一个正式版本的npm包时，把它的版本标为1.0.0。")])]),t._v(" "),a("h2",{attrs:{id:"锁定依赖版本"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#锁定依赖版本"}},[t._v("#")]),t._v(" 锁定依赖版本")]),t._v(" "),a("h3",{attrs:{id:"lock文件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#lock文件"}},[t._v("#")]),t._v(" lock文件")]),t._v(" "),a("p",[t._v("实际开发中，经常会因为各种依赖不一致而产生奇怪的问题，或者在某些场景下，我们不希望依赖被更新，建议在开发中使用 "),a("code",[t._v("package-lock.json")]),t._v("。")]),t._v(" "),a("p",[t._v("锁定依赖版本意味着在我们不手动执行更新的情况下，每次安装依赖都会安装固定版本。保证整个团队使用版本号一致的依赖。")]),t._v(" "),a("p",[t._v("每次安装固定版本，无需计算依赖版本范围，大部分场景下能大大加速依赖安装时间。")]),t._v(" "),a("blockquote",[a("p",[t._v("使用 package-lock.json 要确保npm的版本在5.6以上，因为在5.0 - 5.6中间，对 package-lock.json的处理逻辑进行过几次更新，5.6版本后处理逻辑逐渐稳定。")])]),t._v(" "),a("p",[t._v("关于 "),a("code",[t._v("package-lock.json")]),t._v(" 详细的结构，我们会在后面的章节进行解析。")]),t._v(" "),a("h3",{attrs:{id:"定期更新依赖"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#定期更新依赖"}},[t._v("#")]),t._v(" 定期更新依赖")]),t._v(" "),a("p",[t._v("我们的目的是保证团队中使用的依赖一致或者稳定，而不是永远不去更新这些依赖。实际开发场景下，我们虽然不需要每次都去安装新的版本，仍然需要定时去升级依赖版本，来让我们享受依赖包升级带来的问题修复、性能提升、新特性更新。")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://lsqimg-1257917459.cos.ap-beijing.myqcloud.com/20191103214620.png",alt:""}})]),t._v(" "),a("p",[t._v("使用 "),a("code",[t._v("npm outdated")]),t._v(" 可以帮助我们列出有哪些还没有升级到最新版本的依赖：")]),t._v(" "),a("ul",[a("li",[t._v("黄色表示不符合我们指定的语意化版本范围 - 不需要升级")]),t._v(" "),a("li",[t._v("红色表示符合指定的语意化版本范围 - 需要升级")])]),t._v(" "),a("p",[t._v("执行 "),a("code",[t._v("npm update")]),t._v(" 会升级所有的红色依赖。")]),t._v(" "),a("h2",{attrs:{id:"依赖版本选择的最佳实践"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#依赖版本选择的最佳实践"}},[t._v("#")]),t._v(" 依赖版本选择的最佳实践")]),t._v(" "),a("h3",{attrs:{id:"版本发布"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#版本发布"}},[t._v("#")]),t._v(" 版本发布")]),t._v(" "),a("ul",[a("li",[t._v("对外部发布一个正式版本的npm包时，把它的版本标为"),a("code",[t._v("1.0.0")]),t._v("。")]),t._v(" "),a("li",[t._v("某个包版本发行后，任何修改都必须以新版本发行。")]),t._v(" "),a("li",[t._v("版本号严格按照 "),a("code",[t._v("主版本号.次版本号.修订号")]),t._v(" 格式命名")]),t._v(" "),a("li",[t._v("版本号发布必须是严格递增的")]),t._v(" "),a("li",[t._v("发布重大版本或版本改动较大时，先发布"),a("code",[t._v("alpha、beta、rc")]),t._v("等先行版本")])]),t._v(" "),a("h3",{attrs:{id:"依赖范围选择"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#依赖范围选择"}},[t._v("#")]),t._v(" 依赖范围选择")]),t._v(" "),a("ul",[a("li",[t._v("主工程依赖了很多子模块，都是团队成员开发的"),a("code",[t._v("npm")]),t._v("包，此时建议把版本前缀改为"),a("code",[t._v("~")]),t._v("，如果锁定的话每次子依赖更新都要对主工程的依赖进行升级，非常繁琐，如果对子依赖完全信任，直接开启"),a("code",[t._v("^")]),t._v("每次升级到最新版本。")]),t._v(" "),a("li",[t._v("主工程跑在"),a("code",[t._v("docker")]),t._v("线上，本地还在进行子依赖开发和升级，在"),a("code",[t._v("docker")]),t._v("版本发布前要锁定所有依赖版本，确保本地子依赖发布后线上不会出问题。")])]),t._v(" "),a("h3",{attrs:{id:"保持依赖一致"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#保持依赖一致"}},[t._v("#")]),t._v(" 保持依赖一致")]),t._v(" "),a("ul",[a("li",[t._v("确保"),a("code",[t._v("npm")]),t._v("的版本在"),a("code",[t._v("5.6")]),t._v("以上，确保默认开启 "),a("code",[t._v("package-lock.json")]),t._v(" 文件。")]),t._v(" "),a("li",[t._v("由初始化成员执行 "),a("code",[t._v("npm inatall")]),t._v(" 后，将 "),a("code",[t._v("package-lock.json")]),t._v(" 提交到远程仓库。不要直接提交 "),a("code",[t._v("node_modules")]),t._v("到远程仓库。")]),t._v(" "),a("li",[t._v("定期执行 "),a("code",[t._v("npm update")]),t._v(" 升级依赖，并提交 "),a("code",[t._v("lock")]),t._v(" 文件确保其他成员同步更新依赖，不要手动更改 "),a("code",[t._v("lock")]),t._v(" 文件。")])]),t._v(" "),a("h3",{attrs:{id:"依赖变更"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#依赖变更"}},[t._v("#")]),t._v(" 依赖变更")]),t._v(" "),a("ul",[a("li",[t._v("升级依赖: 修改 "),a("code",[t._v("package.json")]),t._v("文件的依赖版本，执行 "),a("code",[t._v("npm install")])]),t._v(" "),a("li",[t._v("降级依赖: 直接执行 "),a("code",[t._v("npm install package@version")]),t._v("(改动"),a("code",[t._v("package.json")]),t._v("不会对依赖进行降级)")]),t._v(" "),a("li",[t._v("注意改动依赖后提交"),a("code",[t._v("lock")]),t._v("文件")])]),t._v(" "),a("h2",{attrs:{id:"参考"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参考"}},[t._v("#")]),t._v(" 参考")]),t._v(" "),a("ul",[a("li",[t._v("https://semver.org/lang/zh-CN/")]),t._v(" "),a("li",[t._v("http://deadhorse.me/nodejs/2014/04/27/semver-in-nodejs.html")])])])}),[],!1,null,null,null);s.default=e.exports}}]);