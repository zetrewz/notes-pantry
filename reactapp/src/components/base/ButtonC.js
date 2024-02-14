import React from 'react';
import './buttonc.css'

function ButtonC() {
    function handleClick() {
        alert('Оно работает wow')
    }

    return (
            <button onClick={handleClick}>
                Нажми на меня
            </button>
    )
}

export default ButtonC;