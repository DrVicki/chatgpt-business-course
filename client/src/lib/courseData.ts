// ============================================================
// COURSE DATA: 10 Ways to Use ChatGPT for Business Owners
// Design: Deep slate sidebar, teal accents, Space Grotesk + Inter
// ============================================================

export type LessonType = "lesson" | "example" | "quiz";

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  type: LessonType;
  title: string;
  duration: string;
  content?: string;
  questions?: QuizQuestion[];
}

export interface Module {
  id: string;
  number: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  lessons: Lesson[];
}

export const modules: Module[] = [
  {
    id: "m1",
    number: 1,
    title: "Content Creation & Marketing",
    description: "Use ChatGPT to generate blog posts, social media content, email newsletters, and marketing copy that resonates with your audience.",
    icon: "PenTool",
    color: "blue",
    lessons: [
      {
        id: "m1-l1",
        type: "lesson",
        title: "Way #1: Content Creation & Marketing",
        duration: "6 min",
        content: `## Way #1: Content Creation & Marketing

Creating consistent, high-quality content is one of the biggest challenges for business owners. Between running daily operations and serving clients, finding time to write blog posts, craft social media captions, and draft email newsletters can feel impossible. ChatGPT changes that.

### Blog Posts and Articles

You can provide ChatGPT with a topic, a rough outline, or even just a few bullet points, and it will generate a polished first draft in seconds. This doesn't replace your expertise — it accelerates it.

**Try this prompt:**
> *"Write a 600-word blog post about the top 3 benefits of hiring a virtual assistant for small business owners. Use a friendly, professional tone and include a clear call to action at the end."*

### Social Media Content

Maintaining a consistent social media presence is time-consuming. ChatGPT can generate a full week or month of posts in one session.

**Try this prompt:**
> *"Create 7 LinkedIn posts for a business coach who helps entrepreneurs scale from 6 to 7 figures. Include relevant hashtags and a mix of motivational, educational, and promotional content."*

### Email Newsletters

Your email list is one of your most valuable business assets. ChatGPT can help you craft newsletters that people actually open and read.

**Try this prompt:**
> *"Draft a monthly email newsletter for my accounting firm. Announce our new tax planning service, share one quick financial tip, and invite readers to book a free 30-minute consultation."*

| Content Type | Time Without ChatGPT | Time With ChatGPT |
|---|---|---|
| Blog Post (600 words) | 2–3 hours | 15–20 minutes |
| 7 Social Media Posts | 1–2 hours | 10 minutes |
| Email Newsletter | 45–60 minutes | 10–15 minutes |

> **Pro Tip:** Always review and personalize the generated content. Add your unique voice, specific client stories, and accurate data. ChatGPT provides the structure — you provide the authenticity.`,
      },
      {
        id: "m1-q1",
        type: "quiz",
        title: "Knowledge Check: Content Creation",
        duration: "2 min",
        questions: [
          {
            id: "m1q1",
            question: "What is the most important step after generating content with ChatGPT?",
            options: [
              "Publishing it immediately to save time",
              "Reviewing and editing it to match your brand voice and add accuracy",
              "Deleting it and writing it yourself from scratch",
              "Running it through a plagiarism checker only"
            ],
            correctAnswer: 1,
            explanation: "While ChatGPT generates excellent drafts, reviewing and editing ensures the content aligns with your brand's unique voice, is factually accurate, and includes your personal stories and expertise."
          },
          {
            id: "m1q2",
            question: "Which of the following is the BEST way to prompt ChatGPT for a blog post?",
            options: [
              "\"Write a blog post.\"",
              "\"Write something about business.\"",
              "\"Write a 600-word blog post about the top 3 benefits of hiring a virtual assistant, using a friendly tone with a call to action.\"",
              "\"Give me ideas for blog posts.\""
            ],
            correctAnswer: 2,
            explanation: "Specific prompts with word count, topic, tone, and desired outcome yield far better results. The more context you give ChatGPT, the more tailored and useful the output."
          },
          {
            id: "m1q3",
            question: "According to the lesson, approximately how long does it take to write 7 social media posts WITH ChatGPT?",
            options: [
              "1–2 hours",
              "30–45 minutes",
              "10 minutes",
              "5 hours"
            ],
            correctAnswer: 2,
            explanation: "With ChatGPT, you can generate 7 social media posts in approximately 10 minutes, compared to 1–2 hours without it."
          },
          {
            id: "m1q4",
            question: "What does ChatGPT provide that you, as the business owner, must still supply?",
            options: [
              "Grammar and spelling",
              "The structure and draft",
              "Your unique voice, specific client stories, and accurate data",
              "Hashtags and emojis"
            ],
            correctAnswer: 2,
            explanation: "ChatGPT provides the structure and a solid draft. You must add your authentic voice, real client stories, and verified data to make the content truly yours."
          }
        ]
      }
    ]
  },
  {
    id: "m2",
    number: 2,
    title: "Customer Service Automation",
    description: "Draft professional responses to customer inquiries, create comprehensive FAQs, and build support templates that save hours every week.",
    icon: "MessageSquare",
    color: "teal",
    lessons: [
      {
        id: "m2-l1",
        type: "lesson",
        title: "Way #2: Customer Service Automation",
        duration: "6 min",
        content: `## Way #2: Customer Service Automation

Providing excellent customer service is crucial for business growth, but responding to every inquiry, complaint, and question takes enormous time. ChatGPT can help you respond faster, more professionally, and with greater consistency.

### Drafting Email Responses

When a customer sends a difficult or emotional email, it can be hard to respond calmly and professionally. ChatGPT removes the emotion and helps you craft the perfect reply.

**Try this prompt:**
> *"Draft a polite, empathetic response to a customer who is frustrated because their order has been delayed by two weeks. Acknowledge their frustration, explain that we are working to resolve it, and offer them a 15% discount on their next purchase as a goodwill gesture."*

### Creating FAQ Sections

A well-crafted FAQ page can reduce your support volume by 30–50%. ChatGPT can generate one from your product or service description.

**Try this prompt:**
> *"Based on the following description of my online bookkeeping service, generate 12 Frequently Asked Questions and their answers that potential clients might ask: [paste your service description]."*

### Building Support Templates

Create a library of response templates for your most common customer scenarios.

**Try this prompt:**
> *"Create 5 email templates for my e-commerce store covering: (1) order confirmation, (2) shipping delay notification, (3) return request approval, (4) refund processed, and (5) a follow-up satisfaction survey."*

### Handling Negative Reviews

Responding to negative reviews publicly requires tact and professionalism.

**Try this prompt:**
> *"Write a professional response to this 2-star Google review: [paste the review]. Acknowledge the issue, apologize sincerely, and invite them to contact us directly to resolve it."*

> **Pro Tip:** Build a "response library" by saving your best ChatGPT-generated templates. Over time, you'll have a complete customer service playbook that any team member can use.`,
      },
      {
        id: "m2-q1",
        type: "quiz",
        title: "Knowledge Check: Customer Service",
        duration: "2 min",
        questions: [
          {
            id: "m2q1",
            question: "How can ChatGPT help when dealing with an angry or frustrated customer?",
            options: [
              "By automatically issuing a refund",
              "By drafting a calm, empathetic, and professional response",
              "By ignoring the complaint",
              "By escalating the issue to a manager"
            ],
            correctAnswer: 1,
            explanation: "ChatGPT excels at removing emotion from difficult situations and drafting polite, professional, and empathetic responses that de-escalate conflict."
          },
          {
            id: "m2q2",
            question: "By approximately how much can a well-crafted FAQ page reduce your support volume?",
            options: [
              "5–10%",
              "10–15%",
              "30–50%",
              "75–90%"
            ],
            correctAnswer: 2,
            explanation: "A comprehensive FAQ page can reduce incoming support inquiries by 30–50% by proactively answering the most common questions."
          },
          {
            id: "m2q3",
            question: "What is the recommended strategy for building a long-term customer service system with ChatGPT?",
            options: [
              "Generate a new response from scratch for every inquiry",
              "Use only one template for all situations",
              "Build a 'response library' of saved templates for common scenarios",
              "Avoid using templates to keep responses personal"
            ],
            correctAnswer: 2,
            explanation: "Building a response library of saved, tested templates creates a scalable customer service playbook that any team member can use consistently."
          },
          {
            id: "m2q4",
            question: "When responding to a negative public review using ChatGPT, what should the response include?",
            options: [
              "A counter-argument proving the customer is wrong",
              "An acknowledgment of the issue, a sincere apology, and an invitation to resolve it privately",
              "A request for the customer to remove the review",
              "A list of all positive reviews to balance the negative one"
            ],
            correctAnswer: 1,
            explanation: "The best response to a negative review acknowledges the issue, apologizes sincerely, and invites the customer to contact you directly — showing other potential customers that you care."
          }
        ]
      }
    ]
  },
  {
    id: "m3",
    number: 3,
    title: "Brainstorming & Ideation",
    description: "Overcome creative blocks and generate fresh ideas for products, services, campaigns, and business strategies.",
    icon: "Lightbulb",
    color: "amber",
    lessons: [
      {
        id: "m3-l1",
        type: "lesson",
        title: "Way #3: Brainstorming & Ideation",
        duration: "5 min",
        content: `## Way #3: Brainstorming & Ideation

Every business owner hits creative walls. Whether you're trying to name a new product, develop a marketing campaign, or find a new revenue stream, ChatGPT is the brainstorming partner that never gets tired, never judges your ideas, and can generate dozens of options in seconds.

### Product and Service Development

Generate ideas for new offerings based on your existing business and market trends.

**Try this prompt:**
> *"I run a yoga studio. Brainstorm 10 new revenue streams I could add without significant overhead, targeting my existing client base of working professionals aged 30–50."*

### Marketing Campaign Ideas

Come up with creative angles for your next promotion or launch.

**Try this prompt:**
> *"Give me 5 creative marketing campaign concepts for a local independent coffee shop competing against large chains. Focus on community connection and unique experiences."*

### Business Naming and Branding

Finding the right name is one of the hardest parts of launching something new.

**Try this prompt:**
> *"Suggest 15 memorable, professional business names for a consulting firm that helps healthcare organizations implement technology solutions. The name should be modern, trustworthy, and easy to remember."*

### Problem-Solving and Strategy

Use ChatGPT as a strategic sounding board.

**Try this prompt:**
> *"My e-commerce store has a high cart abandonment rate (around 70%). Brainstorm 8 specific strategies I could implement this month to reduce it."*

> **Pro Tip:** When brainstorming, always ask for a larger number of ideas than you need (e.g., ask for 20 when you need 5). The first few ideas are often the most obvious. The real gems tend to appear further down the list.`,
      },
      {
        id: "m3-q1",
        type: "quiz",
        title: "Knowledge Check: Brainstorming",
        duration: "2 min",
        questions: [
          {
            id: "m3q1",
            question: "Why is it recommended to ask ChatGPT for MORE ideas than you actually need?",
            options: [
              "Because it costs less to generate more ideas at once",
              "Because ChatGPT cannot generate fewer than 20 ideas",
              "Because the first ideas are often the most obvious, and the more creative ones appear later in the list",
              "Because you need to fill a quota"
            ],
            correctAnswer: 2,
            explanation: "The first few ideas generated tend to be the most obvious and generic. Asking for a larger number pushes ChatGPT to explore more creative and unconventional territory."
          },
          {
            id: "m3q2",
            question: "Which of the following is the BEST use of ChatGPT for brainstorming a business name?",
            options: [
              "\"Give me a name for my business.\"",
              "\"Suggest 15 memorable, professional names for a consulting firm helping healthcare organizations implement technology, that is modern and trustworthy.\"",
              "\"What are some words that sound professional?\"",
              "\"Name my company.\""
            ],
            correctAnswer: 1,
            explanation: "Providing specific context — industry, target audience, desired qualities, and quantity — results in far more relevant and useful name suggestions."
          },
          {
            id: "m3q3",
            question: "How can ChatGPT be used as a strategic tool for problem-solving?",
            options: [
              "It cannot; it is only useful for creative writing",
              "By asking it to brainstorm specific strategies for a defined business problem",
              "By asking it to make decisions for you",
              "By having it analyze your financial statements"
            ],
            correctAnswer: 1,
            explanation: "ChatGPT can act as a strategic sounding board. By clearly defining your problem and asking for specific, actionable strategies, you can generate a rich list of options to evaluate."
          },
          {
            id: "m3q4",
            question: "What makes ChatGPT an ideal brainstorming partner for business owners?",
            options: [
              "It always provides the single best answer",
              "It never gets tired, never judges ideas, and can generate dozens of options instantly",
              "It has access to real-time market data",
              "It can predict which ideas will be most profitable"
            ],
            correctAnswer: 1,
            explanation: "ChatGPT's value as a brainstorming partner lies in its tirelessness, non-judgmental nature, and ability to rapidly generate large volumes of diverse ideas for you to evaluate."
          }
        ]
      }
    ]
  },
  {
    id: "m4",
    number: 4,
    title: "Market Research & Competitor Analysis",
    description: "Summarize industry reports, analyze competitor strategies, build customer personas, and extract actionable market insights.",
    icon: "Search",
    color: "violet",
    lessons: [
      {
        id: "m4-l1",
        type: "lesson",
        title: "Way #4: Market Research & Competitor Analysis",
        duration: "6 min",
        content: `## Way #4: Market Research & Competitor Analysis

Understanding your market is the foundation of every good business decision. While ChatGPT doesn't have real-time internet access by default, it holds a vast amount of knowledge about industries, markets, and business strategies — and it can analyze any text or data you provide.

### Summarizing Industry Reports

Don't have time to read a 40-page industry report? Paste the key sections into ChatGPT.

**Try this prompt:**
> *"Summarize the following industry report excerpt into 5 key takeaways, highlighting the most important trends, statistics, and opportunities for a small business owner in the retail sector: [paste text]."*

### Competitor SWOT Analysis

Analyze your competitors using publicly available information.

**Try this prompt:**
> *"Create a detailed SWOT analysis (Strengths, Weaknesses, Opportunities, Threats) for [Competitor Name] based on what you know about their business model, products, and market position."*

### Building Customer Personas

Define your ideal customer with precision.

**Try this prompt:**
> *"Create 3 detailed buyer personas for a premium organic skincare brand. For each persona, include: name, age, occupation, income level, primary pain points, buying motivations, preferred social media platforms, and what would make them choose our brand over competitors."*

### Identifying Market Gaps

Find opportunities your competitors are missing.

**Try this prompt:**
> *"Based on the following customer reviews of the top 3 competitors in the meal kit delivery industry, identify the most common complaints and unmet needs that represent a market opportunity: [paste reviews]."*

| Research Task | Traditional Method | With ChatGPT |
|---|---|---|
| Summarize 40-page report | 3–4 hours | 5 minutes |
| Competitor SWOT | 2–3 hours | 10 minutes |
| 3 Buyer Personas | 1–2 hours | 15 minutes |
| Market Gap Analysis | 4–6 hours | 20 minutes |

> **Important Note:** ChatGPT's knowledge has a training cutoff date. For the most current market data and statistics, always verify with up-to-date sources like industry publications, government data, or market research firms.`,
      },
      {
        id: "m4-q1",
        type: "quiz",
        title: "Knowledge Check: Market Research",
        duration: "2 min",
        questions: [
          {
            id: "m4q1",
            question: "How can you use ChatGPT to quickly analyze a long industry report?",
            options: [
              "Ask it to read the physical copy of the report",
              "Paste the text into ChatGPT and ask for a summary of key findings and trends",
              "Ask it to guess the contents based on the title alone",
              "You cannot use ChatGPT for this purpose"
            ],
            correctAnswer: 1,
            explanation: "You can paste large blocks of text into ChatGPT and ask it to extract key points, summarize findings, or identify specific trends, saving hours of reading time."
          },
          {
            id: "m4q2",
            question: "What is an important limitation to remember when using ChatGPT for market research?",
            options: [
              "It can only analyze data in spreadsheet format",
              "It has a training cutoff date, so current market data should be verified with up-to-date sources",
              "It can only research US markets",
              "It cannot create buyer personas"
            ],
            correctAnswer: 1,
            explanation: "ChatGPT's knowledge has a training cutoff date. For current statistics, trends, and market data, always verify with up-to-date industry publications and research sources."
          },
          {
            id: "m4q3",
            question: "What framework does the lesson recommend for analyzing competitors?",
            options: [
              "PEST Analysis",
              "Porter's Five Forces",
              "SWOT Analysis (Strengths, Weaknesses, Opportunities, Threats)",
              "Balanced Scorecard"
            ],
            correctAnswer: 2,
            explanation: "The lesson recommends using a SWOT Analysis (Strengths, Weaknesses, Opportunities, Threats) as a structured framework for competitor analysis with ChatGPT."
          },
          {
            id: "m4q4",
            question: "What creative use of customer reviews does the lesson suggest for market research?",
            options: [
              "Using them to write fake positive reviews",
              "Pasting competitor reviews into ChatGPT to identify common complaints and unmet market needs",
              "Deleting negative reviews from your own page",
              "Copying competitor review responses"
            ],
            correctAnswer: 1,
            explanation: "Pasting competitor customer reviews into ChatGPT and asking it to identify common complaints and unmet needs is a powerful way to discover market gaps and opportunities."
          }
        ]
      }
    ]
  },
  {
    id: "m5",
    number: 5,
    title: "Sales Scripting & Pitching",
    description: "Craft persuasive sales scripts, cold outreach emails, pitch deck outlines, and objection-handling frameworks.",
    icon: "Target",
    color: "rose",
    lessons: [
      {
        id: "m5-l1",
        type: "lesson",
        title: "Way #5: Sales Scripting & Pitching",
        duration: "6 min",
        content: `## Way #5: Sales Scripting & Pitching

Closing deals requires the right words at the right moment. Whether you're writing a cold email, preparing for a sales call, or building a pitch deck, ChatGPT can help you craft compelling, persuasive communication that converts.

### Cold Email Outreach

Write emails that actually get responses by focusing on the prospect's pain points, not your features.

**Try this prompt:**
> *"Write a concise, compelling cold email to a small business owner (restaurant owner) offering our point-of-sale software. Focus on the pain point of managing inventory manually. Keep it under 150 words and include a low-commitment call to action like a 15-minute call."*

### Sales Call Scripts

Prepare for every stage of the sales conversation, including objections.

**Try this prompt:**
> *"Create a sales call script for selling a B2B HR software subscription to a company with 50–200 employees. Include: an opening that builds rapport, a discovery question section, a value proposition, and responses to these 3 objections: 'It's too expensive,' 'We already use a different tool,' and 'Now is not a good time.'"*

### Pitch Deck Outlines

Structure your investor or client presentations for maximum impact.

**Try this prompt:**
> *"Create a 12-slide pitch deck outline for a startup that provides AI-powered inventory management for retail stores. Include the recommended content for each slide."*

### Follow-Up Sequences

Most sales happen after the 5th follow-up. ChatGPT can write the entire sequence.

**Try this prompt:**
> *"Write a 5-email follow-up sequence for a prospect who attended our webinar but hasn't booked a demo. Each email should be progressively more direct, with the final email being a 'break-up' email."*

> **Pro Tip:** After generating your sales script, role-play the conversation with ChatGPT. Ask it to "play the role of a skeptical prospect" and practice your responses. This is one of the most powerful — and underused — ways to use AI for sales training.`,
      },
      {
        id: "m5-q1",
        type: "quiz",
        title: "Knowledge Check: Sales Scripting",
        duration: "2 min",
        questions: [
          {
            id: "m5q1",
            question: "When creating a sales script with ChatGPT, what crucial element should always be included?",
            options: [
              "Only the pricing information",
              "A long history of your company's founding",
              "Responses to common objections",
              "Complex technical jargon to appear knowledgeable"
            ],
            correctAnswer: 2,
            explanation: "A good sales script prepares you for the full conversation, which includes anticipating and having ready, confident responses to the most common objections."
          },
          {
            id: "m5q2",
            question: "What is the recommended focus for a cold email written with ChatGPT?",
            options: [
              "Your company's history and achievements",
              "A long list of all your product features",
              "The prospect's specific pain points, not your features",
              "Your pricing and packages"
            ],
            correctAnswer: 2,
            explanation: "Effective cold emails focus on the prospect's pain points and how you solve them, not on a list of your features. This makes the email immediately relevant to the reader."
          },
          {
            id: "m5q3",
            question: "What is the underused but powerful sales training technique mentioned in the Pro Tip?",
            options: [
              "Memorizing the script word-for-word",
              "Role-playing with ChatGPT as a skeptical prospect to practice responses",
              "Sending the script directly to prospects",
              "Recording yourself reading the script"
            ],
            correctAnswer: 1,
            explanation: "Role-playing with ChatGPT acting as a skeptical prospect is a powerful and underused technique for practicing your sales responses and building confidence."
          },
          {
            id: "m5q4",
            question: "Why is a follow-up email sequence important in sales?",
            options: [
              "It is not important; one email is sufficient",
              "Because most sales happen after the first contact",
              "Because most sales happen after the 5th follow-up",
              "To annoy prospects into buying"
            ],
            correctAnswer: 2,
            explanation: "Research consistently shows that most sales require multiple touchpoints. A structured follow-up sequence ensures you don't give up too early on a warm prospect."
          }
        ]
      }
    ]
  },
  {
    id: "m6",
    number: 6,
    title: "HR & Recruitment",
    description: "Draft compelling job descriptions, create interview question banks, and build onboarding materials that attract and retain top talent.",
    icon: "Users",
    color: "blue",
    lessons: [
      {
        id: "m6-l1",
        type: "lesson",
        title: "Way #6: HR & Recruitment",
        duration: "6 min",
        content: `## Way #6: HR & Recruitment

Finding and onboarding the right people is one of the most impactful things you can do for your business — and one of the most time-consuming. ChatGPT can dramatically reduce the administrative burden of the entire hiring process.

### Writing Job Descriptions

A great job description attracts the right candidates and deters the wrong ones.

**Try this prompt:**
> *"Write a compelling job description for a remote Customer Success Manager at a B2B SaaS company. The role involves onboarding new clients, reducing churn, and driving expansion revenue. Highlight our culture of autonomy and growth. Include required skills, nice-to-haves, and what makes this role unique."*

### Creating Interview Question Banks

Develop a comprehensive set of questions tailored to each role.

**Try this prompt:**
> *"Create an interview question bank for a Senior Marketing Manager position. Include: 5 behavioral questions (using the STAR method), 5 situational questions, 5 role-specific technical questions, and 3 culture-fit questions."*

### Onboarding Materials

Make new hires feel welcome and get them productive faster.

**Try this prompt:**
> *"Draft a 30-60-90 day onboarding plan for a new Sales Development Representative at a tech startup. Include specific goals, key people to meet, tools to learn, and success metrics for each phase."*

### HR Policy Templates

Create clear, professional policies without hiring an HR consultant.

**Try this prompt:**
> *"Draft a remote work policy for a 15-person company. Cover: eligibility, equipment and expenses, communication expectations, core hours, performance measurement, and data security requirements."*

> **Pro Tip:** Use ChatGPT to help remove unconscious bias from your job descriptions. Prompt it to: *"Review this job description and flag any language that might discourage qualified candidates from underrepresented groups from applying, and suggest more inclusive alternatives."*`,
      },
      {
        id: "m6-q1",
        type: "quiz",
        title: "Knowledge Check: HR & Recruitment",
        duration: "2 min",
        questions: [
          {
            id: "m6q1",
            question: "How can ChatGPT assist in creating a more fair and inclusive hiring process?",
            options: [
              "By automatically selecting candidates based on their resumes",
              "By reviewing job descriptions and flagging language that might discourage qualified candidates from underrepresented groups",
              "By conducting video interviews",
              "By performing background checks on candidates"
            ],
            correctAnswer: 1,
            explanation: "ChatGPT can review job descriptions for potentially biased language and suggest more inclusive alternatives, helping attract a more diverse and qualified candidate pool."
          },
          {
            id: "m6q2",
            question: "What does the STAR method stand for in the context of behavioral interview questions?",
            options: [
              "Skills, Tasks, Achievements, Results",
              "Situation, Task, Action, Result",
              "Strategy, Timing, Analysis, Review",
              "Strengths, Talents, Abilities, Roles"
            ],
            correctAnswer: 1,
            explanation: "STAR stands for Situation, Task, Action, Result — a structured framework for behavioral interview questions that helps candidates provide concrete, evidence-based answers."
          },
          {
            id: "m6q3",
            question: "What is the purpose of a 30-60-90 day onboarding plan?",
            options: [
              "To evaluate whether to fire a new employee after 90 days",
              "To give new hires specific goals, key contacts, tools to learn, and success metrics for each phase of their start",
              "To replace the employee handbook",
              "To track vacation days"
            ],
            correctAnswer: 1,
            explanation: "A 30-60-90 day plan sets clear expectations and milestones for new hires, helping them become productive faster and feel supported during the critical onboarding period."
          },
          {
            id: "m6q4",
            question: "What is a key benefit of using ChatGPT to draft HR policy templates?",
            options: [
              "It eliminates the need for any HR professional",
              "It creates legally binding contracts automatically",
              "It dramatically reduces the time and cost of creating professional, comprehensive policies",
              "It files the policies with government agencies"
            ],
            correctAnswer: 2,
            explanation: "ChatGPT can generate professional, comprehensive HR policy drafts in minutes, saving significant time and cost compared to drafting from scratch or hiring an HR consultant for initial templates."
          }
        ]
      }
    ]
  },
  {
    id: "m7",
    number: 7,
    title: "Business Strategy & Planning",
    description: "Develop business plans, set OKRs, conduct risk assessments, and outline strategic initiatives with AI as your strategic advisor.",
    icon: "Briefcase",
    color: "teal",
    lessons: [
      {
        id: "m7-l1",
        type: "lesson",
        title: "Way #7: Business Strategy & Planning",
        duration: "6 min",
        content: `## Way #7: Business Strategy & Planning

ChatGPT can serve as a tireless strategic advisor — one that has absorbed the frameworks from thousands of business books, case studies, and strategic plans. It won't make decisions for you, but it will help you think more clearly and structure your strategy more effectively.

### Business Plan Outlines

Get a structured, comprehensive starting point for any business plan.

**Try this prompt:**
> *"Create a comprehensive business plan outline for a mobile pet grooming service targeting suburban areas. Include all standard sections: executive summary, company description, market analysis, organization structure, product/service line, marketing strategy, financial projections, and funding requirements."*

### Setting OKRs (Objectives and Key Results)

OKRs are one of the most powerful goal-setting frameworks used by companies like Google and Intel.

**Try this prompt:**
> *"Help me create a Q3 OKR framework for my digital marketing agency. I want to focus on three areas: revenue growth, client retention, and team development. For each Objective, provide 3 measurable Key Results."*

### Risk Assessment and Mitigation

Identify potential threats before they become crises.

**Try this prompt:**
> *"I'm planning to expand my restaurant to a second location. Create a comprehensive risk assessment covering financial, operational, market, and regulatory risks, with a mitigation strategy for each."*

### Strategic Decision-Making

Use ChatGPT as a sounding board for major decisions.

**Try this prompt:**
> *"I'm deciding whether to raise my service prices by 20% or add a new premium tier instead. Analyze the pros and cons of each approach for a boutique fitness studio with 200 active members."*

> **Pro Tip:** Use the "Devil's Advocate" technique. After ChatGPT helps you build a strategy, ask it: *"Now argue the strongest case AGAINST this strategy. What are the biggest flaws and risks I might be overlooking?"* This forces more balanced thinking.`,
      },
      {
        id: "m7-q1",
        type: "quiz",
        title: "Knowledge Check: Business Strategy",
        duration: "2 min",
        questions: [
          {
            id: "m7q1",
            question: "What does OKR stand for?",
            options: [
              "Operational Key Requirements",
              "Objectives and Key Results",
              "Organizational Knowledge Resources",
              "Optimal Key Returns"
            ],
            correctAnswer: 1,
            explanation: "OKR stands for Objectives and Key Results — a goal-setting framework popularized by companies like Google and Intel that links high-level objectives to specific, measurable outcomes."
          },
          {
            id: "m7q2",
            question: "What is the 'Devil's Advocate' technique described in the Pro Tip?",
            options: [
              "Asking ChatGPT to write your strategy in a negative tone",
              "After building a strategy, asking ChatGPT to argue the strongest case AGAINST it to identify flaws and risks",
              "Using ChatGPT to criticize your competitors",
              "Asking ChatGPT to predict market crashes"
            ],
            correctAnswer: 1,
            explanation: "The Devil's Advocate technique involves asking ChatGPT to argue against your own strategy after you've built it. This surfaces blind spots, risks, and weaknesses you might have overlooked."
          },
          {
            id: "m7q3",
            question: "What is ChatGPT's primary role in business strategy, according to the lesson?",
            options: [
              "To make strategic decisions on your behalf",
              "To replace your board of directors",
              "To help you think more clearly and structure your strategy more effectively",
              "To guarantee the success of your business plan"
            ],
            correctAnswer: 2,
            explanation: "ChatGPT acts as a strategic thinking partner — it helps you structure your thinking, explore frameworks, and identify considerations, but the final decisions always rest with you."
          },
          {
            id: "m7q4",
            question: "Which areas should a comprehensive risk assessment cover when expanding a business?",
            options: [
              "Only financial risks",
              "Only market and competitive risks",
              "Financial, operational, market, and regulatory risks",
              "Only risks related to staffing"
            ],
            correctAnswer: 2,
            explanation: "A comprehensive risk assessment should cover all four key areas: financial, operational, market, and regulatory risks — each with a corresponding mitigation strategy."
          }
        ]
      }
    ]
  },
  {
    id: "m8",
    number: 8,
    title: "Data Analysis & Reporting",
    description: "Extract insights from data, write Excel formulas, format reports, and turn raw numbers into clear business narratives.",
    icon: "BarChart",
    color: "amber",
    lessons: [
      {
        id: "m8-l1",
        type: "lesson",
        title: "Way #8: Data Analysis & Reporting",
        duration: "6 min",
        content: `## Way #8: Data Analysis & Reporting

You don't need to be a data scientist to make smart, data-driven decisions. ChatGPT can help you extract meaning from your numbers, write complex formulas, and turn raw data into compelling business narratives.

### Excel and Google Sheets Formulas

Stop struggling with complex spreadsheet formulas.

**Try this prompt:**
> *"What is the Excel formula to look up a customer's name in column A and return their total purchase amount from column D? Also show me how to use SUMIF to total all purchases from customers in a specific region."*

### Data Interpretation and Insights

Describe your data and ask for analysis.

**Try this prompt:**
> *"Here are my monthly sales figures for the past 12 months: [list the numbers]. Identify the key trends, calculate the month-over-month growth rate, identify the best and worst performing months, and suggest 3 possible explanations for the dip in [specific month]."*

### Report Writing

Transform data into professional, readable reports.

**Try this prompt:**
> *"Write an executive summary for a quarterly business review based on these key metrics: [list metrics]. The audience is our board of directors. Make it concise, highlight the wins, acknowledge the challenges, and end with our top 3 priorities for next quarter."*

### Data Cleaning and Formatting

Clean up messy, inconsistent data.

**Try this prompt:**
> *"I have a list of customer names and email addresses that are inconsistently formatted. Here are 20 examples: [paste data]. Provide a cleaned, standardized version and explain the rules you applied."*

> **Critical Warning:** Never paste sensitive customer data, financial secrets, personally identifiable information (PII), or confidential business data into public AI tools. Use anonymized or sample data for analysis, and always check your company's data privacy policies before using AI tools.`,
      },
      {
        id: "m8-q1",
        type: "quiz",
        title: "Knowledge Check: Data Analysis",
        duration: "2 min",
        questions: [
          {
            id: "m8q1",
            question: "What is the most critical safety precaution when using ChatGPT for data analysis?",
            options: [
              "Always use pie charts for visualization",
              "Ensure data is formatted in CSV before pasting",
              "Never paste sensitive customer data, PII, or confidential business information into public AI tools",
              "Only analyze data from the previous year"
            ],
            correctAnswer: 2,
            explanation: "You should never input sensitive customer data, financial secrets, or PII into public AI models. Use anonymized or sample data, and always check your company's data privacy policies."
          },
          {
            id: "m8q2",
            question: "How can ChatGPT help a non-technical business owner with spreadsheets?",
            options: [
              "By automatically updating their spreadsheets in real-time",
              "By explaining and writing complex Excel or Google Sheets formulas in plain language",
              "By connecting directly to their Google Sheets account",
              "By creating spreadsheets from scratch without any input"
            ],
            correctAnswer: 1,
            explanation: "ChatGPT can explain what a formula does in plain language and write complex formulas like VLOOKUP, SUMIF, and INDEX/MATCH based on a simple description of what you need."
          },
          {
            id: "m8q3",
            question: "What is the recommended approach when asking ChatGPT to interpret your sales data?",
            options: [
              "Ask it to predict future sales with 100% accuracy",
              "Describe the data or paste the numbers and ask for trend analysis, growth rates, and possible explanations",
              "Only ask about positive trends",
              "Ask it to compare your data to competitors"
            ],
            correctAnswer: 1,
            explanation: "Providing your actual numbers and asking for trend analysis, growth rate calculations, and possible explanations for anomalies is an effective way to extract insights from your data."
          },
          {
            id: "m8q4",
            question: "What is the purpose of asking ChatGPT to write an executive summary for a board presentation?",
            options: [
              "To replace the need for a board meeting",
              "To transform raw metrics into a concise, professional narrative that highlights wins, acknowledges challenges, and outlines priorities",
              "To automatically send the report to board members",
              "To create a 50-page detailed analysis"
            ],
            correctAnswer: 1,
            explanation: "ChatGPT can transform raw metrics into a polished executive summary — a concise narrative that communicates the key story of your data to a non-technical audience like a board of directors."
          }
        ]
      }
    ]
  },
  {
    id: "m9",
    number: 9,
    title: "Legal & Contract Drafting",
    description: "Generate starting templates for contracts, NDAs, terms of service, and privacy policies — always with professional legal review.",
    icon: "Shield",
    color: "violet",
    lessons: [
      {
        id: "m9-l1",
        type: "lesson",
        title: "Way #9: Legal & Contract Drafting",
        duration: "5 min",
        content: `## Way #9: Legal & Contract Drafting

*⚠️ Disclaimer: ChatGPT is not a lawyer. The documents it generates are starting templates only. Always have a qualified attorney review any legal document before signing or distributing it.*

That said, ChatGPT can save you significant time and money by generating solid first drafts that your attorney can then review and refine, rather than billing you for hours of drafting from scratch.

### Non-Disclosure Agreements (NDAs)

Protect your confidential information when exploring partnerships or hiring.

**Try this prompt:**
> *"Draft a mutual Non-Disclosure Agreement (NDA) between two companies exploring a potential business partnership. Include clauses for: definition of confidential information, obligations of receiving party, exclusions from confidentiality, term and termination, and remedies for breach."*

### Service Agreements and Contracts

Create clear agreements with clients and vendors.

**Try this prompt:**
> *"Draft a freelance graphic design contract for a project-based engagement. Include: scope of work, payment terms (50% upfront, 50% on delivery), revision policy (up to 3 rounds), intellectual property ownership, cancellation policy, and a limitation of liability clause."*

### Terms of Service and Privacy Policies

Essential for any website or app.

**Try this prompt:**
> *"Create a Privacy Policy template for a small e-commerce website that collects customer names, email addresses, shipping addresses, and payment information. The site ships within the United States only."*

### Explaining Legal Jargon

Translate complex legal language into plain English.

**Try this prompt:**
> *"Explain the following legal clause in simple, plain English that a non-lawyer can understand: [paste the clause]."*

> **Remember:** ChatGPT-generated legal documents are starting points, not finished products. The cost of a one-hour attorney review is far less than the cost of an unenforceable contract or a legal dispute.`,
      },
      {
        id: "m9-q1",
        type: "quiz",
        title: "Knowledge Check: Legal Drafting",
        duration: "2 min",
        questions: [
          {
            id: "m9q1",
            question: "What is the most critical rule when using ChatGPT for legal documents?",
            options: [
              "Always use the exact output without any changes",
              "Only use it for international contracts",
              "Always have a qualified attorney review the generated documents before use",
              "Use a specific 'legal mode' in your prompt"
            ],
            correctAnswer: 2,
            explanation: "ChatGPT is not a lawyer and can generate legally inaccurate, incomplete, or unenforceable clauses. A qualified attorney must always review legal documents before they are used."
          },
          {
            id: "m9q2",
            question: "What is the primary financial benefit of using ChatGPT to draft legal documents?",
            options: [
              "It eliminates all legal fees permanently",
              "It generates legally binding documents for free",
              "It creates solid first drafts, reducing the attorney's billable hours for drafting from scratch",
              "It files documents with government agencies automatically"
            ],
            correctAnswer: 2,
            explanation: "By generating a solid first draft, ChatGPT reduces the time an attorney needs to spend drafting, which reduces your legal costs. You pay for review and refinement, not initial drafting."
          },
          {
            id: "m9q3",
            question: "What key clauses should a freelance service contract include?",
            options: [
              "Only the payment amount",
              "Scope of work, payment terms, revision policy, IP ownership, cancellation policy, and limitation of liability",
              "Only the client's name and project description",
              "Only the start and end dates"
            ],
            correctAnswer: 1,
            explanation: "A comprehensive freelance contract should cover scope of work, payment terms, revision policy, intellectual property ownership, cancellation policy, and limitation of liability to protect both parties."
          },
          {
            id: "m9q4",
            question: "How can ChatGPT help when you receive a contract with confusing legal language?",
            options: [
              "It can sign the contract on your behalf",
              "It can negotiate the terms with the other party",
              "It can explain complex legal clauses in plain, simple English",
              "It can automatically reject unfair clauses"
            ],
            correctAnswer: 2,
            explanation: "ChatGPT is excellent at translating complex legal jargon into plain English, helping you understand what you're agreeing to before consulting your attorney."
          }
        ]
      }
    ]
  },
  {
    id: "m10",
    number: 10,
    title: "Personal Productivity & Learning",
    description: "Summarize books and articles, learn new skills faster, organize your schedule, and use ChatGPT as your personal executive assistant.",
    icon: "Zap",
    color: "rose",
    lessons: [
      {
        id: "m10-l1",
        type: "lesson",
        title: "Way #10: Personal Productivity & Learning",
        duration: "6 min",
        content: `## Way #10: Personal Productivity & Learning

As a business owner, your time and mental energy are your most valuable assets. ChatGPT can act as your personal executive assistant, learning coach, and productivity system — all in one.

### Summarizing Books and Long-Form Content

Extract key insights without reading every page.

**Try this prompt:**
> *"Summarize the key principles of 'The E-Myth Revisited' by Michael Gerber in 7 bullet points, focusing on the most actionable insights for a small business owner who is currently doing everything themselves."*

### Accelerated Learning

Use ChatGPT as a personal tutor for any skill you need to develop.

**Try this prompt:**
> *"I need to understand Google Analytics 4 for my business. Explain the 5 most important reports I should check weekly, what each one tells me, and what action I should take based on the data. Assume I'm a complete beginner."*

### Daily Planning and Prioritization

Organize your chaotic to-do list with proven frameworks.

**Try this prompt:**
> *"Here is my to-do list for today: [list your tasks]. I have 5 hours of focused work time. Organize these tasks using the Eisenhower Matrix (Urgent/Important grid) and suggest the order I should tackle them in."*

### Meeting Preparation

Walk into every meeting fully prepared.

**Try this prompt:**
> *"I have a 30-minute meeting with a potential investor tomorrow. They are the founder of [firm name] and focus on early-stage B2B SaaS. Prepare: 5 questions I should ask them, 3 key points I must communicate about my business, and 2 potential concerns they might raise with suggested responses."*

### Writing Assistance

Improve your own writing quickly.

**Try this prompt:**
> *"Rewrite the following email to make it more concise, professional, and persuasive. Keep the core message but improve the clarity and impact: [paste your email]."*

> **Final Thought:** The business owners who thrive in the AI era won't be those who use ChatGPT the most — they'll be those who use it the most *strategically*. Use it to eliminate low-value tasks so you can focus your energy on the high-value work that only you can do: building relationships, making key decisions, and leading your vision.`,
      },
      {
        id: "m10-q1",
        type: "quiz",
        title: "Knowledge Check: Productivity & Learning",
        duration: "2 min",
        questions: [
          {
            id: "m10q1",
            question: "How can ChatGPT help you manage a complex, overwhelming to-do list?",
            options: [
              "By automatically deleting less important tasks",
              "By doing the tasks for you",
              "By organizing and prioritizing tasks using frameworks like the Eisenhower Matrix",
              "By extending your workday to 26 hours"
            ],
            correctAnswer: 2,
            explanation: "You can provide your full to-do list to ChatGPT and ask it to organize and prioritize the tasks using established productivity frameworks like the Eisenhower Matrix."
          },
          {
            id: "m10q2",
            question: "According to the lesson's 'Final Thought,' what distinguishes business owners who thrive in the AI era?",
            options: [
              "Those who use ChatGPT for every single task",
              "Those who refuse to use AI at all",
              "Those who use ChatGPT most strategically — eliminating low-value tasks to focus on high-value work",
              "Those who have the most expensive AI subscription"
            ],
            correctAnswer: 2,
            explanation: "The key is strategic use — using ChatGPT to eliminate low-value, time-consuming tasks so you can focus your energy on the high-value work that only you can do."
          },
          {
            id: "m10q3",
            question: "How can ChatGPT help you prepare for an important investor meeting?",
            options: [
              "By attending the meeting for you",
              "By preparing questions to ask, key points to communicate, and responses to potential concerns",
              "By automatically scheduling the meeting",
              "By sending the investor a pre-meeting report"
            ],
            correctAnswer: 1,
            explanation: "ChatGPT can help you prepare comprehensively for meetings by generating smart questions, key talking points, and anticipated objections with suggested responses."
          },
          {
            id: "m10q4",
            question: "What is the recommended approach for using ChatGPT to learn a new skill like Google Analytics?",
            options: [
              "Ask it to take the certification exam for you",
              "Ask it to explain the most important, actionable elements for your specific situation and skill level",
              "Ask it to list every feature of the tool",
              "Ask it to connect to your Google Analytics account"
            ],
            correctAnswer: 1,
            explanation: "The most effective learning prompts specify your skill level, your specific use case, and ask for actionable, prioritized information — not an exhaustive overview of every feature."
          }
        ]
      }
    ]
  }
];

export const COMPUTED_TOTAL_LESSONS = modules.reduce(
  (acc, module) => acc + module.lessons.length,
  0
);
