import React, { useEffect } from 'react';
import Axious from 'axios';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

export default function (SpecificComponent, option, adminRoute=null){
    function AuthenticationCheck(props){

        const dispatch = useDispatch();

        useEffect(()=>{

            dispatch(auth())

            Axious.get('/api/user/auth')
        })
    }

    return AuthenticationCheck;
}