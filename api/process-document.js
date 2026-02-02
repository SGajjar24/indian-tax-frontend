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

    try {
        const { fileData, mimeType, filename } = req.body;

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ success: false, message: 'Server configuration error: API key missing' });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

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

        // For now, we only support text or basic parsing if it's not an image/pdf supported by standard gemini text model
        // However, Gemini 1.5 Flash supports images and PDFs directly via inline data

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

        // Clean up potential markdown code blocks
        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const data = JSON.parse(cleanedText);

        res.status(200).json({ success: true, data });

    } catch (error) {
        console.error('Gemini API Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to process document',
            error: error.message
        });
    }
};
