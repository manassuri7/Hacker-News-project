import React from 'react';
import Loading from '../Loading/Loading.jsx';

const WithLoading = (Component) => ({ isLoading, ...props }) => {
  return (
    isLoading ? <Loading /> : <Component {...props} />
  );
}

export default WithLoading;
