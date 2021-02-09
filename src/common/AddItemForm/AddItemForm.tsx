import React, {ChangeEvent, MouseEvent, useState, KeyboardEvent} from 'react';
import {Button, Input} from 'antd';
import s from './AddItemForm.module.css'
import {PlusOutlined} from '@ant-design/icons';

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
        setTitle('')
    }

    const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.charCode === 13){
            props.callback(title)
            setTitle('')
        }
    }

    return (
        <div className={s.addItemForm}>
            <Input type='text' value={title} onChange={onChangeHandler} onKeyPress={onEnterHandler}/>
            <Button onClick={onClickHandler} type='primary' size='small' shape="circle"
                    style={{margin: '0 5px'}} icon={<PlusOutlined />} />
        </div>
    )
}