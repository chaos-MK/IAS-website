import React, { useState, ChangeEvent, FormEvent } from 'react';
import emailjs from '@emailjs/browser';

emailjs.init('oJMlCeHhikiWZlBMO'); 

interface ContactFormData {
  fullName: string;
  objectif: string;
  comment: string;
}

interface OfficerType {
  name: string;
  role: string;
  email: string;
  [key: string]: any;
}

const ContactUsPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    objectif: '',
    comment: ''
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleReset = () => {
    setFormData({ fullName: '', objectif: '', comment: '' });
    setFormStatus('idle');
  };


const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setFormStatus('sending');

  try {
    const officersRes = await fetch('/data/officers.json');

    if (!officersRes.ok) {
      throw new Error(`Failed to load officers.json: ${officersRes.status}`);
    }

    const officers = await officersRes.json() as OfficerType[];

    // Send to each officer individually
    await Promise.all(officers.map(officer =>
      emailjs.send(
        'service_wd1mv5m',
        'template_gisx1yg',
        {
          email: officer.email,
          title: `${formData.fullName}: ${formData.objectif}`,
          message: formData.comment
        }
      )
    ));

    setFormStatus('sent');
    handleReset();
  } catch (error) {
    console.error('EmailJS error:', error);
    setFormStatus('error');
  }
};


  return (
    <div className="bg-gradient-to-b from-green-50 to-blue-50 font-sans min-h-screen">
      <br /><br /><br /><br />
      <div className="bg-gradient-to-r from-green-800 to-blue-800 py-6 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 flex justify-between items-center text-white">
          <div>
            <h1 className="text-3xl font-bold">Contact IAS ISIMS SBC</h1>
            <p className="text-blue-100">We're here to answer your questions and feedback</p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto py-10 px-4">
        {formStatus === 'sent' && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded shadow-md">
            <p>Your message has been successfully sent to our officers.</p>
          </div>
        )}
        {formStatus === 'error' && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded shadow-md">
            <p>There was an error sending your message. Please try again later.</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:shadow-lg transition-shadow duration-300">
            <div className="bg-green-700 py-2 px-4">
              <label className="block text-white font-medium">
                Full Name <span className="text-red-300">*</span>
              </label>
            </div>
            <div className="p-4">
              <input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="Enter your name"
                className="w-full border-b-2 border-gray-300 focus:border-blue-500 py-2 px-1 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Subject */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:shadow-lg transition-shadow duration-300">
            <div className="bg-green-700 py-2 px-4">
              <label className="block text-white font-medium">
                Subject <span className="text-red-300">*</span>
              </label>
            </div>
            <div className="p-4">
              <input
                type="text"
                id="objectif"
                value={formData.objectif}
                onChange={handleChange}
                required
                placeholder="Enter the subject of your message"
                className="w-full border-b-2 border-gray-300 focus:border-purple-500 py-2 px-1 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Comment */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:shadow-lg transition-shadow duration-300">
            <div className="bg-green-700 py-2 px-4">
              <label className="block text-white font-medium">
                Message  <span className="text-red-300">* (Include your contact for a response)</span>
              </label>
            </div>
            <div className="p-4">
              <textarea
                id="comment"
                value={formData.comment}
                onChange={handleChange}
                required
                placeholder="Write your message here..."
                rows={6}
                className="w-full border-b-2 border-gray-300 focus:border-green-500 py-2 px-1 bg-transparent focus:outline-none resize-none"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row md:justify-between gap-4 pt-4">
            <button
              type="submit"
              disabled={formStatus === 'sending'}
              className="bg-gradient-to-r from-blue-700 to-green-700 hover:from-blue-800 hover:to-green-800 text-white px-8 py-3 rounded-lg shadow-md font-medium flex items-center justify-center transform hover:scale-105 transition-all duration-300"
            >
              {formStatus === 'sending' ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="text-blue-800 bg-white border border-blue-300 hover:bg-blue-50 px-6 py-2 rounded-lg shadow-sm flex items-center justify-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
              Clear Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUsPage;
