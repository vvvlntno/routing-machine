import React, { useState } from 'react';
import MyMap from './map';

/**
 *
 * @return {JSX.Element} - Information Component
 * @constructor
 */
export default function Information() {
    const [state, setState] = useState(["Information","Select a Destination for Information :)"])
    let title = state[0]
    let snippet = state[1].replace(/(<[^<>]*>)/gi,"")

    return <div id="information" className="information">
        <MyMap setState={ setState }/>
            <div id="information-border">
                <h2 id="information-h2">{ title }</h2>
                <div id="information-paragraph">{ snippet }</div>
            </div>
        </div>;
}


