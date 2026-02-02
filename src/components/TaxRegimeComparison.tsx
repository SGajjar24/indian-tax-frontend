import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid,
  Divider,
  useTheme
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TaxRegimeComparisonProps {
  oldRegimeTax: number;
  newRegimeTax: number;
  savings: number;
  betterRegime: 'old' | 'new';
}

const TaxRegimeComparison: React.FC<TaxRegimeComparisonProps> = ({ 
  oldRegimeTax, 
  newRegimeTax, 
  savings,
  betterRegime
}) => {
  const theme = useTheme();
  
  const chartData = [
    {
      name: 'Old Regime',
      tax: oldRegimeTax,
      fill: theme.palette.primary.main
    },
    {
      name: 'New Regime',
      tax: newRegimeTax,
      fill: theme.palette.secondary.main
    }
  ];
  
  return (
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
        Tax Regime Comparison
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph>
        Compare your tax liability under both regimes to choose the most beneficial option for you.
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Tax Amount']}
                  contentStyle={{ 
                    borderRadius: 8, 
                    border: 'none', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    fontFamily: 'Roboto, sans-serif'
                  }}
                />
                <Legend />
                <Bar dataKey="tax" name="Tax Amount" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 2, mb: 2 }}>
            <Typography variant="body1" fontWeight="500">
              Old Regime Tax:
            </Typography>
            <Typography variant="h5" fontWeight="bold" color="primary">
              ₹{oldRegimeTax.toLocaleString('en-IN')}
            </Typography>
          </Box>
          
          <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 2, mb: 2 }}>
            <Typography variant="body1" fontWeight="500">
              New Regime Tax:
            </Typography>
            <Typography variant="h5" fontWeight="bold" color="primary">
              ₹{newRegimeTax.toLocaleString('en-IN')}
            </Typography>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ 
            p: 3, 
            bgcolor: betterRegime === 'old' ? 'primary.light' : 'secondary.light', 
            color: 'white',
            borderRadius: 2
          }}>
            <Typography variant="body1" fontWeight="500">
              You can save:
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              ₹{savings.toLocaleString('en-IN')}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              by choosing the <strong>{betterRegime === 'old' ? 'Old' : 'New'} Tax Regime</strong>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TaxRegimeComparison;
