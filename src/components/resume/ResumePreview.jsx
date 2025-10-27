import React from 'react';
import ModernTemplate from '@/components/resume/templates/ModernTemplate';
import MinimalistTemplate from '@/components/resume/templates/MinimalistTemplate';
import CreativeTemplate from '@/components/resume/templates/CreativeTemplate';

const ResumePreview = ({ data, template }) => {
  const templates = {
    modern: ModernTemplate,
    minimalist: MinimalistTemplate,
    creative: CreativeTemplate
  };

  const TemplateComponent = templates[template] || ModernTemplate;

  return (
    <div id="resume-preview" className="bg-white rounded-lg shadow-lg">
      <TemplateComponent data={data} />
    </div>
  );
};

export default ResumePreview;