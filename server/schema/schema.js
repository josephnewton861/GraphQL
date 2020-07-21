const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString } = graphql;

const EventType = new GraphQLObjectType({
  name: "Event",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    category: { type: GraphQLString },
  }),
});

const RootQuery = GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    event: {
      type: EventType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // code to get data from db or other source
      },
    },
  },
});
