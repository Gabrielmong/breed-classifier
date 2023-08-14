import { Typography } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export const TitleDescription = ({
  name,
  description,
}: {
  name: string | undefined;
  description: string | undefined;
}) => {
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
        variant="h4"
        sx={{
          marginTop: 2,
        }}
        gutterBottom
      >
        {name}
      </Typography>

      <Typography
        variant="h6"
        sx={{
          marginTop: 2,
        }}
        gutterBottom
      >
        {description}
      </Typography>
    </motion.div>
  );
};
