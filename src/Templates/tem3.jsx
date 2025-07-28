import React from "react";

const ResumeTemplateThree = ({ templateData }) => {
  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.name}>{templateData.name || "Your Name"}</h1>
        <p>{templateData.email} | {templateData.phone}</p>
        <a href={templateData.linkedin} style={styles.link}>LinkedIn</a> |{" "}
        <a href={templateData.github} style={styles.link}>GitHub</a>
      </div>

      {/* Career Objective */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Career Aim</h2>
        <p>{templateData.careerAim || "Your career objective here..."}</p>
      </div>

      {/* Education */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Education</h2>
        {templateData.education?.map((edu, index) => (
          <div key={index}>
            <p style={styles.boldText}>{edu.degree}</p>
            <p>{edu.institution} ({edu.graduationYear})</p>
          </div>
        ))}
      </div>

      {/* Work Experience */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Work Experience</h2>
        {templateData.workExperience?.map((job, index) => (
          <div key={index}>
            <h3 style={styles.boldText}>{job.title}</h3>
            <p>{job.description}</p>
          </div>
        ))}
      </div>

      {/* Projects */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Projects</h2>
        <p>{templateData.projects}</p>
      </div>

      {/* Skills */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Skills</h2>
        <p>{templateData.skills}</p>
      </div>

      {/* Certifications */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Certifications</h2>
        <p>{templateData.certifications}</p>
      </div>

      {/* Achievements */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Achievements</h2>
        <p>{templateData.achievements}</p>
      </div>

      {/* Languages */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Languages</h2>
        <p>{templateData.languages}</p>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    maxWidth: "1200px",
    margin: "auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#fff",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    paddingBottom: "10px",
    borderBottom: "2px solid #ddd",
  },
  name: {
    fontSize: "28px",
    fontWeight: "bold",
  },
  link: {
    color: "#1E90FF",
    textDecoration: "none",
  },
  section: {
    marginTop: "20px",
    paddingBottom: "10px",
    borderBottom: "1px solid #ddd",
  },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  boldText: {
    fontWeight: "bold",
  },
};

export default ResumeTemplateThree;
// import React from "react";

// const ResumeTemplateThree = () => {
//   const resumeData = {
//     name: "Samama Taimoor",
//     email: "samamataimoor69@gmail.com",
//     phone: "(+92) 307-0764805",
//     linkedin: "https://www.linkedin.com/in/samama-taimoor-a1b19b264/",
//     github: "https://github.com/TaimoorSAMAMA",
//     careerAim:
//       "Seeking a challenging position in a reputable organization to leverage and advance my skills, contributing to growth and development.",
//     education: {
//       degree: "BSCS",
//       institution: "FAST NUCES, Islamabad Campus",
//       duration: "Aug 2021 – onward",
//       keyCourses: [
//         "MERN Development",
//         "Video/Picture Editing",
//         "Webflow Developer",
//         "ASP.Net Developer",
//         "AI/ML Enthusiast",
//       ],
//     },
//     experience: [
//       {
//         title: "C# & SQL Developer (ASP.Net Developer)",
//         description:
//           "Developed websites utilizing .NET Framework in Visual Studio, leveraging C# for backend development and SQL Server Management Studio for database management.",
//       },
//       {
//         title: "Frontend Web Developer",
//         description:
//           "Experienced in front-end development using HTML, CSS, JavaScript, and proficient in React.",
//       },
//       {
//         title: "Webflow Developer",
//         description: "Developed a website clone using Webflow online design concepts.",
//       },
//     ],
//     projects: [
//       {
//         name: "GenResume",
//         description:
//           "Implemented Job Board APIs for Job Listing & Job Matching Algorithm using AI/NLP.",
//       },
//       {
//         name: "Time Table",
//         description: "Python-based Genetic Algorithm implementation for scheduling tasks.",
//       },
//       {
//         name: "Attendance App",
//         description: "React-based student attendance management system.",
//       },
//     ],
//     skills: [
//       "Python",
//       "AI/ML",
//       "React",
//       "MongoDB",
//       "SQL",
//       "ASP.NET",
//       "Java",
//       "C#",
//       "C++",
//     ],
//   };

//   return (
//     <div style={styles.container}>
//       {/* Header */}
//       <div style={styles.header}>
//         <h1 style={styles.name}>{resumeData.name}</h1>
//         <p>{resumeData.email} | {resumeData.phone}</p>
//         <a href={resumeData.linkedin} style={styles.link}>LinkedIn</a> |{" "}
//         <a href={resumeData.github} style={styles.link}>GitHub</a>
//       </div>

//       {/* Career Objective */}
//       <div style={styles.section}>
//         <h2 style={styles.sectionTitle}>Career Aim</h2>
//         <p>{resumeData.careerAim}</p>
//       </div>

//       {/* Education */}
//       <div style={styles.section}>
//         <h2 style={styles.sectionTitle}>Education</h2>
//         <p style={styles.boldText}>{resumeData.education.degree}</p>
//         <p>{resumeData.education.institution} ({resumeData.education.duration})</p>
//         <ul>
//           {resumeData.education.keyCourses.map((course, index) => (
//             <li key={index}>{course}</li>
//           ))}
//         </ul>
//       </div>

//       {/* Experience */}
//       <div style={styles.section}>
//         <h2 style={styles.sectionTitle}>Work Experience</h2>
//         {resumeData.experience.map((job, index) => (
//           <div key={index}>
//             <h3 style={styles.boldText}>{job.title}</h3>
//             <p>{job.description}</p>
//           </div>
//         ))}
//       </div>

//       {/* Projects */}
//       <div style={styles.section}>
//         <h2 style={styles.sectionTitle}>Projects</h2>
//         {resumeData.projects.map((project, index) => (
//           <div key={index}>
//             <h3 style={styles.boldText}>{project.name}</h3>
//             <p>{project.description}</p>
//           </div>
//         ))}
//       </div>

//       {/* Skills */}
//       <div style={styles.section}>
//         <h2 style={styles.sectionTitle}>Skills</h2>
//         <ul>
//           {resumeData.skills.map((skill, index) => (
//             <li key={index}>{skill}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// // Styles
// const styles = {
//   container: {
//     maxWidth: "12c00px",
//     margin: "auto",
//     padding: "20px",
//     fontFamily: "Arial, sans-serif",
//     backgroundColor: "#fff",
//     boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
//   },
//   header: {
//     textAlign: "center",
//     paddingBottom: "10px",
//     borderBottom: "2px solid #ddd",
//   },
//   name: {
//     fontSize: "28px",
//     fontWeight: "bold",
//   },
//   link: {
//     color: "#1E90FF",
//     textDecoration: "none",
//   },
//   section: {
//     marginTop: "20px",
//     paddingBottom: "10px",
//     borderBottom: "1px solid #ddd",
//   },
//   sectionTitle: {
//     fontSize: "20px",
//     fontWeight: "bold",
//   },
//   boldText: {
//     fontWeight: "bold",
//   },
// };

// export default ResumeTemplateThree;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import React, { useState } from "react";

// const dummyDataAsia = {
//   name: "Samama Taimoor",
//   email: "samamataimoor69@gmail.com",
//   phone: "+92 307-0764805",
//   address: "Tokyo, Japan",
//   nationality: "Pakistani",
//   visaStatus: "Work Visa",
//   linkedin: "https://www.linkedin.com/in/samama-taimoor-a1b19b264/",
//   github: "https://github.com/TaimoorSAMAMA",
//   summary: "Highly structured and detail-oriented Software Developer with expertise in C#, .NET, and modern web technologies. Proficient in designing scalable applications and optimizing performance.",
//   education: {
//     degree: "Bachelor of Science in Computer Science",
//     institution: "FAST NUCES, Islamabad Campus",
//     duration: "Aug 2021 – Present",
//   },
//   workExperience: [
//     {
//       title: "Software Engineer",
//       company: "XYZ Tech Solutions, Tokyo",
//       duration: "2022 - Present",
//       responsibilities: [
//         "Developed enterprise-level applications using C# and .NET Core.",
//         "Led a team of 5 developers following JIS resume standards.",
//         "Optimized SQL queries, improving database performance by 35%."
//       ]
//     },
//     {
//       title: "Frontend Developer",
//       company: "ABC Web Agency, Seoul",
//       duration: "2020 - 2022",
//       responsibilities: [
//         "Designed and implemented UI/UX improvements using React following East Asian design principles.",
//         "Integrated third-party APIs to enhance application functionality.",
//         "Reduced website load times by 40% through performance optimizations."
//       ]
//     }
//   ],
//   projects: [
//     {
//       name: "AI Resume Builder",
//       details: "Developed a structured resume optimization tool for East Asian job markets."
//     },
//     {
//       name: "E-Commerce Platform",
//       details: "Designed and built a structured e-commerce system using ASP.NET and React."
//     }
//   ],
//   languages: ["English", "Japanese", "Korean"],
//   skills: ["C#", "ASP.NET Core", "React", "SQL", "MongoDB", "Python", "AI/ML", "Docker", "Kubernetes"],
// };

// const ResumeAsia = () => <ResumeTemplate data={dummyDataAsia} />;

// const ResumeTemplate = ({ data }) => {
//   const [image, setImage] = useState("https://via.placeholder.com/150");

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => setImage(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.header}>
//         <div style={styles.imageContainer}>
//           <img src={image} alt="Profile" style={styles.image} />
//           <input type="file" onChange={handleImageUpload} accept="image/*" style={styles.uploadInput} />
//         </div>
//         <div style={styles.nameContainer}>
//           <h1 style={styles.name}>{data.name}</h1>
//           <p>{data.email} | {data.phone} | {data.address}</p>
//           <p>Nationality: {data.nationality} | Visa Status: {data.visaStatus}</p>
//           <a href={data.linkedin} style={styles.link}>LinkedIn</a> | <a href={data.github} style={styles.link}>GitHub</a>
//         </div>
//       </div>
//       <div style={styles.section}><h2>Professional Summary</h2><p>{data.summary}</p></div>
//       <div style={styles.section}><h2>Education</h2>
//         <p><strong>{data.education.degree}</strong></p>
//         <p>{data.education.institution} ({data.education.duration})</p>
//       </div>
//       <div style={styles.section}><h2>Work Experience</h2>
//         {data.workExperience.map((job, i) => (
//           <div key={i}>
//             <h3>{job.title} - {job.company}</h3>
//             <p>{job.duration}</p>
//             <ul>
//               {job.responsibilities.map((task, j) => <li key={j}>{task}</li>)}
//             </ul>
//           </div>
//         ))}
//       </div>
//       <div style={styles.section}><h2>Projects</h2>
//         {data.projects.map((project, i) => (
//           <div key={i}><h3>{project.name}</h3><p>{project.details}</p></div>
//         ))}
//       </div>
//       <div style={styles.section}><h2>Languages</h2><p>{data.languages.join(", ")}</p></div>
//       <div style={styles.section}><h2>Skills</h2><p>{data.skills.join(", ")}</p></div>
//     </div>
//   );
// };

// const styles = {
//   container: { maxWidth: "800px", margin: "auto", padding: "20px", fontFamily: "Arial, sans-serif", backgroundColor: "#f9f9f9" },
//   header: { display: "flex", alignItems: "center", paddingBottom: "15px", borderBottom: "2px solid #ddd" },
//   imageContainer: { position: "relative", marginRight: "15px" },
//   image: { width: "100px", height: "100px", borderRadius: "50%" },
//   uploadInput: { position: "absolute", top: "0", left: "0", width: "100px", height: "100px", opacity: "0", cursor: "pointer" },
//   nameContainer: { flex: 1 },
//   name: { fontSize: "28px", fontWeight: "bold" },
//   link: { color: "#1E90FF", textDecoration: "none" },
//   section: { backgroundColor: "#fff", padding: "15px", marginTop: "15px", borderRadius: "10px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }
// };

// export default ResumeAsia ;



// import React from "react";

// const Template3 = () => {
//     return (
//         <div
//             style={{
//                 fontFamily: "'Helvetica Neue', sans-serif",
//                 margin: "0",
//                 background: "#f5f5f5",
//                 minHeight: "100vh",
//                 padding: "20px 0",
//             }}
//         >
//             <div
//                 style={{
//                     width: "80%",
//                     maxWidth: "800px",
//                     margin: "20px auto",
//                     background: "white",
//                     padding: "20px",
//                     borderRadius: "6px",
//                     boxShadow: "0 3px 8px rgba(0, 0, 0, 0.1)",
//                 }}
//             >
//                 {/* Header Section */}
//                 <div style={{ textAlign: "center", marginBottom: "20px" }}>
//                     <h1 style={{ fontSize: "24px", margin: "0" }}>
//                         Michael Johnson
//                     </h1>
//                     <p style={{ margin: "5px 0" }}>
//                         Email: michael.j@example.com | Phone: (123) 555-1234
//                     </p>
//                 </div>

//                 {/* Work Experience Section */}
//                 <div style={{ marginBottom: "20px" }}>
//                     <h2
//                         style={{
//                             fontSize: "18px",
//                             borderBottom: "1px solid #ddd",
//                             marginBottom: "10px",
//                         }}
//                     >
//                         Work Experience
//                     </h2>
//                     <ul
//                         style={{
//                             listStyleType: "square",
//                             margin: "0",
//                             padding: "0 20px",
//                         }}
//                     >
//                         <li>Software Engineer, Innovative Co. (2019-Present)</li>
//                         <li>Web Developer, Creative Studio (2017-2019)</li>
//                     </ul>
//                 </div>

//                 {/* Education Section */}
//                 <div style={{ marginBottom: "20px" }}>
//                     <h2
//                         style={{
//                             fontSize: "18px",
//                             borderBottom: "1px solid #ddd",
//                             marginBottom: "10px",
//                         }}
//                     >
//                         Education
//                     </h2>
//                     <ul
//                         style={{
//                             listStyleType: "square",
//                             margin: "0",
//                             padding: "0 20px",
//                         }}
//                     >
//                         <li>Bachelor’s in IT, Tech University (2013-2017)</li>
//                     </ul>
//                 </div>

//                 {/* Skills Section */}
//                 <div style={{ marginBottom: "20px" }}>
//                     <h2
//                         style={{
//                             fontSize: "18px",
//                             borderBottom: "1px solid #ddd",
//                             marginBottom: "10px",
//                         }}
//                     >
//                         Skills
//                     </h2>
//                     <ul
//                         style={{
//                             listStyleType: "square",
//                             margin: "0",
//                             padding: "0 20px",
//                         }}
//                     >
//                         <li>Front-end Development: HTML, CSS, JavaScript</li>
//                         <li>Back-end: Node.js, Python, PHP</li>
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Template3;
