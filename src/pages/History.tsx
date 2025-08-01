import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, AlertTriangle, Clock, BarChart3, TrendingUp, Filter } from "lucide-react";

interface HistoryItem {
  id: string;
  statement: string;
  result: "real" | "fake";
  confidence: number;
  explanation: string;
  correctedVersion?: string;
  timestamp: string;
}

interface Statistics {
  totalChecks: number;
  realNews: number;
  fakeNews: number;
  averageConfidence: number;
}

export default function History() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "real" | "fake">("all");

  useEffect(() => {
    // Simulate fetching user history
    const fetchHistory = () => {
      setIsLoading(true);
      
      // Mock history data
      const mockHistory: HistoryItem[] = [
        {
          id: "1",
          statement: "Scientists at MIT have discovered a cure for all forms of cancer using only natural herbs.",
          result: "fake",
          confidence: 87,
          explanation: "This claim contains several red flags including overly broad promises and lack of peer-reviewed sources.",
          correctedVersion: "While researchers worldwide continue cancer research, no single cure exists for all forms of cancer.",
          timestamp: "2024-07-31T14:30:00Z"
        },
        {
          id: "2",
          statement: "The Federal Reserve announced a 0.25% interest rate increase to combat inflation.",
          result: "real",
          confidence: 94,
          explanation: "This statement aligns with official Federal Reserve communications and verified news sources.",
          timestamp: "2024-07-31T10:15:00Z"
        },
        {
          id: "3",
          statement: "New study shows that drinking 10 glasses of water daily can increase IQ by 50 points.",
          result: "fake",
          confidence: 91,
          explanation: "Claims about dramatic IQ increases from simple lifestyle changes are typically unfounded and not supported by scientific evidence.",
          correctedVersion: "Proper hydration is important for cognitive function, but there's no evidence it significantly increases IQ scores.",
          timestamp: "2024-07-30T16:45:00Z"
        },
        {
          id: "4",
          statement: "Tesla's stock price rose 5% following the announcement of their new battery technology.",
          result: "real",
          confidence: 88,
          explanation: "Stock movements following company announcements are commonly reported by financial news outlets.",
          timestamp: "2024-07-30T09:20:00Z"
        },
        {
          id: "5",
          statement: "Scientists have confirmed that the Earth is actually flat and NASA has been hiding this information.",
          result: "fake",
          confidence: 99,
          explanation: "This is a well-known conspiracy theory that contradicts overwhelming scientific evidence and observation.",
          correctedVersion: "Earth is an oblate spheroid, as confirmed by centuries of scientific observation and satellite imagery.",
          timestamp: "2024-07-29T13:10:00Z"
        }
      ];

      // Calculate statistics
      const stats: Statistics = {
        totalChecks: mockHistory.length,
        realNews: mockHistory.filter(item => item.result === "real").length,
        fakeNews: mockHistory.filter(item => item.result === "fake").length,
        averageConfidence: Math.round(mockHistory.reduce((sum, item) => sum + item.confidence, 0) / mockHistory.length)
      };

      setTimeout(() => {
        setHistory(mockHistory);
        setStatistics(stats);
        setIsLoading(false);
      }, 1000);
    };

    fetchHistory();
  }, []);

  const filteredHistory = history.filter(item => {
    if (filter === "all") return true;
    return item.result === filter;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " at " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="grid md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-muted rounded"></div>
              ))}
            </div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-32 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center space-x-2">
            <Clock className="h-8 w-8" />
            <span>Detection History</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Review your previous fact-checking results and track your progress
          </p>
        </div>

        {/* Statistics Cards */}
        {statistics && (
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-lg">
              <CardHeader className="text-center pb-2">
                <BarChart3 className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-2xl font-bold">{statistics.totalChecks}</CardTitle>
                <CardDescription>Total Checks</CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-lg">
              <CardHeader className="text-center pb-2">
                <CheckCircle className="h-8 w-8 text-success mx-auto mb-2" />
                <CardTitle className="text-2xl font-bold text-success">{statistics.realNews}</CardTitle>
                <CardDescription>Real News Detected</CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-lg">
              <CardHeader className="text-center pb-2">
                <AlertTriangle className="h-8 w-8 text-warning mx-auto mb-2" />
                <CardTitle className="text-2xl font-bold text-warning">{statistics.fakeNews}</CardTitle>
                <CardDescription>Fake News Detected</CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-lg">
              <CardHeader className="text-center pb-2">
                <TrendingUp className="h-8 w-8 text-accent mx-auto mb-2" />
                <CardTitle className="text-2xl font-bold">{statistics.averageConfidence}%</CardTitle>
                <CardDescription>Average Confidence</CardDescription>
              </CardHeader>
            </Card>
          </div>
        )}

        {/* Filter Tabs */}
        <Tabs value={filter} onValueChange={(value) => setFilter(value as "all" | "real" | "fake")} className="mb-8">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="all">All Results</TabsTrigger>
            <TabsTrigger value="real">Real News</TabsTrigger>
            <TabsTrigger value="fake">Fake News</TabsTrigger>
          </TabsList>

          <TabsContent value={filter} className="space-y-6">
            {filteredHistory.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No results found</h3>
                  <p className="text-muted-foreground">
                    No detection results match the current filter.
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredHistory.map((item) => (
                <Card key={item.id} className="shadow-lg">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        {item.result === "real" ? (
                          <CheckCircle className="h-5 w-5 text-success" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-warning" />
                        )}
                        <Badge 
                          variant={item.result === "real" ? "default" : "destructive"}
                        >
                          {item.result === "real" ? "REAL" : "FAKE"} - {item.confidence}%
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        {formatDate(item.timestamp)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Statement Checked:</h4>
                      <p className="text-muted-foreground bg-muted p-3 rounded-lg italic">
                        "{item.statement}"
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Analysis:</h4>
                      <p className="text-muted-foreground">
                        {item.explanation}
                      </p>
                    </div>

                    {item.correctedVersion && (
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-success" />
                          <span>Corrected Information:</span>
                        </h4>
                        <p className="text-muted-foreground bg-success/5 border border-success/20 p-3 rounded-lg">
                          {item.correctedVersion}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>

        {/* Empty State */}
        {history.length === 0 && !isLoading && (
          <Card className="text-center py-12">
            <CardContent>
              <Clock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-4">No History Yet</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Start fact-checking news articles to build your detection history. 
                Your results will appear here for future reference.
              </p>
              <Button>
                Start Detecting News
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}