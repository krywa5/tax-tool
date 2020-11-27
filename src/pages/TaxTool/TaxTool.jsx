import React from 'react';
import { auth } from 'data/service/firebase.service';
import { useHistory } from 'react-router-dom';
import ROUTES from 'routes';

const TaxTool = () => {
    const isUser = true;
    const history = useHistory();

    if (!isUser) history.push(ROUTES.loginPage);

    return (
        <h1>To jest taxtool</h1>
    );
}

export default TaxTool;