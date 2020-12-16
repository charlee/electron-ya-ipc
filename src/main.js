const electron = require('electron');
const { getSendChannel } = require('./utils');


/**
 * ipcMain.listen('channel-name').then(data => {
 *   // some code...
 *   return response;
 * });
 */
function on(channel, callback) {

  // Here "sendChannel" is named from the renderer's perspective
  const sendChannel = getSendChannel(channel);

  const handler = electron.ipcMain.on(sendChannel, (event, wrappedData) => {

    const { responseChannel, args } = wrappedData;

    // call custom callback and get the response
    callback(...args).then(response => {
      // now we have the response, send it back to the renderer
      event.reply(responseChannel, response);
    });
  });

  return () => {
    electron.ipcMain.removeListener(sendChannel, handler);
  }
}

module.exports = {
  on,
}
