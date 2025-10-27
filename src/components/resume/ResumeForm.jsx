import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

const ResumeForm = ({ data, onChange, section }) => {
  const updatePersonalInfo = (field, value) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value
      }
    });
  };

  const addItem = (arrayName) => {
    const newItem = arrayName === 'experience' ? {
      id: Date.now(),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      description: ''
    } : arrayName === 'education' ? {
      id: Date.now(),
      degree: '',
      institution: '',
      location: '',
      graduationDate: '',
      gpa: ''
    } : arrayName === 'projects' ? {
      id: Date.now(),
      name: '',
      description: '',
      technologies: '',
      link: ''
    } : arrayName === 'certifications' ? {
      id: Date.now(),
      name: '',
      issuer: '',
      date: '',
      link: ''
    } : { id: Date.now(), name: '' };

    onChange({
      ...data,
      [arrayName]: [...data[arrayName], newItem]
    });
  };

  const updateItem = (arrayName, id, field, value) => {
    onChange({
      ...data,
      [arrayName]: data[arrayName].map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    });
  };

  const removeItem = (arrayName, id) => {
    onChange({
      ...data,
      [arrayName]: data[arrayName].filter(item => item.id !== id)
    });
  };

  const addSkill = () => {
    onChange({
      ...data,
      skills: [...data.skills, { id: Date.now(), name: '', level: 'Intermediate' }]
    });
  };

  if (section === 'personal') {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={data.personalInfo.fullName}
            onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
            placeholder="John Doe"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Professional Title</Label>
          <Input
            id="title"
            value={data.personalInfo.title}
            onChange={(e) => updatePersonalInfo('title', e.target.value)}
            placeholder="Senior Software Engineer"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={data.personalInfo.email}
              onChange={(e) => updatePersonalInfo('email', e.target.value)}
              placeholder="john@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={data.personalInfo.phone}
              onChange={(e) => updatePersonalInfo('phone', e.target.value)}
              placeholder="+1 234 567 8900"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={data.personalInfo.location}
            onChange={(e) => updatePersonalInfo('location', e.target.value)}
            placeholder="San Francisco, CA"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="summary">Professional Summary</Label>
          <Textarea
            id="summary"
            value={data.personalInfo.summary}
            onChange={(e) => updatePersonalInfo('summary', e.target.value)}
            placeholder="Brief overview of your professional background..."
            rows={4}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
      {/* Experience Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Work Experience</h3>
          <Button size="sm" onClick={() => addItem('experience')} className="gap-2">
            <Plus className="w-4 h-4" />
            Add
          </Button>
        </div>
        {data.experience.map((exp) => (
          <div key={exp.id} className="border rounded-lg p-4 mb-4 space-y-3">
            <div className="flex justify-between">
              <Input
                placeholder="Job Title"
                value={exp.title}
                onChange={(e) => updateItem('experience', exp.id, 'title', e.target.value)}
              />
              <Button
                size="sm"
                variant="outline"
                onClick={() => removeItem('experience', exp.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <Input
              placeholder="Company"
              value={exp.company}
              onChange={(e) => updateItem('experience', exp.id, 'company', e.target.value)}
            />
            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder="Start Date"
                value={exp.startDate}
                onChange={(e) => updateItem('experience', exp.id, 'startDate', e.target.value)}
              />
              <Input
                placeholder="End Date"
                value={exp.endDate}
                onChange={(e) => updateItem('experience', exp.id, 'endDate', e.target.value)}
              />
            </div>
            <Textarea
              placeholder="Description"
              value={exp.description}
              onChange={(e) => updateItem('experience', exp.id, 'description', e.target.value)}
              rows={3}
            />
          </div>
        ))}
      </div>

      {/* Education Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Education</h3>
          <Button size="sm" onClick={() => addItem('education')} className="gap-2">
            <Plus className="w-4 h-4" />
            Add
          </Button>
        </div>
        {data.education.map((edu) => (
          <div key={edu.id} className="border rounded-lg p-4 mb-4 space-y-3">
            <div className="flex justify-between">
              <Input
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => updateItem('education', edu.id, 'degree', e.target.value)}
              />
              <Button
                size="sm"
                variant="outline"
                onClick={() => removeItem('education', edu.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <Input
              placeholder="Institution"
              value={edu.institution}
              onChange={(e) => updateItem('education', edu.id, 'institution', e.target.value)}
            />
            <Input
              placeholder="Graduation Date"
              value={edu.graduationDate}
              onChange={(e) => updateItem('education', edu.id, 'graduationDate', e.target.value)}
            />
          </div>
        ))}
      </div>

      {/* Skills Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Skills</h3>
          <Button size="sm" onClick={addSkill} className="gap-2">
            <Plus className="w-4 h-4" />
            Add
          </Button>
        </div>
        {data.skills.map((skill) => (
          <div key={skill.id} className="flex gap-2 mb-2">
            <Input
              placeholder="Skill name"
              value={skill.name}
              onChange={(e) => updateItem('skills', skill.id, 'name', e.target.value)}
            />
            <Button
              size="sm"
              variant="outline"
              onClick={() => removeItem('skills', skill.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* Projects Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Projects</h3>
          <Button size="sm" onClick={() => addItem('projects')} className="gap-2">
            <Plus className="w-4 h-4" />
            Add
          </Button>
        </div>
        {data.projects.map((project) => (
          <div key={project.id} className="border rounded-lg p-4 mb-4 space-y-3">
            <div className="flex justify-between">
              <Input
                placeholder="Project Name"
                value={project.name}
                onChange={(e) => updateItem('projects', project.id, 'name', e.target.value)}
              />
              <Button
                size="sm"
                variant="outline"
                onClick={() => removeItem('projects', project.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <Textarea
              placeholder="Description"
              value={project.description}
              onChange={(e) => updateItem('projects', project.id, 'description', e.target.value)}
              rows={2}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeForm;