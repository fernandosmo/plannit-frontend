import { useEffect, useRef, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import EtapaAccordion from "../accordions/EtapaAccordion";
import ObraAccordion from "../accordions/ObraAccordion";
import AtividadeAccordion from "../accordions/AtividadeAccordion";
import SetorAccordion from "../accordions/SetorAccordion";
import RuaAccordion from "../accordions/RuaAccordion";
import TrechoAccordion from "../accordions/TrechoAccordion";

function NewObra({ newObraHandle }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [obraDisabled, setObraDisabled] = useState(false);

  const handleObraDisable = (obraDisable) => {
    setObraDisabled(obraDisable);
  };

  const [etapaDisabled, setEtapaDisabled] = useState(true);

  const handleEtapaDisable = (etapaDisable) => {
    setEtapaDisabled(etapaDisable);
  };

  const [atividadeDisabled, setAtividadeDisabled] = useState(true);

  const handleAtividadeDisable = (atividadeDisable) => {
    setAtividadeDisabled(atividadeDisable);
  };

  const [setorDisabled, setSetorDisabled] = useState(true);

  const handleSetorDisable = (setorDisabled) => {
    setSetorDisabled(setorDisabled);
  };

  const [ruaDisabled, setRuaDisabled] = useState(true);

  const handleRuaDisable = (ruaDisabled) => {
    setRuaDisabled(ruaDisabled);
  };

  const [trechoDisabled, setTrechoDisabled] = useState(true);

  const handleTrechoDisable = (trechoDisabled) => {
    setTrechoDisabled(trechoDisabled);
  };

  const descriptionElementRef = useRef(null);

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  return (
    <>
      <Button variant="outlined" onClick={handleOpen}>
        Nova Obra
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="body"
        background="gray"
        fullWidth={true}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Criar nova obra</DialogTitle>
        <DialogContent>
          <ObraAccordion
            newObraHandle={newObraHandle}
            disabledObra={obraDisabled}
            handleObraDisable={handleObraDisable}
            handleEtapaDisable={handleEtapaDisable}
          />
          <EtapaAccordion
            disabledEtapa={etapaDisabled}
            handleAtividadeDisable={handleAtividadeDisable}
          />
          <AtividadeAccordion
            disabledAtividade={atividadeDisabled}
            handleSetorDisable={handleSetorDisable}
          />
          <SetorAccordion
            disabledSetor={setorDisabled}
            handleRuaDisable={handleRuaDisable}
          />
          <RuaAccordion
            disabledRua={ruaDisabled}
            handleTrechoDisable={handleTrechoDisable}
          />
          <TrechoAccordion disabledTrecho={trechoDisabled} />
        </DialogContent>
        <DialogActions>
          <Button type="submit" onClick={handleClose}>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default NewObra;
