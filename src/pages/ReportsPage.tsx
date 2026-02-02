import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Grid as MuiGrid, 
  Button,
  Card,
  CardContent,
  Divider,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  useTheme,
  SelectChangeEvent
} from '@mui/material';
import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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
      id={`reports-tabpanel-${index}`}
      aria-labelledby={`reports-tab-${index}`}
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

const ReportsPage: React.FC = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [reportYear, setReportYear] = useState('FY 2024-25');
  const [reportFormat, setReportFormat] = useState('pdf');
  
  // Sample data for charts and tables
  const taxRegimeData = [
    { name: 'Old Regime', value: 185120, color: theme.palette.error.main },
    { name: 'New Regime', value: 117000, color: theme.palette.success.main }
  ];
  
  const incomeData = [
    { name: 'Salary', value: 1000000, color: theme.palette.primary.main },
    { name: 'Business', value: 150000, color: theme.palette.secondary.main },
    { name: 'Capital Gains', value: 50000, color: theme.palette.success.main },
    { name: 'Other Sources', value: 0, color: theme.palette.warning.main }
  ];
  
  const deductionsData = [
    { name: 'Section 80C', value: 150000, color: theme.palette.primary.light },
    { name: 'Section 80D', value: 25000, color: theme.palette.secondary.light },
    { name: 'HRA', value: 120000, color: theme.palette.success.light },
    { name: 'Other', value: 50000, color: theme.palette.warning.light }
  ];
  
  const historyData = [
    { year: 'FY 2022-23', income: 1000000, tax: 112500, regime: 'Old' },
    { year: 'FY 2023-24', income: 1100000, tax: 130000, regime: 'Old' },
    { year: 'FY 2024-25', income: 1200000, tax: 117000, regime: 'New' }
  ];
  
  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  // Handle report year change
  const handleYearChange = (event: SelectChangeEvent) => {
    setReportYear(event.target.value);
  };
  
  // Handle report format change
  const handleFormatChange = (event: SelectChangeEvent) => {
    setReportFormat(event.target.value);
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
          Tax Reports
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary" 
          gutterBottom
          sx={{ mb: 4 }}
        >
          View and download comprehensive tax reports based on your calculations
        </Typography>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="report tabs"
            textColor="primary"
            indicatorColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab 
              label="Tax Summary" 
              sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}
            />
            <Tab 
              label="Regime Comparison" 
              sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}
            />
            <Tab 
              label="Tax History" 
              sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}
            />
          </Tabs>
        </Box>
        
        {/* Report Controls */}
        <Paper 
          elevation={1} 
          sx={{ 
            p: 2, 
            mb: 4, 
            borderRadius: 2,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <FormControl sx={{ minWidth: 150 }} size="small">
              <InputLabel id="report-year-label">Report Year</InputLabel>
              <Select
                labelId="report-year-label"
                id="report-year"
                value={reportYear}
                label="Report Year"
                onChange={handleYearChange}
              >
                <MenuItem value="FY 2022-23">FY 2022-23</MenuItem>
                <MenuItem value="FY 2023-24">FY 2023-24</MenuItem>
                <MenuItem value="FY 2024-25">FY 2024-25</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl sx={{ minWidth: 150 }} size="small">
              <InputLabel id="report-format-label">Format</InputLabel>
              <Select
                labelId="report-format-label"
                id="report-format"
                value={reportFormat}
                label="Format"
                onChange={handleFormatChange}
              >
                <MenuItem value="pdf">PDF</MenuItem>
                <MenuItem value="excel">Excel</MenuItem>
                <MenuItem value="csv">CSV</MenuItem>
              </Select>
            </FormControl>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              variant="contained" 
              color="primary"
              startIcon={<DownloadIcon />}
              size="small"
            >
              Download
            </Button>
            <IconButton color="primary" size="small">
              <PrintIcon />
            </IconButton>
            <IconButton color="primary" size="small">
              <ShareIcon />
            </IconButton>
          </Box>
        </Paper>
        
        {/* Tax Summary Tab */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 3, 
                  borderRadius: 4,
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
                  Income & Tax Summary - {reportYear}
                </Typography>
                
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  mb: 3
                }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Selected Tax Regime
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                      <CheckCircleIcon sx={{ color: 'success.main', mr: 1, fontSize: 20 }} />
                      <Typography variant="h6" fontWeight="bold">
                        New Tax Regime
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="body2" color="text.secondary">
                      Total Tax Liability
                    </Typography>
                    <Typography variant="h4" fontWeight="bold" color="primary.main">
                      ₹1,17,000
                    </Typography>
                  </Box>
                </Box>
                
                <Divider sx={{ mb: 3 }} />
                
                <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                  Income Details
                </Typography>
                
                <TableContainer component={Paper} elevation={0} sx={{ mb: 4 }}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ bgcolor: 'grey.100' }}>
                        <TableCell>Income Source</TableCell>
                        <TableCell align="right">Amount (₹)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Salary Income</TableCell>
                        <TableCell align="right">10,00,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Business Income</TableCell>
                        <TableCell align="right">1,50,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Capital Gains</TableCell>
                        <TableCell align="right">50,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Other Sources</TableCell>
                        <TableCell align="right">0</TableCell>
                      </TableRow>
                      <TableRow sx={{ bgcolor: 'grey.50' }}>
                        <TableCell><Typography fontWeight="bold">Gross Total Income</Typography></TableCell>
                        <TableCell align="right"><Typography fontWeight="bold">12,00,000</Typography></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                
                <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                  Tax Calculation
                </Typography>
                
                <TableContainer component={Paper} elevation={0} sx={{ mb: 3 }}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ bgcolor: 'grey.100' }}>
                        <TableCell>Particulars</TableCell>
                        <TableCell align="right">Amount (₹)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Income Tax</TableCell>
                        <TableCell align="right">1,12,500</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Surcharge</TableCell>
                        <TableCell align="right">0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Health & Education Cess (4%)</TableCell>
                        <TableCell align="right">4,500</TableCell>
                      </TableRow>
                      <TableRow sx={{ bgcolor: 'primary.light', color: 'white' }}>
                        <TableCell>
                          <Typography fontWeight="bold" color="white">Total Tax Liability</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography fontWeight="bold" color="white">1,17,000</Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<PictureAsPdfIcon />}
                  >
                    Download Detailed Report
                  </Button>
                </Box>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
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
                    p: 2
                  }}
                >
                  <Typography 
                    variant="h6" 
                    component="h3" 
                    fontWeight="600"
                    fontFamily="Poppins, sans-serif"
                  >
                    Income Breakdown
                  </Typography>
                </Box>
                
                <CardContent>
                  <Box sx={{ height: 250, width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={incomeData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {incomeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString('en-IN')}`, '']} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                  
                  <Typography variant="subtitle2" align="center" sx={{ mt: 2 }}>
                    Total Income: ₹12,00,000
                  </Typography>
                </CardContent>
              </Card>
              
              <Card 
                elevation={3}
                sx={{ 
                  borderRadius: 4,
                  overflow: 'hidden'
                }}
              >
                <Box 
                  sx={{ 
                    bgcolor: 'success.main',
                    color: 'white',
                    p: 2
                  }}
                >
                  <Typography 
                    variant="h6" 
                    component="h3" 
                    fontWeight="600"
                    fontFamily="Poppins, sans-serif"
                  >
                    Tax Saving Highlights
                  </Typography>
                </Box>
                
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      Tax Saved with New Regime
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" color="success.main">
                      ₹68,120
                    </Typography>
                  </Box>
                  
                  <Divider sx={{ mb: 3 }} />
                  
                  <Typography variant="subtitle2" gutterBottom>
                    Recommendations:
                  </Typography>
                  
                  <Box component="ul" sx={{ pl: 2, mt: 1 }}>
                    <Box component="li" sx={{ mb: 1 }}>
                      <Typography variant="body2">
                        Continue with New Tax Regime for FY 2024-25
                      </Typography>
                    </Box>
                    <Box component="li" sx={{ mb: 1 }}>
                      <Typography variant="body2">
                        Consider NPS investment for additional tax benefits
                      </Typography>
                    </Box>
                    <Box component="li">
                      <Typography variant="body2">
                        Review your tax planning strategy for next year
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Button 
                    variant="contained" 
                    color="success"
                    fullWidth
                    component="a"
                    href="/planning"
                    sx={{ mt: 3 }}
                  >
                    Explore Tax Planning
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
        
        {/* Regime Comparison Tab */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
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
                  Tax Regime Comparison
                </Typography>
                
                <Typography variant="body2" color="text.secondary" paragraph>
                  Comparison of tax liability under old and new tax regimes for {reportYear}
                </Typography>
                
                <Box sx={{ height: 300, width: '100%', mb: 4 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={taxRegimeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ₹${value.toLocaleString('en-IN')}`}
                      >
                        {taxRegimeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString('en-IN')}`, '']} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
                
                <Box 
                  sx={{ 
                    bgcolor: 'success.light', 
                    color: 'white', 
                    p: 2, 
                    borderRadius: 2,
                    textAlign: 'center',
                    mb: 3
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    You Save
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    ₹68,120
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    with the New Tax Regime
                  </Typography>
                </Box>
                
                <Button 
                  variant="outlined" 
                  color="primary"
                  fullWidth
                  startIcon={<InsertDriveFileIcon />}
                >
                  Download Comparison Report
                </Button>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
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
                  Detailed Comparison
                </Typography>
                
                <TableContainer sx={{ mb: 4 }}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ bgcolor: 'grey.100' }}>
                        <TableCell>Particulars</TableCell>
                        <TableCell align="right">Old Regime (₹)</TableCell>
                        <TableCell align="right">New Regime (₹)</TableCell>
                        <TableCell align="right">Difference (₹)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Gross Total Income</TableCell>
                        <TableCell align="right">12,00,000</TableCell>
                        <TableCell align="right">12,00,000</TableCell>
                        <TableCell align="right">0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Total Deductions</TableCell>
                        <TableCell align="right">3,45,000</TableCell>
                        <TableCell align="right">50,000</TableCell>
                        <TableCell align="right">2,95,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Taxable Income</TableCell>
                        <TableCell align="right">8,55,000</TableCell>
                        <TableCell align="right">11,50,000</TableCell>
                        <TableCell align="right">-2,95,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Base Tax</TableCell>
                        <TableCell align="right">1,77,000</TableCell>
                        <TableCell align="right">1,12,500</TableCell>
                        <TableCell align="right" sx={{ color: 'success.main' }}>64,500</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Surcharge</TableCell>
                        <TableCell align="right">0</TableCell>
                        <TableCell align="right">0</TableCell>
                        <TableCell align="right">0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Health & Education Cess</TableCell>
                        <TableCell align="right">7,080</TableCell>
                        <TableCell align="right">4,500</TableCell>
                        <TableCell align="right" sx={{ color: 'success.main' }}>2,580</TableCell>
                      </TableRow>
                      <TableRow sx={{ bgcolor: 'grey.50' }}>
                        <TableCell><Typography fontWeight="bold">Total Tax Liability</Typography></TableCell>
                        <TableCell align="right"><Typography fontWeight="bold">1,85,120</Typography></TableCell>
                        <TableCell align="right"><Typography fontWeight="bold">1,17,000</Typography></TableCell>
                        <TableCell align="right" sx={{ color: 'success.main' }}><Typography fontWeight="bold">68,120</Typography></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                
                <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                  Key Factors
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" paragraph>
                    <strong>Old Regime Benefits:</strong> Allows deductions under Sections 80C, 80D, HRA, etc.
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>New Regime Benefits:</strong> Lower tax rates but fewer deductions allowed.
                  </Typography>
                  <Typography variant="body2">
                    <strong>Recommendation:</strong> Based on your income and deduction profile, the New Tax Regime is more beneficial for you.
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>
        
        {/* Tax History Tab */}
        <TabPanel value={tabValue} index={2}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              borderRadius: 4
            }}
          >
            <Typography 
              variant="h5" 
              component="h2" 
              fontWeight="600"
              fontFamily="Poppins, sans-serif"
              gutterBottom
            >
              Tax History Analysis
            </Typography>
            
            <Typography variant="body2" color="text.secondary" paragraph>
              Year-over-year comparison of your income and tax liability
            </Typography>
            
            <TableContainer sx={{ mb: 4 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: 'grey.100' }}>
                    <TableCell>Financial Year</TableCell>
                    <TableCell align="right">Income (₹)</TableCell>
                    <TableCell align="right">Tax Liability (₹)</TableCell>
                    <TableCell align="right">Tax Rate (%)</TableCell>
                    <TableCell>Regime</TableCell>
                    <TableCell align="right">YoY Change</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {historyData.map((row, index) => {
                    const prevRow = index > 0 ? historyData[index - 1] : null;
                    const taxChange = prevRow ? ((row.tax - prevRow.tax) / prevRow.tax * 100).toFixed(1) : '-';
                    const isIncrease = prevRow && row.tax > prevRow.tax;
                    const isDecrease = prevRow && row.tax < prevRow.tax;
                    
                    return (
                      <TableRow key={row.year}>
                        <TableCell>{row.year}</TableCell>
                        <TableCell align="right">{row.income.toLocaleString('en-IN')}</TableCell>
                        <TableCell align="right">{row.tax.toLocaleString('en-IN')}</TableCell>
                        <TableCell align="right">{((row.tax / row.income) * 100).toFixed(2)}%</TableCell>
                        <TableCell>{row.regime}</TableCell>
                        <TableCell align="right">
                          {prevRow ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                              {isIncrease && <ArrowUpwardIcon fontSize="small" color="error" sx={{ mr: 0.5 }} />}
                              {isDecrease && <ArrowDownwardIcon fontSize="small" color="success" sx={{ mr: 0.5 }} />}
                              <Typography 
                                variant="body2" 
                                color={isIncrease ? 'error.main' : isDecrease ? 'success.main' : 'text.primary'}
                              >
                                {taxChange}%
                              </Typography>
                            </Box>
                          ) : (
                            '-'
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Card sx={{ bgcolor: 'primary.light', color: 'white', p: 2, borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Key Insights
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mt: 1 }}>
                      <Box component="li" sx={{ mb: 1 }}>
                        <Typography variant="body2">
                          Your income increased by 9.1% from FY 2023-24 to FY 2024-25
                        </Typography>
                      </Box>
                      <Box component="li" sx={{ mb: 1 }}>
                        <Typography variant="body2">
                          Your tax liability decreased by 10.0% in FY 2024-25 despite income growth
                        </Typography>
                      </Box>
                      <Box component="li">
                        <Typography variant="body2">
                          Switching to the New Tax Regime in FY 2024-25 resulted in significant tax savings
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Recommendations
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mt: 1 }}>
                      <Box component="li" sx={{ mb: 1 }}>
                        <Typography variant="body2">
                          Continue with the New Tax Regime for FY 2024-25
                        </Typography>
                      </Box>
                      <Box component="li" sx={{ mb: 1 }}>
                        <Typography variant="body2">
                          Reevaluate your tax regime choice if your deduction profile changes significantly
                        </Typography>
                      </Box>
                      <Box component="li">
                        <Typography variant="body2">
                          Consider tax-efficient investment strategies to optimize your future tax liability
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<InsertDriveFileIcon />}
              >
                Download Historical Tax Report
              </Button>
            </Box>
          </Paper>
        </TabPanel>
      </Container>
    </Box>
  );
};

export default ReportsPage;
