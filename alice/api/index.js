const axios = require('axios')

/**
 * [process data trought api]
 * @param  {[Object]} data [object containing text, method and arguments]
 * @param  {[String]} endpoint [one of the available api endpoint]
 * @return {[String]} [api response]
*/
async function callApi(data, endpoint) {
    let response = await axios.post(url, data);
    return response
}

// python api 
// 