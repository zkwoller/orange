---
group: 基础
order: 8
toc: content
---
# npm

## <font style="color:rgb(0, 0, 0);">一、什么是 npm 脚本？</font>
<font style="color:rgb(17, 17, 17);">npm 允许在</font><font style="color:rgb(17, 17, 17);">package.json</font><font style="color:rgb(17, 17, 17);">文件里面，使用</font><font style="color:rgb(17, 17, 17);">scripts</font><font style="color:rgb(17, 17, 17);">字段定义脚本命令。</font>

```javascript
{
  // ...
  "scripts": {
    "build": "node build.js"
  }
}
```

<font style="color:rgb(17, 17, 17);">上面代码是</font><font style="color:rgb(17, 17, 17);">package.json</font><font style="color:rgb(17, 17, 17);">文件的一个片段，里面的</font><font style="color:rgb(17, 17, 17);">scripts</font><font style="color:rgb(17, 17, 17);">字段是一个对象。它的每一个属性，对应一段脚本。比如，</font><font style="color:rgb(17, 17, 17);">build</font><font style="color:rgb(17, 17, 17);">命令对应的脚本是</font><font style="color:rgb(17, 17, 17);">node build.js</font><font style="color:rgb(17, 17, 17);">。</font>

<font style="color:rgb(17, 17, 17);">命令行下使用</font><font style="color:rgb(17, 17, 17);">npm run</font><font style="color:rgb(17, 17, 17);">命令，就可以执行这段脚本。</font>

```bash
$ npm run build
# 等同于执行
$ node build.js
```

<font style="color:rgb(17, 17, 17);">这些定义在</font><font style="color:rgb(17, 17, 17);">package.json</font><font style="color:rgb(17, 17, 17);">里面的脚本，就称为 npm 脚本。它的优点很多</font>

+ <font style="color:rgb(17, 17, 17);">项目的相关脚本，可以集中在一个地方。</font>
+ <font style="color:rgb(17, 17, 17);">不同项目的脚本命令，只要功能相同，就可以有同样的对外接口。用户不需要知道怎么测试你的项目，只要运行</font><font style="color:rgb(17, 17, 17);">npm run test</font><font style="color:rgb(17, 17, 17);">即可。</font>
+ <font style="color:rgb(17, 17, 17);">可以利用 npm 提供的很多辅助功能。</font>

<font style="color:rgb(17, 17, 17);">查看当前项目的所有 npm 脚本命令，可以使用不带任何参数的</font><font style="color:rgb(17, 17, 17);">npm run</font><font style="color:rgb(17, 17, 17);">命令。</font>

```bash
$ npm run
```

## <font style="color:rgb(0, 0, 0);">二、原理</font>
<font style="color:rgb(17, 17, 17);">npm 脚本的原理非常简单。每当执行</font><font style="color:rgb(17, 17, 17);">npm run</font><font style="color:rgb(17, 17, 17);">，就会自动新建一个 Shell，在这个 Shell 里面执行指定的脚本命令。因此，只要是 Shell（一般是 Bash）可以运行的命令，就可以写在 npm 脚本里面。</font>

<font style="color:rgb(17, 17, 17);">比较特别的是，</font><font style="color:rgb(17, 17, 17);">npm run</font><font style="color:rgb(17, 17, 17);">新建的这个 Shell，会将当前目录的</font><font style="color:rgb(17, 17, 17);">node_modules/.bin</font><font style="color:rgb(17, 17, 17);">子目录加入</font><font style="color:rgb(17, 17, 17);">PATH</font><font style="color:rgb(17, 17, 17);">变量，执行结束后，再将</font><font style="color:rgb(17, 17, 17);">PATH</font><font style="color:rgb(17, 17, 17);">变量恢复原样。</font>

<font style="color:rgb(17, 17, 17);">这意味着，当前目录的</font><font style="color:rgb(17, 17, 17);">node_modules/.bin</font><font style="color:rgb(17, 17, 17);">子目录里面的所有脚本，都可以直接用脚本名调用，而不必加上路径。比如，当前项目的依赖里面有 Mocha，只要直接写</font><font style="color:rgb(17, 17, 17);">mocha test</font><font style="color:rgb(17, 17, 17);">就可以了。</font>

