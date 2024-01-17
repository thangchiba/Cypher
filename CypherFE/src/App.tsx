import React, { useMemo, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from './Pages/NotFound';
import Navbar from './Components/Navbar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { RootState } from './Redux/store';
import { getTheme } from './Settings/ThemeSetting';
import { ToastContainer } from 'react-toastify';
import LoadingModal from './Components/LoadingModal';
import TestSocket from './Pages/TestSocket';
import HomePage from './Pages/HomePage';
import Room from './Pages/Room';
import Sidebar from './Components/Sidebar';

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const theme = useMemo(() => getTheme(darkMode), [darkMode]);

  const toggleSetting = () => {
    setSidebarOpen((prevValue) => !prevValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Navbar onSettingClick={toggleSetting} />
        <Sidebar open={isSidebarOpen} onClose={toggleSetting} />
        <Box component="main" sx={{ flexGrow: 1, p: 1, width: '100%', mt: '64px' }}>
          <Routes>
            <Route index element={<HomePage />} />
            {/*<Route index element={<div>This is the home page</div>} />*/}
            <Route path="/room/:roomName" element={<Room />} />
            <Route path="test-socket" element={<TestSocket />} />
            <Route path="about" element={<div>hi</div>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
      </Box>

      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? 'dark' : 'light'}
      />
      <LoadingModal />
    </ThemeProvider>
  );
}

export default App;
