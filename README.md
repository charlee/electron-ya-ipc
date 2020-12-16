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
ipcMain.on('get_book_info', (event, ...args) => {
  const filepath = args[0];
  getBookInfo(filepath).then(info =>{
    event.reply('get_book_info.reply', info);
  });
});

// in renderer process with native IPC
export const getBookInfo = (book_id) => {
  return new Promise((resolve, reject) => {

    ipcRenderer.once('get_book_info.reply', (event, info) => {
      resolve(info);
    });

    ipcRenderer.send('get_book_info', book_id);
  })
}
```

However with `electron-ya-ipc`, you can simply do:

```
// in main process with `electron-ya-ipc`
const { ipcMain } = require('electron-ya-ipc');
ipcMain.on('get_book_info', async (book_id) => {
  // the handler must be an async function, or return a promise
  const bookInfo = await getBookInfo(book_id);
  return bookInfo;
}) ;


// in renderer process with `electron-ya-ipc`
const { ipcRenderer } = require('electron-ya-ipc');
ipcRenderer.send('get_book_info', book_id);
```
