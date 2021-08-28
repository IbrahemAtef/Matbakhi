const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const secretKey = config.get("jwtSecret");
const connectDB = require("./database/index");
connectDB();

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLBoolean,
} = require("graphql");

const UserModel = require("./models/User");
const RecipeModel = require("./models/Recipe");
const SavedRecipesModel = require("./models/SavedRecipes");
const SavedCheifsModel = require("./models/SavedCheifs");

const UserType = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    id: { type: GraphQLString, unique: true },
    username: { type: GraphQLString },
    email: { type: GraphQLString, unique: true },
    password: { type: GraphQLString },
    type: { type: GraphQLString },
    picture: { type: GraphQLString },
    recipes: {
      type: new GraphQLList(RecipeType),
      async resolve(root, args) {
        return await RecipeModel.find({ cheifID: root.id });
      },
    },
  }),
});

const RecipeType = new GraphQLObjectType({
  name: "recipe",
  fields: () => ({
    id: { type: GraphQLString, unique: true },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    ingredients: { type: new GraphQLList(GraphQLString) },
    steps: { type: new GraphQLList(GraphQLString) },
    image: { type: GraphQLString },
    type: { type: GraphQLString },
    cheifID: { type: GraphQLString },
  }),
});

const SavedRecipeType = new GraphQLObjectType({
  name: "favRecipes",
  fields: () => ({
    id: { type: GraphQLString, unique: true },
    userID: { type: GraphQLString },
    recipeID: { type: GraphQLString },
  }),
});

const SavedCheifsType = new GraphQLObjectType({
  name: "favCheifs",
  fields: () => ({
    id: { type: GraphQLString, unique: true },
    userID: { type: GraphQLString },
    cheifID: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getUserByEmail: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(root, args) {
        return await UserModel.findOne({ email: args.email });
      },
    },
    recipe: {
      type: RecipeType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(root, args) {
        return await RecipeModel.findOne({ _id: args.id });
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    login: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(root, args) {
        //login
        try {
          const data = await UserModel.findOne({ email: args.email });
          if (data.password) {
            if (await bcrypt.compare(args.password, data.password)) {
              return await UserModel.findOne({ email: args.email });
            }
          } else {
            console.log("invalid username or password");
          }
        } catch (err) {
          console.log(err);
        }
      },
    },
    addUser: {
      type: UserType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        type: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(root, args) {
        // add user with crpted password to database
        args.password = await bcrypt.hash(args.password, 10);
        args._id = (await UserModel.countDocuments()) + 1;
        const user = new UserModel(args);
        return await user.save();
      },
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(root, args) {
        return await UserModel.deleteOne({ _id: args.id });
      },
    },
    editUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        type: { type: GraphQLString },
        picture: { type: GraphQLString },
      },
      async resolve(root, args) {
        if (args.password) {
          args.password = await bcrypt.hash(args.password, 10);
        }
        return await UserModel.updateOne({ _id: args.id }, args);
      },
    },
    addRecipe: {
      type: RecipeType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        ingredients: {
          type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
        },
        steps: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
        image: { type: new GraphQLNonNull(GraphQLString) },
        type: { type: new GraphQLNonNull(GraphQLString) },
        cheifID: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(root, args) {
        args._id = (await RecipeModel.countDocuments()) + 1;
        const recipe = new RecipeModel(args);
        return await recipe.save();
      },
    },
    deleteRecipe: {
      type: RecipeType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(root, args) {
        return await RecipeModel.deleteOne({ _id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
