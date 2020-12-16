
export type RemoveHandlerFunc = () => void;

export type IpcMain = {
  on: <P, R>(
    channel: string,
    callback: (...args: P) => Promise<R>,
  ) => RemoveHandlerFunc;
}

export type IpcRenderer = {
  send: <P, R>(channel: string, ...args: P) => Promise<R>;
}

export const ipcMain: IpcMain;
export const ipcRenderer: IpcRenderer;
