import React, { useContext, useEffect } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { getCookie } from '../utils';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const [user, setUser] = useContext(UserContext);
    const history = useHistory();

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
                    if (data.status === 200) {
                        setUser({ result: data.result, type: data.type })
                        history.push("/dashboard");
                    }
                    else
                        history.push("/login");
                })
                .catch(err => alert(err.message));
        }
    }, [user, setUser]);

    return (
        <Route {...rest} render={props => (
            user ?
                <Component {...props} />
                : <Redirect to="/login" />)
        } />
    );
};

export default PrivateRoute;