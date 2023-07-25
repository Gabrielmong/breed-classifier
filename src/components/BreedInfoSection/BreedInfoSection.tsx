import {
  Typography,
  Grid,
  Card,
  Slider,
  CircularProgress,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import { formatName } from 'utils';
import PetsIcon from '@mui/icons-material/Pets';

export const BreedInfoSection = ({
  breed,
  loading,
  loadingNote,
  noInfoFound,
}: {
  breed: any;
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
            }}
          >
            <CircularProgress />

            <Typography variant="h6" sx={{ marginLeft: 2 }}>
              {loadingNote}
            </Typography>
          </Box>
        </Grid>
      )}

      {noInfoFound && (
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
              No information found for {breed ? breed : 'this'}, our info is
              really limited, sorry!
            </Typography>

            {breed && (
              <Button
                variant="contained"
                color="primary"
                sx={{ marginLeft: 2 }}
                onClick={() => {
                  window.open(
                    `https://www.google.com/search?q=${breed}`,
                    '_blank',
                  );
                }}
              >
                Search on Google
              </Button>
            )}
          </Box>
        </Grid>
      )}

      {!loading && !noInfoFound && (
        <>
          <Typography
            variant="h4"
            sx={{
              marginTop: 2,
            }}
            gutterBottom
          >
            {breed?.name}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              marginTop: 2,
            }}
            gutterBottom
          >
            {breed?.description}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              marginTop: 2,
            }}
            gutterBottom
          >
            Ratings:
          </Typography>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            {breed?.ratings?.map((rating: { value: number; name: string }) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={rating.value}>
                  <Card
                    sx={{
                      padding: 2,
                    }}
                  >
                    <Typography
                      variant="h5"
                      align="center"
                      sx={{
                        marginRight: 2,
                      }}
                    >
                      {formatName(rating.name)}
                    </Typography>
                    <Slider
                      value={rating.value}
                      aria-label="Rating"
                      valueLabelDisplay="auto"
                      step={1}
                      marks
                      min={0}
                      max={5}
                      draggable={false}
                    />
                  </Card>
                </Grid>
              );
            })}
          </Grid>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{
              marginTop: 2,
            }}
          >
            <Grid item xs={12} sm={6}>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <PetsIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="h5">
                        They live up to around {breed?.max_life_expectancy}{' '}
                        years.
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PetsIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="h5">
                        They weight up to {breed?.max_weight_male}lbs
                      </Typography>
                    }
                  />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <PetsIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="h5">
                        Their height hovers around {breed?.max_height_male}
                        &ldquo;.
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card
                sx={{
                  width: '100%',
                  height: '100%',

                  borderRadius: 5,
                  padding: 2,
                }}
              >
                <img
                  src={breed?.image_link}
                  alt={breed?.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};
