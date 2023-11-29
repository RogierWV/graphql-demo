import { startStandaloneServer } from '@apollo/server/standalone';
import { server } from './gql/index.js'

const port = parseInt(process.env.PORT || '4000'); 

const { url } = await startStandaloneServer(server, {
    listen: { port: port },
});

console.log(`Server ready at ${url}`);