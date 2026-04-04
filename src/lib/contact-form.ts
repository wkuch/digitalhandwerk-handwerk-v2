/**
 * Contact Form API Integration
 * 
 * This module handles form submission to various backend services.
 * Currently supports:
 * 1. Local development (console logging)
 * 2. Web3Forms (free form service with EU servers)
 * 3. Netlify Forms (add data-netlify="true" to form)
 * 4. Formspree (replace endpoint)
 * 5. Custom API endpoint
 */

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;
  privacyAccepted: boolean;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
  error?: string;
}

/**
 * Configuration for different form submission methods
 */
const FORM_CONFIG = {
  // Development: Just log to console
  development: {
    endpoint: null,
    method: 'console',
  },
  // Web3Forms: Free form service with EU servers
  web3forms: {
    endpoint: 'https://api.web3forms.com/submit',
    method: 'POST',
    accessKey: '69b3932f-558e-4829-a907-aa7dc6e0c709',
  },
  // Netlify Forms: Built-in form handling
  netlify: {
    endpoint: '/', // Same page with Netlify form handling
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  },
  // Formspree: External form service
  formspree: {
    endpoint: 'https://formspree.io/f/YOUR_FORM_ID', // Replace with actual form ID
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  },
  // Custom API: Your own backend
  custom: {
    endpoint: '/api/contact', // Replace with your API endpoint
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  },
};

/**
 * Current form submission method
 * Change this to switch between different backends
 */
const CURRENT_METHOD: 'development' | 'web3forms' | 'netlify' | 'formspree' | 'custom' = 'web3forms';

/**
 * Submit contact form data
 */
export async function submitContactForm(data: ContactFormData): Promise<ContactFormResponse> {
  try {
    if (CURRENT_METHOD === 'development') {
      // Development mode: just log and simulate success
      console.log('📧 Contact Form Submission:', data);
      console.log('🔧 To enable real form submission:');
      console.log('1. For Web3Forms: Change CURRENT_METHOD to "web3forms" (already configured)');
      console.log('2. For Netlify: Change CURRENT_METHOD to "netlify" and add data-netlify="true" to form');
      console.log('3. For Formspree: Change CURRENT_METHOD to "formspree" and update the endpoint');
      console.log('4. For custom API: Change CURRENT_METHOD to "custom" and update the endpoint');
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        success: true,
        message: 'Form submitted successfully (development mode)',
      };
    }

    if (CURRENT_METHOD === 'web3forms') {
      // Web3Forms submission
      const config = FORM_CONFIG.web3forms;
      const formData = new FormData();
      formData.append('access_key', config.accessKey);
      
      // Append form data
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          formData.append(key, String(value));
        }
      });

      const response = await fetch(config.endpoint, {
        method: config.method,
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        return {
          success: true,
          message: 'Nachricht erfolgreich gesendet!',
        };
      } else {
        throw new Error(result.message || 'Form submission failed');
      }
    }

    if (CURRENT_METHOD === 'netlify') {
      // Netlify Forms submission
      const config = FORM_CONFIG.netlify;
      const formData = new URLSearchParams();
      formData.append('form-name', 'contact');
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          formData.append(key, String(value));
        }
      });

      const response = await fetch(config.endpoint, {
        method: config.method,
        headers: config.headers,
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return {
        success: true,
        message: 'Nachricht erfolgreich gesendet!',
      };
    }

    if (CURRENT_METHOD === 'formspree') {
      // Formspree submission
      const config = FORM_CONFIG.formspree;
      const response = await fetch(config.endpoint, {
        method: config.method,
        headers: config.headers,
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      return {
        success: true,
        message: result.message || 'Nachricht erfolgreich gesendet!',
      };
    }

    if (CURRENT_METHOD === 'custom') {
      // Custom API submission
      const config = FORM_CONFIG.custom;
      const response = await fetch(config.endpoint, {
        method: config.method,
        headers: config.headers,
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      return {
        success: true,
        message: result.message || 'Nachricht erfolgreich gesendet!',
      };
    }

    throw new Error(`Unknown form submission method: ${CURRENT_METHOD}`);

  } catch (error) {
    console.error('Contact form submission error:', error);
    
    return {
      success: false,
      message: 'Fehler beim Senden der Nachricht',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
