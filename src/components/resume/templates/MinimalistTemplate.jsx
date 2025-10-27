import React from 'react';

const MinimalistTemplate = ({ data }) => {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="p-8 text-gray-800">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-light text-gray-900 mb-2">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-sm text-gray-600 mb-3">
          {personalInfo.title || 'Professional Title'}
        </p>
        <div className="flex justify-center gap-3 text-xs text-gray-500">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>•</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>•</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-2 pb-1 border-b border-gray-300">
            Summary
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-3 pb-1 border-b border-gray-300">
            Experience
          </h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-medium text-gray-900">{exp.title}</h3>
                <span className="text-xs text-gray-500">
                  {exp.startDate} - {exp.endDate}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">{exp.company}</p>
              <p className="text-sm text-gray-700 leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-3 pb-1 border-b border-gray-300">
            Education
          </h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                  <p className="text-sm text-gray-600">{edu.institution}</p>
                </div>
                <span className="text-xs text-gray-500">{edu.graduationDate}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-2 pb-1 border-b border-gray-300">
            Skills
          </h2>
          <p className="text-sm text-gray-700">
            {skills.map(s => s.name).join(' • ')}
          </p>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-3 pb-1 border-b border-gray-300">
            Projects
          </h2>
          {projects.map((project) => (
            <div key={project.id} className="mb-3">
              <h3 className="font-medium text-gray-900">{project.name}</h3>
              <p className="text-sm text-gray-700">{project.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MinimalistTemplate;