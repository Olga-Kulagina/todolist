import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Input} from 'antd';

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export const EditableDiv = React.memo(function (props: EditableSpanPropsType) {

    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.charCode === 13){
            setEditMode(false);
            props.onChange(title);
        }
    }

    return editMode
        ? <Input value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode} onKeyPress={onEnterHandler}/>
        : <div style={{width: '100%'}} onDoubleClick={activateEditMode}>{props.value}</div>
});