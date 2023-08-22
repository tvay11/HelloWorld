const EasyGraphQLTester = require("easygraphql-tester");
const schema = require("../graphql/schema")

describe('Queries', () => {
			let tester
			beforeAll(() => {
			    tester = new EasyGraphQLTester(schema)
			})
			
			test('get presets of userID. Pass if the user requests title/locations attributes of Presets', () => {
          const id = "0"
	        const query = `
	            query{
                 getUserPresets(id: "${id}"){
                        title
                        locations
	                }
                }
	        `;
	        tester.test(true, query)
	    })

      test('get presets of userID. Failed if the user requests any field that is not attribute of a Preset', () => {
	      const id = null; 
        const query = `
	            query{
                 getUserPresets(id: "${id}"){
                        uid
	                }
                }
	        `;
	        tester.test(false, query)
	    })
})