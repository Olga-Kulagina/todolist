import React from 'react';
import {useFormik} from 'formik';
import {Button, Checkbox, Col, Form, Input, Row} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../redux/redux-store';
import {Redirect} from 'react-router-dom';
import {PATH} from '../App';
import {setIsLoggegInTC} from '../redux/auth-reducer';

export const Login = () => {
    const dispatch = useDispatch()

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: values => {
            dispatch(setIsLoggegInTC(values))
        },
    });

    const layout = {
        labelCol: {span: 6},
        wrapperCol: {span: 16},
    }
    const tailLayout = {
        wrapperCol: {offset: 6, span: 16},
    };

    if (isLoggedIn) {
        return <Redirect to={PATH.TODOS}/>
    }

    return (
        <div>
            <Row justify='center'>
                <Col span={8} style={{backgroundColor: '#fff'}}>
                    <div style={{textAlign: 'center', padding: '10px 0 0 5px'}}>
                        <p>To log in get registered here</p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </div>
                    <Form onFinish={formik.handleSubmit}
                          {...layout}>
                        <Form.Item label='Email'>
                            <Input
                                id='email'
                                type='email'
                                {...formik.getFieldProps('email')}
                            />
                        </Form.Item>
                        <Form.Item label='Password'>
                            <Input.Password
                                id='password'
                                {...formik.getFieldProps('password')}
                            />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Checkbox id='rememberMe' {...formik.getFieldProps('rememberMe')}>Remember me</Checkbox>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type='primary' htmlType='submit'>Submit</Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>

        </div>
    )
}