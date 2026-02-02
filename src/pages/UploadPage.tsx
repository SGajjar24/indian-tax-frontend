import React, { useState, useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid as MuiGrid,
  Button,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  useTheme
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DescriptionIcon from '@mui/icons-material/Description';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import EditIcon from '@mui/icons-material/Edit';
import documentService from '../services/documentService';

// Define steps for the upload process
const steps = ['Upload Document', 'AI Processing', 'Review & Edit'];

const Grid = MuiGrid;

const UploadPage: React.FC = () => {
  const theme = useTheme();

  // State for file upload
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

  // State for AI processing
  const [processing, setProcessing] = useState(false);
  const [processingComplete, setProcessingComplete] = useState(false);
  const [extractedData, setExtractedData] = useState<any>(null);
  const [processingError, setProcessingError] = useState<string | null>(null);

  // State for stepper
  const [activeStep, setActiveStep] = useState(0);

  // Handle file drop
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Reset states
    setUploadError(null);
    setUploadSuccess(false);
    setProcessingComplete(false);
    setExtractedData(null);
    setProcessingError(null);

    // Filter for accepted file types
    const validFiles = acceptedFiles.filter(
      file => file.type === 'application/pdf' ||
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.type === 'application/vnd.ms-excel'
    );

    if (validFiles.length === 0) {
      setUploadError('Please upload valid tax documents (PDF, JPEG, PNG, or Excel files)');
      return;
    }

    if (validFiles.length > 5) {
      setUploadError('You can upload a maximum of 5 files at once');
      return;
    }

    setFiles(validFiles);
  }, []);

  // Configure dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls']
    },
    maxSize: 10485760, // 10MB
  });

  // Handle upload
  // Handle upload
  const handleUpload = async () => {
    if (files.length === 0) {
      setUploadError('Please select files to upload');
      return;
    }

    setUploading(true);
    setUploadError(null);
    setProcessingError(null);

    try {
      // Simulate upload to get standardized file objects
      const response = await documentService.uploadDocuments(files);

      if (response.success) {
        setUploadedFiles(response.files);
        setUploadSuccess(true);
        setActiveStep(1); // Move to AI Processing step

        // Process the first file immediately
        if (response.files && response.files.length > 0) {
          // Small delay to let the UI transition to step 1 before starting heavy processing
          setTimeout(() => {
            const fileToProcess = files[0];
            processDocument(fileToProcess);
          }, 500);
        }
      } else {
        setUploadError('Upload failed: ' + response.message);
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      setUploadError('Upload failed: ' + (error.message || 'Unknown error'));
    } finally {
      // Keep uploading true if we moved to next step immediately, handled by processDocument
      if (activeStep !== 1) {
        setUploading(false);
      }
    }
  };

  // Process document with Gemini AI
  // Process document with Gemini AI
  const processDocument = async (fileOrFilename: File | string) => {
    setProcessing(true);
    setProcessingError(null);

    try {
      // Process document with AI
      const response = await documentService.processDocument(fileOrFilename);
      console.log("Processing response:", response);

      if (response.success) {
        setExtractedData(response.data);
        setProcessingComplete(true);
        setActiveStep(2); // Move to Review & Edit step
      } else {
        throw new Error(response.message || 'Processing failed');
      }
    } catch (error: any) {
      console.error("Processing error:", error);

      let errorMessage = error.message || 'Unknown error';
      if (errorMessage.includes('413')) {
        errorMessage = "File is too large. Please upload a smaller file (under 4MB).";
      } else if (errorMessage.includes('timeout')) {
        errorMessage = "Processing timed out. The AI is taking too long.";
      }

      setProcessingError('AI Processing failed: ' + errorMessage);

      // OPTIONAL: Fallback to mock data only if explicitly desired, otherwise show error
      // user requested "proper error handling", so we should probably stop and show error
      // but keeping fallback for demo continuity if it's just a network glitch could be nice.
      // Let's decided to NOT auto-fallback to mock data on real error, to be transparent.
      // But we can add a button to "Use Demo Data" in the error UI.

    } finally {
      setProcessing(false);
      setUploading(false); // Ensure upload state is cleared
    }
  };

  // Handle use data (would navigate to calculator with data)
  const handleUseData = () => {
    // In a real implementation, this would navigate to the calculator page
    // and pre-fill the form with the extracted data
    alert('In a complete implementation, this would navigate to the calculator with pre-filled data');
  };

  // Render file list
  const renderFileList = () => {
    if (files.length === 0) return null;

    return (
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Selected Files
        </Typography>
        {files.map((file, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              p: 2,
              mb: 1,
              borderRadius: 1,
              bgcolor: 'grey.100'
            }}
          >
            <DescriptionIcon sx={{ mr: 2, color: 'primary.main' }} />
            <Box>
              <Typography variant="body1" fontWeight="500">
                {file.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {(file.size / 1024).toFixed(1)} KB
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    );
  };

  // Render extracted data preview
  const renderExtractedDataPreview = () => {
    if (!extractedData) return null;

    return (
      <Card elevation={3} sx={{ mt: 4, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom fontWeight="600" fontFamily="Poppins, sans-serif">
            Extracted Information
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" fontWeight="500" gutterBottom>
                Income Details
              </Typography>

              <Box sx={{ pl: 2 }}>
                <Typography variant="body2" gutterBottom>
                  Salary Income: ₹{extractedData.incomeDetails.salaryIncome.toLocaleString('en-IN')}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Capital Gains: ₹{extractedData.incomeDetails.capitalGains.toLocaleString('en-IN')}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  House Property Income: ₹{extractedData.incomeDetails.housePropertyIncome.toLocaleString('en-IN')}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Other Income: ₹{extractedData.incomeDetails.otherIncome.toLocaleString('en-IN')}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" fontWeight="500" gutterBottom>
                Deduction Details
              </Typography>

              <Box sx={{ pl: 2 }}>
                <Typography variant="body2" gutterBottom>
                  Section 80C: ₹{extractedData.deductionDetails.section80C.toLocaleString('en-IN')}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Section 80D: ₹{extractedData.deductionDetails.section80D.toLocaleString('en-IN')}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  HRA Exemption: ₹{extractedData.deductionDetails.hra.toLocaleString('en-IN')}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Home Loan Interest: ₹{extractedData.deductionDetails.homeLoanInterest.toLocaleString('en-IN')}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="500">
                Recommended Tax Regime: <span style={{ color: theme.palette.primary.main }}>{extractedData.taxRegime === 'old' ? 'Old Regime' : 'New Regime'}</span>
              </Typography>
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<EditIcon />}
            >
              Edit Data
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={handleUseData}
            >
              Use This Data for Calculation
            </Button>
          </Box>
        </CardContent>
      </Card>
    );
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
          Document Upload
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          gutterBottom
          sx={{ mb: 4 }}
        >
          Upload your tax documents and let our AI extract the information automatically
        </Typography>

        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            {activeStep === 0 && (
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
                  Upload Your Documents
                </Typography>

                <Typography variant="body1" paragraph>
                  Our AI can process Form 16, IT returns, investment proofs, and other tax documents to automatically fill your tax calculator.
                </Typography>

                <Box
                  {...getRootProps()}
                  sx={{
                    border: `2px dashed ${isDragActive ? theme.palette.primary.main : theme.palette.grey[300]}`,
                    borderRadius: 2,
                    p: 5,
                    textAlign: 'center',
                    bgcolor: isDragActive ? 'primary.light' : 'background.paper',
                    color: isDragActive ? 'white' : 'inherit',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                      bgcolor: 'primary.light',
                      color: 'white'
                    }
                  }}
                >
                  <input {...getInputProps()} />
                  <CloudUploadIcon sx={{ fontSize: 48, mb: 2, color: isDragActive ? 'white' : 'primary.main' }} />
                  <Typography variant="h6" gutterBottom>
                    Drag & drop files here
                  </Typography>
                  <Typography variant="body2" color={isDragActive ? 'white' : 'text.secondary'}>
                    or click to select files
                  </Typography>
                  <Typography variant="body2" color={isDragActive ? 'white' : 'text.secondary'} sx={{ mt: 1 }}>
                    Supported formats: PDF, JPEG, PNG, Excel (Max 10MB per file)
                  </Typography>
                </Box>

                {renderFileList()}

                {uploadError && (
                  <Alert severity="error" sx={{ mt: 3 }}>
                    {uploadError}
                  </Alert>
                )}

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={uploading ? <CircularProgress size={20} color="inherit" /> : null}
                    onClick={handleUpload}
                    disabled={files.length === 0 || uploading}
                    sx={{ px: 4 }}
                  >
                    {uploading ? 'Uploading...' : 'Upload Documents'}
                  </Button>
                </Box>
              </Paper>
            )}

            {activeStep === 1 && (
              <Paper
                elevation={3}
                sx={{
                  p: 5,
                  borderRadius: 2,
                  mb: 4,
                  textAlign: 'center'
                }}
              >
                <Typography
                  variant="h5"
                  component="h2"
                  fontWeight="600"
                  fontFamily="Poppins, sans-serif"
                  gutterBottom
                >
                  Processing Your Documents
                </Typography>

                <Box sx={{ my: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {processing ? (
                    <>
                      <CircularProgress size={60} sx={{ mb: 3 }} />
                      <Typography variant="body1">
                        Our AI is analyzing your documents...
                      </Typography>
                    </>
                  ) : (
                    <>
                      <AutorenewIcon sx={{ fontSize: 60, color: 'primary.main', mb: 3 }} />
                      <Typography variant="body1">
                        Processing will begin shortly...
                      </Typography>
                    </>
                  )}
                </Box>

                {processingError && (
                  <Box sx={{ mt: 3, textAlign: 'left' }}>
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {processingError}
                    </Alert>

                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      If you are facing connection issues, you can try with our demo data:
                    </Typography>
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="small"
                      onClick={() => {
                        setProcessingError(null);
                        setExtractedData({
                          incomeDetails: { salaryIncome: 1500000, businessIncome: 0, capitalGains: 20000, housePropertyIncome: 0, otherIncome: 50000 },
                          deductionDetails: { section80C: 150000, section80D: 25000, hra: 0, lta: 0, nps: 50000, homeLoanInterest: 0, otherDeductions: 0 },
                          taxRegime: 'new'
                        });
                        setProcessingComplete(true);
                        setActiveStep(2);
                      }}
                    >
                      Use Demo Data
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ ml: 2 }}
                      size="small"
                      onClick={() => {
                        setActiveStep(0);
                        setFiles([]);
                        setProcessingError(null);
                      }}
                    >
                      Try Again
                    </Button>
                  </Box>
                )}

                <Typography variant="body2" color="text.secondary">
                  This may take a few moments depending on the complexity of your documents.
                </Typography>
              </Paper>
            )}

            {activeStep === 2 && (
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  mb: 4
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <CheckCircleIcon sx={{ color: 'success.main', fontSize: 32, mr: 2 }} />
                  <Typography
                    variant="h5"
                    component="h2"
                    fontWeight="600"
                    fontFamily="Poppins, sans-serif"
                  >
                    Information Extracted Successfully
                  </Typography>
                </Box>

                <Typography variant="body1" paragraph>
                  Our AI has analyzed your documents and extracted the following information. Please review and edit if necessary.
                </Typography>

                {renderExtractedDataPreview()}

                <Box sx={{ mt: 4 }}>
                  <Typography variant="subtitle1" fontWeight="500" gutterBottom>
                    What would you like to do next?
                  </Typography>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleUseData}
                      sx={{ flexGrow: { xs: 1, sm: 0 } }}
                    >
                      Calculate Tax with This Data
                    </Button>

                    <Button
                      variant="outlined"
                      color="primary"
                      sx={{ flexGrow: { xs: 1, sm: 0 } }}
                    >
                      Upload Another Document
                    </Button>

                    <Button
                      variant="outlined"
                      color="secondary"
                      sx={{ flexGrow: { xs: 1, sm: 0 } }}
                    >
                      Save for Later
                    </Button>
                  </Box>
                </Box>
              </Paper>
            )}
          </Grid>

          <Grid item xs={12} md={5}>
            <Card
              elevation={3}
              sx={{
                borderRadius: 2,
                position: 'sticky',
                top: 24
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h5"
                  component="h3"
                  fontWeight="600"
                  fontFamily="Poppins, sans-serif"
                  gutterBottom
                >
                  How It Works
                </Typography>

                <Box sx={{ mt: 3 }}>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Box
                      sx={{
                        width: 30,
                        height: 30,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        mr: 2,
                        flexShrink: 0
                      }}
                    >
                      1
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="500" gutterBottom>
                        Upload Your Documents
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Upload your Form 16, IT returns, investment proofs, or other tax documents.
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Box
                      sx={{
                        width: 30,
                        height: 30,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        mr: 2,
                        flexShrink: 0
                      }}
                    >
                      2
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="500" gutterBottom>
                        AI Processing
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Our AI powered by Google's Gemini technology analyzes your documents and extracts relevant tax information.
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Box
                      sx={{
                        width: 30,
                        height: 30,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        mr: 2,
                        flexShrink: 0
                      }}
                    >
                      3
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="500" gutterBottom>
                        Review & Edit
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Review the extracted information, make any necessary edits, and verify the data.
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex' }}>
                    <Box
                      sx={{
                        width: 30,
                        height: 30,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        mr: 2,
                        flexShrink: 0
                      }}
                    >
                      4
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="500" gutterBottom>
                        Calculate Your Tax
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Use the extracted data to calculate your tax liability instantly without manual data entry.
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            <Card
              elevation={3}
              sx={{
                borderRadius: 2,
                mt: 3,
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
                  Supported Documents
                </Typography>

                <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
                  Our AI can process the following document types:
                </Typography>

                <Box component="ul" sx={{ pl: 2, mb: 0 }}>
                  <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                    Form 16 (Salary Certificate)
                  </Typography>
                  <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                    Form 26AS (Tax Credit Statement)
                  </Typography>
                  <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                    Investment Proofs (80C, 80D, etc.)
                  </Typography>
                  <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                    Home Loan Statements
                  </Typography>
                  <Typography component="li" variant="body2">
                    Rent Receipts and Agreements
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default UploadPage;
