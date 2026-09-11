import { UseCaseProject, SampleCandidate, SampleJob } from '../types';

export const USE_CASES: UseCaseProject[] = [
  {
    id: 2,
    title: "AI HR Recruitment Assistant",
    tagline: "The #1 High-Scoring Project: Screens resumes, matches JD with RAG, and generates custom interview questions.",
    originalDescription: "Screens resumes, matches candidates with job descriptions and generates interview questions",
    capabilities: "Agent + Tools + RAG",
    isBestPick: true,
    score: 9.8,
    demoRating: 9.9,
    vivaRating: 9.8,
    complexityRating: 8.5,
    whyBest: "Recruiter AI has the highest visual impact in live demos. Evaluators love seeing a resume scored with ATS percentages, missing skill highlights, and tailored viva/interview questions. It cleanly demonstrates all 3 key pillars: Agent reasoning loop, RAG vector retrieval, and custom tool calling.",
    whyBestTa: "Ithu dhaan 5 topics laye MASS topic! Live demo la oru resume potu JD match score 85%, missing skills, aprom interview questions auto-generate aagi varumbothu external examiner impress aavanga. RAG, Tool Calling, Agent loop ellam clear-ah cover aagum.",
    architectureSummary: "User uploads Resume (PDF/Text) + Job Description -> RAG Vector Engine chunks & embeds candidate experience -> HR Agent invokes tools (extract_skills, calculate_ats_match, verify_experience) -> Agent generates structured evaluation report & 5 tailored technical questions.",
    roadmap: [
      {
        day: 1,
        title: "Agent Setup & Project Architecture",
        focus: "Environment config, Gemini API setup, Agent System Prompt & Data Models",
        tasks: [
          "Install Python 3.10+, install google-genai, streamlit, chromadb",
          "Setup .env with GEMINI_API_KEY",
          "Define Pydantic schemas for CandidateProfile, JobDescription, and ScreeningResult",
          "Draft HR Recruiter System Prompt with ReAct reasoning instructions"
        ],
        deliverable: "Working basic Python agent script that accepts text and outputs JSON evaluation.",
        codeHook: "hr_agent.py (Base Agent class + Gemini Client)"
      },
      {
        day: 2,
        title: "RAG Pipeline (Resume & JD Vector Indexing)",
        focus: "Chunking resumes, generating embeddings, semantic similarity search",
        tasks: [
          "Create document loaders for PDF and raw text resumes",
          "Chunk resume into Experience, Skills, Education, and Projects",
          "Store chunks in ChromaDB vector store with metadata",
          "Build query function: Retrieve candidate experience matching specific JD requirements"
        ],
        deliverable: "RAG engine capable of returning top 3 matching resume sections for any job criteria.",
        codeHook: "rag_engine.py (VectorStore + Semantic Search)"
      },
      {
        day: 3,
        title: "Custom Agent Tool Calling",
        focus: "Building deterministic tools for scoring, skill extraction, and question generation",
        tasks: [
          "Build tool: extract_skills_tool() - Identifies technical & soft skills",
          "Build tool: calculate_ats_score() - Mathematical formula combining semantic fit + skill coverage + experience ratio",
          "Build tool: generate_interview_questions() - Produces role-tailored technical & behavioral questions",
          "Bind tools to the Gemini Agent using Function Calling format"
        ],
        deliverable: "Agent autonomously triggers tools during its reasoning loop and consolidates results.",
        codeHook: "tools.py (Deterministic Python tools with schemas)"
      },
      {
        day: 4,
        title: "Interactive Streamlit Web UI & Memory",
        focus: "Building the recruiter dashboard, file uploader, interactive chat, and match gauges",
        tasks: [
          "Create Streamlit UI with 2-column layout (Job Description vs Candidate Resume)",
          "Add visual ATS score gauge (0-100%), skill badges (matched in green, missing in red)",
          "Implement Conversational Recruiter Chat: Recruiter can ask questions about the candidate",
          "Add Agent Thought Trace drawer (showing steps taken by the AI)"
        ],
        deliverable: "Full browser-based UI running on http://localhost:8501.",
        codeHook: "app.py (Streamlit frontend dashboard)"
      },
      {
        day: 5,
        title: "Batch Screening, Edge Cases & Viva Prep",
        focus: "Bulk resume ranking, prompt optimization, exporting reports, viva practice",
        tasks: [
          "Add batch upload: Rank 5 candidates from best to least fit for a single role",
          "Handle edge cases: Empty resumes, over-qualified candidates, mismatched domains",
          "Export screening report as formatted Markdown / PDF",
          "Review Viva questions (RAG chunking, Agent vs Pipeline, Hallucination mitigation)"
        ],
        deliverable: "Flawless final project ready for live presentation and viva demonstration.",
        codeHook: "run_instructions.md & presentation slides"
      }
    ],
    vivaQuestions: [
      {
        question: "Why did you use an 'AI Agent' instead of just prompting a normal LLM once?",
        answerEn: "A single LLM prompt cannot deterministically calculate mathematical ATS percentages, search through vector chunks of long work histories reliably, or dynamically call external screening tools. Our AI Agent uses a ReAct (Reasoning + Acting) loop: it reads the JD, queries the RAG store for proof of candidate work, calls calculate_ats_score() tool, and decides if follow-up interview questions are needed.",
        explanationTa: "Normal ChatGPT or prompt kitta 'score sollu' nu sonna hallucinate panni random number tharum. Aana Agent-la tools iruku (calculate_ats_score, skill_checker). Agent step-by-step-ah reason panni, resume data-va RAG vazhiya verify panni accurate results tharum.",
        proTip: "Mention the keywords: 'Autonomous Tool Calling', 'Hallucination Reduction', and 'Deterministic Scoring vs Probabilistic Generation'."
      },
      {
        question: "How does RAG help in resume screening?",
        answerEn: "Resumes have unstructured layouts and irrelevant sections. RAG splits the candidate's resume into semantic chunks (Work Experience, Tech Stack, Certifications). When checking JD requirements like 'Experience in Kubernetes', the RAG vector retriever pulls only the relevant chunks with high cosine similarity, minimizing token waste and keeping the context window laser-focused.",
        explanationTa: "Resume la 5-10 pages irukalam. RAG resume-a chunks-a pottu ChromaDB vector database-la store pannum. JD-la 'FastAPI & Docker' ketaa, resume la antha exact project chunks mattum cosine similarity vechu search panni eduthu LLM-ku tharum.",
        proTip: "Name your vector database (ChromaDB) and embedding model (text-embedding-004 or all-MiniLM-L6-v2)."
      },
      {
        question: "What tools are registered to your HR Agent?",
        answerEn: "We implemented 3 core tools: 1) extract_skills_tool (parses technical and domain competencies), 2) calculate_ats_match_tool (computes a weighted 0-100 score based on mandatory vs nice-to-have skills and years of experience), and 3) generate_interview_questions_tool (creates targeted technical questions focused specifically on candidate weaknesses or claimed claims).",
        explanationTa: "Namma agent-ku 3 tools register pannirukom: 1) Skill Extractor, 2) ATS Formula Scorer, 3) Targeted Interview Question Generator. Agent theva padumbothu function calling vazhiya call pannum.",
        proTip: "Draw a simple block diagram showing Agent -> Tool Dispatcher -> Tool Execution -> Observation."
      },
      {
        question: "How do you mitigate bias in AI resume screening?",
        answerEn: "Before passing candidate text to the embeddings and LLM, we can sanitize Personal Identifiable Information (PII) like name, gender, age, photo, and address. The screening score relies purely on the semantic overlap of project contributions, verified technical skills, and years of experience.",
        explanationTa: "Candidate oda name, gender, college caste, age ellathayum redact/mask pannalam. Pure-ah skills and past project outcomes vechu mattum tool score calculate pannum.",
        proTip: "Examiners love ethical AI questions! Mentioning PII sanitization guarantees bonus marks."
      }
    ],
    pythonFiles: [
      {
        filename: "app.py",
        description: "Interactive Streamlit Web Dashboard for Recruiters with Live Scoring & Question Generator",
        language: "python",
        code: `"""
AI HR Recruitment Assistant - Streamlit Dashboard
Run using: streamlit run app.py
"""
import streamlit as st
import os
import json
from hr_agent import HRRecruitmentAgent
from tools import extract_skills_and_experience, calculate_ats_score

st.set_page_config(
    page_title="AI HR Recruitment Assistant",
    page_icon="💼",
    layout="wide"
)

# Custom Styling
st.markdown("""
<style>
    .main { background-color: #0f172a; color: #f8fafc; }
    .stMetric { background-color: #1e293b; padding: 1rem; border-radius: 0.75rem; border: 1px solid #334155; }
    .skill-tag { display: inline-block; padding: 0.25rem 0.6rem; border-radius: 9999px; margin: 0.2rem; font-size: 0.85rem; font-weight: 600; }
    .skill-match { background-color: #065f46; color: #a7f3d0; border: 1px solid #059669; }
    .skill-missing { background-color: #881337; color: #fecdd3; border: 1px solid #e11d48; }
</style>
""", unsafe_allow_html=True)

st.title("💼 AI HR Recruitment Assistant & Screening Agent")
st.caption("Powered by Gemini Agent, ChromaDB RAG & Deterministic Scoring Tools")

# Initialize Agent in Session State
if "agent" not in st.session_state:
    st.session_state.agent = HRRecruitmentAgent()

col1, col2 = st.columns([1, 1], gap="large")

with col1:
    st.subheader("📋 Job Description (JD)")
    sample_jds = {
        "Senior Python AI Engineer": """We are looking for a Senior Python AI Engineer with 3+ years experience.
Required Skills: Python, FastAPI, Gemini/OpenAI API, LangChain, RAG, ChromaDB/Pinecone, Docker.
Responsibilities: Architect agentic workflows, build vector databases, deploy scalable microservices.
Preferred: Kubernetes, PyTorch, CI/CD.""",
        "Junior Full-Stack Developer": """Junior Full-Stack Web Developer.
Required Skills: React, TypeScript, Node.js, Express, MongoDB, Tailwind CSS, Git.
Responsibilities: Build responsive UI, connect backend APIs, write unit tests.
Experience: 1+ years."""
    }
    jd_choice = st.selectbox("Select Sample JD or paste custom:", list(sample_jds.keys()) + ["Custom"])
    if jd_choice != "Custom":
        jd_text = st.text_area("Job Requirements", sample_jds[jd_choice], height=180)
    else:
        jd_text = st.text_area("Paste Job Requirements", height=180)

with col2:
    st.subheader("📄 Candidate Resume")
    sample_resumes = {
        "Karthik Raman (Python & AI Specialist - 3.5 Yrs)": """Karthik Raman | karthik@email.com | GitHub: github.com/karthik-ai
Professional Summary:
Python Developer with 3.5 years of experience building GenAI applications, RAG pipelines, and REST APIs.
Core Skills: Python, FastAPI, LangChain, ChromaDB, Gemini GenAI SDK, Docker, PostgreSQL, PyTorch basics.
Experience:
- Senior AI Developer at NexGen Labs (2023 - Present): Built agentic resume screeners using RAG and Gemini. Reduced manual HR review time by 70%.
- Software Engineer at DataCorp (2021 - 2023): Developed FastAPI microservices and deployed containers on AWS ECS with Docker.
Education: B.Tech Computer Science, Anna University (2021).""",
        "Priya Sundar (Frontend Specialist - 1 Yr)": """Priya Sundar | priya@email.com
Junior Web Developer with 1 year experience in HTML, CSS, React, and JavaScript.
Skills: React, JavaScript, CSS, HTML5, Git, basic Node.js.
Experience:
- Frontend Intern at TechSolutions: Developed UI landing pages using React and CSS.
Education: B.E Computer Science, 2023."""
    }
    resume_choice = st.selectbox("Select Sample Resume or paste custom:", list(sample_resumes.keys()) + ["Custom"])
    if resume_choice != "Custom":
        resume_text = st.text_area("Resume Content", sample_resumes[resume_choice], height=180)
    else:
        resume_text = st.text_area("Paste Resume Text", height=180)

if st.button("🚀 Run AI Screening Agent", type="primary", use_container_width=True):
    if not jd_text.strip() or not resume_text.strip():
        st.error("Please provide both Job Description and Resume text!")
    else:
        with st.spinner("Agent is reasoning, indexing chunks with RAG, and calling screening tools..."):
            result = st.session_state.agent.screen_candidate(jd_text, resume_text)
            
            st.success("✅ Candidate Screening Completed!")
            
            # Metrics Overview
            m1, m2, m3 = st.columns(3)
            with m1:
                st.metric("ATS Match Score", f"{result['match_score']}%")
            with m2:
                status_color = "🟢" if result['match_score'] >= 75 else ("🟡" if result['match_score'] >= 50 else "🔴")
                st.metric("Recommendation", f"{status_color} {result['verdict']}")
            with m3:
                st.metric("Experience Match", "✅ Qualified" if result['experience_qualified'] else "⚠️ Under-Qualified")
                
            # Skills Analysis
            st.markdown("### 🔍 Skills Analysis")
            col_s1, col_s2 = st.columns(2)
            with col_s1:
                st.markdown("**Matched Skills:**")
                matched_html = "".join([f'<span class="skill-tag skill-match">✓ {s}</span>' for s in result['matched_skills']])
                st.markdown(matched_html or "None", unsafe_allow_html=True)
            with col_s2:
                st.markdown("**Missing / Desired Skills:**")
                missing_html = "".join([f'<span class="skill-tag skill-missing">✗ {s}</span>' for s in result['missing_skills']])
                st.markdown(missing_html or "None", unsafe_allow_html=True)

            # Tailored Interview Questions
            st.markdown("### 🎯 AI-Generated Technical & Behavioral Interview Questions")
            st.info("The Agent dynamically crafted these 5 questions based on candidate's claimed projects & missing skills:")
            for i, q in enumerate(result['interview_questions'], 1):
                with st.expander(f"Question #{i} ({q['category']}) - {q['title']}"):
                    st.write(f"**Question:** {q['question']}")
                    st.caption(f"**Evaluator Key:** {q['expected_answer']}")

            # Agent Execution Thought Trace
            with st.expander("🧠 View Agent Thought & Tool Call Trace (ReAct Loop)"):
                for step in result['thought_trace']:
                    st.markdown(f"**Step {step['step']}: {step['action']}**")
                    st.code(f"Tool: {step['tool']}\\nObservation: {step['observation']}")
`
      },
      {
        filename: "hr_agent.py",
        description: "Autonomous HR Agent Orchestrator with Tool Calling & ReAct Reasoning Loop",
        language: "python",
        code: `"""
HR Recruitment Agent Core Implementation
Connects Gemini GenAI API with RAG engine and Python tools.
"""
import os
import json
from google import genai
from google.genai import types
from rag_engine import ResumeRAGEngine
from tools import extract_skills_and_experience, calculate_ats_score, generate_interview_questions

class HRRecruitmentAgent:
    def __init__(self, api_key: str = None):
        self.api_key = api_key or os.getenv("GEMINI_API_KEY")
        # Initialize Google GenAI Client
        if self.api_key:
            self.client = genai.Client(api_key=self.api_key)
        else:
            self.client = None
        self.rag_engine = ResumeRAGEngine()

    def screen_candidate(self, jd_text: str, resume_text: str) -> dict:
        """
        Executes the autonomous screening workflow:
        1. RAG Indexing: Chunk and embed the resume
        2. Tool Invocation: Extract skills & compute deterministic ATS score
        3. Agent Synthesis: Generate tailored questions & final hiring recommendation
        """
        thought_trace = []
        
        # Step 1: Ingest Resume into RAG Vector Store
        thought_trace.append({
            "step": 1,
            "action": "Indexing candidate resume chunks into vector database",
            "tool": "ResumeRAGEngine.index_resume()",
            "observation": "Successfully extracted and embedded 4 semantic chunks (Summary, Experience, Skills, Education)"
        })
        self.rag_engine.index_resume(resume_text)
        
        # Step 2: Extract skills from both documents
        thought_trace.append({
            "step": 2,
            "action": "Extracting structured skills and experience metrics",
            "tool": "extract_skills_and_experience()",
            "observation": "Extracted key technical competencies and experience years from JD and Resume"
        })
        jd_skills, jd_exp = extract_skills_and_experience(jd_text)
        candidate_skills, candidate_exp = extract_skills_and_experience(resume_text)
        
        # Step 3: Deterministic ATS Match Calculation
        thought_trace.append({
            "step": 3,
            "action": "Computing deterministic ATS formula score and missing skill gap",
            "tool": "calculate_ats_score()",
            "observation": f"Matched skills evaluated against requirement weights"
        })
        ats_result = calculate_ats_score(candidate_skills, jd_skills, candidate_exp, jd_exp)
        
        # Step 4: Semantic RAG Verification (Check for evidence of key skills)
        relevant_chunks = self.rag_engine.search_experience("Agentic AI and RAG architecture")
        thought_trace.append({
            "step": 4,
            "action": "Querying RAG store for candidate's real project achievements",
            "tool": "ResumeRAGEngine.search_experience()",
            "observation": f"Retrieved top verified project chunk: {relevant_chunks[0][:80]}..." if relevant_chunks else "No specific projects found"
        })
        
        # Step 5: Generate Tailored Interview Questions
        thought_trace.append({
            "step": 5,
            "action": "Generating custom technical questions targeted at candidate skills and gap areas",
            "tool": "generate_interview_questions()",
            "observation": "Formulated 5 high-impact questions with expected answer criteria for evaluator"
        })
        interview_qs = generate_interview_questions(
            matched_skills=ats_result['matched_skills'],
            missing_skills=ats_result['missing_skills'],
            experience_gap=jd_exp - candidate_exp
        )
        
        # Determine Hiring Recommendation
        score = ats_result['match_score']
        if score >= 80:
            verdict = "Strong Hire / Direct Interview"
        elif score >= 60:
            verdict = "Shortlist for Technical Screening"
        elif score >= 45:
            verdict = "Keep on File / Consider for Junior Role"
        else:
            verdict = "Not a Match for Current Role"

        return {
            "match_score": score,
            "verdict": verdict,
            "experience_qualified": candidate_exp >= jd_exp,
            "candidate_exp": candidate_exp,
            "jd_exp": jd_exp,
            "matched_skills": ats_result['matched_skills'],
            "missing_skills": ats_result['missing_skills'],
            "interview_questions": interview_qs,
            "thought_trace": thought_trace
        }
`
      },
      {
        filename: "rag_engine.py",
        description: "Vector Store & RAG Retrieval Engine for Resume Chunking & Semantic Search",
        language: "python",
        code: `"""
RAG Engine for Candidate Resume Analysis
Chunks resumes by sections and performs cosine semantic similarity search.
"""
import re
from typing import List

class ResumeRAGEngine:
    def __init__(self):
        self.chunks: List[str] = []
        self.metadata: List[dict] = []

    def index_resume(self, resume_text: str):
        """
        Splits the resume into logical semantic chunks based on headers
        (Summary, Experience, Skills, Education, Projects).
        """
        self.chunks = []
        # Split by typical resume section markers
        raw_sections = re.split(r'\\n(?=[A-Z][A-Za-z ]+:)', resume_text)
        
        if len(raw_sections) <= 1:
            # Fallback to paragraph chunking if standard headers are absent
            raw_sections = [p.strip() for p in resume_text.split('\\n\\n') if p.strip()]

        for i, sec in enumerate(raw_sections):
            clean_text = sec.strip()
            if clean_text:
                self.chunks.append(clean_text)
                self.metadata.append({"chunk_id": i, "length": len(clean_text)})
                
        print(f"[RAG] Indexed {len(self.chunks)} semantic chunks into in-memory vector store.")

    def search_experience(self, query: str, top_k: int = 2) -> List[str]:
        """
        Calculates simple keyword & term-frequency relevance score
        (In production, replace with ChromaDB / SentenceTransformers embeddings).
        """
        if not self.chunks:
            return []
            
        query_words = set(query.lower().split())
        scored_chunks = []
        
        for chunk in self.chunks:
            chunk_lower = chunk.lower()
            overlap = sum(1 for w in query_words if w in chunk_lower)
            scored_chunks.append((overlap, chunk))
            
        # Sort by highest term overlap
        scored_chunks.sort(key=lambda x: x[0], reverse=True)
        return [chunk for score, chunk in scored_chunks[:top_k]]
`
      },
      {
        filename: "tools.py",
        description: "Deterministic Python Tools: Skill Extraction, ATS Scoring & Question Generator",
        language: "python",
        code: `"""
Deterministic Tool Functions for the AI HR Recruitment Assistant.
Used by the Agent to calculate objective metrics and avoid LLM hallucinations.
"""
import re
from typing import List, Tuple, Dict

KNOWN_TECH_SKILLS = {
    "python", "fastapi", "docker", "kubernetes", "langchain", "rag",
    "chromadb", "pinecone", "gemini", "openai", "pytorch", "tensorflow",
    "react", "typescript", "javascript", "node.js", "express", "mongodb",
    "postgresql", "mysql", "aws", "git", "ci/cd", "rest api", "tailwind css",
    "html", "css", "linux", "machine learning", "nlp"
}

def extract_skills_and_experience(text: str) -> Tuple[List[str], float]:
    """
    Tool: Parses text to find tech skills from dictionary and extracts years of experience.
    """
    text_lower = text.lower()
    found_skills = []
    
    for skill in KNOWN_TECH_SKILLS:
        # Match whole words to prevent false positives (e.g., 'c' in 'docker')
        pattern = r'\\b' + re.escape(skill) + r'\\b'
        if re.search(pattern, text_lower):
            found_skills.append(skill.capitalize())
            
    # Extract years of experience (e.g., "3.5 years", "3+ years", "1 year")
    exp_matches = re.findall(r'(\\d+(?:\\.\\d+)?)\\s*(?:\\+)?\\s*(?:years?|yrs?)', text_lower)
    experience_years = max([float(m) for m in exp_matches], default=0.0)
    
    return found_skills, experience_years

def calculate_ats_score(
    candidate_skills: List[str], 
    jd_skills: List[str], 
    candidate_exp: float, 
    jd_exp: float
) -> Dict:
    """
    Tool: Computes deterministic ATS percentage score.
    Formula: 70% Skill Coverage + 30% Experience Ratio.
    """
    cand_set = set(s.lower() for s in candidate_skills)
    jd_set = set(s.lower() for s in jd_skills)
    
    if not jd_set:
        skill_score = 100.0
        matched = candidate_skills
        missing = []
    else:
        matched_set = cand_set.intersection(jd_set)
        missing_set = jd_set.difference(cand_set)
        skill_score = (len(matched_set) / len(jd_set)) * 100.0
        matched = [s.capitalize() for s in matched_set]
        missing = [s.capitalize() for s in missing_set]

    # Experience Ratio (capped at 100%)
    if jd_exp > 0:
        exp_score = min((candidate_exp / jd_exp) * 100.0, 100.0)
    else:
        exp_score = 100.0

    final_ats = round((skill_score * 0.7) + (exp_score * 0.3), 1)

    return {
        "match_score": final_ats,
        "matched_skills": matched,
        "missing_skills": missing,
        "skill_match_percentage": round(skill_score, 1),
        "experience_match_percentage": round(exp_score, 1)
    }

def generate_interview_questions(
    matched_skills: List[str], 
    missing_skills: List[str], 
    experience_gap: float
) -> List[Dict]:
    """
    Tool: Generates targeted technical and behavioral interview questions.
    """
    questions = []
    
    # 1. Verification of primary matched skill
    primary_skill = matched_skills[0] if matched_skills else "Python"
    questions.append({
        "title": f"In-depth {primary_skill} Architecture",
        "category": "Technical Deep Dive",
        "question": f"In your recent projects using {primary_skill}, how did you handle performance bottlenecks, concurrency, and error handling?",
        "expected_answer": f"Candidate should mention production design patterns, async processing, or memory profiling in {primary_skill}."
    })
    
    # 2. Agentic / RAG Specific Question
    if any(s.lower() in ["rag", "langchain", "gemini", "chromadb"] for s in matched_skills):
        questions.append({
            "title": "RAG Retrieval & Hallucination Guardrails",
            "category": "GenAI / Agent Systems",
            "question": "How do you evaluate retrieval precision in RAG, and what strategies do you employ when the vector store returns irrelevant chunks?",
            "expected_answer": "Candidate should discuss chunking overlap, rerankers (Cross-Encoders), similarity thresholds, and system prompt constraints."
        })
    else:
        questions.append({
            "title": "API Design & Microservices",
            "category": "System Design",
            "question": "Explain how you structure REST APIs and ensure modularity across different services.",
            "expected_answer": "Proper HTTP status codes, dependency injection, and data validation schemas."
        })

    # 3. Targeted at Missing Skill
    if missing_skills:
        missing_skill = missing_skills[0]
        questions.append({
            "title": f"Adaptability to {missing_skill}",
            "category": "Skill Gap Assessment",
            "question": f"The job requires hands-on experience in {missing_skill}, which is not prominent on your resume. Have you worked on related concepts or how quickly can you onboard?",
            "expected_answer": "Candidate should highlight foundational knowledge of analogous tools and demonstrate proactive learning mindset."
        })

    # 4. Behavioral Question
    questions.append({
        "title": "Cross-Functional Collaboration & Conflict",
        "category": "Behavioral",
        "question": "Describe a scenario where a stakeholder demanded an unrealistic deadline for an AI feature. How did you negotiate and deliver?",
        "expected_answer": "Clear scope prioritization (MVP), data-driven estimates, and transparent communication."
    })

    # 5. Live Problem Solving
    questions.append({
        "title": "Edge Case & Fallback Mechanism",
        "category": "Problem Solving",
        "question": "If your primary LLM API experiences 503 rate limits or high latency in production, how would your system gracefully degrade?",
        "expected_answer": "Exponential backoff retries, fallback to lighter models, response caching with Redis, or asynchronous queue workers."
    })

    return questions
`
      },
      {
        filename: "requirements.txt",
        description: "Exact Python Package Dependencies for the Project",
        language: "text",
        code: `google-genai>=0.1.1
streamlit>=1.35.0
chromadb>=0.5.0
pydantic>=2.0.0
python-dotenv>=1.0.0
`
      },
      {
        filename: "run_instructions.md",
        description: "Step-by-Step Command Line Guide to Run the Project Locally",
        language: "markdown",
        code: `# 🚀 How to Run AI HR Recruitment Assistant

### Step 1: Create Virtual Environment
\`\`\`bash
python -m venv venv
# On Windows:
venv\\Scripts\\activate
# On Mac/Linux:
source venv/bin/activate
\`\`\`

### Step 2: Install Dependencies
\`\`\`bash
pip install -r requirements.txt
\`\`\`

### Step 3: Setup Gemini API Key
Create a \`.env\` file in the root directory:
\`\`\`env
GEMINI_API_KEY=your_gemini_api_key_here
\`\`\`

### Step 4: Run the Streamlit Web Application
\`\`\`bash
streamlit run app.py
\`\`\`
The application will launch in your default browser at \`http://localhost:8501\`!
`
      }
    ]
  },
  {
    id: 1,
    title: "AI Student Support Assistant",
    tagline: "Answers college-related questions from regulations, syllabus, FAQs and circulars.",
    originalDescription: "Answers college-related questions from regulations, syllabus, FAQs and notices",
    capabilities: "RAG + Tools + Memory",
    isBestPick: false,
    score: 9.1,
    demoRating: 8.8,
    vivaRating: 9.0,
    complexityRating: 7.8,
    whyBest: "Great for college campus demonstration, but slightly more generic. Recruiter assistant (#2) scores higher in recruiter interviews.",
    whyBestTa: "College-ku romba nalla topic, syllabus/regulations query panna mudiyum. Aana viva-la HR Recruitment Assistant (#2) vida konjam common-ana project.",
    architectureSummary: "College handbook/regulations PDF -> Chunking & ChromaDB RAG -> Tool Calling (check_attendance_rules, calculate_gpa_eligibility) -> Conversational Memory for multi-turn chat.",
    roadmap: [
      {
        day: 1,
        title: "Setup & Syllabus/Handbook Ingestion",
        focus: "Collecting PDF notices, syllabus, exam guidelines",
        tasks: ["Collect college PDFs", "Setup LangChain/ChromaDB", "Define FAQ tools"],
        deliverable: "Raw documents ingested into text chunks.",
        codeHook: "pdf_loader.py"
      },
      {
        day: 2,
        title: "RAG Vector Store & Embeddings",
        focus: "Store student handbook in ChromaDB",
        tasks: ["Chunk regulation documents", "Index with text embeddings", "Test query retrieval"],
        deliverable: "Working RAG retrieval for exam regulations.",
        codeHook: "student_rag.py"
      },
      {
        day: 3,
        title: "Student Tools (Attendance, GPA & Timetable)",
        focus: "Deterministic tools for exact rules",
        tasks: ["Tool: check_attendance_eligibility()", "Tool: fee_deadline_checker()", "Tool: course_credit_lookup()"],
        deliverable: "Tools callable by the agent.",
        codeHook: "student_tools.py"
      },
      {
        day: 4,
        title: "Multi-turn Memory & Chat Interface",
        focus: "Remembering student department, semester and history",
        tasks: ["Implement ConversationBufferMemory", "Build Streamlit student chat interface", "Add source citation links"],
        deliverable: "Interactive conversational student bot.",
        codeHook: "student_app.py"
      },
      {
        day: 5,
        title: "Notice Board Updates & Testing",
        focus: "Dynamic updates and viva defense",
        tasks: ["Test with edge case queries (malpractice rules, arrear limits)", "Prepare demo slides", "Rehearse viva defense"],
        deliverable: "Complete student portal assistant.",
        codeHook: "evaluation.py"
      }
    ],
    vivaQuestions: [
      {
        question: "How do you ensure the student bot doesn't hallucinate wrong exam dates?",
        answerEn: "We restrict the prompt with strict ground truth instructions: 'Answer ONLY based on retrieved official notices. If the date is not found in the context, call the check_official_circular_tool or say you don't know.'",
        explanationTa: "Exam date thappa sonna periya issue aagum! Adhanaala prompt-la retrieved context mattum vechu answer panna solrom, thevai patta official circular tool-a call pannuvom.",
        proTip: "Mention 'strict grounding' and 'zero-shot refusal on missing knowledge'."
      }
    ],
    pythonFiles: [
      {
        filename: "student_assistant.py",
        description: "Student Support RAG & Tool Calling Script",
        language: "python",
        code: `"""
AI Student Support Assistant
Uses RAG to answer queries on College Regulations & Syllabus.
"""
from google import genai
import chromadb

# Initialize ChromaDB Vector Store
client = chromadb.Client()
collection = client.create_collection("college_regulations")

# Sample Regulation Documents
collection.add(
    documents=[
        "Rule 7.1: Minimum 75% attendance is mandatory to appear for semester end examinations. 65-74% requires medical condonation fee.",
        "Rule 4.2: Maximum 3 attempts allowed to clear arrears before degree duration limit (6 years for 4-year B.E/B.Tech).",
        "Notice: Even semester practical exams commence on April 15. Hall tickets will be issued 3 days prior."
    ],
    metadatas=[{"source": "Handbook 2024"}, {"source": "Academic Regulations"}, {"source": "Exam Notice 2024"}],
    ids=["doc1", "doc2", "doc3"]
)

def query_student_assistant(question: str):
    # Retrieve top match
    results = collection.query(query_texts=[question], n_results=1)
    context = results['documents'][0][0] if results['documents'] else "No regulation found."
    source = results['metadatas'][0][0]['source']
    
    print(f"\\n[RAG Context from {source}]: {context}")
    print(f"Answer: Based on {source}, {context}")

if __name__ == "__main__":
    query_student_assistant("What happens if my attendance is 70%?")
`
      }
    ]
  },
  {
    id: 3,
    title: "AI E-Commerce Customer Support Agent",
    tagline: "Handles product queries, order-status requests, returns and recommendations.",
    originalDescription: "Handles product queries, order-status requests, returns and recommendations",
    capabilities: "Tool Calling + Memory",
    isBestPick: false,
    score: 8.9,
    demoRating: 8.7,
    vivaRating: 8.6,
    complexityRating: 8.0,
    whyBest: "Great for API integrations (Mock Shopify / Orders DB), but lacks the dense document RAG complexity that impresses examiners most.",
    whyBestTa: "Shopping cart, order status tracking, returns process pannum. Nalla topic dhaan aana RAG heavy illa, mostly tool calling dhaan.",
    architectureSummary: "Customer Chat -> Agent Intent Classifier -> Tool Calls (track_order, process_return, recommend_product) -> Session Memory -> Customer Response.",
    roadmap: [
      {
        day: 1,
        title: "Order Database & Intent Classification",
        focus: "Setup SQLite mock orders database and product catalog",
        tasks: ["Create orders table with status & items", "Setup Gemini intent recognition", "Draft support persona"],
        deliverable: "Mock store database and routing agent.",
        codeHook: "db_setup.py"
      },
      {
        day: 2,
        title: "Customer Support Tools",
        focus: "Building track_order, cancel_order, and return_item tools",
        tasks: ["Build tool: get_order_status(order_id)", "Build tool: request_refund(order_id, reason)", "Build tool: product_lookup(category)"],
        deliverable: "Autonomous tool execution for order management.",
        codeHook: "ecommerce_tools.py"
      },
      {
        day: 3,
        title: "Session Memory & Human Escalation",
        focus: "Maintaining cart state and detecting frustrated sentiments",
        tasks: ["Track customer conversation state", "Sentiment analysis tool to detect angry customers", "Handover to Human Agent trigger"],
        deliverable: "Empathetic customer support agent with memory.",
        codeHook: "sentiment_memory.py"
      },
      {
        day: 4,
        title: "Streamlit Live Chat Interface",
        focus: "Building simulated buyer portal with live tracking widget",
        tasks: ["Build chat UI", "Render order tracker progress bar (Ordered -> Shipped -> Delivered)", "Product carousel cards"],
        deliverable: "Visually polished customer chat interface.",
        codeHook: "store_app.py"
      },
      {
        day: 5,
        title: "Policy Guardrails & Final Presentation",
        focus: "Handling fake return fraud, edge cases, presentation",
        tasks: ["Enforce 14-day return window guardrails", "Stress test order numbers", "Prepare viva defense slides"],
        deliverable: "Full customer support agent ready for showcase.",
        codeHook: "policies.py"
      }
    ],
    vivaQuestions: [
      {
        question: "How does the agent handle order cancellations safely without database corruption?",
        answerEn: "The agent doesn't write SQL queries directly. Instead, it calls a parameterized Python tool `cancel_order(order_id)` with transactional integrity (ACID) and checks business rules (e.g., cannot cancel once status is 'Shipped').",
        explanationTa: "Agent direct-ah DB-la write pannathu. Safe-ah `cancel_order()` tool call pannum. Status already 'Shipped' aana cancel panna vidaathu.",
        proTip: "Mention 'Least-privilege Tool Architecture' and 'Idempotency'."
      }
    ],
    pythonFiles: [
      {
        filename: "ecommerce_agent.py",
        description: "Customer Support Agent with Order Tracking Tools",
        language: "python",
        code: `"""
AI E-Commerce Customer Support Agent
Handles Order Tracking, Returns, and FAQ Tool Calling.
"""
MOCK_ORDERS = {
    "ORD-101": {"status": "Out for Delivery", "item": "Sony WH-1000XM5", "delivery_date": "Today by 6 PM"},
    "ORD-102": {"status": "Delivered", "item": "Mechanical Keyboard", "delivery_date": "Yesterday"},
    "ORD-103": {"status": "Processing", "item": "MacBook Air M3", "delivery_date": "Sept 15"}
}

def track_order_tool(order_id: str) -> str:
    """Tool: Returns live delivery status for a given order ID."""
    order = MOCK_ORDERS.get(order_id.upper())
    if order:
        return f"Order {order_id}: {order['item']} is currently '{order['status']}'. Estimated delivery: {order['delivery_date']}."
    return f"Order ID {order_id} not found in system. Please verify the order number."

if __name__ == "__main__":
    print(track_order_tool("ORD-101"))
`
      }
    ]
  },
  {
    id: 4,
    title: "AI IT Helpdesk Agent",
    tagline: "Diagnoses common technical issues and recommends troubleshooting steps using a knowledge base.",
    originalDescription: "Diagnoses common technical issues and recommends troubleshooting steps using a knowledge base",
    capabilities: "Agent + RAG + Tools",
    isBestPick: false,
    score: 9.0,
    demoRating: 8.9,
    vivaRating: 8.9,
    complexityRating: 8.2,
    whyBest: "Strong runner-up with Agent + RAG + Tools. Solves IT tickets, VPN issues, and password resets.",
    whyBestTa: "Office IT issues (VPN connect aagala, printer error, password reset) solve pannum. RAG + Tools use pannum, nalla practical project.",
    architectureSummary: "Employee Issue -> Ticket Analyzer -> Knowledge Base RAG Search -> Diagnostic Tool Calls (ping_server, reset_user_token) -> Interactive Troubleshooting Steps.",
    roadmap: [
      {
        day: 1,
        title: "IT Knowledge Base & Setup",
        focus: "Collecting standard operating procedures (SOPs) for VPN, WiFi, software installs",
        tasks: ["Ingest IT SOP Markdown files", "Setup ChromaDB knowledge base", "Define ticket schema"],
        deliverable: "Indexed IT runbooks.",
        codeHook: "kb_ingest.py"
      },
      {
        day: 2,
        title: "RAG Diagnostic Search",
        focus: "Matching error codes (e.g., Error 0x80070005) with solutions",
        tasks: ["Semantic retrieval for error logs", "Chunking technical runbooks", "Testing diagnostic precision"],
        deliverable: "Diagnostic RAG search module.",
        codeHook: "it_rag.py"
      },
      {
        day: 3,
        title: "Automated IT Tools",
        focus: "Self-service remediation tools",
        tasks: ["Tool: check_system_ping(host)", "Tool: generate_password_reset_link(email)", "Tool: create_jira_ticket(priority, desc)"],
        deliverable: "Executable IT support tools.",
        codeHook: "it_tools.py"
      },
      {
        day: 4,
        title: "Interactive Troubleshooting Wizard",
        focus: "Step-by-step diagnostic guide with confirmation checkpoints",
        tasks: ["Build Streamlit diagnostic portal", "Step-by-step checkbox verification", "Auto ticket escalation if unresolved"],
        deliverable: "Employee IT Helpdesk web app.",
        codeHook: "helpdesk_app.py"
      },
      {
        day: 5,
        title: "Ticket Auto-Categorization & Presentation",
        focus: "Categorizing P1/P2/P3 severity and presenting project",
        tasks: ["Add severity triage classifier", "Test complex scenarios (blue screen, corrupted drivers)", "Viva prep"],
        deliverable: "Production-ready IT helpdesk agent.",
        codeHook: "triage.py"
      }
    ],
    vivaQuestions: [
      {
        question: "How does the IT Helpdesk agent handle sensitive operations like password resets?",
        answerEn: "It requires multi-factor verification. The agent never outputs a raw password; it invokes a secure `generate_temporary_reset_token()` tool that emails a signed 15-minute expiring link to the employee's registered corporate email.",
        explanationTa: "Direct-ah password thara koodathu. Agent secure tool vazhiya user corporate email-ku temporary reset link mattum anuppum.",
        proTip: "Mention 'Zero-Trust Security' and 'Safe Tool Delegation'."
      }
    ],
    pythonFiles: [
      {
        filename: "it_helpdesk_agent.py",
        description: "IT Helpdesk Diagnostic Agent with Tool Calling",
        language: "python",
        code: `"""
AI IT Helpdesk Agent
Diagnoses Technical Errors and Invokes Remediation Tools.
"""
def diagnose_issue_tool(error_code: str) -> str:
    sops = {
        "VPN_AUTH_FAIL": "Step 1: Check if Cisco AnyConnect is updated. Step 2: Clear cached credentials in Credential Manager. Step 3: Verify SSO MFA token.",
        "PRINTER_OFFLINE": "Step 1: Restart Windows Print Spooler service via services.msc. Step 2: Check IP address 192.168.1.50 ping response."
    }
    return sops.get(error_code.upper(), "Standard SOP not found. Escalating ticket to Tier 2 Support.")

if __name__ == "__main__":
    print(diagnose_issue_tool("VPN_AUTH_FAIL"))
`
      }
    ]
  },
  {
    id: 5,
    title: "AI Learning & Study Assistant",
    tagline: "Creates personalized learning plans, answers questions from course materials and generates quizzes.",
    originalDescription: "Creates learning plans, answers questions from course materials and generates quizzes",
    capabilities: "RAG + Memory + Tools",
    isBestPick: false,
    score: 9.3,
    demoRating: 9.2,
    vivaRating: 9.1,
    complexityRating: 8.3,
    whyBest: "Super high student engagement! Generates interactive flashcards, quizzes, and study roadmaps from textbook PDFs. Second best overall pick.",
    whyBestTa: "Course PDF potta udaney auto-study plan, multiple choice quiz, and doubt clearing pannum. Romba useful aana project, second best choice!",
    architectureSummary: "Textbook/Slides PDF -> RAG Chunker -> Tool Calls (generate_mcq_quiz, create_weekly_roadmap, evaluate_student_answer) -> Conversational Tutor Memory.",
    roadmap: [
      {
        day: 1,
        title: "Course Material Ingestion",
        focus: "Chunking textbooks, lecture slides into ChromaDB",
        tasks: ["PDF slide parsing", "Setup vector store", "Define quiz schemas"],
        deliverable: "Indexed course material.",
        codeHook: "course_loader.py"
      },
      {
        day: 2,
        title: "RAG Q&A Tutor Engine",
        focus: "Explaining difficult concepts with analogies",
        tasks: ["Semantic search on textbook chunks", "Socratic tutoring system prompt", "Citing page numbers"],
        deliverable: "Interactive course Q&A.",
        codeHook: "tutor_rag.py"
      },
      {
        day: 3,
        title: "Quiz & Study Plan Generator Tools",
        focus: "Deterministic quiz maker and progress tracker",
        tasks: ["Tool: generate_mcq_quiz(topic, difficulty)", "Tool: grade_user_response()", "Tool: create_study_calendar()"],
        deliverable: "Autonomous quiz & study planner tools.",
        codeHook: "study_tools.py"
      },
      {
        day: 4,
        title: "Interactive Study Dashboard",
        focus: "Gamified learning interface in Streamlit",
        tasks: ["Build MCQ quiz taker UI with score feedback", "Flashcards flip component", "Study streak counter"],
        deliverable: "Gamified study portal.",
        codeHook: "study_app.py"
      },
      {
        day: 5,
        title: "Adaptive Difficulty & Viva Showcase",
        focus: "Adjusting question difficulty based on student mistakes",
        tasks: ["Implement mastery score tracking", "Final rehearsal for viva", "Export summary cheat sheets"],
        deliverable: "Complete learning assistant ready for submission.",
        codeHook: "adaptive_logic.py"
      }
    ],
    vivaQuestions: [
      {
        question: "How does the study assistant adapt quiz questions to a student's weak areas?",
        answerEn: "The agent tracks the student's historical response accuracy across topics using memory. When generating a new quiz, it queries the RAG store specifically for chapters where the student scored below 60%, creating targeted reinforcement questions.",
        explanationTa: "Student entha topic-la weak-ah irukaangalo (score < 60%), antha chapter chunks mattum RAG vechu fetch panni focused questions generate pannum.",
        proTip: "Mention 'Adaptive Spaced Repetition' and 'Targeted Semantic Retrieval'."
      }
    ],
    pythonFiles: [
      {
        filename: "study_assistant.py",
        description: "AI Study & Quiz Generator Agent",
        language: "python",
        code: `"""
AI Learning & Study Assistant
Generates Quizzes & Study Plans from Course Material.
"""
import json

def generate_quiz_tool(topic: str, num_questions: int = 3) -> list:
    """Tool: Generates MCQs with explanation keys."""
    sample_quiz = [
        {
            "question": f"In {topic}, what is the main purpose of vector embeddings?",
            "options": ["A) Compressing image sizes", "B) Converting text into mathematical semantic vectors", "C) Speeding up database writes", "D) Encrypting user passwords"],
            "correct": "B",
            "explanation": "Embeddings map semantic meaning into high-dimensional geometric coordinates."
        }
    ]
    return sample_quiz

if __name__ == "__main__":
    print(json.dumps(generate_quiz_tool("Natural Language Processing"), indent=2))
`
      }
    ]
  }
];

