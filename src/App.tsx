import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Col, Layout, Row, Spin} from 'antd';
import {Todolists} from './Todolists/Todolists';
import {Route, Switch} from 'react-router-dom';
import {Login} from './Login/Login';
import {Error404} from './Error404/Error404';
import {AppRootStateType} from './redux/redux-store';
import {setIsLoggedOutTC} from './redux/auth-reducer';
import {setIsInitializedTC} from './redux/app-reducer';

export const PATH = {
    TODOS: '/',
    LOGIN: '/login',
}

const App = () => {
    const dispatch = useDispatch()

    const {Header, Content, Footer} = Layout;
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)

    const onLogoutClick = () => {
        dispatch(setIsLoggedOutTC())
    }

    useEffect(() => {
        dispatch(setIsInitializedTC())
    }, [dispatch])

    if (!isInitialized) {
        return <Row justify="center" align="middle" style={{height: '100vh'}}>
            <Col span={1}>
                <Spin size='large'/>
            </Col>
        </Row>
    }

    return (
        <Layout className="layout">
            <Header>
                {isLoggedIn ?
                    <Button onClick={onLogoutClick}>Log Out</Button> : ''
                }
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
