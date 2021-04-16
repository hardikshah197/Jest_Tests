import React from 'react';

export default function Title({title, count}) {
    return(
        <div>
            <h1>{title}</h1>
            <h2>{count}</h2>
        </div>
    )
}