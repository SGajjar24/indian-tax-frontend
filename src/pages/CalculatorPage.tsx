import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid as MuiGrid,
  TextField,
  MenuItem,
  Button,
  Divider,
  Tooltip,
  Card,
  CardContent,
  IconButton,
  useTheme,
  Tab,
  Tabs
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import CalculateIcon from '@mui/icons-material/Calculate';
import InfoIcon from '@mui/icons-material/Info';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import TaxRegimeComparison from '../components/TaxRegimeComparison';
import {
  calculateTaxLiability,
  calculateTaxSavings,
  IncomeDetails,
  DeductionDetails
} from '../utils/taxCalculator';

// Tax regime options
const taxRegimes = [
  { value: 'old', label: 'Old Tax Regime' },
  { value: 'new', label: 'New Tax Regime' }
];

// Income source options
const incomeSources = [
  { value: 'salary', label: 'Salary Income' },
  { value: 'business', label: 'Business/Profession' },
  { value: 'capital_gains', label: 'Capital Gains' },
  { value: 'house_property', label: 'House Property' },
  { value: 'other', label: 'Other Sources' }
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tax-tabpanel-${index}`}
      aria-labelledby={`tax-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Grid = MuiGrid;

const CalculatorPage: React.FC = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);

  // State for form inputs
  const [taxRegime, setTaxRegime] = useState<'old' | 'new'>('new');
  const [incomeSource, setIncomeSource] = useState('salary');
  const [salaryIncome, setSalaryIncome] = useState<number | ''>('');
  const [businessIncome, setBusinessIncome] = useState<number | ''>('');
  const [capitalGains, setCapitalGains] = useState<number | ''>('');
  const [housePropertyIncome, setHousePropertyIncome] = useState<number | ''>('');
  const [otherIncome, setOtherIncome] = useState<number | ''>('');

  // State for deductions (only applicable for old regime)
  const [section80C, setSection80C] = useState<number | ''>('');
  const [section80D, setSection80D] = useState<number | ''>('');
  const [hra, setHra] = useState<number | ''>('');
  const [lta, setLta] = useState<number | ''>('');
  const [nps, setNps] = useState<number | ''>('');
  const [homeLoanInterest, setHomeLoanInterest] = useState<number | ''>('');
  const [otherDeductions, setOtherDeductions] = useState<number | ''>('');

  // State for calculation results
  const [taxResult, setTaxResult] = useState<{
    totalIncome: number;
    totalDeductions: number;
    taxableIncome: number;
    incomeTax: number;
    surcharge: number;
    cess: number;
    totalTaxLiability: number;
  } | null>(null);

  // State for regime comparison
  const [comparisonResult, setComparisonResult] = useState<{
    oldRegimeTax: number;
    newRegimeTax: number;
    savings: number;
    betterRegime: 'old' | 'new';
  } | null>(null);

  // Helper function to convert string or empty to number
  const toNumber = (value: number | ''): number => {
    return typeof value === 'number' ? value : 0;
  };

  // Prepare income details object
  const getIncomeDetails = (): IncomeDetails => {
    return {
      salaryIncome: toNumber(salaryIncome),
      businessIncome: toNumber(businessIncome),
      capitalGains: toNumber(capitalGains),
      housePropertyIncome: toNumber(housePropertyIncome),
      otherIncome: toNumber(otherIncome)
    };
  };

  // Prepare deduction details object
  const getDeductionDetails = (): DeductionDetails => {
    return {
      section80C: toNumber(section80C),
      section80D: toNumber(section80D),
      hra: toNumber(hra),
      lta: toNumber(lta),
      nps: toNumber(nps),
      homeLoanInterest: toNumber(homeLoanInterest),
      otherDeductions: toNumber(otherDeductions)
    };
  };

  // Handle tax calculation
  const handleCalculate = () => {
    const incomeDetails = getIncomeDetails();
    const deductionDetails = getDeductionDetails();

    const result = calculateTaxLiability(incomeDetails, deductionDetails, taxRegime);
    setTaxResult(result);

    // Also calculate comparison if we're on the comparison tab
    if (tabValue === 1) {
      handleCompare();
    }
  };

  // Handle regime comparison
  const handleCompare = () => {
    const incomeDetails = getIncomeDetails();
    const deductionDetails = getDeductionDetails();

    const comparison = calculateTaxSavings(incomeDetails, deductionDetails);
    setComparisonResult(comparison);
  };

  // Handle save calculation
  const handleSave = () => {
    // This would be implemented with backend integration
    alert('Save functionality will be integrated with user accounts');
  };

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);

    // If switching to comparison tab and we have tax results, calculate comparison
    if (newValue === 1 && taxResult) {
      handleCompare();
    }
  };

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
          Tax Calculator
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          gutterBottom
          sx={{ mb: 4 }}
        >
          Calculate your income tax liability for FY 2024-2025 (AY 2025-2026)
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="tax calculator tabs"
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab
              label="Tax Calculator"
              icon={<CalculateIcon />}
              iconPosition="start"
              sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}
            />
            <Tab
              label="Regime Comparison"
              icon={<CompareArrowsIcon />}
              iconPosition="start"
              sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}
            />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={4}>
            {/* Form Section */}
            <Grid item xs={12} md={8}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  mb: 4
                }}
              >
                <Typography
                  variant="h5"
                  component="h2"
                  fontWeight="600"
                  fontFamily="Poppins, sans-serif"
                  gutterBottom
                >
                  Income Details
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      fullWidth
                      label="Tax Regime"
                      value={taxRegime}
                      onChange={(e) => setTaxRegime(e.target.value as 'old' | 'new')}
                      helperText="Select your preferred tax regime"
                      margin="normal"
                    >
                      {taxRegimes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      fullWidth
                      label="Primary Income Source"
                      value={incomeSource}
                      onChange={(e) => setIncomeSource(e.target.value)}
                      margin="normal"
                    >
                      {incomeSources.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={12}>
                    <Divider sx={{ my: 1 }} />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TextField
                        fullWidth
                        label="Salary Income"
                        type="number"
                        value={salaryIncome}
                        onChange={(e) => setSalaryIncome(e.target.value === '' ? '' : Number(e.target.value))}
                        InputProps={{ startAdornment: '₹' }}
                        margin="normal"
                      />
                      <Tooltip title="Include basic salary, HRA, allowances, and perquisites">
                        <IconButton size="small" sx={{ ml: 1 }}>
                          <HelpOutlineIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TextField
                        fullWidth
                        label="Business/Professional Income"
                        type="number"
                        value={businessIncome}
                        onChange={(e) => setBusinessIncome(e.target.value === '' ? '' : Number(e.target.value))}
                        InputProps={{ startAdornment: '₹' }}
                        margin="normal"
                      />
                      <Tooltip title="Net profit from business or profession after expenses">
                        <IconButton size="small" sx={{ ml: 1 }}>
                          <HelpOutlineIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Capital Gains"
                      type="number"
                      value={capitalGains}
                      onChange={(e) => setCapitalGains(e.target.value === '' ? '' : Number(e.target.value))}
                      InputProps={{ startAdornment: '₹' }}
                      margin="normal"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Income from House Property"
                      type="number"
                      value={housePropertyIncome}
                      onChange={(e) => setHousePropertyIncome(e.target.value === '' ? '' : Number(e.target.value))}
                      InputProps={{ startAdornment: '₹' }}
                      margin="normal"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Income from Other Sources"
                      type="number"
                      value={otherIncome}
                      onChange={(e) => setOtherIncome(e.target.value === '' ? '' : Number(e.target.value))}
                      InputProps={{ startAdornment: '₹' }}
                      margin="normal"
                    />
                  </Grid>
                </Grid>
              </Paper>

              {/* Deductions Section - Only for Old Regime */}
              {taxRegime === 'old' && (
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    mb: 4
                  }}
                >
                  <Typography
                    variant="h5"
                    component="h2"
                    fontWeight="600"
                    fontFamily="Poppins, sans-serif"
                    gutterBottom
                  >
                    Deductions & Exemptions
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <TextField
                          fullWidth
                          label="Section 80C (Max ₹1,50,000)"
                          type="number"
                          value={section80C}
                          onChange={(e) => setSection80C(e.target.value === '' ? '' : Number(e.target.value))}
                          InputProps={{ startAdornment: '₹' }}
                          margin="normal"
                        />
                        <Tooltip title="Includes PPF, ELSS, LIC, etc.">
                          <IconButton size="small" sx={{ ml: 1 }}>
                            <HelpOutlineIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <TextField
                          fullWidth
                          label="Section 80D - Medical Insurance (Max ₹50,000)"
                          type="number"
                          value={section80D}
                          onChange={(e) => setSection80D(e.target.value === '' ? '' : Number(e.target.value))}
                          InputProps={{ startAdornment: '₹' }}
                          margin="normal"
                        />
                        <Tooltip title="Medical insurance premium for self, family, and parents">
                          <IconButton size="small" sx={{ ml: 1 }}>
                            <HelpOutlineIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="HRA Exemption"
                        type="number"
                        value={hra}
                        onChange={(e) => setHra(e.target.value === '' ? '' : Number(e.target.value))}
                        InputProps={{ startAdornment: '₹' }}
                        margin="normal"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="LTA Exemption (Max ₹50,000)"
                        type="number"
                        value={lta}
                        onChange={(e) => setLta(e.target.value === '' ? '' : Number(e.target.value))}
                        InputProps={{ startAdornment: '₹' }}
                        margin="normal"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="NPS Contribution (Max ₹50,000)"
                        type="number"
                        value={nps}
                        onChange={(e) => setNps(e.target.value === '' ? '' : Number(e.target.value))}
                        InputProps={{ startAdornment: '₹' }}
                        margin="normal"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Home Loan Interest (Max ₹2,00,000)"
                        type="number"
                        value={homeLoanInterest}
                        onChange={(e) => setHomeLoanInterest(e.target.value === '' ? '' : Number(e.target.value))}
                        InputProps={{ startAdornment: '₹' }}
                        margin="normal"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Other Deductions"
                        type="number"
                        value={otherDeductions}
                        onChange={(e) => setOtherDeductions(e.target.value === '' ? '' : Number(e.target.value))}
                        InputProps={{ startAdornment: '₹' }}
                        margin="normal"
                      />
                    </Grid>
                  </Grid>
                </Paper>
              )}

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<CalculateIcon />}
                  onClick={handleCalculate}
                  sx={{
                    py: 1.5,
                    px: 4,
                    fontWeight: 600,
                    borderRadius: 2
                  }}
                >
                  Calculate Tax
                </Button>

                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  startIcon={<SaveAltIcon />}
                  onClick={handleSave}
                  sx={{
                    py: 1.5,
                    px: 4,
                    fontWeight: 600,
                    borderRadius: 2
                  }}
                >
                  Save Calculation
                </Button>
              </Box>
            </Grid>

            {/* Results Section */}
            <Grid item xs={12} md={4}>
              <Box sx={{ position: 'sticky', top: 24 }}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    mb: 4
                  }}
                >
                  <Typography
                    variant="h5"
                    component="h2"
                    fontWeight="600"
                    fontFamily="Poppins, sans-serif"
                    gutterBottom
                  >
                    Tax Calculation Results
                  </Typography>

                  {!taxResult ? (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <InfoIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                      <Typography variant="body1" color="text.secondary">
                        Fill in your income details and click "Calculate Tax" to see your tax liability.
                      </Typography>
                    </Box>
                  ) : (
                    <Box>
                      <Card
                        sx={{
                          bgcolor: 'primary.main',
                          color: 'white',
                          borderRadius: 2,
                          mb: 3
                        }}
                      >
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            Total Tax Liability
                          </Typography>
                          <Typography variant="h4" fontWeight="bold" fontFamily="Poppins, sans-serif">
                            ₹{taxResult.totalTaxLiability.toLocaleString('en-IN')}
                          </Typography>
                          <Typography variant="body2" sx={{ opacity: 0.8 }}>
                            Tax Regime: {taxRegime === 'old' ? 'Old Regime' : 'New Regime'}
                          </Typography>
                        </CardContent>
                      </Card>

                      <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                        Income Breakdown
                      </Typography>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Total Income:</Typography>
                        <Typography variant="body2" fontWeight="500">₹{taxResult.totalIncome.toLocaleString('en-IN')}</Typography>
                      </Box>

                      {taxRegime === 'old' && (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2">Total Deductions:</Typography>
                          <Typography variant="body2" fontWeight="500">₹{taxResult.totalDeductions.toLocaleString('en-IN')}</Typography>
                        </Box>
                      )}

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="body2">Taxable Income:</Typography>
                        <Typography variant="body2" fontWeight="500">₹{taxResult.taxableIncome.toLocaleString('en-IN')}</Typography>
                      </Box>

                      <Divider sx={{ my: 2 }} />

                      <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                        Tax Breakdown
                      </Typography>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Income Tax:</Typography>
                        <Typography variant="body2" fontWeight="500">₹{taxResult.incomeTax.toLocaleString('en-IN')}</Typography>
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Surcharge:</Typography>
                        <Typography variant="body2" fontWeight="500">₹{taxResult.surcharge.toLocaleString('en-IN')}</Typography>
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="body2">Health & Education Cess:</Typography>
                        <Typography variant="body2" fontWeight="500">₹{taxResult.cess.toLocaleString('en-IN')}</Typography>
                      </Box>

                      <Divider sx={{ my: 2 }} />

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="subtitle1" fontWeight="600">Total Tax Liability:</Typography>
                        <Typography variant="subtitle1" fontWeight="700" color="primary.main">₹{taxResult.totalTaxLiability.toLocaleString('en-IN')}</Typography>
                      </Box>

                      <Button
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        onClick={() => setTabValue(1)}
                        startIcon={<CompareArrowsIcon />}
                        sx={{ mt: 3 }}
                      >
                        Compare Tax Regimes
                      </Button>
                    </Box>
                  )}
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <TaxRegimeComparison
            comparisonResult={comparisonResult}
            onCalculate={handleCompare}
          />
        </TabPanel>
      </Container>
    </Box>
  );
};

export default CalculatorPage;
