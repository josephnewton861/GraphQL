const graphql = require("graphql");
const _ = require("lodash");

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const events = [
  {
    name: "Glastonbury",
    category: "Music",
    id: "1",
  },
  {
    name: "Champions League",
    category: "Sport",
    id: "2",
  },
  {
    name: "Russel Howard",
    category: "Entertainment",
    id: "3",
  },
  {
    name: "Superbowl",
    category: "Sport",
    id: "4",
  },
  {
    name: "Bastille",
    category: "Music",
    id: "5",
  },
  {
    name: "Shrek's Adventure",
    category: "Entertainment",
    id: "6",
  },
];

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

module.exports = new GraphQLSchema({ query: RootQuery });
