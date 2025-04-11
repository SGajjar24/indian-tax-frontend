import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid as MuiGrid, 
  Link, 
  Divider,
  IconButton,
  useTheme
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

const Grid = MuiGrid;

const Footer: React.FC = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      sx={{
        bgcolor: 'grey.100',
        py: 6,
        mt: 8
      }}
      component="footer"
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight="bold" fontFamily="Poppins, sans-serif" gutterBottom>
              Indian Tax Calculator
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              A comprehensive tax calculator for Indian taxpayers, supporting both old and new tax regimes for FY 2024-2025.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton aria-label="facebook" color="primary" size="small">
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="twitter" color="primary" size="small">
                <TwitterIcon />
              </IconButton>
              <IconButton aria-label="linkedin" color="primary" size="small">
                <LinkedInIcon />
              </IconButton>
              <IconButton aria-label="instagram" color="primary" size="small">
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>
          
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Quick Links
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              <Box component="li" sx={{ mb: 1 }}>
                <Link component={RouterLink} to="/" color="inherit" underline="hover">
                  Home
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link component={RouterLink} to="/calculator" color="inherit" underline="hover">
                  Tax Calculator
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link component={RouterLink} to="/upload" color="inherit" underline="hover">
                  Document Upload
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link component={RouterLink} to="/deductions" color="inherit" underline="hover">
                  Deductions
                </Link>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Resources
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              <Box component="li" sx={{ mb: 1 }}>
                <Link component={RouterLink} to="/planning" color="inherit" underline="hover">
                  Tax Planning
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link component={RouterLink} to="/reports" color="inherit" underline="hover">
                  Reports
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link component={RouterLink} to="/help" color="inherit" underline="hover">
                  Help & Support
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link href="#" color="inherit" underline="hover">
                  Blog
                </Link>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Stay Updated
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Subscribe to our newsletter for the latest tax updates, tips, and resources.
            </Typography>
            <Box sx={{ 
              p: 2, 
              bgcolor: theme.palette.primary.light, 
              color: 'white',
              borderRadius: 2,
              textAlign: 'center'
            }}>
              <Typography variant="body2" fontWeight="medium" paragraph>
                Need tax assistance?
              </Typography>
              <Link 
                component={RouterLink} 
                to="/help"
                sx={{ 
                  color: 'white', 
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                Contact our support team →
              </Link>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4 }} />
        
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {currentYear} Indian Tax Calculator. All rights reserved.
          </Typography>
          
          <Box sx={{ mt: { xs: 2, sm: 0 } }}>
            <Link href="#" color="inherit" underline="hover" sx={{ mx: 1 }}>
              Privacy Policy
            </Link>
            <Link href="#" color="inherit" underline="hover" sx={{ mx: 1 }}>
              Terms of Service
            </Link>
            <Link href="#" color="inherit" underline="hover" sx={{ mx: 1 }}>
              Disclaimer
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
