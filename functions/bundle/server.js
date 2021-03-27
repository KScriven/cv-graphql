const ApolloServer = require('apollo-server').ApolloServer
const ApolloServerLambda = require('apollo-server-lambda').ApolloServer
const { gql } = require('apollo-server-lambda');
const contact = require('../../assets/contact.json')

const typeDefs = gql`
  type Query {
    hello: String 
    emailAddress: String
    contactComment: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hi! With love from Kerryn Scriven",
    emailAddress: () => contact.email_address,
    contactComment: () => contact.contact_comments
  }
};

function createLambdaServer() {
  return new ApolloServerLambda({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
  });
}

function createLocalServer() {
  return new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
  });
}

module.exports = {
  createLambdaServer,
  createLocalServer
}