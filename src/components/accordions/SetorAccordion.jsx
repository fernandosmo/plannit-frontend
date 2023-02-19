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

const SetorAccordion = ({ disabledSetor, handleRuaDisable }) => {
  const obraId = JSON.parse(sessionStorage.getItem("obraId"));
  const [setor, setSetor] = useState(obraId && { obra: obraId });
  const [expandAccordion, setExpandAcordion] = useState(false);
  console.log("obraId", obraId);

  const handleSaveSetor = () => {
    setExpandAcordion(false);
    handleRuaDisable(false);
    RestService.POST("/setor/register", setor);
  };

  const handleClickAccordion = () => {
    !disabledSetor && setExpandAcordion(!expandAccordion);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setSetor({ ...setor, nome: e.target.value });
  };
  console.log(setor);

  return (
    <Accordion disabled={disabledSetor} expanded={expandAccordion}>
      <AccordionSummary
        onClick={handleClickAccordion}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Setor</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <ModalNewWorkBody
          name={"Setor"}
          type={"text"}
          label={"Setor"}
          placeholder={""}
          handleOnChange={handleChange}
        />
      </AccordionDetails>
      <AccordionActions>
        <Button type="submit" onClick={handleSaveSetor}>
          Salvar
        </Button>
      </AccordionActions>
    </Accordion>
  );
};

export default SetorAccordion;
