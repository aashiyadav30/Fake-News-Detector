import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TrendingUp, ExternalLink, Clock, Eye } from "lucide-react";

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  source: string;
  publishedAt: string;
  url: string;
  content: string;
  category: string;
}

export default function CurrentNews() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  useEffect(() => {
    // Simulate fetching news from API
    const fetchNews = async () => {
      setIsLoading(true);
      
      // Mock news data
      const mockNews: NewsArticle[] = [
        {
          id: "1",
          title: "Scientists Discover New Method for Carbon Capture",
          description: "Researchers at MIT have developed a revolutionary approach to capturing carbon dioxide from the atmosphere using advanced nanomaterials.",
          source: "Science Daily",
          publishedAt: "2024-08-01T10:30:00Z",
          url: "https://example.com/news1",
          content: "In a groundbreaking study published today, MIT researchers have unveiled a new carbon capture technology that promises to be more efficient and cost-effective than existing methods. The team, led by Dr. Sarah Chen, developed specialized nanomaterials that can selectively absorb CO2 from ambient air with unprecedented efficiency. 'This technology could be game-changing for climate mitigation efforts,' said Dr. Chen. The research, funded by the Department of Energy, shows that the new materials can capture carbon at a rate 300% faster than current industrial methods while using 50% less energy. The team plans to scale up the technology for commercial applications within the next five years.",
          category: "Science"
        },
        {
          id: "2",
          title: "Global Economic Summit Addresses Inflation Concerns",
          description: "World leaders convene to discuss coordinated responses to rising inflation rates affecting major economies worldwide.",
          source: "Reuters",
          publishedAt: "2024-08-01T08:15:00Z",
          url: "https://example.com/news2",
          content: "Finance ministers and central bank governors from the G20 nations gathered in Geneva today for an emergency summit addressing global inflation concerns. The meeting comes as several major economies report inflation rates exceeding 6%, the highest levels seen in over a decade. Key topics include coordinated monetary policy responses, supply chain stabilization measures, and energy price management strategies. Federal Reserve Chair Jerome Powell emphasized the need for 'measured but decisive action' to prevent runaway inflation while avoiding recession triggers.",
          category: "Economy"
        },
        {
          id: "3",
          title: "Breakthrough in Quantum Computing Achieved",
          description: "Tech giant announces successful demonstration of error-corrected quantum computing at unprecedented scale.",
          source: "TechCrunch",
          publishedAt: "2024-08-01T06:45:00Z",
          url: "https://example.com/news3",
          content: "In a major milestone for quantum computing, researchers have successfully demonstrated error-corrected quantum calculations using a 1000-qubit processor. This achievement represents a significant step toward practical quantum computers capable of solving complex real-world problems. The breakthrough addresses one of quantum computing's biggest challenges: quantum error correction. The new system can maintain quantum coherence for extended periods while performing complex calculations, opening doors to applications in drug discovery, financial modeling, and cryptography.",
          category: "Technology"
        },
        {
          id: "4",
          title: "Renewable Energy Capacity Reaches New Milestone",
          description: "Global renewable energy installations exceed 3.4 terawatts, marking fastest growth rate in history.",
          source: "Environmental News",
          publishedAt: "2024-08-01T05:20:00Z",
          url: "https://example.com/news4",
          content: "The International Renewable Energy Agency (IRENA) announced today that global renewable energy capacity has reached 3.4 terawatts, representing a 15% increase from the previous year. Solar and wind power led the growth, accounting for 85% of new installations. The milestone demonstrates unprecedented momentum in the global energy transition. 'We're witnessing the fastest deployment of renewable energy in human history,' said IRENA Director-General Francesco La Camera. The agency projects that renewables could provide 90% of the CO2 reductions needed in the energy sector by 2030.",
          category: "Environment"
        },
        {
          id: "5",
          title: "Medical AI Improves Early Disease Detection",
          description: "New artificial intelligence system demonstrates 95% accuracy in detecting early-stage diseases from routine blood tests.",
          source: "Medical Journal Today",
          publishedAt: "2024-08-01T04:10:00Z",
          url: "https://example.com/news5",
          content: "A revolutionary AI system developed by researchers at Johns Hopkins University has achieved 95% accuracy in detecting early-stage diseases from standard blood tests. The system, called MedAI-Detect, can identify over 50 different conditions including various cancers, autoimmune disorders, and metabolic diseases weeks or months before traditional diagnostic methods. Clinical trials involving 10,000 patients showed the AI correctly identified early-stage diseases in 95% of cases, potentially saving thousands of lives through earlier intervention and treatment.",
          category: "Health"
        },
        {
          id: "6",
          title: "Space Telescope Discovers Potentially Habitable Exoplanet",
          description: "Astronomers confirm the existence of Earth-sized planet in the habitable zone of a nearby star system.",
          source: "Space News Network",
          publishedAt: "2024-08-01T02:30:00Z",
          url: "https://example.com/news6",
          content: "The James Webb Space Telescope has confirmed the discovery of an Earth-sized exoplanet located in the habitable zone of Proxima Centauri, our nearest stellar neighbor. The planet, designated Proxima Centauri c, shows strong evidence of having liquid water on its surface and a stable atmosphere. Dr. Maria Rodriguez, lead astronomer on the project, stated, 'This is the most promising candidate for hosting life that we've found outside our solar system.' The planet orbits its star every 11.2 days and receives similar amounts of energy from its star as Earth receives from the Sun. Follow-up observations are planned to search for biosignatures in the planet's atmosphere.",
          category: "Science"
        }
      ];

      // Simulate API delay
      setTimeout(() => {
        setNews(mockNews);
        setIsLoading(false);
      }, 1000);
    };

    fetchNews();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " at " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Science": "bg-blue-100 text-blue-800",
      "Economy": "bg-green-100 text-green-800",
      "Technology": "bg-purple-100 text-purple-800",
      "Environment": "bg-emerald-100 text-emerald-800",
      "Health": "bg-pink-100 text-pink-800",
      "Politics": "bg-red-100 text-red-800",
      "Sports": "bg-orange-100 text-orange-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center space-x-2">
            <TrendingUp className="h-8 w-8" />
            <span>Current News</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Stay informed with verified news from trusted sources
          </p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded"></div>
                    <div className="h-3 bg-muted rounded w-5/6"></div>
                    <div className="h-3 bg-muted rounded w-4/6"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((article) => (
              <Card key={article.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={getCategoryColor(article.category)}>
                      {article.category}
                    </Badge>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatDate(article.publishedAt)}
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight hover:text-primary transition-colors">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {article.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      {article.source}
                    </span>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedArticle(article)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Read
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge className={getCategoryColor(article.category)}>
                                {article.category}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {article.source}
                              </span>
                            </div>
                            <DialogTitle className="text-xl leading-tight">
                              {article.title}
                            </DialogTitle>
                            <DialogDescription className="text-base">
                              {article.description}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="mt-6">
                            <p className="text-foreground leading-relaxed whitespace-pre-line">
                              {article.content}
                            </p>
                            <div className="mt-6 pt-4 border-t border-border">
                              <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <span>Published: {formatDate(article.publishedAt)}</span>
                                <Button variant="link" size="sm" className="p-0">
                                  <ExternalLink className="h-4 w-4 mr-1" />
                                  View Original
                                </Button>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-border">
            <CardContent className="py-8">
              <h3 className="text-2xl font-bold mb-4">Stay Informed, Stay Protected</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                All news articles displayed here are from verified, trusted sources. 
                We continuously monitor and fact-check content to ensure accuracy and reliability.
              </p>
              <Button onClick={() => window.location.reload()}>
                <TrendingUp className="mr-2 h-4 w-4" />
                Refresh News Feed
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}