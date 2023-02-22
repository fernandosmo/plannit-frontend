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
import { useEffect, useState } from "react";

import ModalNewWorkBody from "../ModalNewWorkBody";
import RestService from "../../services/RestService";

const TrechoAccordion = ({ disabledTrecho }) => {
  const [trecho, setTrecho] = useState([]);
  const [expandAccordion, setExpandAcordion] = useState(false);
  const [setores, setSetores] = useState([]);
  const [ruas, setRuas] = useState([]);
  const [setorSelected, setSetorSelected] = useState("");
  const [ruaSelected, setRuaSelected] = useState("");
  console.log(disabledTrecho);
  useEffect(() => {
    async function fetchData() {
      try {
        const getSetores =
          !disabledTrecho && (await RestService.GET(`/setor/show-all`));
        console.log(getSetores);
        setSetores(getSetores.data.setores);

        const getRuas =
          !disabledTrecho && (await RestService.GET(`/rua/show-all`));
        console.log(getRuas);
        setRuas(getRuas.data.ruas);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [setSetores, disabledTrecho]);

  console.log("setores ", setores);

  const handleSaveAtividade = () => {
    setExpandAcordion(false);
    RestService.POST("/trecho/register", trecho);
  };

  const handleClickAccordion = () => {
    !disabledTrecho && setExpandAcordion(!expandAccordion);
  };

  const handleChange = (e) => {
    e.preventDefault();
    e.target.name === "setor" && setSetorSelected(e.target.value);
    e.target.name === "rua" && setRuaSelected(e.target.value);
    e.target.type === "number"
      ? setTrecho({
          ...trecho,
          [e.target.name]: parseInt(e.target.value),
        })
      : setTrecho({
          ...trecho,
          [e.target.name]: e.target.value,
        });
  };
  console.log(trecho);

  return (
    <Accordion disabled={disabledTrecho} expanded={expandAccordion}>
      <AccordionSummary
        onClick={handleClickAccordion}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Trecho</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <ModalNewWorkBody
          name={"nome"}
          type={"text"}
          label={"Trecho"}
          placeholder={""}
          handleOnChange={handleChange}
        />
        <FormControl sx={{ my: 2.5, width: "100%" }}>
          <InputLabel id="demo-simple-select-helper-label">Setor</InputLabel>
          <Select
            value={setorSelected}
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="Setor"
            name="setor"
            onChange={handleChange}
          >
            {setores &&
              setores.map((setor) => (
                <MenuItem key={setor.id} value={setor.id}>
                  {setor.nome}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl sx={{ my: 2.5, width: "100%" }}>
          <InputLabel id="demo-simple-select-helper-label">Rua</InputLabel>
          <Select
            value={ruaSelected}
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="Rua"
            name="rua"
            onChange={handleChange}
          >
            {ruas &&
              ruas.map((rua) => (
                <MenuItem key={rua.id} value={rua.id}>
                  {rua.nome}
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

export default TrechoAccordion;
