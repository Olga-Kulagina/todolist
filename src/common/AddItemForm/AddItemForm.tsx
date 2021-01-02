import React, {ChangeEvent, MouseEvent, useState} from 'react';

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
            <input type='text' onChange={onChangeHandler}/>
            <button onClick={onClickHandler}>+</button>
        </div>
    )
}