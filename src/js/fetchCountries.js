
export default fetchCountries

function fetchCountries(name) {

    const URL = `https://restcountries.eu/rest/v2/name/${name}`;
    const PARAMETER = 'fields=name;capital;population;flag;languages';
    return fetch(`${URL}?${PARAMETER}`).then(response => response.json());
}

