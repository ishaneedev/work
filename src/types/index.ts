export interface AnalysisResult {
  summary: string;
  key_clauses: KeyClause[];
  red_flags: RedFlag[];
  confidence: 'high' | 'medium' | 'low';
}

export interface KeyClause {
  id: string;
  title: string;
  text: string;
  category: string;
}

export interface RedFlag {
  id: string;
  issue: string;
  explanation: string;
  severity: 'low' | 'medium' | 'high';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
