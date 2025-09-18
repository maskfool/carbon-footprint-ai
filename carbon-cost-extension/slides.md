# Carbon Cost of the Web - Demo Slides

## Slide 1: Title Slide
**Carbon Cost of the Web**
*Chrome Extension for Sustainable Browsing*

- Real-time carbon footprint tracking
- AI-powered optimization tips
- Privacy-first approach
- Built with TypeScript + React

---

## Slide 2: The Problem
**The Internet's Hidden Carbon Cost**

- **3.7%** of global CO₂ emissions from digital technology
- **1.6 billion tons** of CO₂ annually from data centers
- **416.2 TWh** of electricity consumed by data centers
- **Average user** generates 414kg CO₂/year from internet usage

*Source: International Energy Agency, 2021*

---

## Slide 3: Our Solution
**Making the Invisible Visible**

🌱 **Real-time Tracking**
- Performance API monitoring
- Per-tab data accumulation
- Live carbon calculations

🤖 **AI-Powered Tips**
- Quick actionable advice
- Deep technical analysis
- Personalized recommendations

🔒 **Privacy-First**
- Only domain + bytes sent
- Local data processing
- User control over sharing

---

## Slide 4: Technical Architecture
**Modern Web Technologies**

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Content       │    │   Background     │    │   Popup UI      │
│   Script        │◄──►│   Service Worker │◄──►│   (React)       │
│   (Performance) │    │   (Stats Mgmt)   │    │   (TypeScript)  │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Performance   │    │   Chrome Storage │    │   AI APIs       │
│   Observer      │    │   (Settings)     │    │   (Vercel Edge) │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

---

## Slide 5: Live Demo - Data Collection
**Real-Time Carbon Tracking**

**What we'll show:**
1. Navigate to a website
2. Watch data accumulate in real-time
3. See carbon calculations update
4. Demonstrate different site types

**Key Features:**
- Bytes → GB → kWh → CO₂ conversion
- Configurable conversion constants
- Regional energy mix presets
- Environmental impact warnings

---

## Slide 6: Live Demo - AI Tips
**Intelligent Optimization**

**Quick Tips (Google Nano):**
- 3 actionable recommendations
- < 40 words, instant response
- Cached for 30-60 minutes
- Domain-specific advice

**Deep Analysis (OpenAI):**
- 6 detailed recommendations
- Implementation effort levels
- Estimated savings percentages
- Developer-focused insights

---

## Slide 7: Privacy & Security
**User Data Protection**

**What We Collect:**
- ✅ Domain name only
- ✅ Total bytes transferred
- ✅ Timestamp

**What We DON'T Collect:**
- ❌ Full URLs
- ❌ Cookies or headers
- ❌ Personal information
- ❌ Browsing history

**User Controls:**
- Opt-out toggle
- Local data processing
- Transparent privacy notice

---

## Slide 8: Technical Implementation
**Modern Development Stack**

**Frontend:**
- TypeScript for type safety
- React for UI components
- Vite for fast development
- Chrome Extension Manifest V3

**Backend:**
- Vercel Edge Functions
- Google Nano for quick tips
- OpenAI GPT-4 for deep analysis
- Redis caching for cost control

**Testing:**
- Vitest for unit tests
- Chrome DevTools for debugging
- Comprehensive QA checklist

---

## Slide 9: Performance & Scalability
**Optimized for Production**

**Performance:**
- < 10MB memory per tab
- < 1% CPU usage during idle
- < 1ms data collection overhead
- Efficient caching strategy

**Scalability:**
- Edge computing for global reach
- Redis caching for cost control
- Graceful API fallbacks
- Mock mode for offline demo

---

## Slide 10: Impact & Results
**Measurable Environmental Benefits**

**User Impact:**
- 20-40% bandwidth reduction potential
- Increased awareness of digital footprint
- Actionable optimization guidance
- Sustainable browsing habits

**Technical Impact:**
- Open-source contribution
- Developer education
- Industry best practices
- Carbon-aware development

---

## Slide 11: Future Roadmap
**Next Steps & Enhancements**

**Short Term:**
- Firefox extension support
- Mobile browser compatibility
- Enhanced analytics dashboard
- Team/organization features

**Long Term:**
- Machine learning optimization
- Carbon offset integration
- Enterprise deployment
- Global carbon intensity data

---

## Slide 12: Call to Action
**Join the Sustainable Web Movement**

**For Users:**
- Install the extension
- Track your digital footprint
- Implement suggested optimizations
- Share with your network

**For Developers:**
- Contribute to the project
- Build carbon-aware applications
- Adopt sustainable practices
- Join the community

**GitHub:** `carbon-cost-extension`
**Demo:** Live extension showcase

---

## Slide 13: Q&A
**Questions & Discussion**

**Common Questions:**
- How accurate are the calculations?
- What about mobile data usage?
- Can this work with other browsers?
- How do you ensure privacy?

**Technical Questions:**
- Performance API limitations?
- API cost management?
- Extension store approval?
- Scaling considerations?

---

## Slide 14: Thank You
**Building a Greener Internet Together**

🌱 **Every byte counts**
🤖 **AI-powered optimization**
🔒 **Privacy-first approach**
🚀 **Open-source community**

**Contact:**
- GitHub: [Repository Link]
- Email: [Contact Email]
- Demo: [Live Demo Link]

*Thank you for your attention!*

---

## Demo Script Notes

### Opening (2 minutes)
1. Show the problem with current web usage
2. Introduce the solution concept
3. Open Chrome and load the extension

### Data Collection Demo (3 minutes)
1. Navigate to a simple site (show low usage)
2. Go to YouTube/Netflix (show high usage)
3. Demonstrate real-time updates
4. Show conversion calculations

### AI Tips Demo (3 minutes)
1. Click Quick Tips button
2. Show domain-specific recommendations
3. Click Deep Analysis button
4. Show detailed technical advice
5. Demonstrate privacy controls

### Settings Demo (2 minutes)
1. Show conversion constants
2. Demonstrate regional presets
3. Show privacy settings
4. Test simulation mode

### Technical Deep Dive (3 minutes)
1. Show code structure
2. Explain Performance API usage
3. Show API integration
4. Discuss privacy implementation

### Q&A (5 minutes)
1. Answer technical questions
2. Discuss implementation challenges
3. Talk about future plans
4. Get feedback and suggestions

### Closing (1 minute)
1. Summarize key benefits
2. Encourage installation
3. Invite contributions
4. Thank the audience
