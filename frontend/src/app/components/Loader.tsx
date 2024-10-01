// components/Loader.tsx
import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader size={50} color={'#123abc'} />
    </div>
  );
};

export default Loader;
