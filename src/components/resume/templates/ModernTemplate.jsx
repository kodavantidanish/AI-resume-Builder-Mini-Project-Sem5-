import React from 'react';

const ModernTemplate = ({ data }) => {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="p-8 text-gray-800">
      {/* Header */}
      <div className="mb-6 pb-6 border-b-2 border-purple-600">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-lg text-purple-600 mb-3">
          {personalInfo.title || 'Professional Title'}
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-1 h-6 bg-purple-600"></span>
            Professional Summary
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-1 h-6 bg-purple-600"></span>
            Work Experience
          </h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                <span className="text-sm text-gray-600">
                  {exp.startDate} - {exp.endDate}
                </span>
              </div>
              <p className="text-sm text-purple-600 mb-2">{exp.company}</p>
              <p className="text-sm text-gray-700 leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-1 h-6 bg-purple-600"></span>
            Education
          </h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                  <p className="text-sm text-purple-600">{edu.institution}</p>
                </div>
                <span className="text-sm text-gray-600">{edu.graduationDate}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-1 h-6 bg-purple-600"></span>
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-1 h-6 bg-purple-600"></span>
            Projects
          </h2>
          {projects.map((project) => (
            <div key={project.id} className="mb-3">
              <h3 className="font-semibold text-gray-900">{project.name}</h3>
              <p className="text-sm text-gray-700">{project.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModernTemplate;