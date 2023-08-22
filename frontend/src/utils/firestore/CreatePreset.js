function createPreset(id, title, locations) {
  const query = `mutation {
    createPreset(id: "${id}", title: "${title}", locations: ${JSON.stringify(locations)}) {
      title
    }
  }`;

  return fetch('http://127.0.0.1:5001/flight-project-1a1b6/us-central1/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  })
    .then(res => res.json())
    .then(res => res.data.createPreset)
    .catch(error => console.error(error));
}
//module.export =  createPreset;
export default createPreset;