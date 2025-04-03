interface Downloads {
  instrumental: string;
  vocals: string;
}

export interface SplitAudioResponse {
  downloads: Downloads;
  message: string;
  original_file: string;
  processing_time: number;
  separation_time: number;
}

export const response_test: SplitAudioResponse = {
  downloads: {
    instrumental:
      "https://rendered-stem-bucket.s3.us-west-2.amazonaws.com/stems/instrumental_Smino_-_Polynesian_Official_Music_Video.mp3",
    vocals:
      "https://rendered-stem-bucket.s3.us-west-2.amazonaws.com/stems/vocals_Smino_-_Polynesian_Official_Music_Video.mp3",
  },
  message: "Separation complete",
  original_file:
    "https://rendered-stem-bucket.s3.us-west-2.amazonaws.com/originals/Smino_-_Polynesian_Official_Music_Video.mp3",
  processing_time: 149.065119561,
  separation_time: 146.897797809,
};
