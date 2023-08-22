const EasyGraphQLTester = require("easygraphql-tester");
const schema = require("../graphql/schema")

describe('Queries', () => {
			let tester
			beforeAll(() => {
			    tester = new EasyGraphQLTester(schema)
			})
            const query = function(id, index, title, locations) 
            {
                return `
                mutation{
                    editPreset(id: "${id}", index: ${index}, title: "${title}", locations: ${JSON.stringify(locations)}) {
                            title
                    }

                }
	           
	        `};
			
			test('editPreset of a user', () => {
            const id = "0"
            const index = 3;
            const title = "California";
            const locations = ["CA1", "CA2"];
	        const validQuery = query(id,index, title,locations);
	        tester.test(true, validQuery)
	    })

      test('Invalid editPreset of a user because of wrongType', () => {
            const id = "0"
            const index = 3;
            const title = "California";
            const locations = ["CA1", 3];
	        const invalidQuery =query(id, index, title,locations); 
	        tester.graphql(invalidQuery, undefined)
            .catch(err => true)
	    })
})