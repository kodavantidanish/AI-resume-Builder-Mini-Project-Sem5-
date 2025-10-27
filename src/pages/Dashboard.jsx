import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Trash2, Edit, LogOut } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [resumes, setResumes] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    loadResumes();
  }, [user]);

  const loadResumes = () => {
    const allResumes = JSON.parse(localStorage.getItem('resumes') || '[]');
    const userResumes = allResumes.filter(r => r.userId === user?.id);
    setResumes(userResumes);
  };

  const handleDelete = (id) => {
    const allResumes = JSON.parse(localStorage.getItem('resumes') || '[]');
    const updatedResumes = allResumes.filter(r => r.id !== id);
    localStorage.setItem('resumes', JSON.stringify(updatedResumes));
    loadResumes();
    setDeleteId(null);
    toast({
      title: "Resume deleted",
      description: "Your resume has been removed",
    });
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - AI Resume Builder</title>
        <meta name="description" content="Manage your resumes and create new ones with AI assistance." />
      </Helmet>

      <div className="min-h-screen p-4 md:p-8">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                My Resumes
              </h1>
              <p className="text-gray-600">Welcome back, {user?.name}!</p>
            </div>
            <Button
              variant="outline"
              onClick={logout}
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Resumes Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Create New Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/builder')}
              className="glass-effect rounded-xl p-8 cursor-pointer border-2 border-dashed border-purple-300 hover:border-purple-500 transition-all flex flex-col items-center justify-center min-h-[300px] group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Plus className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Create New Resume</h3>
              <p className="text-gray-600 text-center">Start building your professional resume</p>
            </motion.div>

            {/* Existing Resumes */}
            {resumes.map((resume, index) => (
              <motion.div
                key={resume.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-effect rounded-xl p-6 hover:shadow-2xl transition-all min-h-[300px] flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(`/builder/${resume.id}`)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setDeleteId(resume.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">
                    {resume.personalInfo?.fullName || 'Untitled Resume'}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {resume.personalInfo?.title || 'No title'}
                  </p>
                  <p className="text-xs text-gray-500">
                    Template: {resume.template || 'Modern'}
                  </p>
                </div>

                <div className="text-xs text-gray-500 mt-4">
                  Last updated: {new Date(resume.updatedAt).toLocaleDateString()}
                </div>
              </motion.div>
            ))}
          </div>

          {resumes.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-gray-600 text-lg">
                No resumes yet. Create your first one to get started!
              </p>
            </motion.div>
          )}
        </div>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your resume.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDelete(deleteId)}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};

export default Dashboard;