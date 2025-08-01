import React, { useState } from 'react';
import { Search, AlertTriangle, CheckCircle, Loader, Info, Eye, FileText, Target, Users, Calendar, MapPin, Clock, User, BookOpen, AlertCircle } from 'lucide-react';

interface DetectionResult {
  prediction: 'Real' | 'Fake';
  confidence: number;
  explanation: string;
  factors: string[];
  contextualInfo: {
    realNewsContext?: string;
    fakeNewsDebunking?: {
      whatActuallyHappened: string;
      whyItsFake: string;
      correctInformation: string;
      commonMisconceptions: string[];
      factCheckSources: string[];
    };
  };
  newsReport: {
    headline: string;
    summary: string;
    keyEvents: string[];
    peopleInvolved: string[];
    timeline: string[];
    location: string;
    context: string;
    implications: string;
    relatedTopics: string[];
  };
  detailedAnalysis: {
    contentSummary: string;
    languageAnalysis: string;
    credibilityIndicators: string[];
    potentialBias: string;
    factualClaims: string[];
    emotionalTone: string;
    sourceAnalysis: string;
    recommendations: string[];
  };
}

const Navbar = () => (
  <nav className="bg-[#274C77] text-white p-4">
    <div className="max-w-6xl mx-auto flex items-center justify-between">
      <h1 className="text-xl font-bold">Truth Gaurd </h1>
      <div className="space-x-6">
        <button className="hover:text-[#6096BA] transition-colors">Home</button>
        <button className="hover:text-[#6096BA] transition-colors">About</button>
        <button className="hover:text-[#6096BA] transition-colors">Contact</button>
      </div>
    </div>
  </nav>
);

