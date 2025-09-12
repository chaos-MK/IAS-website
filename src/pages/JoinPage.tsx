import React, { useEffect, useState, ChangeEvent } from 'react';
import emailjs from '@emailjs/browser';

// Define types for our data structures
interface FormDataType {
  fullName: string;
  phoneNumber: string;
  ieeeMail: string;
  ieeeAccountNumber: string;
}

interface MemberType {
  role: string;
  email?: string;
  [key: string]: any; // For any other properties that might exist
}

const JoinPage: React.FC = () => {
  const [formData, setFormData] = useState<FormDataType>({
    fullName: '',
    phoneNumber: '',
    ieeeMail: '',
    ieeeAccountNumber: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formStatus, setFormStatus] = useState<string | null>(null);

  

useEffect(() => {
  const form = document.getElementById("iasForm") as HTMLFormElement | null;
  if (!form) return;

  emailjs.init('oJMlCeHhikiWZlBMO'); // Your public key

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus('processing');

    try {
      // Load all members
      const membersRes = await fetch("/data/officers.json");
      const members = await membersRes.json() as MemberType[];

      // Filter only members with valid emails (officers)
      const officersWithEmail = members.filter((member: MemberType) => !!member.email);

      if (officersWithEmail.length === 0) {
        setFormStatus('partial');
        setIsSubmitting(false);
        return;
      }

      // Send email to each officer
      await Promise.all(
        officersWithEmail.map((officer) =>
          emailjs.send(
            'service_wd1mv5m', // your service ID
            'template_4gpe6yc', // your template ID
            {
              name: formData.fullName,
              phone: formData.phoneNumber,
              ieeeemail: formData.ieeeMail,
              ieeeAccountNumber: formData.ieeeAccountNumber,
              email: officer.email, // individual officer email
            },
            'oJMlCeHhikiWZlBMO' // your public key
          )
        )
      );

      setFormStatus('success');
    } catch (err) {
      console.error("Error sending emails:", err);
      setFormStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  form.addEventListener("submit", handleSubmit);
  return () => form.removeEventListener("submit", handleSubmit);
}, [formData]);


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      phoneNumber: '',
      ieeeMail: '',
      ieeeAccountNumber: ''
    });
    setFormStatus(null);
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-green-50 font-sans min-h-screen">
      {/* Header Banner */}
      <br></br><br></br><br></br><br></br>
      <div className="bg-gradient-to-r from-blue-800 to-green-800 py-6 shadow-lg">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <h1 className="text-3xl font-bold">IEEE IAS</h1>
              <p className="text-blue-100">Industry Applications Society</p>
            </div>
            <div className="bg-white p-2 rounded-full">

            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto py-10 px-4">
        {/* Join Header */}
        <div className="bg-white border-l-8 border-green-700 rounded-lg shadow-lg p-6 mb-8 transform hover:scale-101 transition-transform duration-300">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Join IAS ISIMS SBC</h2>
          <p className="text-gray-700 mb-4">
            Become part of the IEEE Industry Applications Society and connect with professionals, access technical resources, and advance your career.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
              <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
              <span className="text-sm text-blue-800">Professional Development</span>
            </div>
            <div className="flex items-center bg-green-50 px-3 py-1 rounded-full">
              <div className="w-3 h-3 bg-green-600 rounded-full mr-2"></div>
              <span className="text-sm text-green-800">Technical Knowledge</span>
            </div>
            <div className="flex items-center bg-purple-50 px-3 py-1 rounded-full">
              <div className="w-3 h-3 bg-purple-600 rounded-full mr-2"></div>
              <span className="text-sm text-purple-800">Networking Opportunities</span>
            </div>
          </div>
        </div>

        {/* Form Status */}
        {formStatus === 'success' && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded shadow-md">
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <p className="font-medium">Your application has been submitted successfully!</p>
            </div>
          </div>
        )}

        {formStatus === 'error' && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded shadow-md">
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
              <p className="font-medium">There was an error submitting your application. Please try again.</p>
            </div>
          </div>
        )}

        {/* Form */}
        <form id="iasForm" className="space-y-6">
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
                placeholder="Enter your full name"
                className="w-full border-b-2 border-gray-300 focus:border-blue-500 py-2 px-1 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:shadow-lg transition-shadow duration-300">
            <div className="bg-green-700 py-2 px-4">
              <label className="block text-white font-medium">
                Phone Number <span className="text-red-300">*</span>
              </label>
            </div>
            <div className="p-4">
              <input
                type="tel"
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                placeholder="Enter your phone number"
                className="w-full border-b-2 border-gray-300 focus:border-green-500 py-2 px-1 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* IEEE Mail */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:shadow-lg transition-shadow duration-300">
            <div className="bg-green-700 py-2 px-4">
              <label className="block text-white font-medium">
                IEEE Mail <span className="text-red-300">*</span>
              </label>
            </div>
            <div className="p-4">
              <input
                type="email"
                id="ieeeMail"
                value={formData.ieeeMail}
                onChange={handleChange}
                required
                placeholder="Enter your IEEE email address"
                className="w-full border-b-2 border-gray-300 focus:border-purple-500 py-2 px-1 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* IEEE Account Number */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:shadow-lg transition-shadow duration-300">
            <div className="bg-green-700 py-2 px-4">
              <label className="block text-white font-medium">
                IEEE Account Number <span className="text-red-300">*</span>
              </label>
            </div>
            <div className="p-4">
              <input
                type="text"
                id="ieeeAccountNumber"
                value={formData.ieeeAccountNumber}
                onChange={handleChange}
                required
                placeholder="Enter your IEEE account number"
                className="w-full border-b-2 border-gray-300 focus:border-blue-500 py-2 px-1 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Benefits Section */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Membership Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <svg className="w-4 h-4 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <span className="text-sm">Access to technical publications</span>
              </div>
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <svg className="w-4 h-4 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <span className="text-sm">Networking with industry professionals</span>
              </div>
              <div className="flex items-start">
                <div className="bg-purple-100 p-2 rounded-full mr-3">
                  <svg className="w-4 h-4 text-purple-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <span className="text-sm">Career development opportunities</span>
              </div>
              <div className="flex items-start">
                <div className="bg-yellow-100 p-2 rounded-full mr-3">
                  <svg className="w-4 h-4 text-yellow-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <span className="text-sm">Discounts on conferences and events</span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row md:justify-between gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-blue-700 to-green-700 hover:from-blue-800 hover:to-green-800 text-white px-8 py-3 rounded-lg shadow-md font-medium flex items-center justify-center transform hover:scale-105 transition-all duration-300"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Submit Application"
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
              Clear form
            </button>
          </div>
        </form>

       
      </div>
    </div>
  );
};

export default JoinPage;