import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useGetUsersQuery } from './usersApiSlice'
import { memo } from 'react'
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const User = ({ userId }) => {

    const {user}= useGetUsersQuery('usersList', {
        selectFromResult: ({data})=>({
            user: data?.entities[userId]
        })
    })
    const navigate = useNavigate()

    if (user) {
        const handleEdit = () => navigate(`/dash/users/${userId}`)

        const userRolesString = user.roles.toString().replaceAll(',', ', ')


        let content= (
            <TableRow
              key={user.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              {user.username}
              </TableCell>
              <TableCell align="right">{userRolesString}</TableCell>
              <TableCell align="right"><button
                      
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button></TableCell>
              
            </TableRow>
     )

        return content

    } else return null
}

const memoUser=memo(User)
export default memoUser