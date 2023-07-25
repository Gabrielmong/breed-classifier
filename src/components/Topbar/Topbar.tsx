import {
  AppBar,
  Toolbar,
  Container,
  IconButton,
  Button,
  Box,
  Typography,
  Switch,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setTheme } from 'state';

export const Topbar = ({
  currentTheme,
}: {
  currentTheme: 'light' | 'dark';
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleTheme = () => {
    dispatch(setTheme(currentTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <AppBar
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            paddingLeft: 0,
          }}
          disableGutters
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              '&:hover': {
                cursor: 'pointer',
              },
            }}
            onClick={() => {
              navigate('/');
            }}
          >
            Breed Classifier
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="body1"
              sx={{
                marginRight: 2,
                cursor: 'pointer',
              }}
              onClick={toggleTheme}
            >
              Toggle Theme
            </Typography>

            <Switch
              checked={currentTheme === 'dark'}
              onChange={toggleTheme}
              color="default"
              inputProps={{ 'aria-label': 'theme switch' }}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
