const ApolloServer = require('apollo-server').ApolloServer
const ApolloServerLambda = require('apollo-server-lambda').ApolloServer
const { gql } = require('apollo-server-lambda');
const achievements = require('../assets/achievements.json')
const contact = require('../assets/contact.json');
const education = require('../assets/education.json');
const employment = require('../assets/employment.json');
const hobbies = require('../assets/hobbies.json');
const technology = require('../assets/technology.json')

const typeDefs = gql`
  type Query {
    hello: String 
    college: String
    contactComment: String
    diploma: String
    emailAddress: String
    employment: String
    hobbies: String
    technology: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Created with graphQL by Kerryn Scriven",
    achievements: () => 'To be completed',
    college: () => education.college,
    contactComment: () => contact.contact_comments,
    diploma: () => education.diploma,
    emailAddress: () => contact.email_address,
    employment: () => employment,
    hobbies: () => hobbies.now,
    technology: () => technology.currentProgrammingLanguages,
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