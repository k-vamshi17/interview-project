import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopNav } from '@/components/TopNav';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, User, Bot, AlertCircle, PhoneOff } from 'lucide-react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

type Message = {
  role: 'user' | 'model';
  text: string;
};

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const MockInterview = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  // Setup States
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [jobRole, setJobRole] = useState('Frontend Developer');
  const [experience, setExperience] = useState('Fresher');
  const [llmProvider, setLlmProvider] = useState('grok');

  // Interview States
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [subtitle, setSubtitle] = useState<string>('');
  const [sessionStartTime, setSessionStartTime] = useState<number>(Date.now());
  const [cameraEnabled, setCameraEnabled] = useState(false);
  
  const recognitionRef = useRef<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem('interviewai_user');
    if (stored) setUser(JSON.parse(stored));
    else setUser({ name: 'Candidate', email: 'candidate@example.com' });

    // Initialize Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = 0; i < event.results.length; ++i) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
        setSubtitle(`You: ${currentTranscript}`);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }

    // Initialize Camera
    let activeStream: MediaStream | null = null;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then((stream) => {
            activeStream = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setCameraEnabled(true);
            }
        })
        .catch(err => console.error("Camera access denied or unavilable:", err));
    }

    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
      window.speechSynthesis.cancel();
      if (activeStream) {
          activeStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);


  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => {
          setSubtitle(`Friday: ${text}`);
      };
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      // Slight delay to ensure final transcript chunks process
      setTimeout(() => {
          if (transcript.trim()) handleSendMessage(transcript);
      }, 300);
    } else {
      setTranscript('');
      setSubtitle('');
      window.speechSynthesis.cancel();
      try {
        recognitionRef.current?.start();
        setIsRecording(true);
      } catch (err) {
        console.error("Could not start recording:", err);
      }
    }
  };

  const getPersona = () => `Your name is Friday. You are a meticulous, professional female AI technical interviewer for a ${experience} level ${jobRole} position. Do not break character. Ask highly specific, technical questions appropriate for this role and seniority. Start the conversation by warmly welcoming the candidate, introducing yourself as Friday, and immediately asking your first technical question. Once the user replies, evaluate their answer, correct any major mistakes, and follow up with the next question. Keep your responses highly concise.`;

  const startConfiguredInterview = async () => {
      setSessionStartTime(Date.now());
      setIsSetupComplete(true);
      setIsLoading(true);
      setSubtitle("Friday is preparing your first question...");
      
      try {
        const response = await fetch('http://localhost:8000/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: `Hello! I am ready to begin my interview for the ${jobRole} position. Please introduce yourself and ask the first question.`,
            history: [],
            persona: getPersona(),
            llmProvider: llmProvider
          }),
        });

        if (response.ok) {
            const data = await response.json();
            setMessages([{ role: 'model', text: data.response }]);
            speakText(data.response);
        } else {
            setSubtitle("Error connecting to backend services.");
        }
      } catch (err) {
         setSubtitle("Error connecting to API. Please check your connections.");
      } finally {
         setIsLoading(false);
      }
  };

  // We explicitly pass the current captured transcript so we don't accidentally read stale state limits
  const handleSendMessage = async (finalTranscript: string) => {
    if (!finalTranscript.trim()) return;

    const userMessage: Message = { role: 'user', text: finalTranscript.trim() };
    const currentHistory = [...messages];
    
    setMessages([...currentHistory, userMessage]);
    setTranscript('');
    setIsLoading(true);
    setSubtitle('Friday is thinking...');

    try {
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.text,
          history: currentHistory.map(m => ({ role: m.role, text: m.text })),
          persona: getPersona(),
          llmProvider: llmProvider
        }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      const botMessage: Message = { role: 'model', text: data.response };
      
      setMessages(prev => [...prev, botMessage]);
      speakText(data.response);

    } catch (error) {
      console.error('Error fetching chat response:', error);
      const errMsg = "I'm having trouble connecting right now.";
      setMessages(prev => [...prev, { role: 'model', text: errMsg }]);
      setSubtitle(`Friday: ${errMsg}`);
    } finally {
      setIsLoading(false);
    }
  };

  const endInterview = () => {
    window.speechSynthesis.cancel();
    if (recognitionRef.current) recognitionRef.current.stop();

    const durationMs = Date.now() - sessionStartTime;
    const durationMins = Math.max(1, Math.round(durationMs / 60000));
    
    const randomScore = Math.floor(Math.random() * 20) + 75; // 75 - 95
    let grade = 'B';
    let status = 'Good';
    if (randomScore >= 90) { grade = 'A'; status = 'Excellent'; }
    else if (randomScore >= 80) { grade = 'B+'; status = 'Great'; }
    else { grade = 'C+'; status = 'Needs Work'; }

    const newSession = {
      id: Date.now(),
      role: jobRole,
      topic: 'Mock Interview (' + experience + ')',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      duration: `${durationMins}m`,
      score: randomScore,
      grade,
      status
    };

    const existing = JSON.parse(localStorage.getItem('mock_interview_history') || '[]');
    localStorage.setItem('mock_interview_history', JSON.stringify([newSession, ...existing]));

    navigate('/history');
  };

  if (!user) return null;

  // --- SETUP VIEW ---
  if (!isSetupComplete) {
     return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <TopNav user={user} />
        <main className="flex-1 px-4 py-12 flex flex-col items-center justify-center relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(79,70,229,0.03)_0%,transparent_70%)]" />
            <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} className="bg-white p-8 md:p-10 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 w-full max-w-md relative z-10">
                <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Bot size={32} />
                </div>
                <h1 className="text-2xl font-extrabold text-slate-900 mb-2 text-center tracking-tight">Configure Interview</h1>
                <p className="text-slate-500 mb-8 text-center text-sm font-medium">Tailor the AI's questions to your career focus.</p>

                <div className="space-y-6">
                    <div>
                        <label className="block text-xs uppercase tracking-wider font-bold text-slate-500 mb-2">AI Model / Brain</label>
                        <select 
                            value={llmProvider} 
                            onChange={(e) => setLlmProvider(e.target.value)}
                            className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 font-medium cursor-pointer"
                        >
                            <option value="grok">Grok 2 (xAI)</option>
                            <option value="gemini">Gemini 2.5 Flash (Google)</option>
                            <option value="openai">ChatGPT (OpenAI)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs uppercase tracking-wider font-bold text-slate-500 mb-2">Target Job Role</label>
                        <select 
                            value={jobRole} 
                            onChange={(e) => setJobRole(e.target.value)}
                            className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 font-medium cursor-pointer"
                        >
                            <option>Frontend Developer</option>
                            <option>Backend Developer</option>
                            <option>Full Stack Developer</option>
                            <option>DevOps Engineer</option>
                            <option>Cloud Engineer</option>
                            <option>QA / Tester</option>
                            <option>Data Scientist</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs uppercase tracking-wider font-bold text-slate-500 mb-2">Experience Level</label>
                        <select 
                            value={experience} 
                            onChange={(e) => setExperience(e.target.value)}
                            className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 font-medium cursor-pointer"
                        >
                            <option>Fresher</option>
                            <option>Junior (1-3 yrs)</option>
                            <option>Mid-Level (3-5 yrs)</option>
                            <option>Senior (5+ yrs)</option>
                        </select>
                    </div>

                    <Button onClick={startConfiguredInterview} className="w-full h-12 mt-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold font-sans shadow-md hover:shadow-lg transition-all active:scale-[0.98]">
                        Begin Voice Interview
                    </Button>
                </div>
            </motion.div>
        </main>
      </div>
     )
  }

  // --- FULLSCREEN VIDEO/AUDIO INTERVIEW VIEW ---
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col font-sans">
      <TopNav user={user} />

      <main className="flex-1 flex flex-col h-[calc(100vh-64px)] relative overflow-hidden">
        
        {/* PIP Camera Overlay */}
        <div className="absolute top-6 right-6 z-30 w-36 sm:w-48 aspect-video bg-black rounded-xl overflow-hidden border-2 border-slate-700 shadow-2xl">
           {cameraEnabled ? (
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                className="w-full h-full object-cover scale-x-[-1]" 
              />
           ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-white/50 text-xs bg-slate-800">
                <User size={24} className="mb-2" />
                <span>Camera Off</span>
              </div>
           )}
        </div>

        {/* Ambient Display Indicator */}
        <div className="absolute top-6 left-6 z-30">
            <h1 className="text-xl font-bold text-white drop-shadow-md line-clamp-1">{experience} {jobRole}</h1>
            <p className="text-sm text-indigo-300 font-medium flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Live Session
            </p>
        </div>

        {/* Central Avatar Visualizer Area */}
        <div className="flex-1 w-full relative flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,rgba(79,70,229,0.15)_0%,rgba(15,23,42,1)_70%)]">
            
            {/* Visualizer Background */}
            <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30">
               <motion.div 
                 animate={(isRecording || isLoading) ? { 
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.5, 0.3]
                 } : {}}
                 transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                 className="w-[50vw] h-[50vw] sm:w-[35vw] sm:h-[35vw] bg-indigo-500/80 rounded-full blur-[100px]"
               />
            </div>

            {/* Main Avatar */}
            <div className="z-10 flex flex-col items-center mb-16">
                <motion.div
                   animate={isRecording ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                   transition={{ repeat: isRecording ? Infinity : 0, duration: 1 }}
                   className={`w-40 h-40 md:w-56 md:h-56 rounded-full flex items-center justify-center border-[4px] shadow-2xl transition-all duration-300 ${
                      isRecording ? 'border-emerald-400 bg-slate-800 shadow-[0_0_50px_rgba(52,211,153,0.3)]' : 
                      isLoading ? 'border-indigo-400 bg-slate-800 shadow-[0_0_50px_rgba(129,140,248,0.3)]' : 'border-slate-700 bg-slate-800'
                   }`}
                >
                    {isRecording ? (
                      <Mic size={72} className="text-emerald-400" />
                    ) : isLoading ? (
                      <div className="flex gap-3">
                        <motion.div animate={{y:[-6, 6, -6]}} transition={{repeat: Infinity, duration: 1, delay: 0}} className="w-3.5 h-3.5 rounded-full bg-indigo-400"/>
                         <motion.div animate={{y:[-6, 6, -6]}} transition={{repeat: Infinity, duration: 1, delay: 0.2}} className="w-3.5 h-3.5 rounded-full bg-indigo-400"/>
                         <motion.div animate={{y:[-6, 6, -6]}} transition={{repeat: Infinity, duration: 1, delay: 0.4}} className="w-3.5 h-3.5 rounded-full bg-indigo-400"/>
                      </div>
                    ) : (
                      <Bot size={72} className="text-slate-400" />
                    )}
                </motion.div>
            </div>

            {/* Subtitles Overlay */}
            <div className="absolute bottom-6 w-full px-4 flex justify-center z-20">
                 <div className="bg-slate-900/80 backdrop-blur-lg rounded-2xl py-4 px-6 max-w-2xl w-full mx-auto border border-white/10 shadow-2xl max-h-[140px] overflow-y-auto custom-scrollbar">
                      <div className="text-white/95 text-base md:text-lg font-medium tracking-wide drop-shadow-sm leading-relaxed text-left">
                         <ReactMarkdown components={{ p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} /> }}>
                           {subtitle || 'Click the microphone to start speaking...'}
                         </ReactMarkdown>
                      </div>
                 </div>
            </div>
        </div>

        {/* Heavy Voice Controls Floor */}
        <div className="p-4 sm:p-6 bg-slate-900 border-t border-slate-800 shrink-0 z-30 flex flex-col sm:flex-row items-center justify-center gap-4">
            
            {/* Main Interaction Button */}
            <div className="flex-1 max-w-md w-full">
              {(window.SpeechRecognition || window.webkitSpeechRecognition) ? (
                <Button 
                  onClick={toggleRecording} 
                  variant={isRecording ? "destructive" : "default"}
                  className={`h-16 w-full rounded-2xl shadow-xl transition-all duration-300 font-extrabold text-lg md:text-xl tracking-tight ${
                      isRecording 
                      ? 'animate-pulse shadow-red-500/20 bg-red-500 hover:bg-red-600' 
                      : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/20 text-white'
                  }`}
                >
                  {isRecording ? (
                     <><MicOff size={28} className="mr-3" /> Stop Recording & Send</>
                  ) : (
                     <><Mic size={28} className="mr-3" /> Press to Speak</>
                  )}
                </Button>
              ) : (
               <div className="p-4 bg-red-900/50 text-red-200 rounded-xl text-center text-sm border border-red-500/50">
                 Browser does not support native Speech Recognition.
               </div>
              )}
            </div>

            {/* End Call Button */}
            <div className="w-full sm:w-auto">
                 <Button onClick={endInterview} variant="destructive" className="h-16 w-full sm:w-auto px-8 rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white transition-colors">
                     <PhoneOff size={24} /> <span className="sm:hidden lg:inline">End Call</span>
                 </Button>
            </div>
        </div>

      </main>
    </div>
  );
};

export default MockInterview;
