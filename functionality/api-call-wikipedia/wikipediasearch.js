async function handleSubmit(event) {
    event.preventDefault();
    const inputValue = document.querySelector('.search-input').value;
    const searchQuery = inputValue.trim();
  
    try {
      const results = await searchWikipedia(searchQuery);
      displayResults(results);
    } catch (err) {
      console.log(err);
      alert('Failed to search wikipedia');
    }
}
  
    const endpoint = `https://de.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
    const response = await fetch(endpoint);

    if (!response.ok) {
        throw Error(response.statusText);
    }

    const json = await response.json();
    return json;
}
  
function displayResults(results) {
    const searchResults = document.querySelector('.search-results');
    searchResults.innerHTML = "";
    results.query.search.forEach(result => {
      const url = `https://de.wikipedia.org/?curid=${result.pageid}`;
  
      searchResults.insertAdjacentHTML(
        'beforeend',
        `<div class="result-item">
          <h3 class="result-title">
            <a href="${url}" target="_blank" rel="noopener">${result.title}</a>
          </h3>
          <a href="${url}" class="result-link" target="_blank" rel="noopener">${url}</a><br>
          <span class="result-snippet">${result.snippet}</span><br>
        </div>`
      );
    });
}
  
  
const form = document.querySelector('.search-wrapper');
form.addEventListener('submit', handleSubmit);
  