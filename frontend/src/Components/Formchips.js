import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';

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
            <div className='mt-4 px-10'>
                <label htmlFor="first-name" className=" block text-sm text-tertiary-300 font-bold text-left">
                Mot clés / #
                </label>
                <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="text-primary border-b border-tertiary-300 w-full focus:outline-none font-bold"
                {...register('chip')}
                />
            </div>
            <IconButton color="primary" sx={{ p: '10px', display: 'none' }} aria-label="directions" type="submit">
              <AddIcon/>
            </IconButton>
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
                  <ListItem key={data.key}
                    sx={{
                      mb: 5,
                    }}
                  >
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