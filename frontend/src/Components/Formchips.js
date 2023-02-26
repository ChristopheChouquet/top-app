import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

function FormChips({chipData, setChipData}) {

  //Gestion du formulaire
  const { register, handleSubmit, reset } = useForm();

  //Suppression des chips
  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  //Ajout des mot clés dans le usetate chipData
  const addChip = function (datas) {
    if (datas.chip) {
      const lengthChoix = chipData.length+1;
      if (lengthChoix <= 5) {
        const newChip = {
            key: `chip${chipData.length + 1}`,
            label: datas.chip,
        };
        const addChip = [...chipData, newChip];
        setChipData(addChip);
        reset();
      }
    }
  }

  return (
    <>
        <Form onSubmit={handleSubmit(addChip)}>
          <Stack direction="row" justifyContent="center">
            <TextField
              id="standard-basic" 
              label="Mot clés" 
              variant="standard"
              endadornment={
                <InputAdornment position="end">
                  <AddIcon/>
                </InputAdornment>
              }
              {...register('chip')}  
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" type="submit">
              <AddIcon/>
            </IconButton>
          </Stack>
        </Form>

        <Paper
          sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              boxShadow: 'none',
              listStyle: 'none',
              p: 0.5,
              m: 0,
          }}
          component="ul"
          >
          {chipData.map((data) => {
              let icon;
              return (
                  <ListItem key={data.key}>
                      <Chip
                      icon={icon}
                      label={data.label}
                      onDelete={data.label && handleDelete(data)}
                      />
                  </ListItem> 
              );
          })}
        </Paper>
        
    </>
  );
}

export default FormChips;