import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';

import RestService from '../services/RestService.js';
import { Container } from '@mui/system';
import Header from '../components/Header.jsx';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import NewWork from '../components/NewWork.jsx';

const Home = () => {
  const userInfo = JSON.parse(localStorage.getItem('loginData'));
  let navigate = useNavigate();
  const { obras, setObras } = useContext(AuthContext);
  console.log('obras', obras);

  useEffect(() => {
    async function fetchData() {
      try {
        const getObras = await RestService.GET(
          `/obra/show-all`,
          userInfo.access_token
        );
        console.log(getObras.status);
        getObras.status === 'success' && setObras(getObras.data.obras);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [userInfo.access_token, setObras, navigate]);

  useEffect(() => {
    if (!userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  const [newObraList, setNewObraList] = useState(obras);
  console.log(obras);
  console.log(newObraList);

  const newObraHandle = (newObra) => {
    setNewObraList([...obras, newObra]);
  };

  return (
    <>
      <Header />
      <Container maxWidth="sm">
        <NewWork newObraHandle={newObraHandle} />
        {newObraList[0] ? (
          newObraList.map((obra) => (
            <Card
              key={obra.id}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                marginBottom: '20px',
              }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {obra.Empreendimento}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Ver detalhes</Button>
                <Button size="small">Editar</Button>
              </CardActions>
            </Card>
          ))
        ) : (
          <Typography
            gutterBottom
            variant="h6"
            align="center"
            component="div"
            color="lightgray">
            Nenhuma obra no momento, cadastre uma nova obra!
          </Typography>
        )}
      </Container>
    </>
  );
};

export default Home;
