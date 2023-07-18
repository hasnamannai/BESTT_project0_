import {ApolloProvider, ApolloClient, InMemoryCache} from'@apollo/client';
import Users from './components/Users';
//import Entreprises from './components/Entreprises';



const client= new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(), 
})

function App() {
  return (
    <>
      <ApolloProvider client= {client}>
      <div className="container">
        <Users/> 
      </div>
      </ApolloProvider>
    </>
    
  );
}

export default App;
