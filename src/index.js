const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: (root, args, context, info) => {
      return context.prisma.links();
    }
  },
  Mutation: {
    post: (root, args, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description
      });
    }
  }
};

// updateLink: (parent, args) => {
//   let { id, url, description } = args;
//   const link = links.find(el => el.id === id);
//   if (url) link.url = url;
//   if (description) link.description = description;
//   return link;

// deleteLink: (parent, args) => {
//   let { id } = args;
//   if (id) links = links.filter(el => el.id !== id);
//   return links;
// }

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: { prisma }
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
