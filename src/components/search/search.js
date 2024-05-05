import React from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'
import { geoApiOptions, GEO_API_URL } from '../../api'

function Search({ onSearchChange }) {

  const [search, setSearch] = React.useState(null)

  const handleOnChange = (value) => {
    setSearch(value);
    onSearchChange(value);
  }

  const loadOptions = (inputValue) => {
    return fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, geoApiOptions)
      .then((res) => res.json())
      .then((res) => {
        return {
          options: res.data.map((city) => ({
            label: `${city.name}, ${city.countryCode}`,
            value: `${city.latitude} ${city.longitude}`
          })),
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  )
}

export default Search