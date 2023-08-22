const { ApolloServer} = require('apollo-server-express');

//graphql schema and resolvers
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const apollo = new ApolloServer({ typeDefs, resolvers });
module.exports = apollo;