```javascript
"test": "mocha test"
```

<font style="color:rgb(17, 17, 17);">而不用写成下面这样。</font>

```javascript
"test": "./node_modules/.bin/mocha test"
```

<font style="color:rgb(17, 17, 17);">由于 npm 脚本的唯一要求就是可以在 Shell 执行，因此它不一定是 Node 脚本，任何可执行文件都可以写在里面。</font>

<font style="color:rgb(17, 17, 17);">npm 脚本的退出码，也遵守 Shell 脚本规则。如果退出码不是</font><font style="color:rgb(17, 17, 17);">0</font><font style="color:rgb(17, 17, 17);">，npm 就认为这个脚本执行失败。</font>

## <font style="color:rgb(0, 0, 0);">三、通配符</font>
<font style="color:rgb(17, 17, 17);">由于 npm 脚本就是 Shell 脚本，因为可以使用 Shell 通配符。</font>

```javascript
"lint": "jshint *.js"
"lint": "jshint **/*.js"
```

<font style="color:rgb(17, 17, 17);">上面代码中，</font><font style="color:rgb(17, 17, 17);">*</font><font style="color:rgb(17, 17, 17);">表示任意文件名，</font><font style="color:rgb(17, 17, 17);">**</font><font style="color:rgb(17, 17, 17);">表示任意一层子目录。</font>

<font style="color:rgb(17, 17, 17);">如果要将通配符传入原始命令，防止被 Shell 转义，要将星号转义。</font>

```javascript
"test": "tap test/\*.js"
```

## <font style="color:rgb(0, 0, 0);">四、传参</font>
<font style="color:rgb(17, 17, 17);">向 npm 脚本传入参数，要使用</font><font style="color:rgb(17, 17, 17);">--</font><font style="color:rgb(17, 17, 17);">标明。</font>

```javascript
"lint": "jshint **.js"
```

<font style="color:rgb(17, 17, 17);">向上面的</font><font style="color:rgb(17, 17, 17);">npm run lint</font><font style="color:rgb(17, 17, 17);">命令传入参数，必须写成下面这样。</font>

```bash
$ npm run lint --  --reporter checkstyle > checkstyle.xml
```

<font style="color:rgb(17, 17, 17);">也可以在</font><font style="color:rgb(17, 17, 17);">package.json</font><font style="color:rgb(17, 17, 17);">里面再封装一个命令。</font>

```javascript
"lint": "jshint **.js",
"lint:checkstyle": "npm run lint -- --reporter checkstyle > checkstyle.xml"
```

## <font style="color:rgb(0, 0, 0);">五、执行顺序</font>
<font style="color:rgb(17, 17, 17);">如果 npm 脚本里面需要执行多个任务，那么需要明确它们的执行顺序。</font>

<font style="color:rgb(17, 17, 17);">如果是并行执行（即同时的平行执行），可以使用</font><font style="color:rgb(17, 17, 17);">&</font><font style="color:rgb(17, 17, 17);">符号。</font>

```bash
$ npm run script1.js & npm run script2.js
```

<font style="color:rgb(17, 17, 17);">如果是继发执行（即只有前一个任务成功，才执行下一个任务），可以使用</font><font style="color:rgb(17, 17, 17);">&&</font><font style="color:rgb(17, 17, 17);">符号。</font>

```bash
$ npm run script1.js && npm run script2.js
```

