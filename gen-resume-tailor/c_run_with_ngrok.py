import os
import subprocess
import time
from pyngrok import ngrok
import uvicorn
import threading

def start_api():
    """Start the FastAPI application using uvicorn"""
    uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=False)

def main():
    # Start ngrok
    # If you have an authtoken, uncomment the next line and replace YOUR_AUTHTOKEN with your actual token
    ngrok.set_auth_token("2uVcw337wAjGEn68HnMIoBxsUA9_2xY4dVHxgtR3FMNkZtJtn")
    
    # Start HTTP tunnel on port 8000
    public_url = ngrok.connect(8000).public_url
    print(f"🚀 ngrok Tunnel Started! Public URL: {public_url}")
    print(f"Share this URL with anyone who wants to test your application")
    
    # Start FastAPI in a separate thread
    api_thread = threading.Thread(target=start_api, daemon=True)
    api_thread.start()
    
    try:
        # Keep the script running
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        # When you press Ctrl+C, this will clean up the ngrok tunnel
        print("Shutting down ngrok tunnel...")
        ngrok.kill()

if __name__ == "__main__":
    main()