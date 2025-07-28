import React from "react";

const ResumeTemplateCard = ({ templateDataa }) => {
  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header}>
        <h1 style={styles.name}>{templateDataa?.name || "Your Name"}</h1>
        <p>
          {templateDataa.email} | {templateDataa.phone}
        </p>
        <p>Languages: {templateDataa.languages || "Not Provided"}</p>
      </div>

      {/* Career Aim */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Career Aim</h2>
        <p>{templateDataa.careerAim || "Not Provided"}</p>
      </div>

      {/* Education */}
      {templateDataa.education && templateDataa.education.length > 0 && (
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Education</h2>
          {templateDataa.education.map((edu, index) => (
            <div key={index}>
              <p><strong>{edu.degree}</strong></p>
              <p>{edu.institution} ({edu.graduationYear})</p>
            </div>
          ))}
        </div>
      )}

      {/* Work Experience */}
      {templateDataa.workExperience && templateDataa.workExperience.length > 0 && (
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Work Experience</h2>
          {templateDataa.workExperience.map((work, index) => (
            <div key={index}>
              <p><strong>{work.position}</strong> at {work.company}</p>
              <p>{work.startDate} - {work.endDate || "Present"}</p>
              <p>{work.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Projects</h2>
        <p>{templateDataa.projects || "Not Provided"}</p>
      </div>

      {/* Skills */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Skills</h2>
        <p>{templateDataa.skills || "Not Provided"}</p>
      </div>

      {/* Certifications */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Certifications</h2>
        <p>{templateDataa.certifications || "Not Provided"}</p>
      </div>

      {/* Achievements */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Achievements</h2>
        <p>{templateDataa.achievements || "Not Provided"}</p>
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
    backgroundColor: "#f9f9f9",
  },
  header: {
    textAlign: "center",
    paddingBottom: "15px",
    borderBottom: "2px solid #ddd",
  },
  name: {
    fontSize: "28px",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    padding: "15px",
    marginTop: "15px",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    borderBottom: "2px solid #ddd",
    paddingBottom: "5px",
    marginBottom: "10px",
  },
};

export default ResumeTemplateCard;