const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
} = graphql;

const events = [
  {
    name: "Glastonbury",
    category: "Music",
    id: "1",
    promoterId: "1",
  },
  {
    name: "Champions League",
    category: "Sport",
    id: "2",
    promoterId: "2",
  },
  {
    name: "Russel Howard",
    category: "Entertainment",
    id: "3",
    promoterId: "3",
  },
  {
    name: "Superbowl",
    category: "Sport",
    id: "4",
    promoterId: "2",
  },
  {
    name: "Bastille",
    category: "Music",
    id: "5",
    promoterId: "1",
  },
  {
    name: "Shrek's Adventure",
    category: "Entertainment",
    id: "6",
    promoterId: "3",
  },
];

const promoters = [
  { name: "Acapella Events", ceo: "John Waterman", id: "1" },
  { name: "Everything sports", ceo: "Bud Holdness", id: "2" },
  { name: "Dream Events", ceo: "Susan Barnes", id: "3" },
];

const EventType = new GraphQLObjectType({
  name: "Event",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    category: { type: GraphQLString },
    promoter: {
      type: PromoterType,
      resolve(parent, args) {
        return _.find(promoters, { id: parent.promoterId });
      },
    },
  }),
});

const PromoterType = new GraphQLObjectType({
  name: "Promoter",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    ceo: { type: GraphQLString },
    events: {
      type: new GraphQLList(EventType),
      resolve(parent, args) {
        // console.log(parent);
        return _.filter(events, { promoterId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    event: {
      type: EventType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db or other source
        return _.find(events, { id: args.id });
      },
    },
    promoter: {
      type: PromoterType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(promoters, { id: args.id });
      },
    },
    events: {
      type: new GraphQLList(EventType),
      resolve(parent, args) {
        return events;
      },
    },
    promoters: {
      type: new GraphQLList(PromoterType),
      resolve(parent, args) {
        return promoters;
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery });
