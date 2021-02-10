import React from 'react';
import {Button, Result} from 'antd';
import {NavLink} from 'react-router-dom';
import {PATH} from '../App';

export const Error404 = () => {
    return (
        <div>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary"><NavLink to={PATH.TODOS}>Back Home</NavLink></Button>}
            />
        </div>
    )
}