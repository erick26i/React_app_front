import useFetch from '../hooks/useFetch';

function GetUsers() {
  const users = useFetch('http://127.0.0.1:3000/service/users')
  return (
    <div>
      {users?.map(u=>
        <ul key={u.id}>
          {u.id}
          {u.username}
        </ul>)}
    </div>
  )
}

export default GetUsers;
