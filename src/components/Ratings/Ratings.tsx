import { Typography, Grid } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Rating } from './components';
import { Breed } from 'models/Breed';

export const Ratings = ({ breed }: { breed: Breed }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        transition: {
          duration: 0.7,
        },
      });
    }
  }, [controls, inView]);

  return (
    <motion.div ref={ref} animate={controls} initial={{ opacity: 0 }}>
      <Typography
        variant="h6"
        sx={{
          marginTop: 2,
        }}
        gutterBottom
      >
        Ratings:
      </Typography>

      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        {breed?.ratings?.map(
          (rating: { value: number; name: string }, index: number) => {
            return <Rating rating={rating} index={index} key={rating.value} />;
          },
        )}
      </Grid>
    </motion.div>
  );
};
