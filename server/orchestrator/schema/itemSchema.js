const axios = require("axios")
const urlItem = "https://taco-bell-app.herokuapp.com/items"
const urlUser = "https://taco-bell-user.herokuapp.com/users"

const redis = require("../config/redis");

const itemTypeDefs = `#graphql

type Category {
  id: ID
  name: String
}

type Ingredients {
  id: ID
  ItemId: ID
  name: String
}

input ingredientArray {
  name: String
}

type User {
  _id: String
  username: String
  email: String
  role: String
  phoneNumber: String
  address: String
}

type Item {
  id: ID
  name: String
  description: String
  price: Int
  imgUrl: String
  userMongoDbId: ID
  CategoryId: ID
  Category: Category
  Ingredients: [Ingredients]
  User: User
}

input addItem {
  name: String
  description: String
  price: Int
  imgUrl: String
  userMongoDbId: ID
  CategoryId: ID
  ingredients: [ingredientArray]
}

type Message {
  msg: String
}

type Query {
  showItems: [Item]
  showItemDetail(id: ID!): Item
  addItem( itemInput: addItem ): Message
  editItem( itemInput: addItem, id: ID! ): Message
  deleteItem( id: ID! ): Message
}
`

const itemResolvers = {
  Query: {
    showItems: async () => {
      try {
        const itemsCache = await redis.get("app:items");
        if (itemsCache) {
          const data = JSON.parse(itemsCache);
          return data;
        }
        const { data } = await axios.get(urlItem);
        await redis.set("app:items", JSON.stringify(data));
        return data;
      } catch (error) {
        console.log(error)
      }
    },
    showItemDetail: async (_, args) => {
      try {
        const { id } = args;
        const { data } = await axios.get(`${urlItem}/${id}`);
        console.log(data);
        const { data: User } = await axios.get(`${urlUser}/${data.userMongoDbId}`);
        data.User = User;
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    addItem: async (_, args) => {
      try {
        const { itemInput } = args;
        const { data } = await axios.post(urlItem, itemInput);
        await redis.del("app:items");
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    editItem: async (_, args) => {
      try {
        const { itemInput, id } = args;
        const { data } = await axios.put(`${urlItem}/${id}`, itemInput);
        await redis.del("app:items");
        return data;
      } catch (error) {
        console.log(error)
      }
    },
    deleteItem: async (_, args) => {
      try {
        const { id } = args;
        const { data } = await axios.delete(`${urlItem}/${id}`);
        await redis.del("app:items");
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  }
}

module.exports = {itemTypeDefs, itemResolvers}