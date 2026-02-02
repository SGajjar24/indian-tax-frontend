import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  useMediaQuery,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  useTheme,
  Link
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CalculateIcon from '@mui/icons-material/Calculate';
import CalculateIcon from '@mui/icons-material/Calculate';
import SavingsIcon from '@mui/icons-material/Savings';
import BarChartIcon from '@mui/icons-material/BarChart';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import HomeIcon from '@mui/icons-material/Home';

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { name: 'Home', path: '/', icon: <HomeIcon /> },
    { name: 'Calculator', path: '/calculator', icon: <CalculateIcon /> },
    { name: 'Deductions', path: '/deductions', icon: <SavingsIcon /> },
    { name: 'Planning', path: '/planning', icon: <BarChartIcon /> },
    { name: 'Reports', path: '/reports', icon: <BarChartIcon /> },
    { name: 'Help', path: '/help', icon: <HelpOutlineIcon /> }
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
        Indian Tax Calculator
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.name}
            component={RouterLink}
            to={item.path}
            sx={{
              color: location.pathname === item.path ? 'primary.main' : 'text.primary',
              fontWeight: location.pathname === item.path ? 700 : 400,
              '&:hover': {
                bgcolor: 'rgba(74, 144, 226, 0.08)'
              }
            }}
          >
            <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
              {item.icon}
            </Box>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 700,
              color: 'primary.main',
              textDecoration: 'none',
              flexGrow: { xs: 0, md: 1 }
            }}
          >
            Indian Tax Calculator
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 700,
                color: 'primary.main',
                textDecoration: 'none',
                ml: 1
              }}
            >
              Tax Calculator
            </Typography>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 'auto' }}>
            {navItems.map((item) => (
              <Button
                key={item.name}
                component={RouterLink}
                to={item.path}
                sx={{
                  color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                  fontWeight: location.pathname === item.path ? 700 : 500,
                  mx: 1,
                  '&:hover': {
                    bgcolor: 'rgba(74, 144, 226, 0.08)'
                  }
                }}
                startIcon={item.icon}
              >
                {item.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Header;
