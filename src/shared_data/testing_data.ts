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

export const response_test: SplitAudioResponse = {
  downloads: {
    bass: "https://res.cloudinary.com/dkouwkt7p/video/upload/v1743924151/bass_NewJeans_Super_Shy_Lyrics__Super_Shy__Color_Coded_Lyrics_gbphrj.mp3",
    drums:
      "https://res.cloudinary.com/dkouwkt7p/video/upload/v1743924153/drums_NewJeans_Super_Shy_Lyrics__Super_Shy__Color_Coded_Lyrics_uisa45.mp3",
    other:
      "https://res.cloudinary.com/dkouwkt7p/video/upload/v1743924152/other_NewJeans_Super_Shy_Lyrics__Super_Shy__Color_Coded_Lyrics_yftgsf.mp3",
    vocals:
      "https://res.cloudinary.com/dkouwkt7p/video/upload/v1743924151/vocals_NewJeans_Super_Shy_Lyrics__Super_Shy__Color_Coded_Lyrics_cqp7b9.mp3",
  },
  message: "Separation complete",
  original_file:
    "https://rendered-stem-bucket.s3.us-west-2.amazonaws.com/originals/NewJeans_Super_Shy_Lyrics__Super_Shy__Color_Coded_Lyrics.mp3",
  processing_time: 107.126012873,
  separation_time: 105.383078983,
};
