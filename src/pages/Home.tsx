import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Shield, Search, Brain, TrendingUp, CheckCircle, AlertTriangle } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary to-secondary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <Shield className="h-20 w-20 mx-auto mb-6 opacity-90" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Detect Fake News
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Fight misinformation with AI-powered fact-checking technology
          </p>
          <Link to="/detect">
            <Button variant="hero" size="lg" className="text-lg px-8 py-6">
              <Search className="mr-2 h-5 w-5" />
              Start Detecting Now
            </Button>
          </Link>
        </div>
      </section>

      {/* What is Fake News */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Understanding Fake News
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Fake news refers to false or misleading information presented as legitimate news. 
              It can spread rapidly on social media and cause real harm to individuals and society.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center">
                <AlertTriangle className="h-12 w-12 text-warning mx-auto mb-4" />
                <CardTitle className="text-xl">What is Fake News?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  False, inaccurate, or misleading information designed to deceive readers. 
                  It often mimics real news sources but lacks factual verification.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center">
                <TrendingUp className="h-12 w-12 text-destructive mx-auto mb-4" />
                <CardTitle className="text-xl">Why It Matters</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Fake news can influence elections, harm reputations, create panic, 
                  and erode trust in legitimate media and institutions.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center">
                <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
                <CardTitle className="text-xl">Our Solution</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Advanced AI algorithms analyze content patterns, source credibility, 
                  and cross-reference with verified information databases.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How We Help */}
      <section className="py-16 px-4 bg-muted">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How We Help You Fight Misinformation
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform provides comprehensive tools to verify news authenticity and stay informed.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary text-primary-foreground p-3 rounded-lg">
                  <Search className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Instant Analysis</h3>
                  <p className="text-muted-foreground">
                    Paste any news article or statement for immediate fact-checking analysis.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-secondary text-secondary-foreground p-3 rounded-lg">
                  <Brain className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">AI-Powered Detection</h3>
                  <p className="text-muted-foreground">
                    Advanced machine learning models trained on millions of verified articles.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-accent text-accent-foreground p-3 rounded-lg">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Real-time News Feed</h3>
                  <p className="text-muted-foreground">
                    Stay updated with verified current news from trusted sources.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-center">Detection Process</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <span>Content Analysis & Pattern Recognition</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-secondary text-secondary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <span>Source Credibility Verification</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-accent text-accent-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <span>Cross-Reference with Fact Databases</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-success text-success-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">4</div>
                  <span>Generate Confidence Score & Explanation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detection System Logic */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            How Our Detection System Works
          </h2>
          
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-8 rounded-lg border border-border">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Natural Language Processing</h3>
                <p className="text-muted-foreground text-sm">
                  Advanced NLP algorithms analyze writing patterns, bias indicators, and emotional manipulation techniques.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-secondary text-secondary-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Fact Database Matching</h3>
                <p className="text-muted-foreground text-sm">
                  Cross-references claims with verified fact-checking databases and trusted news sources.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-accent text-accent-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Machine Learning Models</h3>
                <p className="text-muted-foreground text-sm">
                  Trained on millions of verified articles to identify fake news patterns with high accuracy.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Link to="/detect">
              <Button size="lg" className="px-8">
                Try the Detector
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}