import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Download, Save, Sparkles, ScanLine } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import ResumeForm from '@/components/resume/ResumeForm';
import ResumePreview from '@/components/resume/ResumePreview';
import TemplateSelector from '@/components/resume/TemplateSelector';
import { generatePDF } from '@/utils/pdfGenerator';
import { generateAIContent } from '@/utils/aiGenerator';
import { checkAtsScore } from '@/utils/atsChecker';
import AtsScoreDisplay from '@/components/resume/AtsScoreDisplay';

const ResumeBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [atsScore, setAtsScore] = useState(null);
  const [isCheckingScore, setIsCheckingScore] = useState(false);
  
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      title: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: []
  });

  useEffect(() => {
    if (id) {
      loadResume(id);
    }
  }, [id]);

  const loadResume = (resumeId) => {
    const allResumes = JSON.parse(localStorage.getItem('resumes') || '[]');
    const resume = allResumes.find(r => r.id === resumeId && r.userId === user?.id);
    if (resume) {
      setResumeData(resume.data);
      setSelectedTemplate(resume.template || 'modern');
    }
  };

  const handleSave = () => {
    setLoading(true);
    const allResumes = JSON.parse(localStorage.getItem('resumes') || '[]');
    
    const resumeToSave = {
      id: id || Date.now().toString(),
      userId: user?.id,
      data: resumeData,
      template: selectedTemplate,
      personalInfo: resumeData.personalInfo,
      updatedAt: new Date().toISOString(),
      createdAt: id ? allResumes.find(r => r.id === id)?.createdAt : new Date().toISOString()
    };

    if (id) {
      const index = allResumes.findIndex(r => r.id === id);
      allResumes[index] = resumeToSave;
    } else {
      allResumes.push(resumeToSave);
    }

    localStorage.setItem('resumes', JSON.stringify(allResumes));
    
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Resume saved! 💾",
        description: "Your changes have been saved successfully",
      });
      if (!id) {
        navigate(`/builder/${resumeToSave.id}`);
      }
    }, 500);
  };

  const handleDownload = async () => {
    setLoading(true);
    try {
      await generatePDF(resumeData, selectedTemplate);
      toast({
        title: "PDF downloaded! 📄",
        description: "Your resume has been downloaded successfully",
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: "There was an error generating your PDF",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const handleAIGenerate = async () => {
    setAiLoading(true);
    try {
      const aiContent = await generateAIContent(resumeData);
      setResumeData(prev => ({
        ...prev,
        ...aiContent
      }));
      toast({
        title: "AI magic complete! ✨",
        description: "Your resume has been enhanced with AI-generated content",
      });
    } catch (error) {
      toast({
        title: "AI generation failed",
        description: error.message,
        variant: "destructive",
      });
    }
    setAiLoading(false);
  };

  const handleCheckAtsScore = () => {
    setIsCheckingScore(true);
    setAtsScore(null); // Reset score before new check
    const score = checkAtsScore(resumeData);
    setTimeout(() => {
      setAtsScore(score);
      setIsCheckingScore(false);
      toast({
        title: "ATS Score Calculated!",
        description: `Your resume score is ${score.total}. See details for improvements.`,
      });
    }, 2000); // Simulate processing time
  };

  return (
    <>
      <Helmet>
        <title>Resume Builder - Create Your Professional Resume</title>
        <meta name="description" content="Build your professional resume with AI assistance and beautiful templates." />
      </Helmet>

      <div className="min-h-screen p-4 md:p-8">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => navigate('/dashboard')}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold gradient-text">
                  Resume Builder
                </h1>
              </div>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <Button
                onClick={handleCheckAtsScore}
                disabled={isCheckingScore}
                variant="outline"
                className="gap-2"
              >
                <ScanLine className="w-4 h-4" />
                {isCheckingScore ? 'Checking...' : 'Check ATS Score'}
              </Button>
              <Button
                onClick={handleAIGenerate}
                disabled={aiLoading}
                className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Sparkles className="w-4 h-4" />
                {aiLoading ? 'Generating...' : 'AI Enhance'}
              </Button>
              <Button
                onClick={handleSave}
                disabled={loading}
                variant="outline"
                className="gap-2"
              >
                <Save className="w-4 h-4" />
                Save
              </Button>
              <Button
                onClick={handleDownload}
                disabled={loading}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left Panel - Form */}
            <div className="glass-effect rounded-xl p-6">
              {(isCheckingScore || atsScore) ? (
                <AtsScoreDisplay 
                  score={atsScore} 
                  isLoading={isCheckingScore} 
                  onClose={() => setAtsScore(null)} 
                />
              ) : (
                <Tabs defaultValue="personal" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="template">Template</TabsTrigger>
                  </TabsList>

                  <TabsContent value="personal" className="space-y-4">
                    <ResumeForm
                      data={resumeData}
                      onChange={setResumeData}
                      section="personal"
                    />
                  </TabsContent>

                  <TabsContent value="content" className="space-y-4">
                    <ResumeForm
                      data={resumeData}
                      onChange={setResumeData}
                      section="content"
                    />
                  </TabsContent>

                  <TabsContent value="template">
                    <TemplateSelector
                      selected={selectedTemplate}
                      onSelect={setSelectedTemplate}
                    />
                  </TabsContent>
                </Tabs>
              )}
            </div>

            {/* Right Panel - Preview */}
            <div className="glass-effect rounded-xl p-6 sticky top-8 max-h-[calc(100vh-4rem)] overflow-auto">
              <h2 className="text-xl font-semibold mb-4">Preview</h2>
              <ResumePreview
                data={resumeData}
                template={selectedTemplate}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumeBuilder;