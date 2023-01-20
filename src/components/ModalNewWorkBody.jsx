import { Grid, TextField } from '@mui/material';
import dayjs from 'dayjs';

const currentDate = dayjs().format('YYYY-MM-DD');

const ModalNewWorkBody = (props) => {
  if (props.type === 'date') {
    return (
      <Grid item sx={{ mt: '20px' }}>
        <TextField
          id="date"
          name={props.name}
          label={props.label}
          type="date"
          defaultValue={currentDate}
          onChange={props.handleOnChange}
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
    );
  }
  return (
    <div>
      <Grid container direction="column" spacing={2}>
        <Grid item sx={{ mt: '20px' }}>
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
    </div>
  );
};

export default ModalNewWorkBody;
