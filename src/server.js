const ApolloServer = require('apollo-server').ApolloServer
const ApolloServerLambda = require('apollo-server-lambda').ApolloServer
const { gql } = require('apollo-server-lambda');
const cv = require('./cv.json')

const typeDefs = gql`
  type Query {
    hello: String 
    achievements: String
    college: String
    contact: String
    diploma: String
    emailAddress: String
    employment: String
    hobbies: String
    intro: String
    linkedIn: String
    technology: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Created with graphQL by Kerryn Scriven",

    achievements: () => cv.status,
    college: () => cv.college,
    contact: () => cv.contact_comments,
    diploma: () => cv.diploma,
    emailAddress: () => cv.email_address,
    employment: () => cv.mainResponsibilities,
    hobbies: () => cv.hobbies,
    intro: () => cv.intro,
    linkedIn: () => cv.linkedIn,
    technology: () => cv.currentProgrammingLanguages,
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