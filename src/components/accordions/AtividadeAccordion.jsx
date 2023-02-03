import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ModalNewWorkBody from '../ModalNewWorkBody';
import { useEffect, useState } from 'react';

import { inputsAtividade } from '../../utils/inputsList.js';
import RestService from '../../services/RestService';

const AtividadeAccordion = ({ disabledAtividade }) => {
  const etapaId = JSON.parse(localStorage.getItem('etapaId'));

  const [atividade, setAtividade] = useState({ etapa: etapaId });
  const [expandAccordion, setExpandAcordion] = useState(false);
  const [etapas, setEtapas] = useState([]);
  console.log('etapaId', etapaId);

  useEffect(() => {
    async function fetchData() {
      try {
        const getEtapas = await RestService.GET(`/etapa/show-all`);
        console.log(getEtapas);
        getEtapas.status === 'success' && setEtapas(getEtapas.data.etapas);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [setEtapas]);

  const handleSaveAtividade = () => {
    setExpandAcordion(false);
    RestService.POST('/atividade/register', atividade)
      .then((res) => {
        localStorage.setItem(
          'atividadeId',
          JSON.stringify(res.data.atividade.id)
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleClickAccordion = () => {
    !disabledAtividade && setExpandAcordion(!expandAccordion);
  };

  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.name);
    e.target.type === 'number'
      ? setAtividade({
          ...atividade,
          [e.target.name]: parseInt(e.target.value),
        })
      : e.target.name === undefined
      ? setAtividade({ ...atividade, etapa: parseInt(e.target.value) })
      : setAtividade({
          ...atividade,
          [e.target.name]: e.target.value,
        });
  };
  console.log(atividade);

  return (
    <Accordion disabled={disabledAtividade} expanded={expandAccordion}>
      <AccordionSummary
        onClick={handleClickAccordion}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header">
        <Typography>Atividade</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {inputsAtividade.map((singleInput) => (
          <ModalNewWorkBody
            key={singleInput.name}
            name={singleInput.name}
            type={singleInput.type}
            label={singleInput.label}
            placeholder={singleInput.placeholder}
            handleOnChange={handleChange}
          />
        ))}
        <FormControl sx={{ my: 2.5, width: '100%' }}>
          <InputLabel id="demo-simple-select-helper-label">Etapa</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="Etapa"
            onChange={handleChange}>
            {etapas &&
              etapas.map((etapa) => (
                <MenuItem key={etapa.id} value={etapa.id}>
                  {etapa.nome}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </AccordionDetails>
      <AccordionActions>
        <Button type="submit" onClick={handleSaveAtividade}>
          Salvar
        </Button>
      </AccordionActions>
    </Accordion>
  );
};

export default AtividadeAccordion;
