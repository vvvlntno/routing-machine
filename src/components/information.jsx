import React, { useEffect, useState } from 'react';
import MyMap from './map';

/**
 *
 * @return {JSX.Element} - Information Component
 * @constructor
 */
export default function Information() {
    const [state, setState] = useState(["Information","Select a Destination for Information :)"])
    const title = state[0]
    const snippet = state[1]
    
    useEffect(() => {
        console.log(title)
        console.log(snippet)
    })

    return <div id="information" className="information">
        <MyMap setState={ setState }/>
        <div id="border">
            <h2 id="h2bottomborder">{ title }</h2>
            <p>{ snippet }</p>
        </div>
        </div>;
}


// old one
// /**
//  *
//  * @return {JSX.Element} - Information Component
//  * @constructor
//  */
//  export default function Information(props) {
//     const [resultTitle, setResultTitle] = useState(props.result[0])
//     const [resultSnippet, setResultSnippet] = useState(props.result[1])
    
//     useEffect(() => {
//         let result = props.result
//         console.log(result[0])
//         console.log(result[1])
//         //ab hier passt nichtmehr
//         setResultTitle(result[0])
//         setResultSnippet(result[1])
//         console.log(resultTitle)
//         console.log(resultSnippet)
//     }, [props.result])

//     return <div id="information" className="information"/>;
// }



