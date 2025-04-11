import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Grid, 
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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  InputBase,
  Tabs,
  Tab,
  MenuItem
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import QuizIcon from '@mui/icons-material/Quiz';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import ChatIcon from '@mui/icons-material/Chat';

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
      id={`help-tabpanel-${index}`}
      aria-labelledby={`help-tab-${index}`}
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

// FAQ categories and questions
const faqCategories = [
  {
    id: 'general',
    title: 'General Questions',
    questions: [
      { 
        question: 'What is the Indian Tax Calculator?', 
        answer: 'The Indian Tax Calculator is a comprehensive web application designed to help Indian taxpayers calculate their income tax liability for FY 2024-2025. It supports both old and new tax regimes, provides detailed breakdowns, and offers features like document upload with AI extraction, tax planning tools, and report generation.' 
      },
      { 
        question: 'How accurate are the tax calculations?', 
        answer: 'Our tax calculator uses the latest tax slabs and rules for FY 2024-2025 as announced in the Union Budget. The calculations are regularly updated to reflect any changes in tax laws. However, for complex tax situations, we recommend consulting with a tax professional for personalized advice.' 
      },
      { 
        question: 'Is my data secure?', 
        answer: 'Yes, we take data security very seriously. All data is encrypted during transmission and storage. We do not store your tax documents permanently - they are processed for information extraction and then deleted. We do not share your information with any third parties except as required by law.' 
      },
      { 
        question: 'Do I need to create an account to use the calculator?', 
        answer: 'No, you can use the basic tax calculator without creating an account. However, creating an account allows you to save your tax calculations, upload documents for AI processing, generate reports, and track your tax history across multiple years.' 
      }
    ]
  },
  {
    id: 'calculator',
    title: 'Tax Calculator',
    questions: [
      { 
        question: 'What is the difference between Old and New Tax Regimes?', 
        answer: 'The Old Tax Regime has higher tax rates but allows various deductions and exemptions (like Section 80C, 80D, HRA, etc.). The New Tax Regime has lower tax rates but does not allow most deductions and exemptions. Our calculator helps you compare both regimes to determine which one results in lower tax liability for your specific situation.' 
      },
      { 
        question: 'How do I know which tax regime is better for me?', 
        answer: 'Our calculator automatically compares both tax regimes based on your income and applicable deductions. Generally, the Old Regime is beneficial if you have significant investments, home loans, or other eligible deductions. The New Regime may be better for those with fewer deductions or simpler tax situations.' 
      },
      { 
        question: 'What deductions are available in the Old Tax Regime?', 
        answer: 'The Old Tax Regime allows various deductions including Section 80C (up to ₹1,50,000 for investments like PPF, ELSS, etc.), Section 80D (health insurance premiums), HRA exemption, home loan interest deduction (up to ₹2,00,000), NPS contributions (additional ₹50,000), and many others. Our Deductions page provides a comprehensive list.' 
      },
      { 
        question: 'How is surcharge calculated?', 
        answer: 'Surcharge is an additional tax levied on individuals with higher income. For FY 2024-25, surcharge rates are: 10% for income between ₹50 lakhs and ₹1 crore, 15% for income between ₹1 crore and ₹2 crore, 25% for income between ₹2 crore and ₹5 crore, and 37% for income above ₹5 crore. Our calculator automatically applies the appropriate surcharge based on your income.' 
      }
    ]
  },
  {
    id: 'document',
    title: 'Document Upload & AI',
    questions: [
      { 
        question: 'What documents can I upload for AI processing?', 
        answer: 'You can upload various tax-related documents including Form 16, Form 26AS, investment proofs, home loan statements, rent receipts, and other income/deduction-related documents. Our AI can extract relevant information from these documents to automatically fill in your tax calculator fields.' 
      },
      { 
        question: 'How accurate is the AI document processing?', 
        answer: 'Our AI uses Google\'s Gemini technology to extract information with high accuracy. However, the accuracy depends on the quality and format of the uploaded documents. We always recommend reviewing the extracted information before using it for tax calculations. You can edit any information that may not have been correctly extracted.' 
      },
      { 
        question: 'What file formats are supported for document upload?', 
        answer: 'Currently, we support PDF, JPEG, PNG, and Excel (XLSX/XLS) file formats. PDF is recommended for best results, especially for structured documents like Form 16 or Form 26AS.' 
      },
      { 
        question: 'Is there a limit to how many documents I can upload?', 
        answer: 'You can upload up to 5 documents at a time, with a maximum file size of 10MB per document. If you need to upload more documents, you can do so in multiple batches.' 
      }
    ]
  },
  {
    id: 'planning',
    title: 'Tax Planning',
    questions: [
      { 
        question: 'How can I reduce my tax liability?', 
        answer: 'There are several ways to reduce your tax liability: 1) Maximize your Section 80C deductions (up to ₹1,50,000) through investments like PPF, ELSS, etc. 2) Invest in health insurance to claim Section 80D deductions. 3) Consider NPS for additional tax benefits. 4) If applicable, claim home loan interest deductions. Our Tax Planning page provides detailed calculators and recommendations.' 
      },
      { 
        question: 'What investments qualify for Section 80C deductions?', 
        answer: 'Section 80C deductions (up to ₹1,50,000) can be claimed for various investments and expenses including: PPF, ELSS mutual funds, tax-saving fixed deposits (5-year lock-in), NSC, life insurance premiums, Sukanya Samriddhi Yojana, tuition fees for children, principal repayment of home loan, and ULIP. Our Deductions page provides a comprehensive list with details.' 
      },
      { 
        question: 'How does the Investment Calculator work?', 
        answer: 'Our Investment Calculator helps you project the future value of your investments based on your initial investment, monthly contributions, expected rate of return, and investment duration. It shows you how your money grows over time and breaks down the contribution of principal and interest to your final corpus.' 
      },
      { 
        question: 'What is the best tax-saving investment for me?', 
        answer: 'The best tax-saving investment depends on your financial goals, risk tolerance, and investment horizon. ELSS mutual funds offer potentially higher returns with a 3-year lock-in period. PPF provides guaranteed returns with a 15-year tenure. Tax-saving FDs are low-risk but offer lower returns. Our Tax Planning page can help you compare different options based on your specific needs.' 
      }
    ]
  },
  {
    id: 'reports',
    title: 'Reports & History',
    questions: [
      { 
        question: 'What reports can I generate?', 
        answer: 'You can generate several types of reports including: 1) Tax Summary Report - showing your income, deductions, and tax liability breakdown. 2) Regime Comparison Report - comparing tax liability under both old and new regimes. 3) Tax History Report - showing your tax data across multiple years. These reports can be downloaded in PDF, Excel, or CSV formats.' 
      },
      { 
        question: 'How can I use these reports?', 
        answer: 'These reports are useful for various purposes: 1) For personal record-keeping and financial planning. 2) To share with your tax consultant or CA for professional advice. 3) As reference when filing your income tax returns. 4) To track your income and tax trends over the years.' 
      },
      { 
        question: 'Can I see my tax history from previous years?', 
        answer: 'Yes, if you have an account and have used our calculator in previous years, you can view your tax history in the Reports section. This allows you to track changes in your income, deductions, and tax liability over time. For new users, tax history will start building from the current year onwards.' 
      },
      { 
        question: 'Are these reports accepted by tax authorities?', 
        answer: 'Our reports are for informational purposes only and are not official tax documents. They can help you understand your tax situation and prepare for filing your returns, but you should still use the official ITR forms provided by the Income Tax Department for actual filing.' 
      }
    ]
  }
];

