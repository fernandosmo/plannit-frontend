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

const GrupoMaterialAccordion = () => {
  const [grupoMaterial, setGrupoMaterial] = useState("");
  const [expandAccordion, setExpandAcordion] = useState(false);

  const handleSaveGrupoMaterial = () => {
    RestService.POST("/grupo-materiais/register", grupoMaterial);
    setExpandAcordion(false);
    setGrupoMaterial("");
  };

  const handleClickAccordion = () => {
    setExpandAcordion(!expandAccordion);
  };

  const handleChange = (e) => {
    e.preventDefault();
  };
  console.log(grupoMaterial);

  return (
    <Accordion expanded={expandAccordion}>
      <AccordionSummary
        onClick={handleClickAccordion}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Grupo de materiais</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <ModalNewWorkBody
          name={"GrupoMaterial"}
          type={"text"}
          label={"Grupo de Materiais"}
          placeholder={"Tubulação"}
          handleOnChange={handleChange}
        />
      </AccordionDetails>
      <AccordionActions>
        <Button type="submit" onClick={handleSaveGrupoMaterial}>
          Salvar
        </Button>
      </AccordionActions>
    </Accordion>
  );
};

export default GrupoMaterialAccordion;
