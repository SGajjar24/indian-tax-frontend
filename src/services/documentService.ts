import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

/**
 * Service for handling document uploads and processing
 */
export const documentService = {
  /**
   * Upload documents to the server
   * @param files Array of files to upload
   * @returns Promise with upload response
   */
  uploadDocuments: async (files: File[]): Promise<any> => {
    // Mock upload success since we process directly from client for now
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          files: files.map(f => ({
            filename: f.name,
            originalName: f.name,
            size: f.size
          })),
          message: 'Files uploaded successfully'
        });
      }, 1000);
    });
  },

  /**
   * Process a document with Gemini AI
   * @param filename Name of the file to process
   * @returns Promise with processing response
   */
  processDocument: async (fileOrFilename: File | string): Promise<any> => {
    try {
      if (typeof fileOrFilename === 'string') {
        throw new Error('Backend storage not connected. Please re-upload the file.');
      }

      const file = fileOrFilename;

      // Convert file to Base64
      const base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const result = reader.result as string;
          // Remove data URL prefix (e.g., "data:image/jpeg;base64,")
          const base64 = result.split(',')[1];
          resolve(base64);
        };
        reader.onerror = error => reject(error);
      });

      // Call serverless function
      const response = await axios.post('/api/process-document', {
        fileData: base64Data,
        mimeType: file.type,
        filename: file.name
      });

      return response.data;
    } catch (error) {
      console.error('Error processing document:', error);
      throw error;
    }
  }
};

export default documentService;
