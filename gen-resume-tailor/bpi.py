from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.responses import JSONResponse  # Use JSONResponse for structured data
from fastapi.middleware.cors import CORSMiddleware  # Import CORS middleware
from typing import Optional  # For optional parameters
import json
import uvicorn
from pyngrok import ngrok, conf  # Import ngrok

# from backend.resume_tailor import ResumeTailor  # Import your ResumeTailor class!
from resume_tailor import ResumeTailor  # Import your ResumeTailor class!

app = FastAPI()

# Start ngrok tunnel automatically
conf.get_default().auth_token = "2uVcw337wAjGEn68HnMIoBxsUA9_2xY4dVHxgtR3FMNkZtJtn"  # Set your token 
port = 8000  # Must match FastAPI port
ngrok_tunnel = ngrok.connect(port)
public_url = ngrok_tunnel.public_url
print(f"🚀 ngrok Tunnel Started! Public URL: {public_url}")

# Configure CORS (Cross-Origin Resource Sharing)
origins = [public_url, "http://localhost:3000"]  # Allow frontend & ngrok URL

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (POST, GET, etc.)
    allow_headers=["*"],  # Allow all headers
)

@app.post("/tailor_resume/")
async def tailor_resume(
    resume: UploadFile = File(...),  # Resume file upload
    job_description: str = Form(...),  # Job description as text
    is_url: Optional[bool] = Form(False)  # Optional boolean for URL input
):
    try:
        # Instantiate the ResumeTailor
        tailor = ResumeTailor()

        # Handle file based on its content type
        if resume.content_type == "application/pdf":
            resume_text = tailor.extract_text_from_pdf(resume.file)
        elif resume.content_type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            resume_text = tailor.extract_text_from_docx(resume.file)
        else:
            raise HTTPException(status_code=400, detail="Unsupported file type")

        # Parse the job description (either from URL or text)
        job_details = tailor.parse_job_description(job_description, is_url=is_url)

        # Match skills
        skill_matches = tailor.match_skills(resume_text, job_details)

        # Tailor the resume and get analysis (all in one go)
        tailored_data = tailor.tailor_resume(resume_text, job_details, skill_matches)
        tailored_resume_text = tailored_data.get("tailored_resume", "")

        # Prepare the response data
        response_data = {
            "tailored_resume": tailored_resume_text,
            "analysis": tailored_data,  # Include the full analysis
            "cover_letter": tailor.generate_cover_letter(resume_text, job_details, skill_matches),
            "cold_email": tailor.generate_cold_email(resume_text, job_details, skill_matches),
            "ats_score": tailor.calculate_ats_score(resume_text, job_details, skill_matches),
        }

        return JSONResponse(content=response_data)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Automatically start FastAPI server
if __name__ == "__main__":
    uvicorn.run("bpi:app", host="0.0.0.0", port=port, reload=True)
