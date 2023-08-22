async function editPreset(id, index, title, locations) {
  const query = `
    mutation {
      editPreset(id: "${id}", index: ${index}, title: "${title}", locations: ${JSON.stringify(locations)}) {
        title
      }
    }
  `;
  
  const response = await fetch('http://127.0.0.1:5001/flight-project-1a1b6/us-central1/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });
  
  const { data, errors } = await response.json();
  
  if (errors) {
    throw new Error(errors[0].message);
  }
  
  return data.editPreset;
}

//module.exports = editPreset;
export default editPreset;
