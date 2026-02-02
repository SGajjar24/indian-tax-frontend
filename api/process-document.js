const { GoogleGenerativeAI } = require('@google/generative-ai');

module.exports = async (req, res) => {
    // CORS configuration
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    console.log('Document processing request received:', filename, mimeType);

    try {
        const { fileData, mimeType, filename } = req.body;

        if (!process.env.GEMINI_API_KEY) {
            console.error('SERVER ERROR: GEMINI_API_KEY is missing in environment variables.');
            return res.status(500).json({ success: false, message: 'Server configuration error: API key missing' });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        console.log('Sending request to Gemini AI...');

        let prompt = `
      Analyze this tax document (${filename}) and extract key financial details for Indian Income Tax calculation.
      Return ONLY a JSON object with this exact structure (no markdown formatting):
      {
        "incomeDetails": {
          "salaryIncome": number,
          "businessIncome": number,
          "capitalGains": number,
          "housePropertyIncome": number,
          "otherIncome": number
        },
        "deductionDetails": {
          "section80C": number,
          "section80D": number,
          "hra": number,
          "lta": number,
          "nps": number,
          "homeLoanInterest": number,
          "otherDeductions": number
        },
        "taxRegime": "old" | "new"
      }
      If a value is not found, use 0. infer tax regime from context if possible, default to 'old'.
    `;

        const parts = [
            { text: prompt }
        ];

        if (fileData) {
            parts.push({
                inlineData: {
                    data: fileData,
                    mimeType: mimeType || 'application/pdf'
                }
            });
        }

        const result = await model.generateContent(parts);
        const response = await result.response;
        const text = response.text();

        console.log('Gemini AI response received. Length:', text.length);

        // Clean up potential markdown code blocks
        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();

        try {
            const data = JSON.parse(cleanedText);
            console.log('Successfully parsed Gemini response.');
            return res.status(200).json({ success: true, data });
        } catch (parseError) {
            console.error('Failed to parse Gemini response:', cleanedText);
            return res.status(500).json({
                success: false,
                message: 'AI returned invalid data format',
                rawResponse: text // Optional: Return raw text for debugging
            });
        }

    } catch (error) {
        console.error('Gemini API/Processing Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to process document',
            error: error.message
        });
    }
};
