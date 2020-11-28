const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
});

const users = [
  { id: '23', firstName: 'Bill', age: 20 },
  { id: '47', firstName: 'Samantha', age: 21 },
];

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType', // it is what points us to a very particular record in database
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } }, // if you're looking for a user and give me the id I'll give you back the user
      resolve(parentValue, args) {
        return _.find(users, { id: args.id }); //lodash helper, walk through users and find first with given id
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
