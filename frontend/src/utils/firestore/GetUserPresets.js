function getUserPresets(id) {
  const query = `query {
    getUserPresets(id: "${id}") {
      title
      locations
    }
  }`;
  
  const url = `http://127.0.0.1:5001/flight-project-1a1b6/us-central1/graphql`;
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };
  
  return fetch(url + '?query=' + encodeURIComponent(query), options)
    .then(res => res.json())
    .then(res => res.data.getUserPresets);
}

//module.exports = getUserPresets;
export default getUserPresets;