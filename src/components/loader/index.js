import React from 'react';
import ReactLoading from 'react-loading';

export default function Loader() {
  return (
    <ReactLoading
      type="spin"
      className="loading"
      color="#82cf8f"
      height={'10%'}
      width={'10%'}
    />
  );
}
