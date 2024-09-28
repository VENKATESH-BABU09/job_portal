
export default function RecruiterProfile() {
    return (
      <div className="bg-gray-100 min-h-screen py-8">
        <div className="container mx-auto">
          {/* Recruiter Header */}
          <div className="bg-white p-8 rounded-lg shadow-md mb-6 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-blue-200 rounded-full h-24 w-24"></div>
              <div className="ml-6">
                <h2 className="text-2xl font-semibold">Company Name: ABC Corp Pvt Ltd</h2>
                <p className="text-gray-600">Industry: IT Services</p>
                <p className="text-gray-500">Location: Bangalore, India</p>
              </div>
            </div>
            <div className="text-right">
              <button className="bg-orange-500 text-white px-6 py-2 rounded-full">Add More Details</button>
            </div>
          </div>
  
          {/* Main Content */}
          <div className="flex">
            {/* Left Sidebar */}
            <div className="w-1/4">
              <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>Company Overview</li>
                  <li>Job Postings</li>
                  <li>Reviews</li>
                  <li>Employer Branding</li>
                  <li>Recruitment Process</li>
                </ul>
              </div>
            </div>
  
            {/* Right Content */}
            <div className="w-3/4 pl-6">
              {/* Company Overview */}
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-xl font-semibold mb-2">Company Overview</h3>
                <p className="text-gray-600">
                  ABC Corp Pvt Ltd is a leading IT services company, providing cutting-edge solutions to enterprises worldwide. Our expertise lies in software development, cloud computing, and AI-based solutions.
                </p>
              </div>
  
              {/* Designation */}
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-xl font-semibold mb-2">Designation</h3>
                <p className="text-gray-600">Current Role: HR Manager</p>
                <p className="text-gray-600">Years with Company: Since 2018</p>
              </div>
  
              {/* Job Postings */}
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-xl font-semibold mb-2">Current Job Postings</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>Software Engineer (5+ years experience, Full-time)</li>
                  <li>Data Scientist (3+ years experience, Full-time)</li>
                  <li>UI/UX Designer (2+ years experience, Full-time)</li>
                </ul>
              </div>
  
              {/* More Company Details */}
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-xl font-semibold mb-2">Company Details</h3>
                <p className="text-gray-600">Company Size: 500+ employees</p>
                <p className="text-gray-600">Founded: 2005</p>
                <p className="text-gray-600">Headquarters: Bangalore, India</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}