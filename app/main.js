const{ app, BrowserWindow,dialog } = require('electron');
const fs = require('fs');

//在顶层声明mainWindow，以便在“ready”事件完成后不会将其回收为垃圾
let mainWindow = null;

app.on('ready', () => {
    //使用默认属性创建一个新的BrowserWindow
    mainWindow = new BrowserWindow({
        show: false,
        webPreferences: {
            // webPreferences中的nodeIntegrationInWorker选项设置为true,Electron5.x以后,缺省为false
            nodeIntegration: true
        }
    })

    //在刚才创建的BrowserWindow实例中加载app/index.html
    mainWindow.loadFile('app/index.html');

    mainWindow.once('ready-to-show', () => {
        //当DOM就绪时显示窗口。
        mainWindow.show();
    });

    mainWindow.on('closed', () => {
        //在窗口关闭时将进程设置为null
        mainWindow = null;
    });
});

const getFileFromUser  = exports.getFileFromUser   = () => {
    const files = dialog.showOpenDialog(mainWindow, {
      properties: ['openFile'],
      filters: [
        { name: 'Text Files', extensions: ['txt'] },
        { name: 'Markdown Files', extensions: ['md', 'markdown'] }
      ]
    });
  
    if (files) { openFile(files[0]); } // A
  };
  
  const openFile = (file) => {
    const content = fs.readFileSync(file).toString();
    mainWindow.webContents.send('file-opened', file, content); // B
  };