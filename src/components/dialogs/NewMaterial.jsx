import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import GrupoMaterialAccordion from "../material-accordion/GrupoMaterialAccordion";
import MaterialAccordion from "../material-accordion/MaterialAccordion";

const NewMaterial = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
      <Button variant="outlined" color="warning" onClick={handleOpen}>
        Cadastro de materiais
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
        <DialogTitle id="scroll-dialog-title">
          Cadastro de materiais
        </DialogTitle>
        <DialogContent>
          <GrupoMaterialAccordion />
          <MaterialAccordion />
        </DialogContent>
        <DialogActions>
          <Button type="submit" onClick={handleClose}>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NewMaterial;
