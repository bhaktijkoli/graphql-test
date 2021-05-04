const express = require('express')
const bodyParser = require('body-parser')
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

const app = express()

app.use(bodyParser.json())

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
    hello: () => {
        return 'Hello world!';
    },
};

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.listen(3000);