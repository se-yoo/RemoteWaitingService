/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { auth } from '../store/actions/user_actions';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

export default function (SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    let user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      //To know my current status, send Auth request 
      dispatch(auth()).then(response => {
        //Not Loggined in Status 
        if (!response.payload.isAuth) {
          if (option) {
            navigate('/login')
          }
          //Loggined in Status 
        } else {
          //supposed to be Admin page, but not admin person wants to go inside
          if (option === false || (adminRoute && !response.payload.isAdmin)) {
            navigate('/');
          }
        }
      })
    }, [])

    return (
      <SpecificComponent {...props} user={user} />
    )
  }
  return AuthenticationCheck
}
