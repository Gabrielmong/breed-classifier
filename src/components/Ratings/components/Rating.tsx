import { Grid, Card, Typography, Slider } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { RatingType } from 'models/Breed';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { formatName } from 'utils';

export const Rating = ({
  rating,
  index,
}: {
  rating: RatingType;
  index: number;
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        transition: {
          duration: 0.7,
          delay: index * 0.1,
        },
      });
    }
  }, [controls, inView, index]);

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} key={rating.value}>
      <motion.div ref={ref} animate={controls} initial={{ opacity: 0 }}>
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
      </motion.div>
    </Grid>
  );
};
