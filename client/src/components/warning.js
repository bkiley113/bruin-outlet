import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthWarning({ letter }) {
  const navigate = useNavigate();

  useEffect(() => {
    let alertMessage;
    if (letter === 'c') {
      alertMessage = "Please create an account or log in to place orders and view order history.";
    } else if (letter === 'w') {
      alertMessage = "Please create an account or log in to view and modify your wishlist.";
    } else {
      alertMessage = "Default message goes here...";
    }
    alert(alertMessage);
    window.location = '/';
  }, [letter, navigate]);

  return null;
}

export default AuthWarning;