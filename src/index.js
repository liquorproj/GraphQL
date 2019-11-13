const { GraphQLServer } = require("graphql-yoga");

let links = [
	{
		id: "link-0",
		url: "www.howtographql.com",
		description: "Fullstack tutorial for GraphQL"
	},
	{
		id: "1",
		url: "a",
		description: "b"
	}
];

let idCount = links.length;
const resolvers = {
	Query: {
		info: () => `This is the API of a Hackernews Clone`,
		feed: () => links,
		link: (parent, args) => {
			const link = links.find(el => el.id === args.id);
			return link;
		}
	},

	Mutation: {
		post: (parent, args) => {
			const link = {
				id: `link-${idCount++}`,
				description: args.description,
				url: args.url
			};
			links.push(link);
			return link;
		},

		updateLink: (parent, args) => {
			let { id, url, description } = args;
			const link = links.find(el => el.id === id);
			if (url) link.url = url;
			if (description) link.description = description;
			return link;

			// let { id, url, description } = args;
			// let link = links.find(el => el.id === id);
			// let index = links.findIndex(el => el.id === id);
			// if (url) link[url] = url;
			// if (description) link[description] = description;
			// links[index] = link;
			// return link;
		}
	}

	// Link: {
	// 	id: parent => parent.id,
	// 	description: parent => parent.description,
	// 	url: parent => parent.url
	// }
};

const server = new GraphQLServer({
	typeDefs: "./src/schema.graphql",
	resolvers
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
