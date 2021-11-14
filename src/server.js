const ApolloServer = require('apollo-server').ApolloServer
const ApolloServerLambda = require('apollo-server-lambda').ApolloServer
const { gql } = require('apollo-server-lambda');
const cv = require('../src/cv.json')
const blogs = require('../src/blogs.json')

const typeDefs = gql`
  type Query {
    hello: String 
    emailAddress: String
    linkedIn: String
    intro: String
    blogs: [Blog]
  }

  type Blog {
    intro: String
    myBiggestTakeAways: String,
    theDailyGrind: String,
    theThingsILove: String,
    theThingsIDisLike: String,
    interestingFacts: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Created with graphQL by Kerryn Scriven",
    // playerStatus: () => player1.playerStatus,
    // playerMood: String
    // likes: String
    // dislikes: String
    // email_address: String
    // linkedIn: String
    // education: String
    // wouldLikeTo: String
    // diploma: Boolean
    // currentJobTitle: String
    // numberOfPreviousJobs: Int
    // countriesLivedIn: Int
    // college: () => cv.college,
    // contact: () => cv.contact_comments,
    // diploma: () => cv.diploma,
    emailAddress: () => cv.email_address,
    // employment: () => cv.mainResponsibilities,
    // hobbies: () => cv.hobbies,
    intro: () => cv.intro,
    linkedIn: () => cv.linkedIn,
    blogs: () => {
      let blogResults = []
      blogs.map(blog => {
        blogResults.push({
          intro: blog.intro,
          myBiggestTakeAways: blog.myBiggestTakeAways,
          theDailyGrind: blog.theDailyGrind,
          theThingsILove: blog.theThingsILove,
          theThingsIDisLike: blog.theThingsIDisLike,
          interestingFacts: blog.interestingFacts
        })
      })

      return blogResults
    }
    // technology: () => cv.currentProgrammingLanguages,
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