import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid as MuiGrid,
  Paper,
  Card,
  CardContent,
  useTheme
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import CalculateIcon from '@mui/icons-material/Calculate';
import CalculateIcon from '@mui/icons-material/Calculate';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import SavingsIcon from '@mui/icons-material/Savings';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const Grid = MuiGrid;

const HomePage: React.FC = () => {
  const theme = useTheme();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography
                variant="h2"
                component="h1"
                fontWeight="bold"
                fontFamily="Poppins, sans-serif"
                gutterBottom
                className="fade-in"
              >
                Indian Tax Calculator
                <Box component="span" sx={{ color: theme.palette.secondary.main }}>
                  {' '}FY 2024-25
                </Box>
              </Typography>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ mb: 4, opacity: 0.9 }}
              >
                Calculate your income tax liability with our comprehensive tax calculator supporting both old and new tax regimes.
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  component={RouterLink}
                  to="/calculator"
                  startIcon={<CalculateIcon />}
                  sx={{
                    py: 1.5,
                    px: 4,
                    fontWeight: 'bold',
                    fontSize: '1.1rem'
                  }}
                >
                  Calculate Now
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  bgcolor: 'background.paper',
                  borderRadius: 4,
                  p: 4,
                  boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                  transform: { md: 'rotate(2deg)' }
                }}
              >
                <Typography
                  variant="h5"
                  component="h2"
                  fontWeight="bold"
                  color="text.primary"
                  gutterBottom
                >
                  Tax Regime Comparison
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body1" fontWeight="medium">Income:</Typography>
                  <Typography variant="body1" fontWeight="bold">₹12,00,000</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body1" fontWeight="medium">Old Regime Tax:</Typography>
                  <Typography variant="body1" fontWeight="bold" color="error.main">₹1,85,120</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="body1" fontWeight="medium">New Regime Tax:</Typography>
                  <Typography variant="body1" fontWeight="bold" color="success.main">₹1,17,000</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, bgcolor: 'success.light', color: 'white', borderRadius: 2 }}>
                  <Typography variant="body1" fontWeight="bold">You Save:</Typography>
                  <Typography variant="body1" fontWeight="bold">₹68,120</Typography>
                </Box>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  component={RouterLink}
                  to="/calculator"
                  sx={{ mt: 3 }}
                >
                  Calculate Your Savings
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>

        {/* Decorative Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.1)',
            zIndex: 0
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -50,
            left: -50,
            width: 200,
            height: 200,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.1)',
            zIndex: 0
          }}
        />
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            component="h2"
            fontWeight="bold"
            fontFamily="Poppins, sans-serif"
            gutterBottom
          >
            Key Features
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 800, mx: 'auto' }}
          >
            Our tax calculator offers a comprehensive suite of tools to simplify your tax planning and calculation.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                height: '100%',
                borderRadius: 4,
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)'
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    bgcolor: 'primary.light',
                    color: 'white',
                    p: 1.5,
                    borderRadius: 2,
                    mr: 2
                  }}
                >
                  <CompareArrowsIcon fontSize="large" />
                </Box>
                <Typography
                  variant="h5"
                  component="h3"
                  fontWeight="bold"
                  fontFamily="Poppins, sans-serif"
                >
                  Regime Comparison
                </Typography>
              </Box>
              <Typography variant="body1" paragraph>
                Compare tax liability between old and new tax regimes to determine which one is more beneficial for you.
              </Typography>
              <Button
                component={RouterLink}
                to="/calculator"
                color="primary"
                sx={{ fontWeight: 'medium' }}
              >
                Compare Now
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* How It Works Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h3"
              component="h2"
              fontWeight="bold"
              fontFamily="Poppins, sans-serif"
              gutterBottom
            >
              How It Works
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 800, mx: 'auto' }}
            >
              Calculate your taxes in three simple steps
            </Typography>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Card
                elevation={0}
                sx={{
                  bgcolor: 'transparent',
                  height: '100%',
                  textAlign: 'center'
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    fontFamily: 'Poppins, sans-serif'
                  }}
                >
                  1
                </Box>
                <Typography
                  variant="h5"
                  component="h3"
                  fontWeight="bold"
                  fontFamily="Poppins, sans-serif"
                  gutterBottom
                >
                  Enter Income Details
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Provide your income from various sources like salary, business, capital gains, and other income.
                </Typography>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card
                elevation={0}
                sx={{
                  bgcolor: 'transparent',
                  height: '100%',
                  textAlign: 'center'
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    fontFamily: 'Poppins, sans-serif'
                  }}
                >
                  2
                </Box>
                <Typography
                  variant="h5"
                  component="h3"
                  fontWeight="bold"
                  fontFamily="Poppins, sans-serif"
                  gutterBottom
                >
                  Add Deductions
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Include your eligible deductions under various sections like 80C, 80D, HRA, and more.
                </Typography>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card
                elevation={0}
                sx={{
                  bgcolor: 'transparent',
                  height: '100%',
                  textAlign: 'center'
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    fontFamily: 'Poppins, sans-serif'
                  }}
                >
                  3
                </Box>
                <Typography
                  variant="h5"
                  component="h3"
                  fontWeight="bold"
                  fontFamily="Poppins, sans-serif"
                  gutterBottom
                >
                  Get Results
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  View your detailed tax breakdown, compare tax regimes, and generate comprehensive reports.
                </Typography>
              </Card>
            </Grid>
          </Grid>

          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={RouterLink}
              to="/calculator"
              startIcon={<CalculateIcon />}
              sx={{
                py: 1.5,
                px: 4,
                fontWeight: 'bold',
                fontSize: '1.1rem'
              }}
            >
              Start Calculating
            </Button>
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          bgcolor: 'primary.dark',
          color: 'white',
          py: 8,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={8} sx={{ textAlign: 'center' }}>
              <Typography
                variant="h3"
                component="h2"
                fontWeight="bold"
                fontFamily="Poppins, sans-serif"
                gutterBottom
              >
                Ready to Calculate Your Taxes?
              </Typography>
              <Typography variant="h6" paragraph sx={{ opacity: 0.9 }}>
                Get started with our comprehensive tax calculator for FY 2024-25
              </Typography>
              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  component={RouterLink}
                  to="/calculator"
                  startIcon={<CalculateIcon />}
                  sx={{
                    py: 1.5,
                    px: 4,
                    fontWeight: 'bold',
                    fontSize: '1.1rem'
                  }}
                >
                  Calculate Now
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  component={RouterLink}
                  to="/help"
                  sx={{
                    py: 1.5,
                    px: 4,
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    borderWidth: 2,
                    '&:hover': {
                      borderWidth: 2
                    }
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>

        {/* Decorative Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: -50,
            left: -50,
            width: 200,
            height: 200,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.05)',
            zIndex: 0
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.05)',
            zIndex: 0
          }}
        />
      </Box>

      {/* Reports Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                bgcolor: 'grey.100',
                borderRadius: 4,
                p: 4,
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
              }}
            >
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <AssessmentIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography
                  variant="h5"
                  component="h3"
                  fontWeight="bold"
                  fontFamily="Poppins, sans-serif"
                  gutterBottom
                >
                  Comprehensive Tax Reports
                </Typography>
              </Box>

              <Box sx={{ mb: 3, p: 3, bgcolor: 'white', borderRadius: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Tax Summary Report
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Detailed breakdown of your income, deductions, and tax liability.
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  component={RouterLink}
                  to="/reports"
                >
                  View Sample
                </Button>
              </Box>

              <Box sx={{ mb: 3, p: 3, bgcolor: 'white', borderRadius: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Regime Comparison Report
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Side-by-side comparison of tax liability under old and new regimes.
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  component={RouterLink}
                  to="/reports"
                >
                  View Sample
                </Button>
              </Box>

              <Box sx={{ p: 3, bgcolor: 'white', borderRadius: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Tax Planning Report
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Personalized recommendations for tax-saving investments.
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  component={RouterLink}
                  to="/reports"
                >
                  View Sample
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              component="h2"
              fontWeight="bold"
              fontFamily="Poppins, sans-serif"
              gutterBottom
            >
              Generate Detailed Tax Reports
            </Typography>
            <Typography variant="body1" paragraph>
              Our tax calculator provides comprehensive reports that help you understand your tax liability in detail and make informed financial decisions.
            </Typography>
            <Typography variant="body1" paragraph>
              You can generate various types of reports including tax summary, regime comparison, and tax planning reports. These reports can be downloaded in PDF, Excel, or CSV formats for your records.
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                component={RouterLink}
                to="/reports"
                startIcon={<AssessmentIcon />}
                sx={{
                  py: 1.5,
                  px: 4,
                  fontWeight: 'bold',
                  fontSize: '1.1rem'
                }}
              >
                Explore Reports
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;
