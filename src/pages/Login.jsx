import {
  Container,
  Button,
  Grid,
  Paper,
  TextField,
  IconButton,
  InputAdornment,
  Alert,
  Snackbar,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../context/AuthContext.jsx";
import RestService from "../services/RestService.js";
import Logo from "../assets/logo.png";

const Login = () => {
  const { setLoginData, signed, setSigned } = useContext(AuthContext);
  let navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = new FormData(document.getElementById("form"));

    const login = {
      email: data.get("email"),
      password: data.get("password"),
    };

    await RestService.POST(`/auth/login`, login)
      .then((res) => {
        console.log(res);
        if (res.status === "success") {
          setSigned(true);
          setLoginData(res);
          console.log(res);
          sessionStorage.setItem("loginData", JSON.stringify(res));
          sessionStorage.setItem("signed", true);
        } else {
          handleOpenAlert();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (signed) {
      try {
        navigate("/home");
      } catch (error) {
        console.log(error);
      }
    }
  }, [signed, navigate]);

  const [values, setValues] = useState({
    showPass: false,
  });

  const handlePassVisibilty = () => {
    setValues({
      showPass: !values.showPass,
    });
  };

  const [open, setOpen] = useState(false);

  const handleOpenAlert = () => {
    setOpen(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Container maxWidth="md">
        <Grid
          container
          spacing={2}
          direction="column"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Paper elelvation={2} sx={{ padding: 5 }}>
            <Container
              maxWidth="md"
              sx={{ mb: 5, display: "flex", justifyContent: "center" }}
            >
              <img src={Logo} alt="" />
            </Container>
            <form id="form" onSubmit={handleLogin}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <TextField
                    type="email"
                    name="email"
                    fullWidth
                    label="Insira seu email"
                    placeholder="email@example.com"
                    variant="outlined"
                    required
                  />
                </Grid>

                <Grid item>
                  <TextField
                    type={values.showPass ? "text" : "password"}
                    fullWidth
                    label="Senha"
                    name="password"
                    placeholder="Senha"
                    variant="outlined"
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handlePassVisibilty}
                            aria-label="toggle password"
                            edge="end"
                          >
                            {values.showPass ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleCloseAlert}
                  >
                    <Alert
                      onClose={handleCloseAlert}
                      severity="error"
                      sx={{ width: "100%" }}
                    >
                      Usuário ou senha incorretos
                    </Alert>
                  </Snackbar>
                </Grid>

                <Grid item>
                  <Button type="submit" fullWidth variant="contained">
                    Entrar
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Container>
    </div>
  );
};

export default Login;
