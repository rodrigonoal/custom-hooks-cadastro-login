import React, { useState, useEffect } from 'react';
import axios from 'axios';

import useAuth from '../../hook/useAuth';

function Lista() {
  const { token } = useAuth();
  const [pokemons, setPokemons] = useState([]);

  async function carregarPokemons() {
    try {
      console.log(token);

      const response = await axios.get(`http://localhost:8000/pokemon?token=${token}`);
      console.log(response);

      setPokemons(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    carregarPokemons();
  }, []);

  return (
    <h1>{pokemons.map(pokemon => <h1>{pokemon.nome}</h1>)}</h1>
  );
}

export default Lista;