const DetectNews = () => {
  const [newsText, setNewsText] = useState('');
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const generateContextualInfo = (text: string, isFake: boolean, topic: string) => {
    if (!isFake) {
      // Generate context for real news
      const contextExamples = {
        government: "Government policies and decisions often follow established procedures involving multiple stakeholders, public consultations, and legislative processes. Such developments typically have documented precedents and are reported by multiple credible news sources with official statements and expert commentary.",
        health: "Health-related developments usually involve peer-reviewed research, clinical trials, regulatory approvals, and statements from recognized medical institutions. Legitimate health news includes data, statistical evidence, and quotes from qualified medical professionals or researchers.",
        technology: "Technology news generally involves product launches, research breakthroughs, industry partnerships, or regulatory changes. Credible tech reporting includes technical specifications, market analysis, company statements, and expert opinions from industry analysts.",
        climate: "Environmental and climate news typically stems from scientific research, government reports, international agreements, or policy changes. Credible climate reporting includes data from research institutions, quotes from climate scientists, and references to peer-reviewed studies.",
        economy: "Economic news usually involves market data, government statistics, corporate earnings, policy changes, or expert analysis. Legitimate economic reporting includes specific figures, source attribution, and commentary from economists or financial analysts.",
        default: "This appears to be legitimate news content that follows standard journalistic practices including factual reporting, proper sourcing, balanced presentation, and professional language standards."
      };
      
      return {
        realNewsContext: contextExamples[topic] || contextExamples.default
      };
    } else {
      // Generate debunking info for fake news
      const fakeNewsExamples = {
        government: {
          whatActuallyHappened: "Government decisions typically follow documented procedures with official announcements through proper channels. Any major policy changes would be reported by multiple credible news sources with official confirmation.",
          whyItsFake: "This content uses emotional manipulation, lacks official sources, and employs urgency tactics designed to bypass critical thinking. Legitimate government news includes official statements, proper attribution, and balanced reporting.",
          correctInformation: "For accurate government news, consult official government websites, established news organizations, and verified press releases. Government actions follow legal procedures and are documented through official channels.",
          commonMisconceptions: [
            "Government decisions are made in secret without public knowledge",
            "Single unofficial sources can reveal major government policies",
            "Emotional or urgent language indicates important government news"
          ],
          factCheckSources: ["Official government websites", "Established news organizations", "Government press offices", "Parliamentary records"]
        },
        health: {
          whatActuallyHappened: "Medical breakthroughs and health policies undergo rigorous scientific review, regulatory approval, and are announced through official medical institutions and peer-reviewed publications.",
          whyItsFake: "This content lacks medical expertise, uses emotional language to create urgency, and makes claims without scientific backing. Legitimate health news includes data, expert quotes, and institutional verification.",
          correctInformation: "Reliable health information comes from medical institutions, peer-reviewed research, health authorities, and qualified medical professionals. Medical claims require scientific evidence and regulatory approval.",
          commonMisconceptions: [
            "Single studies or unverified claims represent medical consensus",
            "Emotional testimonials are equivalent to scientific evidence",
            "Quick fixes or miracle cures are medically credible"
          ],
          factCheckSources: ["WHO", "CDC", "Medical journals", "Health department websites", "Medical institutions"]
        },
        technology: {
          whatActuallyHappened: "Technology developments are typically announced through official company channels, tech conferences, patent filings, or peer-reviewed research. Major tech news is covered by multiple credible technology publications.",
          whyItsFake: "This content uses sensationalized language, lacks technical specificity, and makes extraordinary claims without evidence. Legitimate tech news includes technical details, official statements, and expert analysis.",
          correctInformation: "Credible technology news comes from official company announcements, recognized tech publications, industry analysts, and technical documentation with verifiable specifications.",
          commonMisconceptions: [
            "Revolutionary breakthroughs happen without industry knowledge",
            "Single sources can reveal major undisclosed technology developments",
            "Sensational claims about technology are usually accurate"
          ],
          factCheckSources: ["Official company websites", "Tech industry publications", "Patent databases", "Academic institutions"]
        },
        default: {
          whatActuallyHappened: "Legitimate news events are typically reported by multiple credible sources with proper attribution, official statements, and verifiable information. Real news follows journalistic standards and ethics.",
          whyItsFake: "This content exhibits characteristics of misinformation including emotional manipulation, lack of credible sources, sensationalized language, and urgency tactics designed to prevent fact-checking.",
          correctInformation: "For accurate information, consult multiple established news sources, official statements, and verified reports. Look for proper attribution, balanced reporting, and expert commentary.",
          commonMisconceptions: [
            "Sensational or urgent language indicates important news",
            "Single unverified sources provide reliable information",
            "Emotional content is more trustworthy than factual reporting"
          ],
          factCheckSources: ["Established news organizations", "Official sources", "Fact-checking websites", "Expert institutions"]
        }
      };

      const topic = text.toLowerCase().includes('government') || text.toLowerCase().includes('president') ? 'government' :
                   text.toLowerCase().includes('health') || text.toLowerCase().includes('medical') ? 'health' :
                   text.toLowerCase().includes('technology') || text.toLowerCase().includes('tech') ? 'technology' :
                   'default';

      return {
        fakeNewsDebunking: fakeNewsExamples[topic]
      };
    }
  };

  const analyzeNews = async () => {
    if (!newsText.trim()) {
      alert('Please enter some news text to analyze');
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis with realistic delay
    setTimeout(() => {
      // Enhanced detection logic
      const suspiciousWords = ['URGENT', 'BREAKING', 'SHOCKING', 'UNBELIEVABLE', 'SCIENTISTS HATE THIS', 'MIRACLE', 'SECRET', 'EXCLUSIVE'];
      const emotionalWords = ['AMAZING', 'TERRIBLE', 'DEVASTATING', 'INCREDIBLE', 'OUTRAGEOUS'];
      const clickbaitPhrases = ['YOU WON\'T BELIEVE', 'WHAT HAPPENS NEXT', 'WILL SHOCK YOU'];
      
      const text = newsText.toUpperCase();
      const hasSuspiciousWords = suspiciousWords.some(word => text.includes(word));
      const hasEmotionalWords = emotionalWords.some(word => text.includes(word));
      const hasClickbait = clickbaitPhrases.some(phrase => text.includes(phrase));
      const hasExclamations = (newsText.match(/!/g) || []).length > 2;
      const hasAllCaps = newsText.split(' ').some(word => word.length > 3 && word === word.toUpperCase());
      const hasNumbers = /\d/.test(newsText);
      const hasQuotes = newsText.includes('"') || newsText.includes("'");
      
      // Calculate suspicion score
      let suspicionScore = 0;
      suspicionScore += hasSuspiciousWords ? 25 : 0;
      suspicionScore += hasEmotionalWords ? 20 : 0;
      suspicionScore += hasClickbait ? 30 : 0;
      suspicionScore += hasExclamations ? 15 : 0;
      suspicionScore += hasAllCaps ? 20 : 0;
      suspicionScore += newsText.length < 100 ? 20 : 0;
      suspicionScore += !hasQuotes ? 10 : 0;
      suspicionScore += Math.random() * 15;

      const isFake = suspicionScore > 45;
      const confidence = Math.min(95, Math.max(55, isFake ? 60 + (suspicionScore * 0.5) : 90 - (suspicionScore * 0.8)));

      // Build factors array
      const factors = [];
      if (hasSuspiciousWords) factors.push('Contains sensationalized language and urgency indicators');
      if (hasEmotionalWords) factors.push('Uses highly emotional or charged language');
      if (hasClickbait) factors.push('Exhibits clickbait-style phrasing');
      if (hasExclamations) factors.push('Excessive use of exclamation marks');
      if (hasAllCaps) factors.push('Inappropriate capitalization patterns');
      if (newsText.length < 100) factors.push('Unusually brief for comprehensive news coverage');
      if (!hasQuotes && newsText.length > 100) factors.push('Lacks quoted sources or expert opinions');
      if (!isFake) {
        factors.push('Maintains neutral, factual tone');
        factors.push('Follows standard journalistic structure');
        factors.push('Contains verifiable information patterns');
      }

      // Extract key claims and topics
      const sentences = newsText.split(/[.!?]+/).filter(s => s.trim().length > 10);
      const factualClaims = sentences.slice(0, 3).map(s => s.trim()).filter(s => s.length > 0);
      
      // Determine topic for contextual information
      const lowerText = newsText.toLowerCase();
      const topic = lowerText.includes('government') || lowerText.includes('president') ? 'government' :
                   lowerText.includes('health') || lowerText.includes('medical') ? 'health' :
                   lowerText.includes('technology') || lowerText.includes('tech') ? 'technology' :
                   lowerText.includes('climate') || lowerText.includes('environment') ? 'climate' :
                   lowerText.includes('economy') || lowerText.includes('financial') ? 'economy' :
                   'default';

      // Generate contextual information
      const contextualInfo = generateContextualInfo(newsText, isFake, topic);
      
      // Generate news report analysis
      const generateNewsReport = (text: string) => {
        const isGovernment = lowerText.includes('government') || lowerText.includes('president') || lowerText.includes('minister') || lowerText.includes('policy');
        const isHealth = lowerText.includes('health') || lowerText.includes('medical') || lowerText.includes('hospital') || lowerText.includes('vaccine');
        const isTechnology = lowerText.includes('technology') || lowerText.includes('tech') || lowerText.includes('ai') || lowerText.includes('digital');
        const isClimate = lowerText.includes('climate') || lowerText.includes('environment') || lowerText.includes('warming') || lowerText.includes('carbon');
        const isEconomy = lowerText.includes('economy') || lowerText.includes('financial') || lowerText.includes('market') || lowerText.includes('business');
        const isSports = lowerText.includes('sport') || lowerText.includes('team') || lowerText.includes('player') || lowerText.includes('match');
        
        // Extract people mentioned (simplified pattern matching)
        const peoplePatterns = /(?:president|minister|ceo|director|dr\.?|mr\.?|ms\.?|mrs\.?)\s+([a-z]+(?:\s+[a-z]+)?)/gi;
        const peopleMatches = text.match(peoplePatterns) || [];
        const peopleInvolved = peopleMatches.slice(0, 3).map(match => match.trim());
        
        // Extract locations (simplified)
        const locationPatterns = /\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*(?:\s+City|\s+State|\s+Country)?)\b/g;
        const locationMatches = text.match(locationPatterns) || [];
        const locations = locationMatches.filter(loc => 
          loc.length > 3 && 
          !['The', 'This', 'That', 'There', 'When', 'Where', 'What', 'Who', 'How'].includes(loc)
        ).slice(0, 2);
        
        const firstSentence = sentences[0] || text.substring(0, 100);
        const headline = firstSentence.length > 80 ? firstSentence.substring(0, 77) + "..." : firstSentence;
        
        // Generate contextual summary
        let summary = "";
        let context = "";
        let implications = "";
        let relatedTopics = [];
        
        if (isGovernment) {
          summary = "This appears to be a political or governmental news story involving policy decisions, official statements, or administrative actions.";
          context = "Government-related news often involves policy changes, political decisions, or official announcements that can affect citizens and institutions.";
          implications = "Political developments may have wide-ranging effects on legislation, public services, and citizen rights.";
          relatedTopics = ["Politics", "Public Policy", "Government Affairs", "Civic Issues"];
        } else if (isHealth) {
          summary = "This appears to be health-related news covering medical developments, public health issues, or healthcare policy.";
          context = "Health news typically involves medical research, public health measures, healthcare system changes, or disease-related developments.";
          implications = "Health-related developments can directly impact public wellbeing, healthcare access, and medical treatment options.";
          relatedTopics = ["Public Health", "Medical Research", "Healthcare Policy", "Disease Prevention"];
        } else if (isTechnology) {
          summary = "This appears to be technology news discussing digital innovations, tech industry developments, or technological impacts on society.";
          context = "Technology news covers innovations, digital trends, cybersecurity, artificial intelligence, and the tech industry's influence on daily life.";
          implications = "Technological developments can reshape industries, change how people work and communicate, and create new opportunities or challenges.";
          relatedTopics = ["Innovation", "Digital Transformation", "Cybersecurity", "Tech Industry"];
        } else if (isClimate) {
          summary = "This appears to be environmental or climate-related news discussing ecological issues, climate change, or environmental policies.";
          context = "Environmental news covers climate change, conservation efforts, pollution, renewable energy, and policies affecting the natural world.";
          implications = "Environmental developments affect global sustainability, public health, economic policies, and future living conditions.";
          relatedTopics = ["Climate Change", "Environmental Policy", "Sustainability", "Conservation"];
        } else if (isEconomy) {
          summary = "This appears to be economic or business news covering financial markets, economic policies, or business developments.";
          context = "Economic news involves market trends, financial policies, business performance, employment, and factors affecting economic growth.";
          implications = "Economic developments can affect employment, personal finances, business operations, and overall economic stability.";
          relatedTopics = ["Financial Markets", "Economic Policy", "Business Strategy", "Employment"];
        } else if (isSports) {
          summary = "This appears to be sports-related news covering athletic competitions, team developments, or sports industry matters.";
          context = "Sports news involves competitions, player transfers, team performance, sports governance, and athletic achievements.";
          implications = "Sports developments can affect team standings, fan engagement, athlete careers, and the broader sports industry.";
          relatedTopics = ["Athletic Competition", "Sports Management", "Player Development", "Sports Entertainment"];
        } else {
          summary = "This appears to be general news covering current events or developments in various sectors of society.";
          context = "The news content discusses current events that may impact communities, institutions, or individuals in various ways.";
          implications = "The developments described may have local or broader societal impacts depending on their scope and significance.";
          relatedTopics = ["Current Events", "Social Issues", "Community News", "General Interest"];
        }
        
        // Extract key events from sentences
        const keyEvents = sentences.slice(0, 4).map((sentence, index) => 
          `Event ${index + 1}: ${sentence.trim()}`
        ).filter(event => event.length > 15);
        
        // Create timeline from text structure
        const timeline = sentences.slice(0, 3).map((sentence, index) => {
          if (sentence.toLowerCase().includes('yesterday') || sentence.toLowerCase().includes('last week')) {
            return `Past: ${sentence.trim()}`;
          } else if (sentence.toLowerCase().includes('today') || sentence.toLowerCase().includes('now')) {
            return `Current: ${sentence.trim()}`;
          } else if (sentence.toLowerCase().includes('will') || sentence.toLowerCase().includes('plan')) {
            return `Future: ${sentence.trim()}`;
          } else {
            return `Step ${index + 1}: ${sentence.trim()}`;
          }
        });
        
        return {
          headline,
          summary,
          keyEvents: keyEvents.length > 0 ? keyEvents : ["Main event details extracted from the provided text"],
          peopleInvolved: peopleInvolved.length > 0 ? peopleInvolved : ["Key individuals mentioned in the story"],
          timeline: timeline.length > 0 ? timeline : ["Timeline information extracted from text structure"],
          location: locations.length > 0 ? locations.join(", ") : "Location information not clearly specified",
          context,
          implications,
          relatedTopics
        };
      };
      
      const newsReport = generateNewsReport(newsText);
      
      // Create detailed analysis
      const detailedAnalysis = {
        contentSummary: `This ${newsText.length}-character text discusses ${
          newsText.toLowerCase().includes('government') ? 'governmental affairs' :
          newsText.toLowerCase().includes('health') || newsText.toLowerCase().includes('medical') ? 'health-related topics' :
          newsText.toLowerCase().includes('technology') || newsText.toLowerCase().includes('tech') ? 'technology developments' :
          newsText.toLowerCase().includes('climate') || newsText.toLowerCase().includes('environment') ? 'environmental issues' :
          newsText.toLowerCase().includes('economy') || newsText.toLowerCase().includes('financial') ? 'economic matters' :
          'general news topics'
        }. The content ${isFake ? 'appears to prioritize emotional impact over factual accuracy' : 'maintains a balanced, informative approach'}.`,
        
        languageAnalysis: isFake ? 
          'The language pattern shows characteristics commonly associated with misinformation: emotional manipulation, urgency indicators, and sensationalized phrasing designed to provoke strong reactions rather than inform.' :
          'The language demonstrates professional journalistic standards with measured tone, factual presentation, and appropriate use of formal news writing conventions.',
        
        credibilityIndicators: isFake ? [
          'Lack of specific sources or attributions',
          'Emotional language designed to bypass critical thinking',
          'Urgency tactics that discourage fact-checking',
          'Absence of balanced perspectives'
        ] : [
          'Neutral tone suggests objective reporting',
          'Structured presentation of information',
          'Absence of inflammatory language',
          'Professional writing style'
        ],
        
        potentialBias: isFake ?
          'Strong indicators of bias toward sensationalism and emotional manipulation. The content appears designed to generate strong reactions rather than inform readers objectively.' :
          'Minimal bias detected. The content appears to maintain journalistic objectivity with balanced language and factual presentation.',
        
        factualClaims: factualClaims.length > 0 ? factualClaims : ['No specific factual claims identified in the provided text'],
        
        emotionalTone: hasSuspiciousWords || hasEmotionalWords ? 
          'High emotional intensity - designed to provoke strong feelings (anger, fear, excitement) which can impair critical judgment.' :
          'Neutral to low emotional intensity - maintains professional distance appropriate for news reporting.',
        
        sourceAnalysis: hasQuotes ?
          'Contains quoted material, suggesting some attempt at source attribution. However, verification of these sources would be necessary.' :
          'Limited or no apparent source attribution. Credible news typically includes multiple sources and expert opinions.',
        
        recommendations: isFake ? [
          'Cross-reference this information with established news sources',
          'Look for original sources and expert opinions',
          'Be cautious of sharing without verification',
          'Consider the motivation behind such sensationalized presentation',
          'Apply critical thinking and fact-checking resources'
        ] : [
          'While this appears credible, still verify through multiple sources',
          'Look for additional context and expert analysis',
          'Check for any updates or corrections to the story',
          'Consider various perspectives on the topic'
        ]
      };

      setResult({
        prediction: isFake ? 'Fake' : 'Real',
        confidence: Math.round(confidence),
        explanation: isFake 
          ? 'This text exhibits multiple characteristics commonly associated with misinformation, including emotional manipulation, sensationalized language, and urgency tactics designed to bypass critical thinking.'
          : 'This text demonstrates characteristics consistent with legitimate journalism, including neutral tone, factual language, and professional presentation standards.',
        factors,
        contextualInfo,
        newsReport,
        detailedAnalysis
      });

      setIsAnalyzing(false);
    }, 3000);
  };

  const clearResults = () => {
    setResult(null);
    setNewsText('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E7ECEF] to-white">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Search className="text-[#274C77]" size={32} />
            <h1 className="text-3xl font-bold text-[#274C77]">Advanced News Analysis</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Get comprehensive analysis of news content including credibility assessment, bias detection, and detailed explanations
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <label htmlFor="news-text" className="block text-lg font-medium text-[#274C77] mb-4">
            Enter News Text for Analysis
          </label>
          <textarea
            id="news-text"
            value={newsText}
            onChange={(e) => setNewsText(e.target.value)}
            placeholder="Paste the news article or statement you want to analyze. The more text you provide, the more detailed the analysis will be..."
            rows={10}
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6096BA] focus:border-[#6096BA] outline-none transition-colors duration-200 resize-none"
          />
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-500">
              {newsText.length} characters • {newsText.split(' ').filter(w => w.length > 0).length} words
            </span>
            <div className="space-x-3">
              {result && (
                <button
                  onClick={clearResults}
                  className="px-6 py-2 text-[#274C77] border border-[#274C77] rounded-lg hover:bg-[#6096BA] hover:text-white transition-colors duration-200"
                >
                  Clear
                </button>
              )}
              <button
                onClick={analyzeNews}
                disabled={isAnalyzing || !newsText.trim()}
                className="px-6 py-2 bg-[#274C77] text-white rounded-lg hover:bg-[#6096BA] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 inline-flex items-center space-x-2"
              >
                {isAnalyzing ? (
                  <>
                    <Loader className="animate-spin" size={20} />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Search size={20} />
                    <span>Analyze News</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="space-y-6">
            {/* Main Context Section - New Enhanced Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-[#274C77] mb-6 flex items-center space-x-3">
                <BookOpen size={24} />
                <span>Context & Truth Analysis</span>
              </h2>

              {result.prediction === 'Real' ? (
                <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
                  <div className="flex items-start space-x-3 mb-4">
                    <CheckCircle className="text-green-600 mt-1" size={24} />
                    <div>
                      <h3 className="text-xl font-bold text-green-800 mb-2">Real News Context</h3>
                      <p className="text-green-700 leading-relaxed text-lg">
                        {result.contextualInfo.realNewsContext}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-white rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-3">What This Means:</h4>
                    <p className="text-gray-700 leading-relaxed">
                      This news content follows established journalistic standards and appears to be reporting factual information. 
                      The language, structure, and presentation align with legitimate news reporting practices. However, it's always 
                      good practice to verify important information through multiple credible sources.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
                  <div className="flex items-start space-x-3 mb-6">
                    <AlertTriangle className="text-red-600 mt-1" size={24} />
                    <div>
                      <h3 className="text-xl font-bold text-red-800 mb-2">Fake News Detected - Here's the Truth</h3>
                    </div>
                  </div>

                  {result.contextualInfo.fakeNewsDebunking && (
                    <div className="space-y-6">
                      {/* What Actually Happened */}
                      <div className="bg-white p-4 rounded-lg border border-red-200">
                        <h4 className="font-semibold text-red-800 mb-3 flex items-center space-x-2">
                          <AlertCircle size={18} />
                          <span>What Actually Happened:</span>
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                          {result.contextualInfo.fakeNewsDebunking.whatActuallyHappened}
                        </p>
                      </div>

                      {/* Why It's Fake */}
                      <div className="bg-white p-4 rounded-lg border border-red-200">
                        <h4 className="font-semibold text-red-800 mb-3 flex items-center space-x-2">
                          <Eye size={18} />
                          <span>Why This is Fake:</span>
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                          {result.contextualInfo.fakeNewsDebunking.whyItsFake}
                        </p>
                      </div>

                      {/* Correct Information */}
                      <div className="bg-white p-4 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-green-800 mb-3 flex items-center space-x-2">
                          <CheckCircle size={18} />
                          <span>Correct Information:</span>
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                          {result.contextualInfo.fakeNewsDebunking.correctInformation}
                        </p>
                      </div>

                      {/* Common Misconceptions */}
                      <div className="bg-white p-4 rounded-lg border border-yellow-200">
                        <h4 className="font-semibold text-yellow-800 mb-3">Common Misconceptions:</h4>
                        <ul className="space-y-2">
                          {result.contextualInfo.fakeNewsDebunking.commonMisconceptions.map((misconception, index) => (
                            <li key={index} className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-700">{misconception}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Fact Check Sources */}
                      <div className="bg-white p-4 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-blue-800 mb-3">Reliable Fact-Check Sources:</h4>
                        <div className="flex flex-wrap gap-2">
                          {result.contextualInfo.fakeNewsDebunking.factCheckSources.map((source, index) => (
                            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                              {source}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* News Report Analysis */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-[#274C77] mb-6 flex items-center space-x-3">
                <FileText size={24} />
                <span>News Report Analysis</span>
              </h2>

              {/* Headline */}
              <div className="mb-6 p-4 bg-[#E7ECEF] rounded-lg">
                <h3 className="text-lg font-semibold text-[#274C77] mb-2">Extracted Headline</h3>
                <p className="text-xl font-bold text-gray-800">{result.newsReport.headline}</p>
              </div>

              {/* Summary */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#274C77] mb-3">News Summary</h3>
                <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
                  {result.newsReport.summary}
                </p>
              </div>

              {/* Key Details Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Location */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-[#274C77] mb-2 flex items-center space-x-2">
                    <MapPin size={18} />
                    <span>Location</span>
                  </h4>
                  <p className="text-gray-700">{result.newsReport.location}</p>
                </div>

                {/* People Involved */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-[#274C77] mb-2 flex items-center space-x-2">
                    <User size={18} />
                    <span>Key People</span>
                  </h4>
                  <ul className="text-gray-700">
                    {result.newsReport.peopleInvolved.map((person, index) => (
                      <li key={index} className="mb-1">• {person}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Key Events */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#274C77] mb-3 flex items-center space-x-2">
                  <Calendar size={20} />
                  <span>Key Events</span>
                </h3>
                <div className="space-y-3">
                  {result.newsReport.keyEvents.map((event, index) => (
                    <div key={index} className="bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-400">
                      <p className="text-gray-700">{event}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#274C77] mb-3 flex items-center space-x-2">
                  <Clock size={20} />
                  <span>Timeline</span>
                </h3>
                <div className="space-y-2">
                  {result.newsReport.timeline.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3 p-2">
                      <div className="w-3 h-3 bg-[#6096BA] rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Context & Implications */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#274C77] mb-3">Context</h3>
                  <p className="text-gray-700 leading-relaxed bg-purple-50 p-4 rounded-lg">
                    {result.newsReport.context}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#274C77] mb-3">Implications</h3>
                  <p className="text-gray-700 leading-relaxed bg-orange-50 p-4 rounded-lg">
                    {result.newsReport.implications}
                  </p>
                </div>
              </div>

              {/* Related Topics */}
              <div>
                <h3 className="text-lg font-semibold text-[#274C77] mb-3">Related Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {result.newsReport.relatedTopics.map((topic, index) => (
                    <span key={index} className="px-3 py-1 bg-[#6096BA] text-white rounded-full text-sm">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Result Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-[#274C77] mb-6 flex items-center space-x-3">
                <Info size={24} />
                <span>Credibility Analysis</span>
              </h2>

              <div className={`p-6 rounded-xl mb-6 ${
                result.prediction === 'Real' 
                  ? 'bg-green-50 border-l-4 border-green-500' 
                  : 'bg-red-50 border-l-4 border-red-500'
              }`}>
                <div className="flex items-center space-x-3 mb-4">
                  {result.prediction === 'Real' ? (
                    <CheckCircle className="text-green-600" size={32} />
                  ) : (
                    <AlertTriangle className="text-red-600" size={32} />
                  )}
                  <div>
                    <h3 className={`text-2xl font-bold ${
                      result.prediction === 'Real' ? 'text-green-800' : 'text-red-800'
                    }`}>
                      {result.prediction} News Detected
                    </h3>
                    <p className={`text-lg ${
                      result.prediction === 'Real' ? 'text-green-700' : 'text-red-700'
                    }`}>
                      Confidence: {result.confidence}%
                    </p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${
                        result.prediction === 'Real' ? 'bg-green-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${result.confidence}%` }}
                    ></div>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed">
                  {result.explanation}
                </p>
              </div>
            </div>

            {/* Detailed Analysis Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Content Summary */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-[#274C77] mb-4 flex items-center space-x-2">
                  <FileText size={20} />
                  <span>Content Summary</span>
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {result.detailedAnalysis.contentSummary}
                </p>
              </div>

              {/* Language Analysis */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-[#274C77] mb-4 flex items-center space-x-2">
                  <Eye size={20} />
                  <span>Language Analysis</span>
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {result.detailedAnalysis.languageAnalysis}
                </p>
              </div>

              {/* Emotional Tone */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-[#274C77] mb-4 flex items-center space-x-2">
                  <Target size={20} />
                  <span>Emotional Tone</span>
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {result.detailedAnalysis.emotionalTone}
                </p>
              </div>

              {/* Bias Assessment */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-[#274C77] mb-4 flex items-center space-x-2">
                  <Users size={20} />
                  <span>Bias Assessment</span>
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {result.detailedAnalysis.potentialBias}
                </p>
              </div>
            </div>

            {/* Additional Details */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-[#274C77] mb-6">Detailed Breakdown</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Credibility Indicators */}
                <div>
                  <h4 className="text-lg font-semibold text-[#274C77] mb-3">Credibility Indicators</h4>
                  <ul className="space-y-2">
                    {result.detailedAnalysis.credibilityIndicators.map((indicator, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-[#6096BA] rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{indicator}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Analysis Factors */}
                <div>
                  <h4 className="text-lg font-semibold text-[#274C77] mb-3">Key Analysis Factors</h4>
                  <ul className="space-y-2">
                    {result.factors.map((factor, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-[#6096BA] rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Factual Claims */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-[#274C77] mb-3">Identified Claims</h4>
                <div className="bg-[#E7ECEF] p-4 rounded-lg">
                  <ul className="space-y-2">
                    {result.detailedAnalysis.factualClaims.map((claim, index) => (
                      <li key={index} className="text-gray-700">
                        <span className="font-medium">Claim {index + 1}:</span> {claim}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Source Analysis */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-[#274C77] mb-3">Source Analysis</h4>
                <p className="text-gray-700 bg-[#E7ECEF] p-4 rounded-lg">
                  {result.detailedAnalysis.sourceAnalysis}
                </p>
              </div>

              {/* Recommendations */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-[#274C77] mb-3">Recommendations</h4>
                <ul className="space-y-2">
                  {result.detailedAnalysis.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Important Disclaimer:</strong> This AI analysis is designed to help identify potential indicators 
                  of misinformation, but it should not be considered definitive. Always verify information through multiple 
                  reputable sources, consult fact-checking organizations, and apply critical thinking. The accuracy of this 
                  analysis depends on the quality and completeness of the input text. For important decisions, seek 
                  professional verification from journalism experts or fact-checking services.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetectNews;