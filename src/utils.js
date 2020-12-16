const CHANNEL_PREFIX = 'electron-ya-ipc';

function randomString() {
  return Math.random().toString(36).substring(7);
}

function getSendChannel(channel) {
  return `${CHANNEL_PREFIX}:${channel}`;
}

function getResponseChannel(channel) {
  return `${getSendChannel(channel)}:response:${randomString()}`;
}

module.exports = {
  getSendChannel,
  getResponseChannel,
};
