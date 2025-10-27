import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const TemplateSelector = ({ selected, onSelect }) => {
  const templates = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean and professional with a touch of color',
      preview: 'bg-gradient-to-br from-purple-100 to-blue-100'
    },
    {
      id: 'minimalist',
      name: 'Minimalist',
      description: 'Simple and elegant black & white design',
      preview: 'bg-gradient-to-br from-gray-100 to-gray-200'
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Bold and eye-catching for creative roles',
      preview: 'bg-gradient-to-br from-pink-100 to-orange-100'
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Choose Template</h3>
      <div className="grid gap-4">
        {templates.map((template) => (
          <motion.div
            key={template.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(template.id)}
            className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
              selected === template.id
                ? 'border-purple-600 bg-purple-50'
                : 'border-gray-200 hover:border-purple-300'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-20 h-24 rounded ${template.preview} flex-shrink-0`}></div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{template.name}</h4>
                  {selected === template.id && (
                    <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600">{template.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;