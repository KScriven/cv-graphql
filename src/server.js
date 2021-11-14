const ApolloServer = require('apollo-server').ApolloServer
const ApolloServerLambda = require('apollo-server-lambda').ApolloServer
const { gql } = require('apollo-server-lambda');
const { getCVdata } = require('./cv')
const { getAllBlogs } = require('./blogs')

const blogStory = [
  {
    "intro": "why I decided to learn to code",
    "myBiggestTakeAways": "myBiggestTakeAways",
    "theDailyGrind": "theDailyGrind",
    "theThingsILove": "theThingsILove",
    "theThingsIDisLike": "theThingsIDislike",
    "interestingFacts": "interestingFacts"
  },

  {
    "intro": "netlify, react, graphql and simple htmls",
    "myBiggestTakeAways": "myBiggestTakeAways",
    "theDailyGrind": "theDailyGrind",
    "theThingsILove": "theThingsILove",
    "theThingsIDisLike": "theThingsIDislike",
    "interestingFacts": "interestingFacts"
  }
];

const cvData = {
  "intro": "software engineer, analogue women in a complex digital world, working and learning to code",
  "emailAddress": "kerryn.lloyd@gmail.com",
  "contact_comments": "If you'd like to keep in touch, you're most welcome to send an email, I don't always get the chance to respond, but email is always the best way to get in touch.",
  "college": "Cape College, Cape Town",
  "diploma": "N3 National Diploma in Business Practices",
  "currentJobStatus": "full time contract",
  "currnetJobTitle": "Software Engineer",
  "currentEmployer": "BBC",
  "currentStartDate": "01-05-2019",
  "currentMainResponsibilities": "full stack engineer focussing on reactJS and nodeJS services",
  "previousJobStatus": "full time contract",
  "previousJobTitle": "Junior Software Engineer",
  "previousEmployer": "BBC",
  "previousStartDate": "01-09-2018",
  "mainResponsibilities": "backend engineer focussing on Laravel framework supporting a monolithic PHP API",
  "jobStatus": "full time contract",
  "jobTitle": "Junior Software Engineer",
  "employer": "BBC Academy",
  "startDate": "01-04-2017",
  "roleResponsibilities": "supporting a nodeJS website, running on AWS infrastructure",
  "olderJobStatus": "full time contract",
  "olderJobTitle": "Solutions Architect",
  "olderEmployer": "SCC",
  "olderStartDate": "01-03-2009",
  "olderRoleResponsibilities": "worked with commercial clients in designing, installing and supporting on-premise based IT solutions",
  "oldJobStatus": "full time contract",
  "oldJobTitle": "Presales Consultant",
  "oldEmployer": "ETC Distribution",
  "oldStartDate": "01-03-1999",
  "oldRoleResponsibilities": "supported clients maintaining on their IT on premise solutions",
  "currentProgrammingLanguages": "php, nodeJS, reactJS, HTML and CSS",
  "hobbies": "recently found a love of japanese food, so I tend to eat and cook a lot of it.  i trained and recently ran a half marathon.  i am an avid reader",
  "linkedIn": "https://www.linkedin.com/in/kerrynscriven/",
  "playerStatus": "employed",
  "playerMood": "engaged",
  "likes": "Yoga, swimming and eating japanese food",
  "dislikes": "Loud people, feeling undermined and meat"
}


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
    emailAddress: () => {
      const data = getCVdata(cvData)

      return data.emailAddress;
    },
    // employment: () => cv.mainResponsibilities,
    // hobbies: () => cv.hobbies,
    intro: () => {
      const data = getCVdata(cvData)

      return data.intro;
    },
    linkedIn: () => {
      const data = getCVdata(cvData)

      return data.linkedIn;
    },
    blogs: () => {
      const blogResults = getAllBlogs(blogStory)

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