import React from "react";

const ResumeTemplateTwo = ({ templateDataa }) => {
  return (
    <div style={styles.container}>
      {/* Sidebar */}

      <div style={styles.sidebar}>
        {/* <br></br><br></br><br></br> */}

        <div style={styles.card}>
          <div style={styles.sectionWrapper}>
            <h2 style={styles.sectionTitle}>Contact info</h2>
            <p style={styles.contact}><strong>Email:</strong> {templateDataa?.email || "Not provided"}</p>
            <p style={styles.contact}><strong>Phone:</strong> {templateDataa?.phone || "Not provided"}</p>
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.sectionWrapper}>
            <h3 style={styles.sectionTitle}>Languages</h3>
            <p>{templateDataa?.languages || "Not provided"}</p>
          </div>
        </div>
        <div style={styles.card}>
          <div style={styles.sectionWrapper}>
            <h3 style={styles.sectionTitle}>Skills</h3>
            <ul style={styles.list}>
              {templateDataa?.skills
                ? templateDataa.skills.split(",").map((skill, index) => (
                  <li key={index} style={styles.listItem}>{skill.trim()}</li>
                ))
                : <li style={styles.listItem}>No skills provided</li>}
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {/* <div style={styles.card}> */}
      <div style={styles.mainContent}>
        <h2 style={styles.name}>{templateDataa?.name || "Your Name"}</h2>
        {/* </div> */}

        {/* Career Aim */}
        <div style={styles.card}>
          <div style={styles.sectionWrapper}>
            <h3 style={styles.sectionTitle}>Career Aim</h3>
            <p>{templateDataa?.careerAim || "Not Provided"}</p>
          </div>
        </div>

        {/* Certifications */}
        <div style={styles.card}>
          <div style={styles.sectionWrapper}>
            <h3 style={styles.sectionTitle}>Certifications</h3>
            <p>{templateDataa?.certifications || "Not provided"}</p>
          </div>
        </div>

        {/* Education */}
        <div style={styles.card}>
          <div style={styles.sectionWrapper}>
            <h3 style={styles.sectionTitle}>Education</h3>
            {templateDataa?.education?.length > 0 ? (
              templateDataa.education.map((edu, index) => (
                <div key={index} style={styles.sectionItem}>
                  <p style={styles.boldText}>{edu.degree}</p>
                  <p>{edu.institution} ({edu.graduationYear})</p>
                </div>
              ))
            ) : (
              <p>No education provided</p>
            )}
          </div>
        </div>


        {/* Work Experience */}
        <div style={styles.card}>
          <div style={styles.sectionWrapper}>
            <h3 style={styles.sectionTitle}>Work Experience</h3>
            {templateDataa?.workExperience?.length > 0 ? (
              templateDataa.workExperience.map((job, index) => (
                <div key={index} style={styles.sectionItem}>
                  <p style={styles.boldText}>{job.position} - {job.company}</p>
                  <p>{job.duration}</p>
                  <p>{job.description}</p>
                </div>
              ))
            ) : (
              <p>No work experience provided</p>
            )}
          </div>
        </div>


        {/* Projects */}
        <div style={styles.card}>
          <div style={styles.sectionWrapper}>
            <h3 style={styles.sectionTitle}>Projects</h3>
            {templateDataa?.projects
              ? templateDataa.projects.split(",").map((proj, index) => (
                <div key={index} style={styles.sectionItem}>
                  <p>{proj.trim()}</p>
                </div>
              ))
              : <p>No projects provided</p>}
          </div>
        </div>


        {/* Achievements */}
        <div style={styles.card}>
          <div style={styles.sectionWrapper}>
            <h3 style={styles.sectionTitle}>Achievements</h3>
            {templateDataa?.achievements
              ? templateDataa.achievements.split(",").map((achieve, index) => (
                <div key={index} style={styles.sectionItem}>
                  <p>{achieve.trim()}</p>
                </div>
              ))
              : <p>Not provided</p>}
          </div>
        </div>


      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#f4f4f4",
    padding: "20px",
    boxSizing: "border-box",
  },
  sidebar: {
    width: "30%",
    backgroundColor: "#2c3e50",
    color: "#555555", // ecf0f1
    padding: "20px",
    borderRadius: "10px",
    boxSizing: "border-box",
  },
  name: {
    fontSize: "32px",
    // fontWeight: "600",
    textAlign: "center",
    marginBottom: "20px",
    fontFamily: '"Segoe UI", "Roboto", sans-serif',
    borderBottom: "2px solid #bdc3c7",
    paddingBottom: "10px",
    color: "#2c3e50",
    fontWeight: "bold"
  },
  contact: {
    marginTop: "8px",
    fontSize: "18px",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginTop: "20px",
    borderBottom: "2px solid #7f8c8d",
    paddingBottom: "5px",
  },
  list: {
    listStyleType: "disc",
    paddingLeft: "20px",
    marginTop: "10px",
    fontSize: "18px",
  },
  listItem: {
    // fontSize: "14px",
    marginBottom: "5px",
    fontSize: "18px",
  },
  mainContent: {
    width: "70%",
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    marginLeft: "20px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.7)",
    boxSizing: "border-box",
    // color: "#000000"
  },
  boldText: {
    fontWeight: "bold",
  },
  sectionItem: {
    marginBottom: "15px",
  },
  sectionWrapper: {
    marginBottom: "30px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "15px",
    marginTop: "15px",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
    // color: "#000000"
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    borderBottom: "2px solid #ddd",
    paddingBottom: "5px",
    marginBottom: "10px",
  },
};

export default ResumeTemplateTwo;