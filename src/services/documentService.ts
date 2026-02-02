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
    try {
      const formData = new FormData();
      
      files.forEach(file => {
        formData.append('documents', file);
      });
      
      const response = await axios.post(`${API_URL}/documents/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error uploading documents:', error);
      throw error;
    }
  },
  
  /**
   * Process a document with Gemini AI
   * @param filename Name of the file to process
   * @returns Promise with processing response
   */
  processDocument: async (filename: string): Promise<any> => {
    try {
      const response = await axios.post(`${API_URL}/documents/process`, { filename });
      return response.data;
    } catch (error) {
      console.error('Error processing document:', error);
      throw error;
    }
  }
};

export default documentService;
