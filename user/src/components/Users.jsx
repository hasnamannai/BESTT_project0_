import {useQuery} from '@apollo/client' //gql used to make queries
import UserRow from './UserRow'
import Spinner from './Spinner';
import { GET_USERS } from '../queries/UserQueries';


export default function Users() {
    const {loading, error, data} =useQuery(GET_USERS)
    if(loading) return <Spinner/>;
    if(error)return <p>Something went wrong</p>;
    
    return (
        <>
          {!loading && !error && (
            <table className='table table-hover mt-3'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.users.map((user) => (
                  <UserRow key={user.id} user={user} />
                ))}
              </tbody>
            </table>
          )}
        </>
      );
  
}
