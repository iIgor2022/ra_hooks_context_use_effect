import PropTypes from 'prop-types'
import { useEffect } from 'react';
import { useState } from 'react'

export default function Details({ info }) {
  const [user, setUser] = useState();
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    if (info) {
      setError(false);
      setLoading(true);
      fetch(`${import.meta.env.VITE_API_URL}${info.id}.json`)
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(true);
          setLoading(false);
        });
    }
  }, [info]);

  return (
    <div className='details'>
      {isError && <p>Ошибка загрузки</p>}
      {isLoading && <p>Загрузка...</p>}
      {!isLoading && user && (
        <div className='details-container'>
          <div className='details-avatar'><img src={`${user.avatar}?${Math.random()}`} alt={user.name} /></div>
          <div className='details-name'>{user.name}</div>
          <div className='details-city'>City: {user.details.city}</div>
          <div className='details-company'>Company: {user.details.company}</div>
          <div className='details-position'>Position: {user.details.position}</div>
        </div>
      )}
    </div>
  );
}

Details.propTypes = {
  info: PropTypes.any,
}