import React from 'react'

import style from './style.module.scss'

const CheckBox = props => {
    return (
        <span {...props} className={`${props.icon ? style.radio : style.btn} ${props.isStroke && style.stroked} ${props.status ? style.active : ''}`}
        >
            {props.children}
            {props.icon && <span className={style.circleLable} style={{ fontSize: props.fontSize }}>{props.label}</span>}
        </span>
    )
}

export default CheckBox;