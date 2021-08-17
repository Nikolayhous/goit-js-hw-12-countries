import {refs} from './refs';
import fetchCountries from './fetchCountries';
import cardCountryEl from '../templates/countriesCard.hbs';
import listCountryEl from '../templates/listOfCountries.hbs';

import { error } from '@pnotify/core'
import '@pnotify/core/dist/BrightTheme.css';



var debounce = require('lodash.debounce');
refs.input.addEventListener('input', debounce(toSearchCountry, 500));

function toSearchCountry() {
    InputClear();

    const searchQuery = refs.input.value.trim();

    fetchCountries(searchQuery)
      .then(country => {
        if (country.length > 10) {
          error({
            text: 'Too many matches found. Please enter a more specific query!',
          });
        } else if (country.status === 404) {
          console.log(country.status);
          error({
            text: 'No country has been found. Please enter a more specific query!',
          });
        } else if (country.length === 1) {
          onRenderCountryCard(country);
        } else if (country.length <= 10) {
          onRenderListCountries(country);
        }
      })
      .catch(FetchError);
  }
  function onRenderCountryCard(country) {
    const markup = cardCountryEl(country);
  
    refs.cardsCountries.innerHTML = markup;
  }
  function onRenderListCountries(country) {
    const listMarkup = listCountryEl(country);
  
    refs.listOfCountries.insertAdjacentHTML('beforeend', listMarkup);
  }

  function InputClear() {
    refs.listOfCountries.innerHTML = '';
    refs.cardsCountries.innerHTML = '';
  }
  function FetchError(Error) {
    Error;
  }