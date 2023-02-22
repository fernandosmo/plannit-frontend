import {
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";

const ModalNewWorkBody = (props) => {
  if (props.type === "date") {
    return (
      <Grid item sx={{ mt: "20px" }}>
        <TextField
          id="date"
          name={props.name}
          label={props.label}
          type="date"
          defaultValue={props.currentDate}
          onChange={props.handleOnChange}
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
    );
  } else if (props.money) {
    return (
      <>
        <Grid container direction="column" spacing={2}>
          <Grid item sx={{ mt: "20px" }}>
            <FormControl fullWidth sx={{ my: 1 }}>
              <InputLabel shrink id="outlined-adornment-amount">
                {props.label}
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                name={props.name}
                type="number"
                label={props.label}
                onChange={props.handleOnChange}
                placeholder={props.placeholder}
                startAdornment="R$ "
                inputProps={{
                  step: 0.01,
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
      </>
    );
  }
  return (
    <>
      <Grid container direction="column" spacing={2}>
        <Grid item sx={{ mt: "20px" }}>
          <TextField
            type={props.type}
            name={props.name}
            fullWidth
            label={props.label}
            onChange={props.handleOnChange}
            placeholder={props.placeholder}
            variant="outlined"
            required
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ModalNewWorkBody;
