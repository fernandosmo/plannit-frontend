import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ModalNewWorkBody from "../ModalNewWorkBody";
import { useState } from "react";
import RestService from "../../services/RestService";

const EtapaAccordion = ({ disabledEtapa, handleAtividadeDisable }) => {
  const obraId = JSON.parse(sessionStorage.getItem("obraId"));
  const [etapa, setEtapa] = useState(obraId && { obra: obraId });
  const [expandAccordion, setExpandAcordion] = useState(false);
  console.log("obraId", obraId);

  const handleSaveEtapa = () => {
    RestService.POST("/etapa/register", etapa);
    setExpandAcordion(false);
    handleAtividadeDisable(false);
  };

  const handleClickAccordion = () => {
    !disabledEtapa && setExpandAcordion(!expandAccordion);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setEtapa({ ...etapa, nome: e.target.value });
  };
  console.log(etapa);

  return (
    <Accordion disabled={disabledEtapa} expanded={expandAccordion}>
      <AccordionSummary
        onClick={handleClickAccordion}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Etapa</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <ModalNewWorkBody
          name={"Etapa"}
          type={"text"}
          label={"Etapa"}
          placeholder={""}
          handleOnChange={handleChange}
        />
      </AccordionDetails>
      <AccordionActions>
        <Button type="submit" onClick={handleSaveEtapa}>
          Salvar
        </Button>
      </AccordionActions>
    </Accordion>
  );
};

export default EtapaAccordion;
