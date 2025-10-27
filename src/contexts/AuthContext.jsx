import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for existing session in localStorage
    const storedUser = localStorage.getItem('resumeBuilderUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signup = async (email, password, name) => {
    try {
      // Simulate API call - in production, this would be a real backend call
      const users = JSON.parse(localStorage.getItem('resumeBuilderUsers') || '[]');
      
      if (users.find(u => u.email === email)) {
        throw new Error('User already exists');
      }

      const newUser = {
        id: Date.now().toString(),
        email,
        name,
        password, // In production, this would be hashed
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      localStorage.setItem('resumeBuilderUsers', JSON.stringify(users));

      const userSession = { id: newUser.id, email: newUser.email, name: newUser.name };
      setUser(userSession);
      localStorage.setItem('resumeBuilderUser', JSON.stringify(userSession));

      toast({
        title: "Account created! 🎉",
        description: "Welcome to AI Resume Builder!",
      });

      return { success: true };
    } catch (error) {
      toast({
        title: "Signup failed",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  const login = async (email, password) => {
    try {
      const users = JSON.parse(localStorage.getItem('resumeBuilderUsers') || '[]');
      const foundUser = users.find(u => u.email === email && u.password === password);

      if (!foundUser) {
        throw new Error('Invalid credentials');
      }

      const userSession = { id: foundUser.id, email: foundUser.email, name: foundUser.name };
      setUser(userSession);
      localStorage.setItem('resumeBuilderUser', JSON.stringify(userSession));

      toast({
        title: "Welcome back! 👋",
        description: "Successfully logged in",
      });

      return { success: true };
    } catch (error) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('resumeBuilderUser');
    toast({
      title: "Logged out",
      description: "See you soon!",
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};