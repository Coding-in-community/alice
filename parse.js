function remove(substring) {
  return this.replace(substring, '')
}

String.prototype.remove = remove;

function parseArgs(params) {
  const pattern = /([^=]+)[\s]*=[\s]*\'([^']+)\'[\s]*(,)?/
  let matches = params.match(pattern)

  
  if (matches) {
    let foundString = matches[0]
    let key = matches[1].trim()
    let value = matches[2].trim()
    let haveAnotherParam = matches[3]
    
    if (haveAnotherParam) {
      params = params.replace(foundString, '')
      
      return {
        [key]: value,
        ...parseParams(params)
      }
    }
    
    return {
      [key]: value
    }
  }
  
  return {}
}


async function parseBody(messageObject, callback) {
  const pattern = /(#|!)([^(\s]+)(\([^)]+\))?/;
  let lowerMessageBody = messageObject.body.toLowerCase();
  let matches = lowerMessageBody.match(pattern);

  if (matches) {
    let textMsg;
    let patternFound = String(matches[0]);
    let useOwnMsg = Boolean(matches[1] === '!');
    let useAnotherMsg = Boolean(matches[1] === '#');
    let pythonMethod = String(matches[2]);
    let methodArguments = matches[3] ? 
      String(matches[3].replace(/[\(|\)]/g, '')): '';

    if (useOwnMsg) {
      textMsg = lowerMessageBody;
    }

    else if (useAnotherMsg && await messageObject.hasQuotedMsg) {
      textMsg = await messageObject.getQuotedMessage();
      textMsg = textMsg.body
    }

    else {
      textMsg = 'tilápia';
    }
    console.log(textMsg);

    textMsg = textMsg.remove(patternFound).trim();
    methodArguments = parseArgs(methodArguments)

    let parsedData = {textMsg, pythonMethod, methodArguments}

    await callback(parsedData);
  }
}

exports.parseArgs = parseArgs
exports.parseBody = parseBody
