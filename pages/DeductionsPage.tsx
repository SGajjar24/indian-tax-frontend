import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Grid as MuiGrid, 
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment,
  Button,
  Divider,
  Card,
  CardContent,
  useTheme,
  IconButton,
  Tooltip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SavingsIcon from '@mui/icons-material/Savings';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ElderlyIcon from '@mui/icons-material/Elderly';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

const Grid = MuiGrid;

// Define deduction categories and items
const deductionCategories = [
  {
    id: 'section80c',
    title: 'Section 80C Deductions',
    icon: <SavingsIcon />,
    maxLimit: '₹1,50,000',
    description: 'Deductions for investments and expenses under Section 80C of the Income Tax Act',
    items: [
      { name: 'Public Provident Fund (PPF)', limit: '₹1,50,000', description: 'Long-term savings scheme with tax-free returns' },
      { name: 'Equity Linked Savings Scheme (ELSS)', limit: '₹1,50,000', description: 'Tax-saving mutual funds with 3-year lock-in period' },
      { name: 'National Savings Certificate (NSC)', limit: '₹1,50,000', description: 'Fixed income investment with 5-year tenure' },
      { name: 'Tax Saving Fixed Deposits', limit: '₹1,50,000', description: '5-year tax-saving bank deposits' },
      { name: 'Life Insurance Premium', limit: '₹1,50,000', description: 'Premiums paid for life insurance policies' },
      { name: 'Sukanya Samriddhi Yojana', limit: '₹1,50,000', description: 'Savings scheme for girl child education and marriage expenses' },
      { name: 'Employee Provident Fund (EPF)', limit: '₹1,50,000', description: 'Mandatory retirement savings scheme for salaried employees' },
      { name: 'Home Loan Principal Repayment', limit: '₹1,50,000', description: 'Principal component of housing loan EMI' },
      { name: 'Tuition Fees', limit: '₹1,50,000', description: 'Tuition fees for full-time education of up to 2 children' },
      { name: 'ULIP Premium', limit: '₹1,50,000', description: 'Unit Linked Insurance Plan premium payments' }
    ]
  },
  {
    id: 'section80d',
    title: 'Section 80D - Health Insurance',
    icon: <MedicalServicesIcon />,
    maxLimit: '₹1,00,000',
    description: 'Deductions for health insurance premiums and medical expenses',
    items: [
      { name: 'Self & Family Health Insurance', limit: '₹25,000', description: 'Health insurance premium for self, spouse, and children' },
      { name: 'Senior Citizen Self & Family', limit: '₹50,000', description: 'Health insurance premium for self and family (if self is senior citizen)' },
      { name: 'Parents Health Insurance', limit: '₹25,000', description: 'Health insurance premium for parents (below 60 years)' },
      { name: 'Senior Citizen Parents', limit: '₹50,000', description: 'Health insurance premium for parents (above 60 years)' },
      { name: 'Preventive Health Check-up', limit: '₹5,000', description: 'Expenses incurred for preventive health check-ups' },
      { name: 'Medical Expenditure for Senior Citizens', limit: '₹50,000', description: 'Medical expenditure for senior citizens who don\'t have health insurance' }
    ]
  },
  {
    id: 'housing',
    title: 'Housing & Property Deductions',
    icon: <HomeIcon />,
    maxLimit: 'Various',
    description: 'Deductions related to housing loans and property',
    items: [
      { name: 'Home Loan Interest (Self-Occupied)', limit: '₹2,00,000', description: 'Interest paid on housing loan for self-occupied property' },
      { name: 'Home Loan Interest (Let Out)', limit: 'No Limit', description: 'Interest paid on housing loan for rented property' },
      { name: 'House Rent Allowance (HRA)', limit: 'Based on formula', description: 'Tax exemption on house rent allowance received from employer' },
      { name: 'Rent Paid (Section 80GG)', limit: '₹60,000', description: 'Deduction for rent paid when HRA is not received from employer' },
      { name: 'Stamp Duty & Registration Charges', limit: 'Included in 80C', description: 'One-time deduction for stamp duty and registration charges for home purchase' }
    ]
  },
  {
    id: 'education',
    title: 'Education & Skill Development',
    icon: <SchoolIcon />,
    maxLimit: 'Various',
    description: 'Deductions related to education loans and skill development',
    items: [
      { name: 'Education Loan Interest (80E)', limit: 'No Limit', description: 'Interest paid on loan taken for higher education' },
      { name: 'Skill Development Program Fee', limit: '₹1,50,000 (under 80C)', description: 'Fees paid for skill development programs' },
      { name: 'Children Education Allowance', limit: '₹100 per month per child (max 2)', description: 'Exemption for allowance received from employer for children\'s education' },
      { name: 'Children Hostel Allowance', limit: '₹300 per month per child (max 2)', description: 'Exemption for allowance received from employer for children\'s hostel expenses' }
    ]
  },
  {
    id: 'retirement',
    title: 'Retirement & Pension',
    icon: <ElderlyIcon />,
    maxLimit: 'Various',
    description: 'Deductions for retirement planning and pension schemes',
    items: [
      { name: 'National Pension System (80CCD)', limit: '₹50,000 (additional)', description: 'Additional deduction for contribution to NPS beyond 80C limit' },
      { name: 'Employer Contribution to NPS', limit: '10% of Salary', description: 'Deduction for employer\'s contribution to NPS' },
      { name: 'Atal Pension Yojana', limit: 'Included in 80C', description: 'Pension scheme for unorganized sector workers' },
      { name: 'Senior Citizen Savings Scheme', limit: 'Included in 80C', description: 'Savings scheme for senior citizens with higher interest rates' }
    ]
  },
  {
    id: 'other',
    title: 'Other Deductions',
    icon: <VolunteerActivismIcon />,
    maxLimit: 'Various',
    description: 'Miscellaneous deductions under various sections',
    items: [
      { name: 'Donations (80G)', limit: '50% or 100% of donation', description: 'Deduction for donations to approved charitable organizations' },
      { name: 'Interest on Savings Account (80TTA)', limit: '₹10,000', description: 'Deduction for interest earned on savings bank accounts' },
      { name: 'Interest for Senior Citizens (80TTB)', limit: '₹50,000', description: 'Deduction for interest income for senior citizens' },
      { name: 'Disability (80U)', limit: '₹75,000 to ₹1,25,000', description: 'Deduction for individuals with disabilities' },
      { name: 'Medical Treatment (80DDB)', limit: '₹40,000 to ₹1,00,000', description: 'Deduction for medical treatment of specified diseases' },
      { name: 'Interest on Electric Vehicle Loan (80EEB)', limit: '₹1,50,000', description: 'Deduction for interest paid on loan for electric vehicle purchase' },
      { name: 'Patent Filing (80RRB)', limit: 'Actual Income', description: 'Deduction for income from patents for resident individuals' }
    ]
  }
];

