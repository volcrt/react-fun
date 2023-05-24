import {useEffect, useState} from "react";

/**
 * creates a synchronized function that will always be updated on every rerender
 * to give the ability to access current states
 * @param fun
 * @param deps
 * @returns the synchronized function
 */
export function useFun(fun, deps = null){
    const [envelope] = useState({fun: fun})

    useEffect(() =>{
        envelope.fun = fun
    }, deps)

    return (event = null) => envelope.fun(event)
}