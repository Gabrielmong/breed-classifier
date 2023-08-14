import { Grid, Typography, Button, Box } from '@mui/material';
import { Breed } from 'models';

export const NoInfoFound = ({ breed }: { breed: Breed | undefined }) => {
  return (
    <Grid item xs={12}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Typography variant="h6" sx={{ marginLeft: 2 }}>
          No information found for {breed ? breed.name : 'this'}, our info is
          really limited, sorry!
        </Typography>

        {breed && (
          <Button
            variant="contained"
            color="primary"
            sx={{ marginLeft: 2 }}
            onClick={() => {
              window.open(
                `https://www.google.com/search?q=${breed.name}`,
                '_blank',
              );
            }}
          >
            Search on Google
          </Button>
        )}
      </Box>
    </Grid>
  );
};
