import React, {ChangeEvent, MouseEvent, useState} from 'react';
import {Button, Input} from 'antd';
import s from './AddItemForm.module.css'

type AddItemFormPropsType = {
    callback: (newTitle: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {

    let [title, setTitle] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        props.callback(title)
    }

    return (
        <div>
            <Input type='text' onChange={onChangeHandler} style={{width: 200}}/>
            <Button onClick={onClickHandler} type='primary'>+</Button>
        </div>
    )
}