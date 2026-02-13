// ============================================
// CV DOWNLOAD - Generate and download professional PDF CV from page content
// ============================================

const downloadCVBtn = document.querySelector('.btn.download-cv');

downloadCVBtn.onclick = async (e) => {
     e.preventDefault();
     
     // Show loading state
     const originalText = downloadCVBtn.textContent;
     downloadCVBtn.textContent = 'Generating PDF...';
     downloadCVBtn.style.opacity = '0.7';
     downloadCVBtn.style.pointerEvents = 'none';
     
     try {
          // Load jsPDF library if not already loaded
          if (typeof window.jspdf === 'undefined') {
               await loadJsPDF();
          }
          
          // Generate and download PDF
          generatePDFCV();
          
          // Show success notification
          showToast('CV downloaded successfully!', 'success');
     } catch (error) {
          console.error('Error generating PDF:', error);
          showToast('Failed to generate PDF. Please try again.', 'error');
     } finally {
          // Reset button state
          downloadCVBtn.textContent = originalText;
          downloadCVBtn.style.opacity = '1';
          downloadCVBtn.style.pointerEvents = 'auto';
     }
}

// Load jsPDF library dynamically
function loadJsPDF() {
     return new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
     });
}

// Extract content from the HTML page
function extractPageContent() {
     const content = {
          name: '',
          title: '',
          summary: '',
          email: '',
          social: [],
          workExperience: [],
          education: [],
          skills: {
               frontend: [],
               backend: [],
               design: []
          },
          services: []
     };
     
     // Extract name and title from profile page
     const profilePage = document.querySelector('.profile-page');
     if (profilePage) {
          const nameEl = profilePage.querySelector('h1');
          const titleEl = profilePage.querySelector('h3');
          const summaryEl = profilePage.querySelector('p');
          
          content.name = nameEl ? nameEl.textContent.trim() : 'Bijay Shrestha';
          content.title = titleEl ? titleEl.textContent.trim() : 'Web Developer';
          content.summary = summaryEl ? summaryEl.textContent.trim() : '';
          
          // Extract social media
          const socialLinks = profilePage.querySelectorAll('.social-media a');
          socialLinks.forEach(link => {
               const icon = link.querySelector('i');
               if (icon) {
                    let platform = '';
                    if (icon.classList.contains('bxl-facebook')) platform = 'Facebook';
                    else if (icon.classList.contains('bxl-twitter')) platform = 'Twitter';
                    else if (icon.classList.contains('bxl-linkedin')) platform = 'LinkedIn';
                    else if (icon.classList.contains('bxl-instagram-alt')) platform = 'Instagram';
                    
                    if (platform) {
                         content.social.push({ platform, url: link.href });
                    }
               }
          });
     }
     
     // Extract Work Experience
     const workPage = document.querySelector('#turn-1 .page-front');
     if (workPage) {
          const workItems = workPage.querySelectorAll('.workeduc-content');
          workItems.forEach(item => {
               const year = item.querySelector('.year');
               const title = item.querySelector('h2');
               const desc = item.querySelector('p');
               
               if (year && title && desc) {
                    content.workExperience.push({
                         period: year.textContent.replace(/[📅]/g, '').trim(),
                         title: title.textContent.trim(),
                         description: desc.textContent.trim()
                    });
               }
          });
     }
     
     // Extract Education
     const eduPage = document.querySelector('#turn-1 .page-back');
     if (eduPage) {
          const eduItems = eduPage.querySelectorAll('.workeduc-content');
          eduItems.forEach(item => {
               const year = item.querySelector('.year');
               const title = item.querySelector('h2');
               const desc = item.querySelector('p');
               
               if (year && title && desc) {
                    content.education.push({
                         period: year.textContent.replace(/[📅]/g, '').trim(),
                         degree: title.textContent.trim(),
                         description: desc.textContent.trim()
                    });
               }
          });
     }
     
     // Extract Services
     const servicesPage = document.querySelector('#turn-2 .page-front');
     if (servicesPage) {
          const serviceCards = servicesPage.querySelectorAll('.service-card');
          serviceCards.forEach(card => {
               const frontTitle = card.querySelector('.service-card-front h3');
               const backDetails = card.querySelector('.service-details');
               
               if (frontTitle) {
                    let serviceData = {
                         name: frontTitle.textContent.trim(),
                         details: []
                    };
                    
                    if (backDetails) {
                         const listItems = backDetails.querySelectorAll('ul li');
                         listItems.forEach(li => {
                              serviceData.details.push(li.textContent.trim());
                         });
                         
                         const description = backDetails.querySelector('.service-description');
                         if (description) {
                              serviceData.description = description.textContent.trim();
                         }
                    }
                    
                    content.services.push(serviceData);
               }
          });
     }
     
     // Extract Skills
     const skillsPage = document.querySelector('#turn-2 .page-back');
     if (skillsPage) {
          const skillSections = skillsPage.querySelectorAll('.skils-content');
          skillSections.forEach(section => {
               const category = section.querySelector('h3');
               const skills = section.querySelectorAll('.content span');
               
               if (category) {
                    const categoryName = category.textContent.trim().toLowerCase();
                    const skillsList = [];
                    
                    skills.forEach(skill => {
                         const skillText = skill.textContent.trim();
                         if (skillText) skillsList.push(skillText);
                    });
                    
                    if (categoryName.includes('front')) {
                         content.skills.frontend = skillsList;
                    } else if (categoryName.includes('back')) {
                         content.skills.backend = skillsList;
                    } else if (categoryName.includes('design') || categoryName.includes('ux')) {
                         content.skills.design = skillsList;
                    }
               }
          });
     }
     
     return content;
}

