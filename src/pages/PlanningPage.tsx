import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Grid as MuiGrid, 
  TextField,
  InputAdornment,
  Button,
  Divider,
  Card,
  CardContent,
  useTheme,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tab,
  Tabs
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Line } from 'recharts';
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CalculateIcon from '@mui/icons-material/Calculate';
import SchoolIcon from '@mui/icons-material/School';
import HomeIcon from '@mui/icons-material/Home';
import SavingsIcon from '@mui/icons-material/Savings';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const Grid = MuiGrid;

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
      id={`planning-tabpanel-${index}`}
      aria-labelledby={`planning-tab-${index}`}
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

const PlanningPage: React.FC = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  
  // Investment Calculator State
  const [initialInvestment, setInitialInvestment] = useState<number>(100000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(10000);
  const [annualReturn, setAnnualReturn] = useState<number>(12);
  const [investmentDuration, setInvestmentDuration] = useState<number>(20);
  const [investmentResults, setInvestmentResults] = useState<any>(null);
  
  // Education Planning Calculator State
  const [educationGoal, setEducationGoal] = useState<number>(2000000);
  const [educationTimeframe, setEducationTimeframe] = useState<number>(10);
  const [educationInflation, setEducationInflation] = useState<number>(6);
  const [educationReturn, setEducationReturn] = useState<number>(10);
  const [educationResults, setEducationResults] = useState<any>(null);
  
  // Home Loan EMI Calculator State
  const [loanAmount, setLoanAmount] = useState<number>(3000000);
  const [loanTenure, setLoanTenure] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(7.5);
  const [loanResults, setLoanResults] = useState<any>(null);
  
  // Tax Saving Calculator State
  const [income, setIncome] = useState<number>(1200000);
  const [existingInvestments, setExistingInvestments] = useState<number>(50000);
  const [taxSavingResults, setTaxSavingResults] = useState<any>(null);
  
  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  // Calculate Investment Growth
  useEffect(() => {
    calculateInvestmentGrowth();
  }, [initialInvestment, monthlyContribution, annualReturn, investmentDuration]);
  
  const calculateInvestmentGrowth = () => {
    const monthlyRate = annualReturn / 100 / 12;
    const totalMonths = investmentDuration * 12;
    
    let futureValue = initialInvestment;
    let totalContributed = initialInvestment;
    const chartData = [];
    
    for (let month = 1; month <= totalMonths; month++) {
      futureValue = futureValue * (1 + monthlyRate) + monthlyContribution;
      totalContributed += monthlyContribution;
      
      if (month % 12 === 0) {
        const year = month / 12;
        chartData.push({
          year,
          investment: Math.round(totalContributed),
          value: Math.round(futureValue)
        });
      }
    }
    
    setInvestmentResults({
      futureValue: Math.round(futureValue),
      totalContributed,
      interestEarned: Math.round(futureValue - totalContributed),
      chartData
    });
  };
  
  // Calculate Education Planning
  useEffect(() => {
    calculateEducationPlanning();
  }, [educationGoal, educationTimeframe, educationInflation, educationReturn]);
  
  const calculateEducationPlanning = () => {
    const inflationAdjustedGoal = educationGoal * Math.pow(1 + educationInflation / 100, educationTimeframe);
    const monthlyRate = educationReturn / 100 / 12;
    const totalMonths = educationTimeframe * 12;
    
    // Calculate required monthly investment using PMT formula
    const monthlyInvestment = (inflationAdjustedGoal * monthlyRate) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    
    const chartData = [];
    let accumulatedAmount = 0;
    
    for (let year = 1; year <= educationTimeframe; year++) {
      const inflatedGoal = educationGoal * Math.pow(1 + educationInflation / 100, year);
      accumulatedAmount = monthlyInvestment * 12 * year * Math.pow(1 + educationReturn / 100, educationTimeframe - year);
      
      chartData.push({
        year,
        goal: Math.round(inflatedGoal),
        accumulated: Math.round(accumulatedAmount)
      });
    }
    
    setEducationResults({
      inflationAdjustedGoal: Math.round(inflationAdjustedGoal),
      monthlyInvestment: Math.round(monthlyInvestment),
      totalInvestment: Math.round(monthlyInvestment * totalMonths),
      chartData
    });
  };
  
  // Calculate Loan EMI
  useEffect(() => {
    calculateLoanEMI();
  }, [loanAmount, loanTenure, interestRate]);
  
  const calculateLoanEMI = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = loanTenure * 12;
    
    // Calculate EMI using formula: P * r * (1+r)^n / ((1+r)^n - 1)
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    
    const totalPayment = emi * totalMonths;
    const totalInterest = totalPayment - principal;
    
    const chartData = [];
    let remainingPrincipal = principal;
    let yearlyPrincipal = 0;
    let yearlyInterest = 0;
    
    for (let month = 1; month <= totalMonths; month++) {
      const interestPayment = remainingPrincipal * monthlyRate;
      const principalPayment = emi - interestPayment;
      
      remainingPrincipal -= principalPayment;
      yearlyPrincipal += principalPayment;
      yearlyInterest += interestPayment;
      
      if (month % 12 === 0) {
        const year = month / 12;
        chartData.push({
          year,
          principal: Math.round(yearlyPrincipal),
          interest: Math.round(yearlyInterest),
          balance: Math.round(remainingPrincipal)
        });
        
        yearlyPrincipal = 0;
        yearlyInterest = 0;
      }
    }
    
    setLoanResults({
      emi: Math.round(emi),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      chartData
    });
  };
  
  // Calculate Tax Savings
  useEffect(() => {
    calculateTaxSavings();
  }, [income, existingInvestments]);
  
  const calculateTaxSavings = () => {
    // Old regime tax calculation (simplified)
    const calculateOldRegimeTax = (taxableIncome: number) => {
      let tax = 0;
      
      if (taxableIncome > 1000000) {
        tax += (taxableIncome - 1000000) * 0.3;
        taxableIncome = 1000000;
      }
      
      if (taxableIncome > 500000) {
        tax += (taxableIncome - 500000) * 0.2;
        taxableIncome = 500000;
      }
      
      if (taxableIncome > 250000) {
        tax += (taxableIncome - 250000) * 0.05;
      }
      
      // Add 4% cess
      tax = tax * 1.04;
      
      return Math.round(tax);
    };
    
    // Calculate tax without additional investments
    const remainingDeductionLimit = 150000 - existingInvestments;
    const taxableIncomeWithoutInvestment = income - existingInvestments;
    const taxWithoutAdditionalInvestment = calculateOldRegimeTax(taxableIncomeWithoutInvestment);
    
    // Calculate tax with maximum additional investments
    const additionalInvestment = Math.min(remainingDeductionLimit, income);
    const taxableIncomeWithInvestment = income - existingInvestments - additionalInvestment;
    const taxWithAdditionalInvestment = calculateOldRegimeTax(taxableIncomeWithInvestment);
    
    // Calculate tax savings
    const taxSavings = taxWithoutAdditionalInvestment - taxWithAdditionalInvestment;
    
    // Calculate effective return
    const effectiveReturn = (taxSavings / additionalInvestment) * 100;
    
    setTaxSavingResults({
      remainingDeductionLimit,
      additionalInvestment,
      taxWithoutAdditionalInvestment,
      taxWithAdditionalInvestment,
      taxSavings,
      effectiveReturn: Math.round(effectiveReturn * 100) / 100
    });
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
          Tax Planning
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary" 
          gutterBottom
          sx={{ mb: 4 }}
        >
          Plan your investments and optimize your tax savings with our financial calculators
        </Typography>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="planning calculators"
            textColor="primary"
            indicatorColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab 
              label="Investment Growth" 
              icon={<SavingsIcon />} 
              iconPosition="start"
              sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}
            />
            <Tab 
              label="Education Planning" 
              icon={<SchoolIcon />} 
              iconPosition="start"
              sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}
            />
            <Tab 
              label="Home Loan EMI" 
              icon={<HomeIcon />} 
              iconPosition="start"
              sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}
            />
            <Tab 
              label="Tax Saving" 
              icon={<CalculateIcon />} 
              iconPosition="start"
              sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}
            />
          </Tabs>
        </Box>
        
        {/* Investment Growth Calculator */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={5}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 3, 
                  borderRadius: 4,
                  height: '100%'
                }}
              >
                <Typography 
                  variant="h5" 
                  component="h2" 
                  fontWeight="600"
                  fontFamily="Poppins, sans-serif"
                  gutterBottom
                >
                  Investment Growth Calculator
                </Typography>
                
                <Typography variant="body2" color="text.secondary" paragraph>
                  Calculate how your investments will grow over time with regular contributions.
                </Typography>
                
                <Box sx={{ mt: 4 }}>
                  <TextField
                    label="Initial Investment"
                    fullWidth
                    value={initialInvestment}
                    onChange={(e) => setInitialInvestment(Number(e.target.value))}
                    type="number"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                    }}
                    sx={{ mb: 3 }}
                  />
                  
                  <TextField
                    label="Monthly Contribution"
                    fullWidth
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                    type="number"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                    }}
                    sx={{ mb: 3 }}
                  />
                  
                  <Typography gutterBottom>Expected Annual Return (%)</Typography>
                  <Slider
                    value={annualReturn}
                    onChange={(e, newValue) => setAnnualReturn(newValue as number)}
                    aria-labelledby="annual-return-slider"
                    valueLabelDisplay="auto"
                    min={4}
                    max={20}
                    sx={{ mb: 3 }}
                  />
                  
                  <Typography gutterBottom>Investment Duration (Years)</Typography>
                  <Slider
                    value={investmentDuration}
                    onChange={(e, newValue) => setInvestmentDuration(newValue as number)}
                    aria-labelledby="duration-slider"
                    valueLabelDisplay="auto"
                    min={1}
                    max={40}
                    sx={{ mb: 3 }}
                  />
                </Box>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={7}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 3, 
                  borderRadius: 4,
                  height: '100%'
                }}
              >
                <Typography 
                  variant="h5" 
                  component="h2" 
                  fontWeight="600"
                  fontFamily="Poppins, sans-serif"
                  gutterBottom
                >
                  Results
                </Typography>
                
                {investmentResults && (
                  <>
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                      <Grid item xs={12} md={4}>
                        <Card sx={{ bgcolor: 'primary.light', color: 'white', height: '100%' }}>
                          <CardContent>
                            <Typography variant="subtitle2" gutterBottom>
                              Future Value
                            </Typography>
                            <Typography variant="h5" fontWeight="bold">
                              ₹{investmentResults.futureValue.toLocaleString('en-IN')}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                      
                      <Grid item xs={12} md={4}>
                        <Card sx={{ bgcolor: 'grey.100', height: '100%' }}>
                          <CardContent>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                              Total Invested
                            </Typography>
                            <Typography variant="h5" fontWeight="bold">
                              ₹{Math.round(investmentResults.totalContributed).toLocaleString('en-IN')}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                      
                      <Grid item xs={12} md={4}>
                        <Card sx={{ bgcolor: 'success.light', color: 'white', height: '100%' }}>
                          <CardContent>
                            <Typography variant="subtitle2" gutterBottom>
                              Interest Earned
                            </Typography>
                            <Typography variant="h5" fontWeight="bold">
                              ₹{investmentResults.interestEarned.toLocaleString('en-IN')}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                    
                    <Typography 
                      variant="subtitle1" 
                      fontWeight="600"
                      gutterBottom
                    >
                      Growth Projection
                    </Typography>
                    
                    <Box sx={{ height: 300, width: '100%' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={investmentResults.chartData}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottomRight', offset: -10 }} />
                          <YAxis tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`} />
                          <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString('en-IN')}`, '']} />
                          <Legend />
                          <Line type="monotone" dataKey="investment" name="Total Invested" stroke="#8884d8" activeDot={{ r: 8 }} />
                          <Line type="monotone" dataKey="value" name="Future Value" stroke="#82ca9d" />
                        </LineChart>
                      </ResponsiveContainer>
                    </Box>
                  </>
                )}
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>
        
        {/* Education Planning Calculator */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={5}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 3, 
                  borderRadius: 4,
                  height: '100%'
                }}
              >
                <Typography 
                  variant="h5" 
                  component="h2" 
                  fontWeight="600"
                  fontFamily="Poppins, sans-serif"
                  gutterBottom
                >
                  Education Planning Calculator
                </Typography>
                
                <Typography variant="body2" color="text.secondary" paragraph>
                  Plan your savings for your child's education considering inflation.
                </Typography>
                
                <Box sx={{ mt: 4 }}>
                  <TextField
                    label="Education Goal Amount"
                    fullWidth
                    value={educationGoal}
                    onChange={(e) => setEducationGoal(Number(e.target.value))}
                    type="number"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                    }}
                    sx={{ mb: 3 }}
                  />
                  
                  <Typography gutterBottom>Time Until Education (Years)</Typography>
                  <Slider
                    value={educationTimeframe}
                    onChange={(e, newValue) => setEducationTimeframe(newValue as number)}
                    aria-labelledby="timeframe-slider"
                    valueLabelDisplay="auto"
                    min={1}
                    max={20}
                    sx={{ mb: 3 }}
                  />
                  
                  <Typography gutterBottom>Expected Education Inflation (%)</Typography>
                  <Slider
                    value={educationInflation}
                    onChange={(e, newValue) => setEducationInflation(newValue as number)}
                    aria-labelledby="inflation-slider"
                    valueLabelDisplay="auto"
                    min={2}
                    max={10}
                    sx={{ mb: 3 }}
                  />
                  
                  <Typography gutterBottom>Expected Investment Return (%)</Typography>
                  <Slider
                    value={educationReturn}
                    onChange={(e, newValue) => setEducationReturn(newValue as number)}
                    aria-labelledby="return-slider"
                    valueLabelDisplay="auto"
                    min={4}
                    max={15}
                    sx={{ mb: 3 }}
                  />
                </Box>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={7}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 3, 
                  borderRadius: 4,
                  height: '100%'
                }}
              >
                <Typography 
                  variant="h5" 
                  component="h2" 
                  fontWeight="600"
                  fontFamily="Poppins, sans-serif"
                  gutterBottom
                >
                  Results
                </Typography>
                
                {educationResults && (
                  <>
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                      <Grid item xs={12} md={4}>
                        <Card sx={{ bgcolor: 'primary.light', color: 'white', height: '100%' }}>
                          <CardContent>
                            <Typography variant="subtitle2" gutterBottom>
                              Future Education Cost
                            </Typography>
                            <Typography variant="h5" fontWeight="bold">
                              ₹{educationResults.inflationAdjustedGoal.toLocaleString('en-IN')}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                      
                      <Grid item xs={12} md={4}>
                        <Card sx={{ bgcolor: 'success.light', color: 'white', height: '100%' }}>
                          <CardContent>
                            <Typography variant="subtitle2" gutterBottom>
                              Monthly Investment Needed
                            </Typography>
                            <Typography variant="h5" fontWeight="bold">
                              ₹{educationResults.monthlyInvestment.toLocaleString('en-IN')}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                      
                      <Grid item xs={12} md={4}>
                        <Card sx={{ bgcolor: 'grey.100', height: '100%' }}>
                          <CardContent>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                              Total Investment
                            </Typography>
                            <Typography variant="h5" fontWeight="bold">
                              ₹{educationResults.totalInvestment.toLocaleString('en-IN')}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                    
                    <Typography 
                      variant="subtitle1" 
                      fontWeight="600"
                      gutterBottom
                    >
                      Education Fund Projection
                    </Typography>
                    
                    <Box sx={{ height: 300, width: '100%' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={educationResults.chartData}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottomRight', offset: -10 }} />
                          <YAxis tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`} />
                          <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString('en-IN')}`, '']} />
                          <Legend />
                          <Line type="monotone" dataKey="goal" name="Education Cost (with inflation)" stroke="#ff7300" />
                          <Line type="monotone" dataKey="accumulated" name="Accumulated Amount" stroke="#82ca9d" />
                        </LineChart>
                      </ResponsiveContainer>
                    </Box>
                  </>
                )}
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>
        
        {/* Home Loan EMI Calculator */}
        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={5}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 3, 
                  borderRadius: 4,
                  height: '100%'
                }}
              >
                <Typography 
                  variant="h5" 
                  component="h2" 
                  fontWeight="600"
                  fontFamily="Poppins, sans-serif"
                  gutterBottom
                >
                  Home Loan EMI Calculator
                </Typography>
                
                <Typography variant="body2" color="text.secondary" paragraph>
                  Calculate your monthly EMI and total interest payable for your home loan.
                </Typography>
                
                <Box sx={{ mt: 4 }}>
                  <TextField
                    label="Loan Amount"
                    fullWidth
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    type="number"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                    }}
                    sx={{ mb: 3 }}
                  />
                  
                  <Typography gutterBottom>Loan Tenure (Years)</Typography>
                  <Slider
                    value={loanTenure}
                    onChange={(e, newValue) => setLoanTenure(newValue as number)}
                    aria-labelledby="tenure-slider"
                    valueLabelDisplay="auto"
                    min={1}
                    max={30}
                    sx={{ mb: 3 }}
                  />
                  
                  <Typography gutterBottom>Interest Rate (%)</Typography>
                  <Slider
                    value={interestRate}
                    onChange={(e, newValue) => setInterestRate(newValue as number)}
                    aria-labelledby="interest-slider"
                    valueLabelDisplay="auto"
                    min={5}
                    max={15}
                    step={0.1}
                    sx={{ mb: 3 }}
                  />
                </Box>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={7}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 3, 
                  borderRadius: 4,
                  height: '100%'
                }}
              >
                <Typography 
                  variant="h5" 
                  component="h2" 
                  fontWeight="600"
                  fontFamily="Poppins, sans-serif"
                  gutterBottom
                >
                  Results
                </Typography>
                
                {loanResults && (
                  <>
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                      <Grid item xs={12} md={4}>
                        <Card sx={{ bgcolor: 'primary.light', color: 'white', height: '100%' }}>
                          <CardContent>
                            <Typography variant="subtitle2" gutterBottom>
                              Monthly EMI
                            </Typography>
                            <Typography variant="h5" fontWeight="bold">
                              ₹{loanResults.emi.toLocaleString('en-IN')}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                      
                      <Grid item xs={12} md={4}>
                        <Card sx={{ bgcolor: 'error.light', color: 'white', height: '100%' }}>
                          <CardContent>
                            <Typography variant="subtitle2" gutterBottom>
                              Total Interest
                            </Typography>
                            <Typography variant="h5" fontWeight="bold">
                              ₹{loanResults.totalInterest.toLocaleString('en-IN')}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                      
                      <Grid item xs={12} md={4}>
                        <Card sx={{ bgcolor: 'grey.100', height: '100%' }}>
                          <CardContent>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                              Total Payment
                            </Typography>
                            <Typography variant="h5" fontWeight="bold">
                              ₹{loanResults.totalPayment.toLocaleString('en-IN')}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                    
                    <Typography 
                      variant="subtitle1" 
                      fontWeight="600"
                      gutterBottom
                    >
                      Year-wise Payment Breakdown
                    </Typography>
                    
                    <Box sx={{ height: 300, width: '100%' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={loanResults.chartData}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottomRight', offset: -10 }} />
                          <YAxis tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`} />
                          <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString('en-IN')}`, '']} />
                          <Legend />
                          <Line type="monotone" dataKey="principal" name="Principal Paid" stroke="#8884d8" />
                          <Line type="monotone" dataKey="interest" name="Interest Paid" stroke="#ff7300" />
                          <Line type="monotone" dataKey="balance" name="Remaining Balance" stroke="#82ca9d" />
                        </LineChart>
                      </ResponsiveContainer>
                    </Box>
                  </>
                )}
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>
        
        {/* Tax Saving Calculator */}
        <TabPanel value={tabValue} index={3}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={5}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 3, 
                  borderRadius: 4,
                  height: '100%'
                }}
              >
                <Typography 
                  variant="h5" 
                  component="h2" 
                  fontWeight="600"
                  fontFamily="Poppins, sans-serif"
                  gutterBottom
                >
                  Tax Saving Calculator
                </Typography>
                
                <Typography variant="body2" color="text.secondary" paragraph>
                  Calculate how much tax you can save by making additional investments under Section 80C.
                </Typography>
                
                <Box sx={{ mt: 4 }}>
                  <TextField
                    label="Annual Income"
                    fullWidth
                    value={income}
                    onChange={(e) => setIncome(Number(e.target.value))}
                    type="number"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                    }}
                    sx={{ mb: 3 }}
                  />
                  
                  <TextField
                    label="Existing 80C Investments"
                    fullWidth
                    value={existingInvestments}
                    onChange={(e) => setExistingInvestments(Number(e.target.value))}
                    type="number"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                    }}
                    helperText="Total of your existing investments under Section 80C (max ₹1,50,000)"
                    sx={{ mb: 3 }}
                  />
                </Box>
                
                <Box sx={{ mt: 4, bgcolor: 'primary.light', color: 'white', p: 2, borderRadius: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Note:
                  </Typography>
                  <Typography variant="body2">
                    This calculator is for the Old Tax Regime only. The New Tax Regime does not allow most deductions under Section 80C.
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={7}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 3, 
                  borderRadius: 4,
                  height: '100%'
                }}
              >
                <Typography 
                  variant="h5" 
                  component="h2" 
                  fontWeight="600"
                  fontFamily="Poppins, sans-serif"
                  gutterBottom
                >
                  Results
                </Typography>
                
                {taxSavingResults && (
                  <>
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                      <Grid item xs={12} md={6}>
                        <Card sx={{ bgcolor: 'primary.light', color: 'white', height: '100%' }}>
                          <CardContent>
                            <Typography variant="subtitle2" gutterBottom>
                              Remaining 80C Limit
                            </Typography>
                            <Typography variant="h5" fontWeight="bold">
                              ₹{taxSavingResults.remainingDeductionLimit.toLocaleString('en-IN')}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
                              Additional investment you can make under Section 80C
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                      
                      <Grid item xs={12} md={6}>
                        <Card sx={{ bgcolor: 'success.light', color: 'white', height: '100%' }}>
                          <CardContent>
                            <Typography variant="subtitle2" gutterBottom>
                              Potential Tax Savings
                            </Typography>
                            <Typography variant="h5" fontWeight="bold">
                              ₹{taxSavingResults.taxSavings.toLocaleString('en-IN')}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
                              By investing ₹{taxSavingResults.additionalInvestment.toLocaleString('en-IN')} more in 80C
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                    
                    <Box sx={{ mb: 4 }}>
                      <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                        Tax Comparison
                      </Typography>
                      
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <Card sx={{ bgcolor: 'grey.100', height: '100%' }}>
                            <CardContent>
                              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Without Additional Investment
                              </Typography>
                              <Typography variant="h6" fontWeight="bold" color="error.main">
                                ₹{taxSavingResults.taxWithoutAdditionalInvestment.toLocaleString('en-IN')}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                        
                        <Grid item xs={12} md={6}>
                          <Card sx={{ bgcolor: 'grey.100', height: '100%' }}>
                            <CardContent>
                              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                With Additional Investment
                              </Typography>
                              <Typography variant="h6" fontWeight="bold" color="success.main">
                                ₹{taxSavingResults.taxWithAdditionalInvestment.toLocaleString('en-IN')}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      </Grid>
                    </Box>
                    
                    <Box sx={{ p: 3, bgcolor: 'secondary.light', color: 'white', borderRadius: 2 }}>
                      <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                        Effective Return on Tax-Saving Investment
                      </Typography>
                      <Typography variant="h4" fontWeight="bold">
                        {taxSavingResults.effectiveReturn}%
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
                        This is the immediate return you get in the form of tax savings, in addition to the actual return from the investment itself.
                      </Typography>
                    </Box>
                    
                    <Box sx={{ mt: 4 }}>
                      <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                        Recommended Tax-Saving Investments
                      </Typography>
                      
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                          <Card sx={{ height: '100%' }}>
                            <CardContent>
                              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                                ELSS Mutual Funds
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                3-year lock-in with potential for higher returns
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                        
                        <Grid item xs={12} md={4}>
                          <Card sx={{ height: '100%' }}>
                            <CardContent>
                              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                                PPF
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Safe investment with tax-free returns
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                        
                        <Grid item xs={12} md={4}>
                          <Card sx={{ height: '100%' }}>
                            <CardContent>
                              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                                NPS
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Additional ₹50,000 deduction under 80CCD(1B)
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      </Grid>
                    </Box>
                  </>
                )}
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>
      </Container>
    </Box>
  );
};

export default PlanningPage;
