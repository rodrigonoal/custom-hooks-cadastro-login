import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import useStyles from './styles';

import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import useAuth from '../../hook/useAuth';

function Login() {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const { setToken } = useAuth();

  async function onSubmit(data) {
    setCarregando(true);
    setErro('');

    console.log(data);

    try {
      const resposta = await fetch('https://migii-dev.herokuapp.com/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json'
        }
      })

      const dados = await resposta.json();
      setCarregando(false);

      if (!resposta.ok) {
        setErro(dados.erro);
        return;
      }

      setToken(dados.token);

      history.push('/lista');
    } catch (error) {
      setErro(error.message);
    }
  }

  return (
    <form 
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      {erro && <Alert severity="error">{erro}</Alert>}
      {carregando && <CircularProgress />}
      <Typography variant="h4">Login</Typography>
      <TextField label="E-mail" {...register('email')} />
      <TextField label="Senha" {...register('senha', { minLength: 8 })} type="password" />
      <Button variant="contained" color="primary" type="submit">
        Entrar 
      </Button>
    </form>
  );
}

export default Login;