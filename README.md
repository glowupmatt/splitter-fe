# Splitter Front End

This is the front end used to split stems. Users can drag and drop MP3 or WAV files, which are then processed by a serverless function to split the song into 2 or 4 stems.

## Features

- **Drag and Drop**: Easily upload your audio files by dragging and dropping them into the interface.
- **Serverless Processing**: The uploaded files are processed by a serverless function to split the song into stems.
- **Shadcn**: Utilizes Shadcn for UI components.
- **Vercel Blob Storage**: Stores the audio files from the frontend using Vercel's Blob storage.
- **Wavesurfer.js**: Visualizes the audio waveform using Wavesurfer.js.
- **Tailwind CSS**: Styled with Tailwind CSS for a modern and responsive design.

## Technologies Used

- **Shadcn**: UI components library for a consistent user interface.
- **Vercel Blob Storage**: Efficient and scalable storage solution for audio files.
- **Wavesurfer.js**: Library for creating customizable audio waveforms.
- **Tailwind CSS**: Utility-first CSS framework for styling.

## Getting Started

To get started with the project, follow these steps:

1. **Clone the Repository**:
    ```sh
    git clone https://github.com/glowupmatt/splitter-fe.git
    cd splitter-fe
    ```

2. **Install Dependencies**:
    ```sh
    npm install
    ```

3. **Run the Development Server**:
    ```sh
    npm run dev
    ```

4. **Build the Project**:
    ```sh
    npm run build
    ```

5. **Start the Production Server**:
    ```sh
    npm start
    ```