// Tax resources
const taxResources = [
  {
    title: 'Income Tax Act Sections',
    description: 'Comprehensive guide to important sections of the Income Tax Act relevant for individual taxpayers.',
    link: '#'
  },
  {
    title: 'Budget 2024 Highlights',
    description: 'Key changes in income tax rules and slabs announced in the Union Budget 2024.',
    link: '#'
  },
  {
    title: 'Tax Filing Deadlines',
    description: 'Important dates and deadlines for filing income tax returns and paying taxes for FY 2024-25.',
    link: '#'
  },
  {
    title: 'Tax Saving Guide',
    description: 'Detailed guide on various tax-saving investments and strategies to minimize your tax liability.',
    link: '#'
  },
  {
    title: 'Income Tax Calculator Guide',
    description: 'Step-by-step tutorial on how to use our tax calculator effectively for accurate results.',
    link: '#'
  },
  {
    title: 'Common Tax Mistakes to Avoid',
    description: 'List of common errors made by taxpayers and how to avoid them when filing your returns.',
    link: '#'
  }
];

const HelpPage: React.FC = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [expanded, setExpanded] = useState<string | false>(false);
  const [tabValue, setTabValue] = useState(0);

  // Handle accordion change
  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Filter FAQs based on search term
  const filteredFaqs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(item => 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

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
          Help & Support
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary" 
          gutterBottom
          sx={{ mb: 4 }}
        >
          Find answers to common questions and learn how to use our tax calculator
        </Typography>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="help tabs"
            textColor="primary"
            indicatorColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab 
              label="FAQs" 
              icon={<QuizIcon />} 
              iconPosition="start"
              sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}
            />
            <Tab 
              label="Resources" 
              icon={<MenuBookIcon />} 
              iconPosition="start"
              sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}
            />
            <Tab 
              label="Contact Support" 
              icon={<SupportAgentIcon />} 
              iconPosition="start"
              sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}
            />
          </Tabs>
        </Box>
        
        {/* FAQs Tab */}
        <TabPanel value={tabValue} index={0}>
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
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search FAQs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
              
              {/* FAQ Categories */}
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((category) => (
                  <Box key={category.id} sx={{ mb: 4 }}>
                    <Typography 
                      variant="h5" 
                      component="h2" 
                      fontWeight="600"
                      fontFamily="Poppins, sans-serif"
                      gutterBottom
                      sx={{ mb: 2 }}
                    >
                      {category.title}
                    </Typography>
                    
                    {category.questions.map((faq, index) => (
                      <Accordion 
                        key={index}
                        expanded={expanded === `${category.id}-${index}`}
                        onChange={handleChange(`${category.id}-${index}`)}
                        sx={{ 
                          mb: 2,
                          borderRadius: 2,
                          '&:before': { display: 'none' },
                          boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          sx={{ 
                            bgcolor: expanded === `${category.id}-${index}` ? 'primary.light' : 'grey.50',
                            color: expanded === `${category.id}-${index}` ? 'white' : 'inherit',
                            borderRadius: expanded === `${category.id}-${index}` ? '8px 8px 0 0' : 2,
                            transition: 'all 0.3s ease'
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <HelpOutlineIcon sx={{ mr: 2 }} />
                            <Typography variant="subtitle1" fontWeight="500">
                              {faq.question}
                            </Typography>
                          </Box>
                        </AccordionSummary>
                        <AccordionDetails sx={{ p: 3 }}>
                          <Typography variant="body1" color="text.secondary">
                            {faq.answer}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </Box>
                ))
              ) : (
                <Paper 
                  elevation={2} 
                  sx={{ 
                    p: 4, 
                    textAlign: 'center',
                    borderRadius: 2
                  }}
                >
                  <Typography variant="h6" color="text.secondary">
                    No FAQs found matching "{searchTerm}"
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
                {/* Popular Questions Card */}
                <Card 
                  elevation={3}
                  sx={{ 
                    borderRadius: 2,
                    mb: 4
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
                      Popular Questions
                    </Typography>
                  </Box>
                  
                  <CardContent>
                    <List>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <QuizIcon color="primary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="What is the difference between Old and New Tax Regimes?" 
                          primaryTypographyProps={{ fontWeight: 500 }}
                          secondary="Click to see answer"
                          onClick={() => {
                            setTabValue(0);
                            setSearchTerm('difference between Old and New Tax Regimes');
                          }}
                          sx={{ cursor: 'pointer' }}
                        />
                      </ListItem>
                      
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <QuizIcon color="primary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="How accurate is the AI document processing?" 
                          primaryTypographyProps={{ fontWeight: 500 }}
                          secondary="Click to see answer"
                          onClick={() => {
                            setTabValue(0);
                            setSearchTerm('accurate is the AI document processing');
                          }}
                          sx={{ cursor: 'pointer' }}
                        />
                      </ListItem>
                      
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <QuizIcon color="primary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="How can I reduce my tax liability?" 
                          primaryTypographyProps={{ fontWeight: 500 }}
                          secondary="Click to see answer"
                          onClick={() => {
                            setTabValue(0);
                            setSearchTerm('reduce my tax liability');
                          }}
                          sx={{ cursor: 'pointer' }}
                        />
                      </ListItem>
                      
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <QuizIcon color="primary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="What reports can I generate?" 
                          primaryTypographyProps={{ fontWeight: 500 }}
                          secondary="Click to see answer"
                          onClick={() => {
                            setTabValue(0);
                            setSearchTerm('reports can I generate');
                          }}
                          sx={{ cursor: 'pointer' }}
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
                
                {/* Quick Links Card */}
                <Card 
                  elevation={3}
                  sx={{ 
                    borderRadius: 2
                  }}
                >
                  <Box 
                    sx={{ 
                      bgcolor: 'secondary.main',
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
                      Quick Links
                    </Typography>
                  </Box>
                  
                  <CardContent>
                    <List>
                      <ListItem 
                        sx={{ 
                          px: 2, 
                          py: 1.5, 
                          borderRadius: 1,
                          '&:hover': { bgcolor: 'grey.100' },
                          mb: 1
                        }}
                        component="a"
                        href="/calculator"
                      >
                        <ListItemText 
                          primary="Tax Calculator" 
                          primaryTypographyProps={{ fontWeight: 500 }}
                          secondary="Calculate your income tax"
                        />
                        <ArrowForwardIosIcon fontSize="small" color="action" />
                      </ListItem>
                      
                      <ListItem 
                        sx={{ 
                          px: 2, 
                          py: 1.5, 
                          borderRadius: 1,
                          '&:hover': { bgcolor: 'grey.100' },
                          mb: 1
                        }}
                        component="a"
                        href="/deductions"
                      >
                        <ListItemText 
                          primary="Deductions Guide" 
                          primaryTypographyProps={{ fontWeight: 500 }}
                          secondary="Explore available tax deductions"
                        />
                        <ArrowForwardIosIcon fontSize="small" color="action" />
                      </ListItem>
                      
                      <ListItem 
                        sx={{ 
                          px: 2, 
                          py: 1.5, 
                          borderRadius: 1,
                          '&:hover': { bgcolor: 'grey.100' },
                          mb: 1
                        }}
                        component="a"
                        href="/planning"
                      >
                        <ListItemText 
                          primary="Tax Planning" 
                          primaryTypographyProps={{ fontWeight: 500 }}
                          secondary="Plan your investments for tax saving"
                        />
                        <ArrowForwardIosIcon fontSize="small" color="action" />
                      </ListItem>
                      
                      <ListItem 
                        sx={{ 
                          px: 2, 
                          py: 1.5, 
                          borderRadius: 1,
                          '&:hover': { bgcolor: 'grey.100' }
                        }}
                        component="a"
                        href="/upload"
                      >
                        <ListItemText 
                          primary="Document Upload" 
                          primaryTypographyProps={{ fontWeight: 500 }}
                          secondary="Upload documents for AI processing"
                        />
                        <ArrowForwardIosIcon fontSize="small" color="action" />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>
        
        {/* Resources Tab */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Typography 
                variant="h5" 
                component="h2" 
                fontWeight="600"
                fontFamily="Poppins, sans-serif"
                gutterBottom
                sx={{ mb: 3 }}
              >
                Tax Resources & Guides
              </Typography>
              
              <Grid container spacing={3}>
                {taxResources.map((resource, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Card 
                      elevation={2}
                      sx={{ 
                        borderRadius: 2,
                        height: '100%',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                        }
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Typography 
                          variant="h6" 
                          component="h3" 
                          fontWeight="600"
                          fontFamily="Poppins, sans-serif"
                          gutterBottom
                        >
                          {resource.title}
                        </Typography>
                        
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {resource.description}
                        </Typography>
                        
                        <Button 
                          variant="outlined" 
                          color="primary"
                          size="small"
                          href={resource.link}
                          sx={{ mt: 1 }}
                        >
                          Read More
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 3, 
                  borderRadius: 2,
                  mt: 4
                }}
              >
                <Typography 
                  variant="h5" 
                  component="h2" 
                  fontWeight="600"
                  fontFamily="Poppins, sans-serif"
                  gutterBottom
                >
                  Video Tutorials
                </Typography>
                
                <Typography variant="body1" paragraph>
                  Watch our step-by-step video tutorials to learn how to use the Indian Tax Calculator effectively.
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Card 
                      elevation={2}
                      sx={{ 
                        borderRadius: 2,
                        overflow: 'hidden'
                      }}
                    >
                      <Box 
                        sx={{ 
                          bgcolor: 'grey.200', 
                          height: 180, 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center' 
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Video Thumbnail: How to Calculate Your Tax
                        </Typography>
                      </Box>
                      <CardContent>
                        <Typography variant="subtitle1" fontWeight="500" gutterBottom>
                          How to Calculate Your Tax
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          A comprehensive guide to using the tax calculator for both old and new regimes.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Card 
                      elevation={2}
                      sx={{ 
                        borderRadius: 2,
                        overflow: 'hidden'
                      }}
                    >
                      <Box 
                        sx={{ 
                          bgcolor: 'grey.200', 
                          height: 180, 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center' 
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Video Thumbnail: Using AI Document Upload
                        </Typography>
                      </Box>
                      <CardContent>
                        <Typography variant="subtitle1" fontWeight="500" gutterBottom>
                          Using AI Document Upload
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Learn how to upload your tax documents and use AI to extract information automatically.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Box sx={{ position: 'sticky', top: 24 }}>
                {/* Official Resources Card */}
                <Card 
                  elevation={3}
                  sx={{ 
                    borderRadius: 2,
                    mb: 4
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
                      Official Resources
                    </Typography>
                  </Box>
                  
                  <CardContent>
                    <List>
                      <ListItem 
                        sx={{ 
                          px: 2, 
                          py: 1.5, 
                          borderRadius: 1,
                          '&:hover': { bgcolor: 'grey.100' },
                          mb: 1
                        }}
                        component="a"
                        href="https://www.incometax.gov.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ListItemText 
                          primary="Income Tax Department" 
                          primaryTypographyProps={{ fontWeight: 500 }}
                          secondary="Official website of Income Tax Department"
                        />
                        <ArrowForwardIosIcon fontSize="small" color="action" />
                      </ListItem>
                      
                      <ListItem 
                        sx={{ 
                          px: 2, 
                          py: 1.5, 
                          borderRadius: 1,
                          '&:hover': { bgcolor: 'grey.100' },
                          mb: 1
                        }}
                        component="a"
                        href="https://www.incometax.gov.in/iec/foportal/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ListItemText 
                          primary="e-Filing Portal" 
                          primaryTypographyProps={{ fontWeight: 500 }}
                          secondary="Official portal for filing income tax returns"
                        />
                        <ArrowForwardIosIcon fontSize="small" color="action" />
                      </ListItem>
                      
                      <ListItem 
                        sx={{ 
                          px: 2, 
                          py: 1.5, 
                          borderRadius: 1,
                          '&:hover': { bgcolor: 'grey.100' },
                          mb: 1
                        }}
                        component="a"
                        href="https://www.india.gov.in/topics/finance-taxes"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ListItemText 
                          primary="National Portal of India" 
                          primaryTypographyProps={{ fontWeight: 500 }}
                          secondary="Government resources on finance and taxes"
                        />
                        <ArrowForwardIosIcon fontSize="small" color="action" />
                      </ListItem>
                      
                      <ListItem 
                        sx={{ 
                          px: 2, 
                          py: 1.5, 
                          borderRadius: 1,
                          '&:hover': { bgcolor: 'grey.100' }
                        }}
                        component="a"
                        href="https://www.finmin.nic.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ListItemText 
                          primary="Ministry of Finance" 
                          primaryTypographyProps={{ fontWeight: 500 }}
                          secondary="Latest updates on financial policies"
                        />
                        <ArrowForwardIosIcon fontSize="small" color="action" />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
                
                {/* Download Guides Card */}
                <Card 
                  elevation={3}
                  sx={{ 
                    borderRadius: 2,
                    bgcolor: 'secondary.light',
                    color: 'white'
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography 
                      variant="h6" 
                      component="h3" 
                      fontWeight="600"
                      fontFamily="Poppins, sans-serif"
                      gutterBottom
                    >
                      Download Tax Guide 2024-25
                    </Typography>
                    
                    <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
                      Get our comprehensive guide to income tax calculation, deductions, and planning for FY 2024-25.
                    </Typography>
                    
                    <Button 
                      variant="contained" 
                      fullWidth
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
                      Download PDF Guide
                    </Button>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>
        
        {/* Contact Support Tab */}
        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={7}>
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
                  Contact Us
                </Typography>
                
                <Typography variant="body1" paragraph>
                  Have a question that's not covered in our FAQs? Need personalized assistance with your tax calculation? Our support team is here to help.
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      margin="normal"
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      type="email"
                      margin="normal"
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      select
                      label="Query Type"
                      defaultValue="general"
                      margin="normal"
                    >
                      <MenuItem value="general">General Inquiry</MenuItem>
                      <MenuItem value="calculator">Tax Calculator Help</MenuItem>
                      <MenuItem value="document">Document Upload Issues</MenuItem>
                      <MenuItem value="account">Account Related</MenuItem>
                      <MenuItem value="technical">Technical Support</MenuItem>
                    </TextField>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Your Message"
                      multiline
                      rows={4}
                      margin="normal"
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      sx={{ 
                        mt: 2,
                        py: 1.5,
                        fontWeight: 600
                      }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
              
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 3, 
                  borderRadius: 2
                }}
              >
                <Typography 
                  variant="h5" 
                  component="h2" 
                  fontWeight="600"
                  fontFamily="Poppins, sans-serif"
                  gutterBottom
                >
                  Frequently Asked Support Questions
                </Typography>
                
                <Accordion 
                  sx={{ 
                    mb: 2,
                    borderRadius: 2,
                    '&:before': { display: 'none' },
                    boxShadow: 'none',
                    border: '1px solid',
                    borderColor: 'grey.200'
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1" fontWeight="500">
                      How quickly will I receive a response to my query?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2" color="text.secondary">
                      We aim to respond to all queries within 24 hours on business days. For urgent matters, please use the live chat option during business hours (9 AM - 6 PM IST, Monday to Friday).
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                
                <Accordion 
                  sx={{ 
                    mb: 2,
                    borderRadius: 2,
                    '&:before': { display: 'none' },
                    boxShadow: 'none',
                    border: '1px solid',
                    borderColor: 'grey.200'
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1" fontWeight="500">
                      Do you provide tax filing services?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2" color="text.secondary">
                      No, we do not provide tax filing services. Our calculator is a tool to help you understand your tax liability and plan your finances. For actual tax filing, please use the official Income Tax Department's e-Filing portal or consult with a tax professional.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                
                <Accordion 
                  sx={{ 
                    mb: 2,
                    borderRadius: 2,
                    '&:before': { display: 'none' },
                    boxShadow: 'none',
                    border: '1px solid',
                    borderColor: 'grey.200'
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1" fontWeight="500">
                      Can I get personalized tax advice?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2" color="text.secondary">
                      Our support team can help with using the tax calculator and understanding general tax concepts. However, for personalized tax advice specific to your financial situation, we recommend consulting with a qualified tax professional or chartered accountant.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={5}>
              <Box sx={{ position: 'sticky', top: 24 }}>
                {/* Contact Methods Card */}
                <Card 
                  elevation={3}
                  sx={{ 
                    borderRadius: 2,
                    mb: 4
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
                      Contact Methods
                    </Typography>
                  </Box>
                  
                  <CardContent>
                    <List>
                      <ListItem sx={{ px: 0, py: 2 }}>
                        <ListItemIcon>
                          <EmailIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Email Support" 
                          secondary="support@indiantaxcalculator.com"
                          primaryTypographyProps={{ fontWeight: 500 }}
                        />
                      </ListItem>
                      
                      <Divider component="li" />
                      
                      <ListItem sx={{ px: 0, py: 2 }}>
                        <ListItemIcon>
                          <PhoneIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Phone Support" 
                          secondary="+91 1800-XXX-XXXX (Toll Free)"
                          primaryTypographyProps={{ fontWeight: 500 }}
                        />
                      </ListItem>
                      
                      <Divider component="li" />
                      
                      <ListItem sx={{ px: 0, py: 2 }}>
                        <ListItemIcon>
                          <ChatIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Live Chat" 
                          secondary="Available 9 AM - 6 PM (Mon-Fri)"
                          primaryTypographyProps={{ fontWeight: 500 }}
                        />
                      </ListItem>
                    </List>
                    
                    <Button
                      variant="outlined"
                      color="primary"
                      fullWidth
                      startIcon={<ChatIcon />}
                      sx={{ mt: 2 }}
                    >
                      Start Live Chat
                    </Button>
                  </CardContent>
                </Card>
                
                {/* Support Hours Card */}
                <Card 
                  elevation={3}
                  sx={{ 
                    borderRadius: 2,
                    mb: 4
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography 
                      variant="h6" 
                      component="h3" 
                      fontWeight="600"
                      fontFamily="Poppins, sans-serif"
                      gutterBottom
                    >
                      Support Hours
                    </Typography>
                    
                    <Box sx={{ mt: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" fontWeight="500">Monday - Friday</Typography>
                        <Typography variant="body2">9:00 AM - 6:00 PM IST</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" fontWeight="500">Saturday</Typography>
                        <Typography variant="body2">10:00 AM - 2:00 PM IST</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" fontWeight="500">Sunday & Holidays</Typography>
                        <Typography variant="body2">Closed</Typography>
                      </Box>
                    </Box>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Typography variant="body2" color="text.secondary">
                      Email queries received outside of business hours will be addressed on the next business day.
                    </Typography>
                  </CardContent>
                </Card>
                
                {/* Feedback Card */}
                <Card 
                  elevation={3}
                  sx={{ 
                    borderRadius: 2,
                    bgcolor: 'secondary.light',
                    color: 'white'
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography 
                      variant="h6" 
                      component="h3" 
                      fontWeight="600"
                      fontFamily="Poppins, sans-serif"
                      gutterBottom
                    >
                      We Value Your Feedback
                    </Typography>
                    
                    <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
                      Help us improve our tax calculator by sharing your experience and suggestions.
                    </Typography>
                    
                    <Button 
                      variant="contained" 
                      fullWidth
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
                      Share Feedback
                    </Button>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>
      </Container>
    </Box>
  );
};

export default HelpPage;
