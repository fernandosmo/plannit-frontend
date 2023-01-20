import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import RestService from '../services/RestService';
import ModalNewWorkBody from './ModalNewWorkBody';
import inputs from '../utils/inputsList.js';

export default function NewWork({ childToParent }) {
  const { loginData } = useContext(AuthContext);
  console.log(loginData);
  const [obra, setObra] = useState(loginData && { user: loginData.user.id });

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSaveObra = () => {
    childToParent(obra);
    RestService.POST('/obra/register', obra);
    handleClose();
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

  const handleChange = (e) => {
    e.preventDefault();
    e.target.name === 'Prazo_Exec'
      ? setObra({ ...obra, [e.target.name]: parseInt(e.target.value) })
      : setObra({ ...obra, [e.target.name]: e.target.value });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '15px',
      }}>
      <Button variant="outlined" onClick={handleOpen}>
        Nova Obra
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="body"
        fullWidth={true}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description">
        <DialogTitle id="scroll-dialog-title">Criar nova obra</DialogTitle>
        <DialogContent>
          {inputs.map((singleInput) => (
            <ModalNewWorkBody
              key={singleInput.name}
              name={singleInput.name}
              type={singleInput.type}
              label={singleInput.label}
              placeholder={singleInput.placeholder}
              handleOnChange={handleChange}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button type="submit" onClick={handleSaveObra}>
            Salvar
          </Button>
          <Button onClick={handleClose} color="error">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
