import { gql } from "@apollo/client";

const GET_ITEMS = gql`
  query Query {
    showItems {
      id
      name
      description
      price
      imgUrl
      userMongoDbId
      CategoryId
      Category {
        id
        name
      }
      Ingredients {
        id
        ItemId
        name
      }
    }
  }
`;



const GET_ITEM = gql`
  query Query($showItemDetailId: ID!) {
    showItemDetail(id: $showItemDetailId) {
      id
      name
      description
      price
      imgUrl
      userMongoDbId
      CategoryId
      Category {
        id
        name
      }
      Ingredients {
        id
        ItemId
        name
      }
      User {
        _id
        username
        email
        role
        phoneNumber
        address
      }
    }
  }
`;

export { GET_ITEMS, GET_ITEM };