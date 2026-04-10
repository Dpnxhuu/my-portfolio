import { useState, useEffect } from "react";

const words = [
  'Hello',
  'नमस्ते',
  'Hola',
  'Bonjour',
  'হ্যালো',
  'नमस्कार',
  'హలో',
  'مرحبا',
  'こんにちは'
];

const Preloader = ({ onComplete }) => {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [textOpacity, setTextOpacity] = useState(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let i = 0;
    const totalDuration = words.length * 150;
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(progressInterval); return 100; }
        return prev + (100 / (totalDuration / 25));
      });
    }, 50);

    const interval = setInterval(() => {
      i++;
      if (i >= words.length) {
        clearInterval(interval);
        setFadeOut(true);
        setTimeout(() => {
          setVisible(false);
          onComplete();
        }, 600);
        return;
      }
      setTextOpacity(0);
      setTimeout(() => {
        setCurrentWord(words[i]);
        setTextOpacity(1);
      }, 80);
    }, 250);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, []);

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "#000000",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
      opacity: fadeOut ? 0 : 1,
      transition: "opacity 0.6s ease",
      pointerEvents: fadeOut ? "none" : "all",
      gap: 0,
    }}>
      {/* Upar name */}
      <p style={{
        color: "#8DFF69",
        fontSize: "11px",
        letterSpacing: "6px",
        margin: "0 0 24px",
        opacity: 0.4,
        fontFamily: '"Urbanist", sans-serif',
        fontWeight: 400,
      }}>
        DEEPANSHU.DEV
      </p>

      {/* Main word */}
      <p style={{
        fontSize: "clamp(36px, 8vw, 96px)",
        fontWeight: 700,
        color: "#8DFF69",
        margin: 0,
        letterSpacing: "-1px",
        opacity: textOpacity,
        transition: "opacity 0.08s",
        fontFamily: '"Urbanist", sans-serif',
        lineHeight: 1,
      }}>
        {currentWord}
      </p>

      {/* Progress bar */}
      <div style={{
        width: "200px",
        height: "1px",
        background: "#8DFF6922",
        marginTop: "48px",
        borderRadius: "999px",
        overflow: "hidden",
      }}>
        <div style={{
          height: "100%",
          width: `${progress}%`,
          background: "#8DFF69",
          transition: "width 0.05s linear",
          borderRadius: "999px",
        }} />
      </div>
    </div>
  );
};

export default Preloader;