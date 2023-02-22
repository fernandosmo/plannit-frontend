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

import { inputsMaterial } from "../../utils/inputsList.js";
import RestService from "../../services/RestService";

const MaterialAccordion = () => {
  const [material, setMaterial] = useState([]);
  const [expandAccordion, setExpandAcordion] = useState(false);
  const [grupoMaterial, setGrupoMaterial] = useState([]);
  const [grupoMaterialSelected, setGrupoMaterialSelected] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const getGrupoMaterial =
          expandAccordion &&
          (await RestService.GET(`/grupo-materiais/show-all`));
        getGrupoMaterial.status === "success" &&
          setGrupoMaterial(getGrupoMaterial.data.grupo_materiais);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [expandAccordion, setGrupoMaterial]);

  console.log("grupoMaterialSelected ", grupoMaterialSelected);

  const handleSaveMaterial = () => {
    RestService.POST("/materiais/register", material);
    setExpandAcordion(false);
    setGrupoMaterialSelected("");
  };

  const handleClickAccordion = () => {
    setExpandAcordion(!expandAccordion);
  };

  const handleChange = (e) => {
    e.preventDefault();
    e.target.name === "grupo" && setGrupoMaterialSelected(e.target.value);
    e.target.name === "custo"
      ? setMaterial({
          ...material,
          [e.target.name]: parseFloat(e.target.value),
        })
      : e.target.type === "number" && e.target.name !== "custo"
      ? setMaterial({
          ...material,
          [e.target.name]: parseInt(e.target.value),
        })
      : setMaterial({
          ...material,
          [e.target.name]: e.target.value,
        });
  };
  console.log(material);

  return (
    <Accordion expanded={expandAccordion}>
      <AccordionSummary
        onClick={handleClickAccordion}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>material</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="demo-simple-select-helper-label">
            Grupo de materiais
          </InputLabel>
          <Select
            value={grupoMaterialSelected}
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="Grupo de materiais"
            name="grupo"
            onChange={handleChange}
          >
            {grupoMaterial &&
              grupoMaterial.map((grupoMaterial) => (
                <MenuItem key={grupoMaterial.id} value={grupoMaterial.id}>
                  {grupoMaterial.nome}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        {inputsMaterial.map((singleInput) => (
          <ModalNewWorkBody
            money={singleInput.money | false}
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
        <Button type="submit" onClick={handleSaveMaterial}>
          Salvar
        </Button>
      </AccordionActions>
    </Accordion>
  );
};

export default MaterialAccordion;
