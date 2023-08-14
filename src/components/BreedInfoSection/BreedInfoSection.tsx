import { Typography, Grid, CircularProgress, Box } from '@mui/material';
import {
  AdditionalInformation,
  NoInfoFound,
  Ratings,
  TitleDescription,
} from 'components';
import { Breed } from 'models';

export const BreedInfoSection = ({
  breed,
  loading,
  loadingNote,
  noInfoFound,
}: {
  breed: Breed;
  loading: boolean;
  loadingNote: string | null;
  noInfoFound: boolean;
}) => {
  return (
    <>
      {loading && (
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              minHeight: '200px',
            }}
          >
            <CircularProgress />

            <Typography variant="h6" sx={{ marginLeft: 2 }}>
              {loadingNote}
            </Typography>
          </Box>
        </Grid>
      )}

      {noInfoFound && <NoInfoFound breed={breed} />}

      {!loading && !noInfoFound && (
        <>
          <TitleDescription description={breed.description} name={breed.name} />

          <Ratings breed={breed} />

          <AdditionalInformation breed={breed} />
        </>
      )}
    </>
  );
};
