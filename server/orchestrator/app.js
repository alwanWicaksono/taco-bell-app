const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { itemResolvers, itemTypeDefs } = require("./schema/itemSchema");

const server = new ApolloServer({
  typeDefs: itemTypeDefs,
  resolvers: itemResolvers,
});

startStandaloneServer(server, {
  listen: {
    port: process.env.PORT || 4000,
  },
}).then(({ url }) => console.log(`Server ready at: ${url}`));