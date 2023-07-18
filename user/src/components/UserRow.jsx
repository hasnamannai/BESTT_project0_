import {FaTrash} from 'react-icons/fa';
import { useMutation } from '@apollo/client';
//import {GET_USERS} from '../queries/UserQueries'
import {DELETE_USER} from './mutations/userMutations';
export default function UserRow({user}){
    const [delete_user]=useMutation(DELETE_USER,{
        variables:{id: user.id},
    });
    return (
        <tr>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.passeword}</td>
            <td>
                <button className="btn btn-danger btn-sm" onClick={delete_user}>
                    <FaTrash/>
                </button>
            </td>
        </tr>
    );
}


