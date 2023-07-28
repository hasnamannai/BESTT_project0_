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

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull } = require('graphql');

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
          return user.findById(user=>user.id===parentValue.userId);

    }

  }
}),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return user.find();
      }
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) {
        return user.findById(args.id)
        //return users.find(user => user.id === args.id);
      }
    },
    entreprises: {
      type: new GraphQLList(EntrepriseType),
      resolve(parentValue, args) {
        return entreprise.find();
      }
    },
    entreprise: {
      type: EntrepriseType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) {
        return entreprise.findById(args.id)
        //return entreprises.find(entreprise => entreprise.id === args.id);
      }
    }
  }
});
//mutations

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    //create user
    createUser :{
      type: UserType,
      args:{
        name: {type: GraphQLNonNull(GraphQLString)},
        email :{type: GraphQLNonNull(GraphQLString)},
        password: {type: GraphQLNonNull(GraphQLString)},        
      },
      async resolve(parentValue, args) {
        const existingEmail = await user.findOne({ email: args.email });
        if (existingEmail) {
          throw new Error("Email existe déjà.");
        }
    

        const newUser = new user({
          name: args.name,
          email: args.email,
          passeword: args.password,
        });

        return newUser.save();

      },
    },



/*
    createUser: {
      type: UserType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        passeword: { type: GraphQLNonNull(GraphQLString)},
      },
      resolve(parentValue, args) {
        const { name, email, passeword } = args;
        const existEmail = users.some((item) => item.email === email);
        
        if (existEmail) {
          throw new Error('This email is already taken');
        } else {
          const newUser = new user({
            name,
            email,
            passeword,
          });
          
          users.push(newUser);
          console.log('Created successfully');
          
          return newUser.save();
        }
      },
    },
    */
    // delete user
    deleteUser :{
      type: UserType,
      args:{
        id: {type: GraphQLNonNull(GraphQLID)},
      },
      resolve(parentValue,args){
        return user.findByIdAndRemove(args.id);
      }

    },
    
    //update user
    updateUser:{
      type: UserType,
      args: {
        id:{type: GraphQLNonNull(GraphQLID)},
        name: {type: GraphQLNonNull(GraphQLString)},
        email:{type: GraphQLNonNull(GraphQLString)},
        passeword:{type: GraphQLNonNull(GraphQLString)},
        
    },
    resolve(parentValue,args){
      return user.findByIdAndUpdate(
        args.id,
        {
          $set:{
            name:args.name,
            email:args.email,
            passeword:args.passeword,
            
          }
        },
        {new : true}//if the user doesn't exist it will create a new one  
      )}
    },
    //create entreprise
    createEntreprise :{
      type: EntrepriseType,
      args:{
        name_entreprise: {type: GraphQLNonNull(GraphQLString)},
        email :{type: GraphQLNonNull(GraphQLString)},
        adresse: {type: GraphQLNonNull(GraphQLString)},        
        phone:  {type: GraphQLNonNull(GraphQLString)},
        userId :{type : GraphQLNonNull(GraphQLID)},

      },
      async resolve(parentValue, args) {
        // Vérifier si une entreprise avec le même nom existe déjà
        const existingEntreprise = await entreprise.findOne({ name: args.name_entreprise });
        if (existingEntreprise) {
          throw new Error("Une entreprise avec ce nom existe déjà.");
        }
    
        const newEntreprise = new entreprise({
          name: args.name_entreprise,
          email: args.email,
          adresse: args.adresse,
          phone: args.phone,
          userId: args.userId,
        });

        return newEntreprise.save();

      },
    },
    //delete entreprise
    deleteEntreprise: {
      type: EntrepriseType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID)},
        },
        resolve(parentValue,args){
          return entreprise.findByIdAndRemove(args.id);
        },
      },
      //update entreprise
      updateEntreprise:{
        type: EntrepriseType,
        args: {
          id:{type: GraphQLNonNull(GraphQLID)},
          name: {type: GraphQLNonNull(GraphQLString)},
          email:{type: GraphQLNonNull(GraphQLString)},
          adresse:{type: GraphQLNonNull(GraphQLString)},
          phone:{type: GraphQLNonNull(GraphQLString)},
      },
      resolve(parentValue,args){
        return entreprise.findByIdAndUpdate(
          args.id,
          {
            $set:{
              name:args.name,
              email:args.email,
              adresse:args.adresse,
              phone:args.phone,
            }
          },
          {new : true}//if the entreprise doesn't exist it will create a new one  
        )}
    }

  },
});



module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,

});