// Generate professional PDF CV from extracted content
function generatePDFCV() {
     const { jsPDF } = window.jspdf;
     const doc = new jsPDF();
     
     // Extract content from page
     const content = extractPageContent();
     
     // Set document properties
     doc.setProperties({
          title: `${content.name} - CV`,
          subject: 'Curriculum Vitae',
          author: content.name,
          keywords: 'cv, resume, web developer',
          creator: 'Portfolio Website'
     });
     
     const pageWidth = doc.internal.pageSize.getWidth();
     const pageHeight = doc.internal.pageSize.getHeight();
     const margin = 20;
     const contentWidth = pageWidth - (margin * 2);
     let yPos = margin;
     
     // Colors
     const primaryColor = [41, 128, 185]; // Blue
     const secondaryColor = [52, 73, 94]; // Dark gray
     const accentColor = [231, 76, 60]; // Red accent
     
     // Helper function to check if new page is needed
     function checkNewPage(requiredSpace = 40) {
          if (yPos > pageHeight - requiredSpace) {
               doc.addPage();
               yPos = margin;
               return true;
          }
          return false;
     }
     
     // Helper function to add section
     function addSection(title, content, isFirst = false) {
          if (!isFirst) {
               checkNewPage();
          }
          
          // Section title with background
          doc.setFillColor(...primaryColor);
          doc.rect(margin, yPos, contentWidth, 10, 'F');
          doc.setTextColor(255, 255, 255);
          doc.setFontSize(14);
          doc.setFont('helvetica', 'bold');
          doc.text(title, margin + 3, yPos + 7);
          yPos += 15;
          
          // Section content
          doc.setTextColor(...secondaryColor);
          doc.setFontSize(10);
          doc.setFont('helvetica', 'normal');
          content();
          
          yPos += 5;
     }
     
     // Header with name and title
     doc.setFillColor(...primaryColor);
     doc.rect(0, 0, pageWidth, 50, 'F');
     doc.setTextColor(255, 255, 255);
     doc.setFontSize(28);
     doc.setFont('helvetica', 'bold');
     doc.text(content.name.toUpperCase(), pageWidth / 2, 25, { align: 'center' });
     doc.setFontSize(14);
     doc.setFont('helvetica', 'normal');
     doc.text(content.title.charAt(0).toUpperCase() + content.title.slice(1), pageWidth / 2, 35, { align: 'center' });
     
     yPos = 60;
     
     // Contact Information
     doc.setTextColor(...secondaryColor);
     doc.setFontSize(10);
     let contactY = yPos;
     
     // Add social media links
     if (content.social.length > 0) {
          content.social.forEach((social, index) => {
               doc.text(`${social.platform}: ${social.url}`, pageWidth / 2, contactY, { align: 'center' });
               contactY += 6;
          });
          yPos = contactY + 10;
     } else {
          yPos += 15;
     }
     
     // Professional Summary
     if (content.summary) {
          addSection('PROFESSIONAL SUMMARY', () => {
               const lines = doc.splitTextToSize(content.summary, contentWidth - 6);
               doc.text(lines, margin + 3, yPos);
               yPos += lines.length * 5 + 3;
          });
     }
     
     // Work Experience
     if (content.workExperience.length > 0) {
          addSection('WORK EXPERIENCE', () => {
               content.workExperience.forEach((exp, index) => {
                    checkNewPage(35);
                    
                    doc.setFont('helvetica', 'bold');
                    doc.setFontSize(11);
                    doc.text(exp.title, margin + 3, yPos);
                    yPos += 5;
                    
                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(9);
                    doc.setTextColor(...accentColor);
                    doc.text(exp.period, margin + 3, yPos);
                    doc.setTextColor(...secondaryColor);
                    yPos += 6;
                    
                    doc.setFontSize(9);
                    const descLines = doc.splitTextToSize(exp.description, contentWidth - 10);
                    doc.text(descLines, margin + 6, yPos);
                    yPos += descLines.length * 4 + 5;
               });
          });
     }
     
     // Education
     if (content.education.length > 0) {
          addSection('EDUCATION', () => {
               content.education.forEach(edu => {
                    checkNewPage(30);
                    
                    doc.setFont('helvetica', 'bold');
                    doc.setFontSize(11);
                    doc.text(edu.degree, margin + 3, yPos);
                    yPos += 5;
                    
                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(9);
                    doc.setTextColor(...accentColor);
                    doc.text(edu.period, margin + 3, yPos);
                    doc.setTextColor(...secondaryColor);
                    yPos += 5;
                    
                    const lines = doc.splitTextToSize(edu.description, contentWidth - 6);
                    doc.text(lines, margin + 3, yPos);
                    yPos += lines.length * 4 + 5;
               });
          });
     }
     
     // Technical Skills
     const hasSkills = content.skills.frontend.length > 0 || 
                       content.skills.backend.length > 0 || 
                       content.skills.design.length > 0;
     
     if (hasSkills) {
          addSection('TECHNICAL SKILLS', () => {
               if (content.skills.frontend.length > 0) {
                    doc.setFont('helvetica', 'bold');
                    doc.setFontSize(10);
                    doc.text('Front-end:', margin + 3, yPos);
                    yPos += 5;
                    
                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(9);
                    const skillsText = content.skills.frontend.join(' • ');
                    const lines = doc.splitTextToSize(skillsText, contentWidth - 6);
                    doc.text(lines, margin + 3, yPos);
                    yPos += lines.length * 4 + 4;
               }
               
               if (content.skills.backend.length > 0) {
                    checkNewPage(25);
                    doc.setFont('helvetica', 'bold');
                    doc.setFontSize(10);
                    doc.text('Back-end:', margin + 3, yPos);
                    yPos += 5;
                    
                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(9);
                    const skillsText = content.skills.backend.join(' • ');
                    const lines = doc.splitTextToSize(skillsText, contentWidth - 6);
                    doc.text(lines, margin + 3, yPos);
                    yPos += lines.length * 4 + 4;
               }
               
               if (content.skills.design.length > 0) {
                    checkNewPage(25);
                    doc.setFont('helvetica', 'bold');
                    doc.setFontSize(10);
                    doc.text('UI/UX Design:', margin + 3, yPos);
                    yPos += 5;
                    
                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(9);
                    const skillsText = content.skills.design.join(' • ');
                    const lines = doc.splitTextToSize(skillsText, contentWidth - 6);
                    doc.text(lines, margin + 3, yPos);
                    yPos += lines.length * 4 + 4;
               }
          });
     }
     
     // Services Offered
     if (content.services.length > 0) {
          addSection('MY SKILLS AND EXPERTISE', () => {
               content.services.forEach(service => {
                    checkNewPage(30);
                    
                    doc.setFont('helvetica', 'bold');
                    doc.setFontSize(10);
                    doc.text(`• ${service.name}`, margin + 3, yPos);
                    yPos += 5;
                    
                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(9);
                    
                    if (service.details && service.details.length > 0) {
                         service.details.forEach(detail => {
                              const lines = doc.splitTextToSize(`  - ${detail}`, contentWidth - 10);
                              doc.text(lines, margin + 6, yPos);
                              yPos += lines.length * 4;
                         });
                    }
                    
                    if (service.description) {
                         yPos += 2;
                         const descLines = doc.splitTextToSize(service.description, contentWidth - 10);
                         doc.text(descLines, margin + 6, yPos);
                         yPos += descLines.length * 4;
                    }
                    
                    yPos += 4;
               });
          });
     }
     
     // Add page numbers to all pages
     const pageCount = doc.internal.getNumberOfPages();
     for (let i = 1; i <= pageCount; i++) {
          doc.setPage(i);
          doc.setFontSize(8);
          doc.setTextColor(150, 150, 150);
          const footerY = pageHeight - 15;
          doc.text(`Generated on ${new Date().toLocaleDateString()}`, pageWidth / 2, footerY, { align: 'center' });
          doc.text(`Page ${i} of ${pageCount}`, pageWidth - margin, footerY, { align: 'right' });
     }
     
     // Save the PDF
     const fileName = content.name.replace(/\s+/g, '_') + '_CV.pdf';
     doc.save(fileName);
}