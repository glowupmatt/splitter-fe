export type SplitAudioResponse = {
  downloads: {
    instrumental: string;
    vocals: string;
  };
  message: string;
  original_file: string;
  processing_time: number;
  separation_time: number;
};
