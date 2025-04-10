import { forwardRef, useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

type WaveformContainerProps = {
  id: string;
  audioUrl?: string;
  onReady?: (wavesurfer: WaveSurfer) => void;
  onSeek?: (position: number) => void;
  onAudioProcess?: (time: number) => void;
  isMuted?: boolean;
};

export const WaveFormContainer = forwardRef<
  HTMLDivElement,
  WaveformContainerProps
>(({ id, audioUrl, onReady, onSeek, onAudioProcess, isMuted }, ref) => {
  const wavesurferRef = useRef<WaveSurfer | null>(null);

  useEffect(() => {
    if (!ref || typeof ref === "function") return;

    const wavesurfer = WaveSurfer.create({
      container: ref.current!,
      waveColor: "#4F4A85",
      progressColor: "#383351",
      height: 100,
      cursorWidth: 1,
      interact: true,
      normalize: true,
    });

    if (audioUrl) {
      wavesurfer.load(audioUrl);
    }

    wavesurfer.on("ready", () => {
      if (onReady) {
        onReady(wavesurfer);
      }
    });

    wavesurfer.on("click", (position: number) => {
      if (onSeek) {
        onSeek(position);
      }
    });

    wavesurfer.on("audioprocess", (time: number) => {
      if (onAudioProcess) {
        onAudioProcess(time);
      }
    });

    if (isMuted !== undefined) {
      wavesurfer.setMuted(isMuted);
    }

    wavesurferRef.current = wavesurfer;

    return () => {
      wavesurfer.destroy();
    };
  }, [ref, audioUrl, onReady, onSeek, onAudioProcess, isMuted]);

  return (
    <div
      ref={ref}
      id={id}
      className="w-full max-w-[70%] h-[3rem] bg-gray-900 rounded-lg"
    />
  );
});

WaveFormContainer.displayName = "WaveformContainer";
