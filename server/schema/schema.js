/*const {users,entreprises}=require('../data.js');
const{GraphQLObjectType,GraphQLID,GraphQLString,GraphQLSchema,GraphQLList}=require('graphql');
// user type
let UserType=new GraphQLObjectType({
    name:'user',
    fields:()=>({
        
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        email:{type:GraphQLString}

    })
});
//entreprise type
let EntrepriseType=new GraphQLObjectType({
    name:'entreprise',
    fields:()=>({
        
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        status:{type:GraphQLString}
        
    })
});
const RootQuery=new GraphQLObjectType({
    name:"RootQuery",
    fields:{
        users:{
            type: new GraphQLList(UserType),
            resolve(parentValue,args){
                return users;

        },
        user: {
            type: UserType,
            args:{id:{type: GraphQLID}},
            resolve(parentValue,args){
                return users.find(user=>user.id ===args.id); // just returning the first element of array as we have only one data
            }
        },
        entreprises:{
            type: new GraphQLList(EntrepriseType),
            resolve(parentValue,args){
                return entreprises;

        },
        entreprise:{
            type: EntrepriseType,
            resolve(parentValue,args){
                return entreprises.find(entreprise=>entreprise.id ===args.id); // just returning the first element of array as we have only one data
            }
        }
    }
}
}

})
module.exports=new GraphQLSchema({
    query: RootQuery
});
*/
const { users, entreprises } = require('../data.js');

const user= require('../models/users.js')
const entreprise= require('../models/entreprise.js')

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList } = require('graphql');

// user type
let UserType = new GraphQLObjectType({
  name: 'user',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    passeword:{type: GraphQLString},
  })
});

// entreprise type
let EntrepriseType = new GraphQLObjectType({
  name: 'entreprise',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    adresse: {type: GraphQLString},
    phone:{type: GraphQLString},
    user:{
        type : UserType,
        resolve(parentValue,args){
          return users.find(user=>user.id===parentValue.userId);

    }

  }
})
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return users;
      }
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) {
        return users.find(user => user.id === args.id);
      }
    },
    entreprises: {
      type: new GraphQLList(EntrepriseType),
      resolve(parentValue, args) {
        return entreprises;
      }
    },
    entreprise: {
      type: EntrepriseType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) {
        return entreprises.find(entreprise => entreprise.id === args.id);
      }
    }
  }
});
//mutations


module.exports = new GraphQLSchema({
  query: RootQuery
});

