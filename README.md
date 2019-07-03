# Electron实战　:dizzy:

[<img src="https://james-1258744956.cos.ap-shanghai.myqcloud.com/ElectronInAction/chapter03/electron.svg" align="right" width="100">](https://electronjs.org)

> Electron In Action 中译文版，学习 [Electron](https://electronjs.org)

你可能喜欢 [Electron in Action](https://github.com/electron-in-action).



------

## 本章主要内容:

- 使用Electron的`dialog`模块实现一个本机打开文件对话框
- 促进主进程和渲染进程之间的通信
- 将功能从主进程暴露给渲染进程
- 使用Electron的`remote`模块从主进程导入功能到渲染器进程
- 使用webContents模块将信息从主进程发送到渲染器进程，并使用`ipcRenderer`模块为来自主进程的消息设置监听器



------



## 术语及相应方法

### ipcRenderer

> 从渲染器进程到主进程的异步通信。

进程: 渲染进程

`ipcRenderer` 是一个 [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) 的实例。 你可以使用它提供的一些方法从渲染进程 (web 页面) 发送同步或异步的消息到主进程。 也可以接收主进程回复的消息。



`ipcRenderer` 模块使用以下方法来监听事件和发送消息。



#### 更多

相关remote信息请参照[ipcRenderer](https://electronjs.org/docs/api/ipc-renderer)

------



### remote

> 在渲染进程中使用主进程模块。

进程: 渲染进程

`remote` 模块为渲染进程（web页面）和主进程通信（IPC）提供了一种简单方法。

在Electron中, GUI 相关的模块 (如 `dialog`、`menu` 等) 仅在主进程中可用, 在渲染进程中不可用。 为了在渲染进程中使用它们, `ipc` 模块是向主进程发送进程间消息所必需的。 使用 `remote` 模块, 你可以调用 主进程对象的方法, 而不必显式发送进程间消息, 类似于 Java 的[RMI ](https://en.wikipedia.org/wiki/Java_remote_method_invocation)。
例如：从渲染进程创建浏览器窗口

```javascript
const { BrowserWindow } = require('electron').remote
let win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('https://github.com')Copy
```

**注意:** 反过来（如果需要从主进程访问渲染进程），可以使用 [webContents. executeJavascript ](https://electronjs.org/docs/api/web-contents#contentsexecutejavascriptcode-usergesture-callback)。

**注意事项：** 因为安全原因，remote 模块能在以下几种情况下被禁用：

- [`BrowserWindow`](https://electronjs.org/docs/api/browser-window) - 通过设置 `enableRemoteModule` 选项为 `false`。
- [`<webview>`](https://electronjs.org/docs/api/webview-tag) - 通过把 `enableremotemodule`属性设置成 `false`。



#### 更多

相关remote信息请参照[remote](https://electronjs.org/docs/api/remote)

------



### webContents

> 渲染以及控制web页面

**进程**:  主进程

`webContents` 是 [EventEmitter ](https://nodejs.org/api/events.html#events_class_eventemitter)的实例， 负责渲染和控制网页, 是 [`BrowserWindow`](https://electronjs.org/docs/api/browser-window) 对象的一个属性。 这是一个访问 `webContents` 对象的例子:

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow({ width: 800, height: 1500 })
win.loadURL('http://github.com')

let contents = win.webContents
console.log(contents)
```



#### 更多

相关webContents信息请参照[web-contents](https://electronjs.org/docs/api/web-contents)

------



### dialog

> 显示用于打开和保存文件、警报等的本机系统对话框。

线程：[主线程](https://electronjs.org/docs/glossary#main-process)

显示用于选择多个文件和目录的对话框的示例:

```javascript
const { dialog } = require('electron')
console.log(dialog.showOpenDialog({ properties: ['openFile', 'openDirectory', 'multiSelections'] }))
```

这个对话框是从Electron的主线程上打开的。如果要使用渲染器进程中的对话框对象, 可以使用remote来获得:

```javascript
const { dialog } = require('electron').remote
console.log(dialog)Copy
```



#### 更多

相关dialog信息请参照[dialog](https://electronjs.org/docs/api/dialog)