import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from openai import OpenAI
from google import genai
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Interview Ace API")

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatHistoryMessage(BaseModel):
    role: str # "user" or "model"
    text: str

class ChatRequest(BaseModel):
    message: str
    history: List[ChatHistoryMessage] = []
    persona: str = ""
    llmProvider: str = "grok"

@app.get("/")
def read_root():
    return {"message": "Interview Ace Backend API is running."}

@app.post("/api/chat")
def chat_endpoint(req: ChatRequest):
    try:
        # Route: GROK
        if req.llmProvider == "grok":
            api_key = os.getenv("GROK_API_KEY")
            if not api_key: raise HTTPException(status_code=500, detail="GROK_API_KEY is not set.")
            
            client = OpenAI(api_key=api_key, base_url="https://api.x.ai/v1")
            messages = [{"role": "system", "content": req.persona}] if req.persona else []
            for msg in req.history:
                messages.append({"role": "user" if msg.role == "user" else "assistant", "content": msg.text})
            messages.append({"role": "user", "content": req.message})
            
            response = client.chat.completions.create(model="grok-2-latest", messages=messages)
            return {"response": response.choices[0].message.content}

        # Route: OPENAI
        elif req.llmProvider == "openai":
            api_key = os.getenv("OPENAI_API_KEY")
            if not api_key: raise HTTPException(status_code=500, detail="OPENAI_API_KEY is not set.")
            
            client = OpenAI(api_key=api_key)
            messages = [{"role": "system", "content": req.persona}] if req.persona else []
            for msg in req.history:
                messages.append({"role": "user" if msg.role == "user" else "assistant", "content": msg.text})
            messages.append({"role": "user", "content": req.message})
            
            response = client.chat.completions.create(model="gpt-4o-mini", messages=messages)
            return {"response": response.choices[0].message.content}

        # Route: GEMINI
        elif req.llmProvider == "gemini":
            api_key = os.getenv("GEMINI_API_KEY")
            if not api_key: raise HTTPException(status_code=500, detail="GEMINI_API_KEY is not set.")
            
            client = genai.Client(api_key=api_key)
            contents = []
            if req.persona:
                contents.append({"role": "user", "parts": [{"text": "System Instructions: " + req.persona}]})
                contents.append({"role": "model", "parts": [{"text": "Understood."}]})
                
            for msg in req.history:
                contents.append({"role": "user" if msg.role == "user" else "model", "parts": [{"text": msg.text}]})
                
            contents.append({"role": "user", "parts": [{"text": req.message}]})

            response = client.models.generate_content(model="gemini-2.5-flash", contents=contents)
            return {"response": response.text}

        else:
            raise HTTPException(status_code=400, detail="Invalid LLM Provider specified.")

    except Exception as e:
        print(f"Error calling {req.llmProvider} API: {e}")
        raise HTTPException(status_code=500, detail=str(e))
