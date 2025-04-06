interface Downloads {
  other?: string;
  vocals?: string;
  bass?: string;
  drums?: string;
  instrumental?: string;
}

export interface SplitAudioResponse {
  downloads: Downloads;
  message: string;
  original_file: string;
  processing_time: number;
  separation_time: number;
}
