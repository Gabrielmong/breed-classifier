import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectSettings } from './state';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme, darkTheme } from 'theme';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Identify } from 'pages';
import { BackToTop, Topbar } from 'components';

function App() {
  const { currentTheme } = useSelector(selectSettings);

  const theme = useMemo(() => {
    return currentTheme === 'light' ? lightTheme : darkTheme;
  }, [currentTheme]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Topbar currentTheme={currentTheme} />
        <Routes>
          <Route path="/" element={<Identify />} />
        </Routes>
        <BackToTop />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
