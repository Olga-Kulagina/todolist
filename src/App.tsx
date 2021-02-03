import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {fetchTodolistsTC} from './redux/todolists-reducer';
import {Layout, Row} from 'antd';
import {Todolists} from './Todolists/Todolists';
import {Route, Switch} from 'react-router-dom';
import {Login} from './Login/Login';
import {Error404} from './Error404/Error404';

export const PATH = {
    TODOS: '/',
    LOGIN: '/login',
}

const App = () => {

    const {Header, Content, Footer} = Layout;

    return (
            <Layout className="layout">
                    <Header>

                    </Header>
                    <Content style={{padding: '0 50px'}}>
                        <Switch>
                            <Route exact path={PATH.TODOS} render={() => <Todolists/>}/>
                            <Route path={PATH.LOGIN} render={() => <Login/>}/>
                            <Route render={() => <Error404/>}/>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        Todolist
                    </Footer>
            </Layout>
    );
}

export default App;
