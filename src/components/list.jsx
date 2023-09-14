import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export default function List({ selectUser, selectedUser = [] }) {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    setError(false);
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}users.json`)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <ul className='list'>
      {isError && <li className='list-item'>Ошибка загрузки</li>}
      {isLoading && <li className='list-item'>Loading...</li>}
      {users.map((item) => {
        return <li key={item.id} className={`${((selectedUser.id === item.id) ? "active" : "")} list-item`} onClick={selectUser(item)}>{item.name}</li>
      })}
    </ul>
  );
}

List.propTypes = {
  selectUser: PropTypes.func.isRequired,
  selectedUser: PropTypes.any,
}