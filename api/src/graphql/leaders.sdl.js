export const schema = gql`
  type Leader {
    id: String!
    firstName: String!
    lastName: String!
    amount: Int!
    email: String!
  }

  type Query {
    leaders: [Leader!]!
    leader(id: String!): Leader
  }

  type ClientSecret {
    clientSecret: String!
  }

  type Verified {
    verified: Boolean!
  }

  input CreateLeaderInput {
    firstName: String!
    lastName: String!
    email: String!
  }

  input UpdateLeaderInput {
    firstName: String
    lastName: String
    amount: Int
    email: String
  }

  type Mutation {
    createLeader(input: CreateLeaderInput!): Leader!
    updateLeader(id: String!, input: UpdateLeaderInput!): Leader!
    deleteLeader(id: String!): Leader!
    createPaymentIntent(amount: Int!): ClientSecret!
    verifyPayment(amount: Int!): Verified!
  }
`
