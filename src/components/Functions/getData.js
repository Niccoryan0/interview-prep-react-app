async function fetchData(route) {
  let url = 'https://interviewprepapp.azurewebsites.net/api/' + route;
  fetch(url, {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': "*",
    }
  }).then(res => res.json())
  .then(results => {
    return results;
  })
}

export default fetchData;