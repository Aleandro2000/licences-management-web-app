import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { getCookie } from '../utils';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    const [user, setUser] = useContext(UserContext);
    useEffect(() => {
        if (!user) {
            fetch("/auth/getuser", {
                headers: {
                    "Authorization": "Bearer " + getCookie("jwt"),
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 200)
                        setUser({ result: data.result, type: data.type })
                })
                .catch(err => alert(err.message));
        }
    }, [user, setUser]);

    return (
        <Route {...rest} render={props => (
            user && restricted ?
                <Redirect to="/dashboard" />
                : <Component {...props} />
        )} />
    );
};

export default PublicRoute;