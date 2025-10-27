import React from 'react';

const CreativeTemplate = ({ data }) => {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/3 bg-gradient-to-br from-pink-600 to-orange-600 text-white p-6">
        <div className="mb-6">
          <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-center mb-1">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <p className="text-sm text-center opacity-90">
            {personalInfo.title || 'Professional Title'}
          </p>
        </div>

        <div className="space-y-4 text-sm">
          {personalInfo.email && (
            <div>
              <h3 className="font-semibold mb-1">Email</h3>
              <p className="opacity-90">{personalInfo.email}</p>
            </div>
          )}
          {personalInfo.phone && (
            <div>
              <h3 className="font-semibold mb-1">Phone</h3>
              <p className="opacity-90">{personalInfo.phone}</p>
            </div>
          )}
          {personalInfo.location && (
            <div>
              <h3 className="font-semibold mb-1">Location</h3>
              <p className="opacity-90">{personalInfo.location}</p>
            </div>
          )}
        </div>

        {/* Skills in Sidebar */}
        {skills.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-3">Skills</h2>
            <div className="space-y-2">
              {skills.map((skill) => (
                <div key={skill.id} className="bg-white/20 rounded px-3 py-1 text-sm">
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-8 text-gray-800">
        {/* Summary */}
        {personalInfo.summary && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-pink-600 mb-3">About Me</h2>
            <p className="text-sm text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-pink-600 mb-3">Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4 pl-4 border-l-2 border-pink-300">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-gray-900">{exp.title}</h3>
                  <span className="text-xs text-gray-600">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <p className="text-sm text-pink-600 mb-2">{exp.company}</p>
                <p className="text-sm text-gray-700 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-pink-600 mb-3">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3 pl-4 border-l-2 border-pink-300">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                    <p className="text-sm text-pink-600">{edu.institution}</p>
                  </div>
                  <span className="text-xs text-gray-600">{edu.graduationDate}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-pink-600 mb-3">Projects</h2>
            {projects.map((project) => (
              <div key={project.id} className="mb-3 pl-4 border-l-2 border-pink-300">
                <h3 className="font-bold text-gray-900">{project.name}</h3>
                <p className="text-sm text-gray-700">{project.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreativeTemplate;