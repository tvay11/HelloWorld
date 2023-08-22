async function deletePreset(id, index) {
  const query = `
    mutation {
      deletePreset(id: "${id}", index: ${index}) 
    }
  `;
  
  const response = await fetch('http://127.0.0.1:5001/flight-project-1a1b6/us-central1/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });
  
  const result = await response.json();
  
  if (result.errors) {
    throw new Error(result.errors[0].message);
  }
  
  return result.data.deletePreset;
}
//module.exports = deletePreset;
export default deletePreset