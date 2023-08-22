const {gql } = require('apollo-server-express');
const typeDefs = gql`
    type Preset{
      title: String!
      locations: [String]
    }

    type User {
        id: String!
        presets: [Preset] 
   }

   type Mutation{
      createPreset(id: String!, title: String!, locations: [String]): Preset
      deletePreset(id: String!, index: Int!): Int
      editPreset(id: String!, index: Int!, title: String!, locations: [String]): Preset
      
   }
    type Query {
    getUserPresets(id: String!): [Preset]

  }
`
module.exports = typeDefs;
