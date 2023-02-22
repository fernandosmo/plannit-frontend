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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ModalNewWorkBody from "../ModalNewWorkBody";
import { useEffect, useState } from "react";

import { inputsAtividade } from "../../utils/inputsList.js";
import RestService from "../../services/RestService";

const AtividadeAccordion = ({ disabledAtividade, handleSetorDisable }) => {
  const [atividade, setAtividade] = useState([]);
  const [expandAccordion, setExpandAcordion] = useState(false);
  const [etapas, setEtapas] = useState([]);
  const [etapaSelected, setEtapaSelected] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const getEtapas =
          !disabledAtividade && (await RestService.GET(`/etapa/show-all`));
        getEtapas.status === "success" && setEtapas(getEtapas.data.etapas);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [setEtapas, disabledAtividade]);

  console.log("etapas ", etapas);

  const handleSaveAtividade = () => {
    setExpandAcordion(false);
    handleSetorDisable(false);
    RestService.POST("/atividade/register", atividade);
  };

  const handleClickAccordion = () => {
    !disabledAtividade && setExpandAcordion(!expandAccordion);
  };

  const handleChange = (e) => {
    e.preventDefault();
    e.target.name === "etapa" && setEtapaSelected(e.target.value);
    e.target.type === "number"
      ? setAtividade({
          ...atividade,
          [e.target.name]: parseInt(e.target.value),
        })
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
        id="panel1a-header"
      >
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
        <FormControl sx={{ my: 2.5, width: "100%" }}>
          <InputLabel id="demo-simple-select-helper-label">Etapa</InputLabel>
          <Select
            value={etapaSelected}
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="Etapa"
            name="etapa"
            onChange={handleChange}
          >
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
