const graphql = require('graphql');
const axios = require('axios');
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType', // it is what points us to a very particular record in database
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } }, // if you're looking for a user and give me the id I'll give you back the user
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/users/${args.id}`)
          .then((resp) => resp.data); // {data: {firstName: 'bill'}}
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
