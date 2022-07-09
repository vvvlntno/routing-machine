import React, { useState } from 'react';
import MyMap from './map';

/**
 *
 * @return {JSX.Element} - Information Component
 * @constructor
 */
export default function Information() {
    // State for gathering Information about 
    const [state, setState] = useState(["Noch keine Informationen vorhanden","Suchen Sie sich ein Ziel damit Information geladen werden können :)"])
    let title = state[0]
    // Deletes everything between "<" and ">"
    let snippet = state[1].replace(/(<[^<>]*>)/gi,"")

    return <div id="information" className="information">
        <MyMap setState={ setState }/>
            <div id="information-border">
                <h2 id="information-h2">{ title }</h2>
                <div id="information-paragraph">{ snippet }</div>
            </div>
        </div>;
}