<font style="color:rgb(17, 17, 17);">这两个符号是 Bash 的功能。此外，还可以使用 node 的任务管理模块：</font>[script-runner](https://github.com/paulpflug/script-runner)<font style="color:rgb(17, 17, 17);">、</font>[npm-run-all](https://github.com/mysticatea/npm-run-all)<font style="color:rgb(17, 17, 17);">、</font>[redrun](https://github.com/coderaiser/redrun)<font style="color:rgb(17, 17, 17);">。</font>

## <font style="color:rgb(0, 0, 0);">六、默认值</font>
<font style="color:rgb(17, 17, 17);">一般来说，npm 脚本由用户提供。但是，npm 对两个脚本提供了默认值。也就是说，这两个脚本不用定义，就可以直接使用。</font>

```javascript
"start": "node server.js"，
"install": "node-gyp rebuild"
```

<font style="color:rgb(17, 17, 17);">上面代码中，</font><font style="color:rgb(17, 17, 17);">npm run start</font><font style="color:rgb(17, 17, 17);">的默认值是</font><font style="color:rgb(17, 17, 17);">node server.js</font><font style="color:rgb(17, 17, 17);">，前提是项目根目录下有</font><font style="color:rgb(17, 17, 17);">server.js</font><font style="color:rgb(17, 17, 17);">这个脚本；</font><font style="color:rgb(17, 17, 17);">npm run install</font><font style="color:rgb(17, 17, 17);">的默认值是</font><font style="color:rgb(17, 17, 17);">node-gyp rebuild</font><font style="color:rgb(17, 17, 17);">，前提是项目根目录下有</font><font style="color:rgb(17, 17, 17);">binding.gyp</font><font style="color:rgb(17, 17, 17);">文件。</font>

## <font style="color:rgb(0, 0, 0);">七、钩子</font>
<font style="color:rgb(17, 17, 17);">npm 脚本有</font><font style="color:rgb(17, 17, 17);">pre</font><font style="color:rgb(17, 17, 17);">和</font><font style="color:rgb(17, 17, 17);">post</font><font style="color:rgb(17, 17, 17);">两个钩子。举例来说，</font><font style="color:rgb(17, 17, 17);">build</font><font style="color:rgb(17, 17, 17);">脚本命令的钩子就是</font><font style="color:rgb(17, 17, 17);">prebuild</font><font style="color:rgb(17, 17, 17);">和</font><font style="color:rgb(17, 17, 17);">postbuild</font><font style="color:rgb(17, 17, 17);">。</font>

```javascript
"prebuild": "echo I run before the build script",
"build": "cross-env NODE_ENV=production webpack",
"postbuild": "echo I run after the build script"
```

<font style="color:rgb(17, 17, 17);">用户执行</font><font style="color:rgb(17, 17, 17);">npm run build</font><font style="color:rgb(17, 17, 17);">的时候，会自动按照下面的顺序执行。</font>

```bash
npm run prebuild && npm run build && npm run postbuild
```

<font style="color:rgb(17, 17, 17);">因此，可以在这两个钩子里面，完成一些准备工作和清理工作。下面是一个例子。</font>

```javascript
"clean": "rimraf ./dist && mkdir dist",
"prebuild": "npm run clean",
"build": "cross-env NODE_ENV=production webpack"
```

<font style="color:rgb(17, 17, 17);">npm 默认提供下面这些钩子。</font>

+ <font style="color:rgb(17, 17, 17);">prepublish，postpublish</font>
+ <font style="color:rgb(17, 17, 17);">preinstall，postinstall</font>
+ <font style="color:rgb(17, 17, 17);">preuninstall，postuninstall</font>
+ <font style="color:rgb(17, 17, 17);">preversion，postversion</font>
+ <font style="color:rgb(17, 17, 17);">pretest，posttest</font>
+ <font style="color:rgb(17, 17, 17);">prestop，poststop</font>
+ <font style="color:rgb(17, 17, 17);">prestart，poststart</font>
+ <font style="color:rgb(17, 17, 17);">prerestart，postrestart</font>

<font style="color:rgb(17, 17, 17);">自定义的脚本命令也可以加上</font><font style="color:rgb(17, 17, 17);">pre</font><font style="color:rgb(17, 17, 17);">和</font><font style="color:rgb(17, 17, 17);">post</font><font style="color:rgb(17, 17, 17);">钩子。比如，</font><font style="color:rgb(17, 17, 17);">myscript</font><font style="color:rgb(17, 17, 17);">这个脚本命令，也有</font><font style="color:rgb(17, 17, 17);">premyscript</font><font style="color:rgb(17, 17, 17);">和</font><font style="color:rgb(17, 17, 17);">postmyscript</font><font style="color:rgb(17, 17, 17);">钩子。不过，双重的</font><font style="color:rgb(17, 17, 17);">pre</font><font style="color:rgb(17, 17, 17);">和</font><font style="color:rgb(17, 17, 17);">post</font><font style="color:rgb(17, 17, 17);">无效，比如</font><font style="color:rgb(17, 17, 17);">prepretest</font><font style="color:rgb(17, 17, 17);">和</font><font style="color:rgb(17, 17, 17);">postposttest</font><font style="color:rgb(17, 17, 17);">是无效的。</font>

<font style="color:rgb(17, 17, 17);">npm 提供一个</font><font style="color:rgb(17, 17, 17);">npm_lifecycle_event</font><font style="color:rgb(17, 17, 17);">变量，返回当前正在运行的脚本名称，比如</font><font style="color:rgb(17, 17, 17);">pretest</font><font style="color:rgb(17, 17, 17);">、</font><font style="color:rgb(17, 17, 17);">test</font><font style="color:rgb(17, 17, 17);">、</font><font style="color:rgb(17, 17, 17);">posttest</font><font style="color:rgb(17, 17, 17);">等等。所以，可以利用这个变量，在同一个脚本文件里面，为不同的</font><font style="color:rgb(17, 17, 17);">npm scripts</font><font style="color:rgb(17, 17, 17);">命令编写代码。请看下面的例子。</font><font style="color:rgb(17, 17, 17);"></font>

```javascript
const TARGET = process.env.npm_lifecycle_event;

if (TARGET === 'test') {
  console.log(`Running the test task!`);
}

if (TARGET === 'pretest') {
  console.log(`Running the pretest task!`);
}

if (TARGET === 'posttest') {
  console.log(`Running the posttest task!`);
}
```

<font style="color:rgb(17, 17, 17);">注意，</font><font style="color:rgb(17, 17, 17);">prepublish</font><font style="color:rgb(17, 17, 17);">这个钩子不仅会在</font><font style="color:rgb(17, 17, 17);">npm publish</font><font style="color:rgb(17, 17, 17);">命令之前运行，还会在</font><font style="color:rgb(17, 17, 17);">npm install</font><font style="color:rgb(17, 17, 17);">（不带任何参数）命令之前运行。这种行为很容易让用户感到困惑，所以 npm 4 引入了一个新的钩子</font><font style="color:rgb(17, 17, 17);">prepare</font><font style="color:rgb(17, 17, 17);">，行为等同于</font><font style="color:rgb(17, 17, 17);">prepublish</font><font style="color:rgb(17, 17, 17);">，而从 npm 5 开始，</font><font style="color:rgb(17, 17, 17);">prepublish</font><font style="color:rgb(17, 17, 17);">将只在</font><font style="color:rgb(17, 17, 17);">npm publish</font><font style="color:rgb(17, 17, 17);">命令之前运行。</font>

## <font style="color:rgb(0, 0, 0);">八、简写形式</font>
<font style="color:rgb(17, 17, 17);">四个常用的 npm 脚本有简写形式。</font>

+ <font style="color:rgb(17, 17, 17);">npm start是npm run start</font>
+ <font style="color:rgb(17, 17, 17);">npm stop</font><font style="color:rgb(17, 17, 17);">是</font><font style="color:rgb(17, 17, 17);">npm run stop</font><font style="color:rgb(17, 17, 17);">的简写</font>
+ <font style="color:rgb(17, 17, 17);">npm test</font><font style="color:rgb(17, 17, 17);">是</font><font style="color:rgb(17, 17, 17);">npm run test</font><font style="color:rgb(17, 17, 17);">的简写</font>
+ <font style="color:rgb(17, 17, 17);">npm restart是npm run stop && npm run restart && npm run start的简写</font>

<font style="color:rgb(17, 17, 17);">npm start</font><font style="color:rgb(17, 17, 17);">、</font><font style="color:rgb(17, 17, 17);">npm stop</font><font style="color:rgb(17, 17, 17);">和</font><font style="color:rgb(17, 17, 17);">npm restart</font><font style="color:rgb(17, 17, 17);">都比较好理解，而</font><font style="color:rgb(17, 17, 17);">npm restart</font><font style="color:rgb(17, 17, 17);">是一个复合命令，实际上会执行三个脚本命令：</font><font style="color:rgb(17, 17, 17);">stop</font><font style="color:rgb(17, 17, 17);">、</font><font style="color:rgb(17, 17, 17);">restart</font><font style="color:rgb(17, 17, 17);">、</font><font style="color:rgb(17, 17, 17);">start</font><font style="color:rgb(17, 17, 17);">。具体的执行顺序如下。</font>

1. <font style="color:rgb(17, 17, 17);">prerestart</font>
2. <font style="color:rgb(17, 17, 17);">prestop</font>
3. <font style="color:rgb(17, 17, 17);">stop</font>
4. <font style="color:rgb(17, 17, 17);">poststop</font>
5. <font style="color:rgb(17, 17, 17);">restart</font>
6. <font style="color:rgb(17, 17, 17);">prestart</font>
7. <font style="color:rgb(17, 17, 17);">start</font>
8. <font style="color:rgb(17, 17, 17);">poststart</font>
9. <font style="color:rgb(17, 17, 17);">postrestart</font>

## <font style="color:rgb(0, 0, 0);">九、变量</font>
<font style="color:rgb(17, 17, 17);">npm 脚本有一个非常强大的功能，就是可以使用 npm 的内部变量。</font>

<font style="color:rgb(17, 17, 17);">首先，通过</font><font style="color:rgb(17, 17, 17);">npm_package_</font><font style="color:rgb(17, 17, 17);">前缀，npm 脚本可以拿到</font><font style="color:rgb(17, 17, 17);">package.json</font><font style="color:rgb(17, 17, 17);">里面的字段。比如，下面是一个</font><font style="color:rgb(17, 17, 17);">package.json</font><font style="color:rgb(17, 17, 17);">。</font>

```javascript
{
  "name": "foo", 
  "version": "1.2.5",
  "scripts": {
    "view": "node view.js"
  }
}
```

<font style="color:rgb(17, 17, 17);">那么，变量</font><font style="color:rgb(17, 17, 17);">npm_package_name</font><font style="color:rgb(17, 17, 17);">返回</font><font style="color:rgb(17, 17, 17);">foo</font><font style="color:rgb(17, 17, 17);">，变量</font><font style="color:rgb(17, 17, 17);">npm_package_version</font><font style="color:rgb(17, 17, 17);">返回</font><font style="color:rgb(17, 17, 17);">1.2.5</font><font style="color:rgb(17, 17, 17);">。</font>

```javascript
// view.js
console.log(process.env.npm_package_name); // foo
console.log(process.env.npm_package_version); // 1.2.5
```

<font style="color:rgb(17, 17, 17);">上面代码中，我们通过环境变量</font><font style="color:rgb(17, 17, 17);">process.env</font><font style="color:rgb(17, 17, 17);">对象，拿到</font><font style="color:rgb(17, 17, 17);">package.json</font><font style="color:rgb(17, 17, 17);">的字段值。如果是 Bash 脚本，可以用</font><font style="color:rgb(17, 17, 17);">$npm_package_name</font><font style="color:rgb(17, 17, 17);">和</font><font style="color:rgb(17, 17, 17);">$npm_package_version</font><font style="color:rgb(17, 17, 17);">取到这两个值。</font>

<font style="color:rgb(17, 17, 17);">npm_package_</font><font style="color:rgb(17, 17, 17);">前缀也支持嵌套的</font><font style="color:rgb(17, 17, 17);">package.json</font><font style="color:rgb(17, 17, 17);">字段。</font>

```javascript
"repository": {
    "type": "git",
    "url": "xxx"
  },
  scripts: {
    "view": "echo $npm_package_repository_type"
  }
```

<font style="color:rgb(17, 17, 17);">上面代码中，</font><font style="color:rgb(17, 17, 17);">repository</font><font style="color:rgb(17, 17, 17);">字段的</font><font style="color:rgb(17, 17, 17);">type</font><font style="color:rgb(17, 17, 17);">属性，可以通过</font><font style="color:rgb(17, 17, 17);">npm_package_repository_type</font><font style="color:rgb(17, 17, 17);">取到。</font>

<font style="color:rgb(17, 17, 17);">下面是另外一个例子。</font>

```javascript
"scripts": {
  "install": "foo.js"
}
```

<font style="color:rgb(17, 17, 17);">上面代码中，</font><font style="color:rgb(17, 17, 17);">npm_package_scripts_install</font><font style="color:rgb(17, 17, 17);">变量的值等于</font><font style="color:rgb(17, 17, 17);">foo.js</font><font style="color:rgb(17, 17, 17);">。</font>

<font style="color:rgb(17, 17, 17);">然后，npm 脚本还可以通过</font><font style="color:rgb(17, 17, 17);">npm_config_</font><font style="color:rgb(17, 17, 17);">前缀，拿到 npm 的配置变量，即</font><font style="color:rgb(17, 17, 17);">npm config get xxx</font><font style="color:rgb(17, 17, 17);">命令返回的值。比如，当前模块的发行标签，可以通过</font><font style="color:rgb(17, 17, 17);">npm_config_tag</font><font style="color:rgb(17, 17, 17);">取到。</font>

```javascript
"view": "echo $npm_config_tag",
```

<font style="color:rgb(17, 17, 17);">注意，</font><font style="color:rgb(17, 17, 17);">package.json</font><font style="color:rgb(17, 17, 17);">里面的</font><font style="color:rgb(17, 17, 17);">config</font><font style="color:rgb(17, 17, 17);">对象，可以被环境变量覆盖。</font><font style="color:rgb(17, 17, 17);"></font>

```javascript
{ 
  "name" : "foo",
  "config" : { "port" : "8080" },
  "scripts" : { "start" : "node server.js" }
}
```

<font style="color:rgb(17, 17, 17);">上面代码中，</font><font style="color:rgb(17, 17, 17);">npm_package_config_port</font><font style="color:rgb(17, 17, 17);">变量返回的是</font><font style="color:rgb(17, 17, 17);">8080</font><font style="color:rgb(17, 17, 17);">。这个值可以用下面的方法覆盖。</font>

```bash
$ npm config set foo:port 80
```

<font style="color:rgb(17, 17, 17);">最后，</font><font style="color:rgb(17, 17, 17);">env</font><font style="color:rgb(17, 17, 17);">命令可以列出所有环境变量。</font>

```javascript
"env": "env"
```

## <font style="color:rgb(0, 0, 0);">十、常用脚本示例</font>
```javascript
// 删除目录
"clean": "rimraf dist/*",

// 本地搭建一个 HTTP 服务
"serve": "http-server -p 9090 dist/",

// 打开浏览器
"open:dev": "opener http://localhost:9090",

// 实时刷新
 "livereload": "live-reload --port 9091 dist/",

// 构建 HTML 文件
"build:html": "jade index.jade > dist/index.html",

// 只要 CSS 文件有变动，就重新执行构建
"watch:css": "watch 'npm run build:css' assets/styles/",

// 只要 HTML 文件有变动，就重新执行构建
"watch:html": "watch 'npm run build:html' assets/html",

// 部署到 Amazon S3
"deploy:prod": "s3-cli sync ./dist/ s3://example-com/prod-site/",

// 构建 favicon
"build:favicon": "node scripts/favicon.js",
```

<font style="color:rgb(17, 17, 17);">  
</font>

