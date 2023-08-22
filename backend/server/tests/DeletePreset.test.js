const EasyGraphQLTester = require("easygraphql-tester");
const schema = require("../graphql/schema")

describe('Queries', () => {
			let tester
			beforeAll(() => {
			    tester = new EasyGraphQLTester(schema)
			})
            const query = function(id, index) 
            {
                return `
                mutation{
                    deletePreset(id: "${id}", index: ${index}) 
                    

                }
	           
	        `};
			
			test('valid deletePreset of a user', () => {
            const id = "0"
            const index = 3;
	        const validQuery = query(id,index);
	        tester.test(true, validQuery)
	    })

      test('Invalid deletePreset of a user because of wrongType', () => {
            const id = "0"
            const index = 3;
	        const invalidQuery =query(id, index); 
	        tester.graphql(invalidQuery, undefined)
            .catch(err => true)
	    })

    test("invalid deletePreset query trying to get a field of deleted Preset",() => {
           const invalidQuery = `
           mutation{
                    deletePreset(id: "23", index: 0) 
                  title 
                }
	           
	        ` 
	        tester.graphql(invalidQuery, undefined)
            .catch(err => true)
	    })
})