import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import './App.css';
import Card from './components/Card/Card';
import Navbar from './components/Navbar/Navbar';
import Spinner from './components/Spinner/Spinner';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const initialUrl = 'https://pokeapi.co/api/v2/pokemon/';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let response = await axios.get(initialUrl);
      console.log(response.data.next);
      setNextUrl(response.data.next);
      setPrevUrl(response.data.previous);
      console.log(`next is ${nextUrl} prev is ${prevUrl} `);
      //console.log(response.data.results); name ve url veriyor
      //setPokemonData(response.data.results);
      await loadingPokemon2(response.data.results);
      setLoading(false);
      console.log(`next is ${nextUrl} prev is ${prevUrl} `);
    };

    fetchData();
  }, []);
  console.log('State change', pokemonData);

  const loadingPokemon2 = async (datas) => {
    let pokemonRecords = [];
    let pokemonDatas = [];

    for (let x in datas) {
      let record = datas[x].url;
      pokemonRecords.push(record);
    }

    for (let i = 0; i < pokemonRecords.length; i++) {
      const record = pokemonRecords[i];
      let pokemonDatasDatas = await axios.get(record);
      pokemonDatas.push(pokemonDatasDatas.data);
    }
    setPokemonData(pokemonDatas);
    console.log('After', pokemonData);
  };
  const next = async () => {
    setLoading(true);

    let data = await axios.get(nextUrl);
    console.log(data);

    await loadingPokemon2(data.data.results);
    setNextUrl(data.data.next);
    setPrevUrl(data.data.previous);
    setLoading(false);
  };

  const prev = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await axios.get(prevUrl);
    await loadingPokemon2(data.data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };
  return (
    <div>
      <Navbar></Navbar>
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <Fragment>
          <div className='btn'>
            <button onClick={prev}>Prev</button>
            <button onClick={next}>Next</button>
          </div>
          <div className='grid-container'>
            {pokemonData.map((pokemon, index) => (
              <Card key={index} pokemon={pokemon} loading={loading}></Card>
            ))}
          </div>
          <div className='btn'>
            <button onClick={prev}>Prev</button>
            <button onClick={next}>Next</button>
          </div>
        </Fragment>
      )}
    </div>
  );
}

export default App;
