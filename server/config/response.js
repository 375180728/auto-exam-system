const _ = require('lodash')

function FAILED(result, messages){
  return { messages: messages, status: result.status, error: result.error, timestamp: new Date().getTime() };
}

function SUCCESS(data, messages = ['success']) {
  return _.merge({ messages: messages, data: data }, { status: 10000, timestamp: new Date().getTime() });
}

module.exports.FAILED = FAILED;
module.exports.SUCCESS = SUCCESS;
module.exports.CALLBACK = (req, res, next) => res.json(res.result);
