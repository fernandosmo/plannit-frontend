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

const RuaAccordion = ({ disabledRua, handleTrechoDisable }) => {
  const obraId = JSON.parse(sessionStorage.getItem("obraId"));
  const [rua, setRua] = useState(obraId && { obra: obraId });
  const [expandAccordion, setExpandAcordion] = useState(false);
  console.log("obraId", obraId);

  const handleSaveRua = () => {
    RestService.POST("/rua/register", rua);
    setExpandAcordion(false);
    handleTrechoDisable(false);
  };

  const handleClickAccordion = () => {
    !disabledRua && setExpandAcordion(!expandAccordion);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setRua({ ...rua, nome: e.target.value });
  };
  console.log(rua);

  return (
    <Accordion disabled={disabledRua} expanded={expandAccordion}>
      <AccordionSummary
        onClick={handleClickAccordion}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Rua</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <ModalNewWorkBody
          name={"Rua"}
          type={"text"}
          label={"Rua"}
          placeholder={""}
          handleOnChange={handleChange}
        />
      </AccordionDetails>
      <AccordionActions>
        <Button type="submit" onClick={handleSaveRua}>
          Salvar
        </Button>
      </AccordionActions>
    </Accordion>
  );
};

export default RuaAccordion;
