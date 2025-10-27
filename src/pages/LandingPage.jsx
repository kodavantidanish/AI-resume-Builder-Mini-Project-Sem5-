import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, FileText, Download, Zap, Shield, Palette } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI-Powered Generation",
      description: "Let AI craft professional resume content tailored to your experience"
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Beautiful Templates",
      description: "Choose from modern, minimalist, and creative designs"
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "PDF Export",
      description: "Download your resume in high-quality PDF format"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "ATS-Friendly",
      description: "Optimized for Applicant Tracking Systems"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Storage",
      description: "Your data is encrypted and safely stored"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Multiple Resumes",
      description: "Create and manage unlimited resumes"
    }
  ];

  return (
    <>
      <Helmet>
        <title>AI Resume Builder - Create Professional Resumes in Minutes</title>
        <meta name="description" content="Build stunning, ATS-friendly resumes with AI assistance. Choose from professional templates and download instantly." />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 px-4">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-blue-600/10 to-pink-600/10"></div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto text-center relative z-10"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-6"
            >
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium">AI-Powered Resume Builder</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
              Build Your Dream Resume
              <br />
              in Minutes
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Create professional, ATS-friendly resumes with AI assistance. 
              Choose from stunning templates and land your dream job faster.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate('/auth')}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 text-lg"
              >
                Get Started Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/auth')}
                className="px-8 py-6 text-lg"
              >
                View Templates
              </Button>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-5xl mx-auto mt-16"
          >
            <div className="glass-effect rounded-2xl p-8 shadow-2xl">
              <img alt="AI Resume Builder Dashboard Preview" className="w-full rounded-lg" src="https://images.unsplash.com/photo-1698047681432-006d2449c631" />
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-white/50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4 gradient-text">
                Everything You Need to Succeed
              </h2>
              <p className="text-xl text-gray-600">
                Powerful features to help you create the perfect resume
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-effect p-6 rounded-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto glass-effect rounded-2xl p-12 text-center"
          >
            <h2 className="text-4xl font-bold mb-4 gradient-text">
              Ready to Build Your Resume?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of job seekers who landed their dream jobs
            </p>
            <Button
              size="lg"
              onClick={() => navigate('/auth')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-12 py-6 text-lg"
            >
              Start Building Now
            </Button>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default LandingPage;