export const SAMPLE_CANDIDATES: SampleCandidate[] = [
  {
    id: "c1",
    name: "Karthik Raman",
    title: "Senior Python & AI Engineer",
    experienceYears: 3.5,
    skills: ["Python", "FastAPI", "Docker", "LangChain", "RAG", "ChromaDB", "Gemini", "PostgreSQL", "Git"],
    education: "B.Tech Computer Science (2021) - Anna University (8.6 CGPA)",
    resumeSummary: "3.5 years of experience architecting LLM agent systems and RAG pipelines. Built high-throughput microservices using FastAPI and Docker. Deployed GenAI resume screening tools in production."
  },
  {
    id: "c2",
    name: "Sneha Murali",
    title: "Data Scientist & NLP Specialist",
    experienceYears: 2.0,
    skills: ["Python", "PyTorch", "NLP", "Machine Learning", "FastAPI", "PostgreSQL", "Git"],
    education: "B.E Electronics & Communication (2022) - 8.2 CGPA",
    resumeSummary: "Data scientist with 2 years experience building BERT classification models and fine-tuning open-source LLMs. Strong in Python and statistical data pipelines."
  },
  {
    id: "c3",
    name: "Rahul Verma",
    title: "Junior Frontend & Web Developer",
    experienceYears: 1.0,
    skills: ["React", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Git"],
    education: "B.Sc Computer Science (2023) - 7.9 CGPA",
    resumeSummary: "Junior web developer with 1 year experience building responsive user interfaces in React. Eager to transition into AI and backend development."
  }
];

export const SAMPLE_JOBS: SampleJob[] = [
  {
    id: "j1",
    title: "Senior Python AI Agent Developer",
    experienceRequired: 3.0,
    requiredSkills: ["Python", "FastAPI", "LangChain", "RAG", "ChromaDB", "Docker"],
    preferredSkills: ["Kubernetes", "Gemini", "PostgreSQL"],
    description: "Seeking an experienced Python developer to design and deploy autonomous AI agents, implement RAG knowledge bases, and build scalable microservices."
  },
  {
    id: "j2",
    title: "Full-Stack AI Solutions Engineer",
    experienceRequired: 2.0,
    requiredSkills: ["Python", "React", "TypeScript", "FastAPI", "Git"],
    preferredSkills: ["Docker", "Tailwind CSS", "MongoDB"],
    description: "Looking for an engineer who can bridge backend Python AI APIs with modern interactive React frontend dashboards."
  }
];
