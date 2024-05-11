import React, { useState } from 'react'

export default function Counter() {

    const [count, setCount] = useState(0);

    const increment = () => {
        // ++count;             // does not change DOM HTML
        setCount(count + 1);    // change DOM HTML
        console.log(count);
    }

    return (
        <>
            <div>
                <span className={count > 10 ? "red" : ""}>Counter: {count} </span>
                <button onClick={increment}>+</button>
            </div>
        </>
    )
}
