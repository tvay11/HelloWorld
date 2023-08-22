const EasyGraphQLTester = require("easygraphql-tester");
const schema = require("../graphql/schema")

describe('Queries', () => {
			let tester
			beforeAll(() => {
			    tester = new EasyGraphQLTester(schema)
			})
            const query = function(id, title, locations) 
            {
                return `
                mutation
                {
                    createPreset(id: "${id}", title: "${title}", locations: ${JSON.stringify(locations)}) 
                    {
                        title
                    }
                }
	           
	        `};
			
			test('createPreset of a user', () => {
            const id = "0"
            const title = "California";
            const locations = ["CA1", "CA2"];
	        const validQuery = query(id,title,locations);
	        tester.test(true, validQuery)
	    })

      test('Invalid createPreset of a user because of wrongType', () => {
            const id = "0"
            const title = "California";
            const locations = 3;
	        const invalidQuery =query(id, title,locations); 
	        tester.graphql(invalidQuery, undefined)
            .catch(err => true)
	    })
})