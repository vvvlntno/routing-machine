import React, { useEffect, useState } from 'react';
import { useRef } from 'react';


async function searchWikipedia(searchQuery) {
    const endpoint = `https://de.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
    const response = await fetch(endpoint);

    if (!response.ok) {
        throw Error(response.statusText);
    }

    const json = await response.json();
    return json;
}

function displayResults(results) {
    let result = results.query.search[0]

    console.log(result.title)
    console.log(result.snippet)

    return [result.title,result.snippet]
}

/**
 *
 * @return {JSX.Element} - Information Component
 * @constructor
 */
export default function Information(props) {
    let defaulttext = "Bitte geben sie einen Endpunkt an um Informationen zu laden."
    // let cityname = props.name

    // if (cityname != undefined) {
    //     defaulttext = displayResults(await searchWikipedia(cityname))
    // }


    return <div id="information" className="information">
        <p>{props.name}</p>
    </div>;
}