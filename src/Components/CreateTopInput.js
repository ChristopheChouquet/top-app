import '../styles/CreateTop.css';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';

import { useState } from 'react';
import { Html, HtmlOutlined } from '@mui/icons-material';


import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import { TransitionGroup } from 'react-transition-group';
import Autocomplete from '@mui/material/Autocomplete';

const FRUITS = [
  '🍏 Apple',
  '🍌 Banana',
  '🍍 Pineapple',
  '🥥 Coconut',
  '🍉 Watermelon',
];

function renderItem({ item, handleRemoveFruit }) {
  return (
    <ListItem
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          title="Delete"
          onClick={() => handleRemoveFruit(item)}
        >
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemText primary={item} />
    </ListItem>
  );
}

function CreateTop() {
  const [fruitsInBasket, setFruitsInBasket] = useState(FRUITS.slice(0, 3));

  const handleAddFruit = () => {
    const nextHiddenItem = FRUITS.find((i) => !fruitsInBasket.includes(i));
    if (nextHiddenItem) {
      setFruitsInBasket((prev) => [nextHiddenItem, ...prev]);
    }
  };

  const handleRemoveFruit = (item) => {
    setFruitsInBasket((prev) => [...prev.filter((i) => i !== item)]);
  };

  const addFruitButton = (
    <Button
      variant="contained"
      disabled={fruitsInBasket.length >= 10}
      onClick={handleAddFruit}
    >
      Ajout d'un top
    </Button>
  );

  return (
    <div id='createTop'>
        <Box 
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '90%' },
            }}
            noValidate
            autoComplete="off"

        >
          <TextField id="titre" label="Titre" variant="standard" />
          <TextField id="hashtag" label="Mots-clés / #" variant="standard" freeSolo />
          
          

        </Box>

        <p>Classement (possible de 3 à 10)</p>
        {addFruitButton}
        <Box sx={{ mt: 1 }}>
          
          <List>
            <TransitionGroup>
              {fruitsInBasket.map((item) => (
                <Collapse key={item}>
                  {renderItem({ item, handleRemoveFruit })}
                </Collapse>
              ))}
            </TransitionGroup>
          </List>
        </Box>

   
    </div>
  );
}

export default CreateTop;