const DeductionsPage: React.FC = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [expanded, setExpanded] = useState<string | false>(false);

  // Handle accordion change
  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Filter deductions based on search term
  const filteredDeductions = searchTerm.trim() === '' 
    ? deductionCategories 
    : deductionCategories.map(category => ({
        ...category,
        items: category.items.filter(item => 
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })).filter(category => category.items.length > 0);

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          component="h1" 
          fontWeight="bold" 
          fontFamily="Poppins, sans-serif"
          gutterBottom
          className="fade-in"
        >
          Deductions & Exemptions
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary" 
          gutterBottom
          sx={{ mb: 4 }}
        >
          Explore all available tax deductions and exemptions under the old tax regime
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {/* Search Bar */}
            <Paper
              elevation={2}
              sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                mb: 4,
                borderRadius: 2
              }}
            >
              <IconButton sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
              </IconButton>
              <TextField
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search deductions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                }}
              />
              {searchTerm && (
                <Button 
                  sx={{ p: '10px' }}
                  onClick={() => setSearchTerm('')}
                >
                  Clear
                </Button>
              )}
            </Paper>
            
            {/* Deduction Categories */}
            {filteredDeductions.length > 0 ? (
              filteredDeductions.map((category) => (
                <Accordion 
                  key={category.id}
                  expanded={expanded === category.id}
                  onChange={handleChange(category.id)}
                  sx={{ 
                    mb: 3,
                    borderRadius: expanded === category.id ? '16px 16px 0 0' : 4,
                    overflow: 'hidden',
                    '&:before': { display: 'none' },
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{ 
                      bgcolor: expanded === category.id ? 'primary.main' : 'grey.50',
                      color: expanded === category.id ? 'white' : 'inherit',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box 
                        sx={{ 
                          mr: 2, 
                          color: expanded === category.id ? 'white' : 'primary.main',
                          display: 'flex'
                        }}
                      >
                        {category.icon}
                      </Box>
                      <Box>
                        <Typography variant="h6" fontWeight="600" fontFamily="Poppins, sans-serif">
                          {category.title}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: expanded === category.id ? 'rgba(255,255,255,0.8)' : 'text.secondary',
                            display: { xs: 'none', sm: 'block' }
                          }}
                        >
                          Max Limit: {category.maxLimit}
                        </Typography>
                      </Box>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails sx={{ p: 0 }}>
                    <Box sx={{ p: 3, bgcolor: 'background.paper' }}>
                      <Typography variant="body1" paragraph>
                        {category.description}
                      </Typography>
                      
                      <Divider sx={{ my: 2 }} />
                      
                      <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                        Eligible Deductions:
                      </Typography>
                      
                      {category.items.map((item, index) => (
                        <Paper 
                          key={index}
                          elevation={1}
                          sx={{ 
                            p: 2, 
                            mb: 2, 
                            borderRadius: 2,
                            border: '1px solid',
                            borderColor: 'divider'
                          }}
                        >
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Box>
                              <Typography variant="subtitle1" fontWeight="500">
                                {item.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {item.description}
                              </Typography>
                            </Box>
                            <Box 
                              sx={{ 
                                bgcolor: 'primary.light', 
                                color: 'white', 
                                px: 2, 
                                py: 0.5, 
                                borderRadius: 4,
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                whiteSpace: 'nowrap',
                                ml: 2
                              }}
                            >
                              {item.limit}
                            </Box>
                          </Box>
                        </Paper>
                      ))}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              ))
            ) : (
              <Paper 
                elevation={2} 
                sx={{ 
                  p: 4, 
                  textAlign: 'center',
                  borderRadius: 4
                }}
              >
                <Typography variant="h6" color="text.secondary">
                  No deductions found matching "{searchTerm}"
                </Typography>
                <Button 
                  variant="outlined" 
                  color="primary"
                  onClick={() => setSearchTerm('')}
                  sx={{ mt: 2 }}
                >
                  Clear Search
                </Button>
              </Paper>
            )}
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box sx={{ position: 'sticky', top: 24 }}>
              {/* Quick Reference Card */}
              <Card 
                elevation={3}
                sx={{ 
                  borderRadius: 4,
                  mb: 4,
                  overflow: 'hidden'
                }}
              >
                <Box 
                  sx={{ 
                    bgcolor: 'primary.main',
                    color: 'white',
                    p: 3
                  }}
                >
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    fontWeight="600"
                    fontFamily="Poppins, sans-serif"
                    gutterBottom
                  >
                    Quick Reference
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Key deduction limits at a glance
                  </Typography>
                </Box>
                
                <CardContent>
                  <List>
                    <ListItem sx={{ px: 0, py: 1.5 }}>
                      <ListItemIcon>
                        <SavingsIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Section 80C" 
                        secondary="Maximum limit of ₹1,50,000"
                        primaryTypographyProps={{ fontWeight: 500 }}
                      />
                    </ListItem>
                    
                    <Divider component="li" />
                    
                    <ListItem sx={{ px: 0, py: 1.5 }}>
                      <ListItemIcon>
                        <MedicalServicesIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Section 80D (Health Insurance)" 
                        secondary="Up to ₹25,000 (self & family) + ₹50,000 (senior citizen parents)"
                        primaryTypographyProps={{ fontWeight: 500 }}
                      />
                    </ListItem>
                    
                    <Divider component="li" />
                    
                    <ListItem sx={{ px: 0, py: 1.5 }}>
                      <ListItemIcon>
                        <HomeIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Home Loan Interest" 
                        secondary="Up to ₹2,00,000 for self-occupied property"
                        primaryTypographyProps={{ fontWeight: 500 }}
                      />
                    </ListItem>
                    
                    <Divider component="li" />
                    
                    <ListItem sx={{ px: 0, py: 1.5 }}>
                      <ListItemIcon>
                        <AccountBalanceIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="National Pension System (NPS)" 
                        secondary="Additional ₹50,000 under Section 80CCD(1B)"
                        primaryTypographyProps={{ fontWeight: 500 }}
                      />
                    </ListItem>
                    
                    <Divider component="li" />
                    
                    <ListItem sx={{ px: 0, py: 1.5 }}>
                      <ListItemIcon>
                        <SchoolIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Education Loan Interest" 
                        secondary="No limit under Section 80E"
                        primaryTypographyProps={{ fontWeight: 500 }}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
              
              {/* Important Notes Card */}
              <Card 
                elevation={3}
                sx={{ 
                  borderRadius: 4,
                  bgcolor: 'secondary.light',
                  color: 'white'
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <InfoIcon sx={{ mr: 1 }} />
                    <Typography 
                      variant="h6" 
                      component="h3" 
                      fontWeight="600"
                      fontFamily="Poppins, sans-serif"
                    >
                      Important Notes
                    </Typography>
                  </Box>
                  
                  <Typography variant="body2" paragraph sx={{ opacity: 0.9 }}>
                    • Deductions are only available under the Old Tax Regime
                  </Typography>
                  
                  <Typography variant="body2" paragraph sx={{ opacity: 0.9 }}>
                    • The New Tax Regime offers lower tax rates but does not allow most deductions
                  </Typography>
                  
                  <Typography variant="body2" paragraph sx={{ opacity: 0.9 }}>
                    • Some deductions like Section 80CCD(2) (employer's NPS contribution) are available under both regimes
                  </Typography>
                  
                  <Typography variant="body2" paragraph sx={{ opacity: 0.9 }}>
                    • Always keep documents and proofs of all claimed deductions
                  </Typography>
                  
                  <Box sx={{ mt: 3 }}>
                    <Button 
                      variant="contained" 
                      fullWidth
                      component="a"
                      href="/calculator"
                      sx={{ 
                        py: 1.5,
                        fontWeight: 600,
                        bgcolor: 'white',
                        color: 'secondary.dark',
                        '&:hover': {
                          bgcolor: 'rgba(255,255,255,0.9)'
                        }
                      }}
                    >
                      Calculate Your Tax Now
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DeductionsPage;
