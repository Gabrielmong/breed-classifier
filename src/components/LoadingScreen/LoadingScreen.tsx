import { Box, CircularProgress, Typography } from '@mui/material';

export const LoadingScreen = ({
  loadingNote = 'Loading...',
}: {
  loadingNote?: string | null;
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <CircularProgress />

      <Typography variant="h6" sx={{ marginLeft: 2 }}>
        {loadingNote}
      </Typography>
    </Box>
  );
};
