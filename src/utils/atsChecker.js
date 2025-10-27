export const checkAtsScore = (resumeData) => {
  let score = 0;
  const feedback = [];
  const maxScore = 100;

  // Personal Info (15 points)
  let personalScore = 0;
  if (resumeData.personalInfo.fullName) personalScore += 3;
  if (resumeData.personalInfo.email) personalScore += 3;
  if (resumeData.personalInfo.phone) personalScore += 3;
  if (resumeData.personalInfo.title) personalScore += 3;
  if (resumeData.personalInfo.summary && resumeData.personalInfo.summary.length > 50) {
    personalScore += 3;
  } else {
    feedback.push("Add a detailed professional summary (50+ characters).");
  }
  score += personalScore;

  // Experience (35 points)
  let expScore = 0;
  if (resumeData.experience.length > 0) {
    expScore += 10;
    if (resumeData.experience.length >= 2) expScore += 5;
    
    let descriptionsPoints = 0;
    resumeData.experience.forEach(exp => {
      if (exp.description && exp.description.length > 20) descriptionsPoints += 4; // Max 20 for 5 jobs
    });
    expScore += Math.min(20, descriptionsPoints);
  } else {
    feedback.push("Add at least one work experience entry.");
  }
  score += expScore;

  // Education (15 points)
  let eduScore = 0;
  if (resumeData.education.length > 0) {
    eduScore += 10;
    if (resumeData.education.length > 1) eduScore += 5;
  } else {
    feedback.push("Add your education history.");
  }
  score += eduScore;
  
  // Skills (25 points)
  let skillsScore = 0;
  if (resumeData.skills.length > 0) {
    if(resumeData.skills.length >= 5) skillsScore += 15;
    else skillsScore += resumeData.skills.length * 3;

    // Check for keywords
    const keywords = ["lead", "manage", "develop", "create", "optimize", "implement"];
    const resumeText = JSON.stringify(resumeData).toLowerCase();
    let foundKeywords = 0;
    keywords.forEach(kw => {
        if(resumeText.includes(kw)) foundKeywords++;
    });
    skillsScore += Math.min(10, foundKeywords * 2);
  } else {
      feedback.push("Add at least 5 relevant skills.");
  }
  score += skillsScore;

  // Projects/Certs (10 points)
  let bonusScore = 0;
  if (resumeData.projects.length > 0) bonusScore += 5;
  if (resumeData.certifications.length > 0) bonusScore += 5;
  if(resumeData.projects.length === 0) feedback.push("Consider adding relevant projects to showcase your skills.");

  score += bonusScore;

  return {
    total: Math.min(maxScore, Math.round(score)),
    feedback: feedback.length > 0 ? feedback : ["Excellent work! Your resume looks strong."],
  };
};