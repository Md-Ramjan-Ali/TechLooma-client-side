import React from 'react';
import useAxios from '../hooks/useAxios';

const useSaveUser = () => {
  const axiosInstance=useAxios()

  const saveUser = async (user) => {
    const userData = {
      name: user.displayName,
      email: user.email,
      image: user.photoURL,
    };

    try {
      const res = await axiosInstance.post("/users", userData);
      console.log("User saved:", res.data);
    } catch (error) {
      console.error("Failed to save user", error);
    }
  };
  return saveUser
};

export default useSaveUser;