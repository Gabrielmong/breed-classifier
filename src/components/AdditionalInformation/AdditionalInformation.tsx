import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Card,
} from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import PetsIcon from '@mui/icons-material/Pets';
import { Breed } from 'models/Breed';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

export const AdditionalInformation = ({ breed }: { breed: Breed }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        transition: {
          duration: 1.5,
        },
      });
    }
  }, [controls, inView]);

  return (
    <motion.div ref={ref} animate={controls} initial={{ opacity: 0 }}>
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <List>
              <ListItem>
                <ListItemIcon>
                  <PetsIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="h5">
                      They live up to around {breed?.max_life_expectancy} years.
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
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
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
          </motion.div>
        </Grid>
      </Grid>
    </motion.div>
  );
};
