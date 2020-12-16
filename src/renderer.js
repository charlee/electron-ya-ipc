const electron = require('electron');
const { getSendChannel, getResponseChannel } = require('./utils');

function send(channel, ...args) {
  return new Promise((resolve, reject) => {

    const sendChannel = getSendChannel(channel);
    const responseChannel = getResponseChannel(channel);

    const wrappedData = {
      responseChannel,
      args,
    };

    electron.ipcRenderer.once(responseChannel, (event, data) => {
      resolve(data);
    });

    electron.ipcRenderer.send(sendChannel, wrappedData);
  });
}

module.exports = {
  send,
};
