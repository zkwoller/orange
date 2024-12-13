---
nav:
  title: 规范
  order: 3
group: 基础
order: -1
toc: content
---
# 常用缩写与命名

|真身|缩写|
|:---|---:|
|define|dev|
|function|func|
|information|info|
|statistic|stat|
|message|msg|
|internationalization|i18n|
|to|2|
|for|4|
|button|btn|
|background|bg|
|repository|repo|
|response|res|
|request|req|
|image|img|
|error|err|
|navigator|nav|
|parameter|params|
|utility|util|
|high order component|hoc|
|property|prop|
|attribute|attr|
|template|tpl|
|source|src|
|horizontal|hoz|
|vertical|vert|
|environment|env|
|boolean|bool|


## 表示可见性、进行中的状态
```js
{
  isShow: '是否显示',
  isVisible: '是否可见',
  isLoading: '是否处于加载中',
  isConnecting: '是否处于连接中',
  isValidating: '正在验证中',
  isRunning: '正在运行中',
  isListening: '正在监听中'
}
```
## 属性状态类
```js
{
  disabled: '是否禁用',
  editable: '是否可编辑',
  clearable: '是否可清除',
  readonly: '只读',
  expandable: '是否可展开',
  checked: '是否选中',
  enumberable: '是否可枚举',
  iterable: '是否可迭代',
  clickable: '是否可点击',
  draggable: '是否可拖拽'
}
```
## 配置类、选项类
```js
{
  withTab: '是否带选项卡',
  withoutTab: '不带选项卡',
  enableFilter: '开启过滤',
  allownCustomScale: '允许自定义缩放',
  shouldClear: '是否清除',
  canSelectItem: '是否能选中元素',
  noColon: '不显示label后面的冒号',
  checkJs: '检查Js',
  emitBOM: 'Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files.'
  virtualScroll: '是否启用虚拟滚动模式',
  unlinkPanels: '在范围选择器里取消两个日期面板之间的联动',
  validateEvent: '输入时是否触发表单的校验'
}
```
## 事件处理
```js
{
  onSubmit: '提交表单',
  handleSizeChange: '处理分页页数改变',
  handlePageChange: '处理分页每页大小改变',
  onKeydown: '按下键'
}
```
## 异步处理
```js
{
  getUsers: '获取用户列表',
  fetchToken: '取得Token',
  deleteUser: '删除用户',
  removeTag: '移除标签',
  updateUsrInfo: '更新用户信息',
  addUsr: '添加用户',
  createAccount: '创建账户'
}
```
## 跳转路由
```js
{
  toTplDetail: '跳转到模板详情页面',
  navigateToHome: '导航到首页',
  jumpHome: '跳转首页',
  goHome: '跳转首页',
  redirectToLogin: '重定向到登录页',
  switchTab: '切换Tab选项卡',
  backHome: '回到主页'
}
```
## 框架相关特定方法
```js
{
  formatTimeFilter: '在AngularJs和Vue中，通常用于过滤器命名',
  storeCtrl: '用于AngularJs定义控制器方法',
  formatPipe: '用于Angular中，标识管道方法',
  $emit: 'Vue中的实例方法',
  $$formatters: 'AngularJs中的内置方法',
  beforeCreate: 'Vue的生命周期命名',
  componentWillMount: 'React生命周期命名',
  componentDidMount: 'React生命周期命名',
  afterContentInit: 'Anuglar生命周期命名',
  afterViewChecked: 'Angula生命周期命名',
  httpProvider: 'AngularJs服务',
  userFactory: '工厂函数',
  useCallback: 'React钩子函数'
}
```
## 数据的加工
```js
{
  getItemById: '根据ID获取数据元素',
  getItemsBySelected: '根据传入的已选列表ID来获取列表全部数据',
  queryUserByUid: '根据UID查询用户'
}
```
## 格式化数据
```js
{
  formatDate: '格式化日期',
  convertCurrency: '转换货币单位',
  inverseList: '反转数据列表',
  toggleAllSelected: '切换所有已选择数据状态',
  parseXml: '解析XML数据',
  flatSelect: '展开选择数据',
  sortByDesc: '按降序排序'
}
```
## 数组命名
```js
{
  users: '用户列表',
  userList: '用户列表',
  tabOptions: '选项卡选项',
  stateMaps: '状态映射表',
  selectedNodes: '选中的节点',
  btnGroup: '按钮组',
  userEntities: '用户实体'
}
```
## 事件命名
```js
{
  load: '已完成加载',
  unload: '资源正在被卸载',
  beforeunload: '资源即将被卸载',
  error: '失败时',
  abort: '中止时',
  focus: '元素获得焦点',
  blur: '元素失去焦点',
  cut: '已经剪贴选中的文本内容并且复制到了剪贴板',
  copy: '已经把选中的文本内容复制到了剪贴板',
  paste: '从剪贴板复制的文本内容被粘贴',
  resize: '元素重置大小',
  scroll: '滚动事件',
  reset: '重置',
  submit: '表单提交',
  online: '在线',
  offline: '离线',
  open: '打开',
  close: '关闭',
  connect: '连接',
  start: '开始',
  end: '结束',
  print: '打印',
  afterprint: '打印机关闭时触发',
  click: '点击',
  dblclick: '双击',
  change: '变动',
  select: '文本被选中被选中',
  keydown/keypress/keyup: '按键事件',
  mousemove/mousedown/mouseup/mouseleave/mouseout: '鼠标事件',
  touch: '轻按',
  contextmenu: '右键点击 (右键菜单显示前)',
  wheel: '滚轮向任意方向滚动',
  pointer: '指针事件',
  drag/dragstart/dragend/dragenter/dragover/dragleave: '拖放事件',
  drop: '元素在有效释放目标区上释放',
  play: '播放',
  pause: '暂停',
  suspend: '挂起',
  complete: '完成',
  seek: '搜索',
  install: '安装',
  progress: '进行',
  broadcast: '广播',
  input: '输入',
  message: '消息',
  valid: '有效',
  zoom: '放大',
  rotate: '旋转',
  scale: '缩放',
  upgrade: '更新',
  ready: '准备好',
  active: '激活'
}
```
