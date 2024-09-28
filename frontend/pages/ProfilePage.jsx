export default function ProfilePage() {
    return (
      <div className="bg-gray-100 min-h-screen py-8">
        <div className="container mx-auto">
          {/* Profile Header */}
          <div className="bg-white p-8 rounded-lg shadow-md mb-6 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-green-200 rounded-full h-24 w-24"></div>
              <div className="ml-6">
                <h2 className="text-2xl font-semibold">Aswin Prasad K P</h2>
                <p className="text-gray-600">B.Tech/B.E., Thiagarajar College of Engineering, Madurai</p>
                <p className="text-gray-500">Madurai | Male | 2nd March 2005</p>
              </div>
            </div>
            <div className="text-right">
              <button className="bg-orange-500 text-white px-6 py-2 rounded-full">Add 2 missing details</button>
            </div>
          </div>
  
          {/* Main Content */}
          <div className="flex">
            {/* Left Sidebar */}
            <div className="w-1/4">
              <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>Preference</li>
                  <li>Education</li>
                  <li>Key Skills</li>
                  <li>Languages</li>
                  <li>Internships</li>
                  <li>Projects</li>
                  <li>Profile Summary</li>
                  <li>Accomplishments</li>
                </ul>
              </div>
            </div>
  
            {/* Right Content */}
            <div className="w-3/4 pl-6">
              {/* Career Preferences */}
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-xl font-semibold mb-2">Your Career Preferences</h3>
                <p className="text-gray-600">Preferred Job Type: Jobs, Internships</p>
                <p className="text-gray-600">Availability to work: More than 3 Months</p>
                <p className="text-gray-600">Preferred Location: Bangalore, Chennai, Madurai</p>
              </div>
  
              {/* Education */}
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-xl font-semibold mb-2">Education</h3>
                <p className="text-gray-600">B.Tech/B.E. from Thiagarajar College of Engineering, Madurai</p>
                <p className="text-gray-600">Class XII: Diploma, English (Scored 96.45%)</p>
                <p className="text-gray-600">Class X: Tamil Nadu, English (Scored 74.6%)</p>
              </div>
  
              {/* Key Skills */}
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-xl font-semibold mb-2">Key Skills</h3>
                <div className="flex flex-wrap space-x-2">
                  <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full">Full Stack</span>
                  <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full">AI</span>
                  <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full">Python</span>
                  {/* Add more tags as needed */}
                </div>
              </div>
  
              {/* Add more sections like Languages, Internships, etc. */}
            </div>
          </div>
        </div>
      </div>
    );
  }