function parseJSON(response) {
  return response.text();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function request(type, body, url) {
  const fetchOptions = {
    method: type,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  if (type === 'GET') {
    fetchOptions.params = JSON.stringify(body);
  } else {
    fetchOptions.body = JSON.stringify(body);
  }

  return fetch(url, fetchOptions)
  .then(checkStatus)
  .then(parseJSON)
  .then(data => ({ data }))
  .catch(err => ({ error: err.response }));
}

export default {
  request,
};
