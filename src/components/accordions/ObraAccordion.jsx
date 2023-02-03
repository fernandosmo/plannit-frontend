import { useState } from 'react';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import ModalNewWorkBody from '../ModalNewWorkBody';
import { inputsObra } from '../../utils/inputsList.js';
import RestService from '../../services/RestService';

const ObraAccordion = ({
  newObraHandle,
  disabledObra,
  handleObraDisable,
  handleEtapaDisable,
}) => {
  const userInfo = JSON.parse(localStorage.getItem('loginData'));
  console.log(userInfo);
  const [obra, setObra] = useState(userInfo && { user: userInfo.user.id });

  const [expandAccordion, setExpandAcordion] = useState(false);

  const handleClickAccordion = () => {
    !disabledObra && setExpandAcordion(!expandAccordion);
  };

  const handleSaveObra = () => {
    newObraHandle(obra);
    handleObraDisable(true);
    handleEtapaDisable(false);
    setExpandAcordion(false);

    RestService.POST('/obra/register', obra)
      .then((res) => {
        localStorage.setItem('obraId', JSON.stringify(res.data.obra.id));
      })
      .catch((e) => {
        console.log(e);
      });

    setObra(userInfo && { user: userInfo.user.id });
  };

  const handleChange = (e) => {
    e.preventDefault();
    e.target.name === 'Prazo_Exec'
      ? setObra({ ...obra, [e.target.name]: parseInt(e.target.value) })
      : setObra({ ...obra, [e.target.name]: e.target.value });
  };

  return (
    <Accordion disabled={disabledObra} expanded={expandAccordion}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        onClick={handleClickAccordion}>
        <Typography>Obra</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {inputsObra.map((singleInput) => (
          <ModalNewWorkBody
            key={singleInput.name}
            name={singleInput.name}
            type={singleInput.type}
            label={singleInput.label}
            placeholder={singleInput.placeholder}
            handleOnChange={handleChange}
          />
        ))}
      </AccordionDetails>
      <AccordionActions>
        <Button type="submit" onClick={handleSaveObra}>
          Salvar
        </Button>
      </AccordionActions>
    </Accordion>
  );
};

export default ObraAccordion;
