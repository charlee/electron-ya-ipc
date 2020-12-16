Yet Another IPC helper for Electron
=====================================

## Install

```
npm install electron-ya-ipc
```

or

```
yarn add electron-ya-ipc
```


## Usage

This helper does some heavy lift for you when doing IPC calls in the renderer process.
Usually, you have to write the following code with native IPC:

```
// in main process with native IPC
ipcMain.on('get_media_info', (event, ...args) => {
  const filepath = args[0];
  getMediaInfo(filepath).then(info =>{
    event.reply('get_media_info.reply', info);
  });
});

// in renderer process with native IPC
export const getMediaInfo = (filepath: string) => {
  return new Promise((resolve, reject) => {

    ipcRenderer.once('get_media_info.reply', (event, info) => {
      resolve(info);
    });

    ipcRenderer.send('get_media_info', filepath);
  })
}
```

However with `electron-ya-ipc`, you can simply do:

```
// in main process with `electron-ya-ipc`
const { ipcMain } = require('electron-ya-ipc');
ipcMain.on('my_channel', async (book_id) => {
  // the handler must be an async function, or return a promise
  const bookInfo = await getBookInfo(book_id);
  return bookInfo;
}) ;


// in renderer process with `electron-ya-ipc`
const { ipcRenderer } = require('electron-ya-ipc');
ipcRenderer.send('my_channel', book_id);
```
