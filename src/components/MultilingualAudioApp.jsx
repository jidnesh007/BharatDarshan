import React, { useState, useRef, useEffect } from "react";
import {
  Mic,
  Square,
  Play,
  Pause,
  Volume2,
  Languages,
  Download,
  Upload,
  Trash2,
} from "lucide-react";

// Add TabButton component
const TabButton = ({ id, label, icon: Icon, activeTab, setActiveTab }) => (
  <button
    onClick={() => setActiveTab(id)}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
      activeTab === id
        ? "bg-blue-600 text-white"
        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
    }`}
  >
    <Icon size={16} />
    {label}
  </button>
);

const MultilingualAudioApp = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [transcribedText, setTranscribedText] = useState("");
  const [inputText, setInputText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("en-US");
  const [targetLanguage, setTargetLanguage] = useState("es-ES");
  const [activeTab, setActiveTab] = useState("text-to-speech");
  const [isProcessing, setIsProcessing] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioRef = useRef(null);
  const chunksRef = useRef([]);

  const languages = [
    { code: "en-US", name: "English (US)" },
    { code: "es-ES", name: "Spanish (Spain)" },
    { code: "fr-FR", name: "French (France)" },
    { code: "de-DE", name: "German (Germany)" },
    { code: "it-IT", name: "Italian (Italy)" },
    { code: "pt-BR", name: "Portuguese (Brazil)" },
    { code: "zh-CN", name: "Chinese (Mandarin)" },
    { code: "ja-JP", name: "Japanese (Japan)" },
    { code: "ko-KR", name: "Korean (South Korea)" },
    { code: "ar-SA", name: "Arabic (Saudi Arabia)" },
    { code: "hi-IN", name: "Hindi (India)" },
    { code: "ru-RU", name: "Russian (Russia)" },
  ];

  // TEXT TO SPEECH
  const handleTextToSpeech = async () => {
    if (!inputText.trim()) return;
    try {
      setIsProcessing(true);
      const translated = await translateWithGroq(inputText, targetLanguage);

      const utterance = new SpeechSynthesisUtterance(translated);
      utterance.lang = targetLanguage;

      const voices = speechSynthesis.getVoices();
      const matchedVoice = voices.find((v) =>
        v.lang.startsWith(targetLanguage.split("-")[0])
      );
      if (matchedVoice) utterance.voice = matchedVoice;

      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => {
        setIsPlaying(false);
        setIsProcessing(false);
      };
      utterance.onerror = () => {
        setIsPlaying(false);
        setIsProcessing(false);
      };

      speechSynthesis.speak(utterance);
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
    }
  };

  // TRANSLATION
  const translateWithGroq = async (text, targetLang) => {
    const endpoint = "https://api.groq.com/openai/v1/chat/completions";
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;

    const prompt = `Translate this text to ${targetLang}: ${text}`;
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          { role: "system", content: "You are a translation assistant." },
          { role: "user", content: prompt },
        ],
      }),
    });
    const data = await res.json();
    return data.choices[0].message.content.trim();
  };

  // SPEECH TO TEXT
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        stream.getTracks().forEach((track) => track.stop());
        handleSpeechRecognition(blob);
      };

      recorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error(err);
      alert("Could not access microphone.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSpeechRecognition = async (blob) => {
    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append("file", blob, "audio.webm");
      formData.append("model", "whisper-large-v3");
      formData.append("language", sourceLanguage.split("-")[0]);

      const res = await fetch(
        "https://api.groq.com/openai/v1/audio/transcriptions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          },
          body: formData,
        }
      );
      if (!res.ok) throw new Error("Speech recognition failed");
      const data = await res.json();
      console.log("whisper transcript:", data.text);

      const translated = await translateWithGroq(data.text, targetLanguage);
      console.log("translated:", translated);
      setTranscribedText(translated);
    } catch (err) {
      console.error(err);
      alert("Transcription error");
    } finally {
      setIsProcessing(false);
    }
  };

  const playAudio = () => {
    if (audioBlob && audioRef.current) {
      const url = URL.createObjectURL(audioBlob);
      audioRef.current.src = url;
      audioRef.current.play();
      setIsPlaying(true);
      audioRef.current.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(url);
      };
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("audio/")) {
      setAudioBlob(file);
      setTranscribedText("");
    }
  };

  const downloadAudio = () => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `audio-${Date.now()}.webm`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const clearAudio = () => {
    setAudioBlob(null);
    setTranscribedText("");
    if (audioRef.current) audioRef.current.src = "";
  };

  useEffect(() => {
    const loadVoices = () => speechSynthesis.getVoices();
    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* HEADER */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
            <div className="flex items-center gap-3">
              <Languages size={32} />
              <div>
                <h1 className="text-2xl font-bold">
                  Multilingual Audio Processor
                </h1>
                <p className="text-blue-100">
                  Convert between text, speech, and audio across languages
                </p>
              </div>
            </div>
          </div>

          {/* TABS */}
          <div className="p-6 border-b flex gap-2 flex-wrap">
            <TabButton
              id="text-to-speech"
              label="Text to Speech"
              icon={Volume2}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <TabButton
              id="speech-to-text"
              label="Speech to Text"
              icon={Mic}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <TabButton
              id="audio-to-audio"
              label="Audio Translation"
              icon={Languages}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>

          {/* LANGUAGE SELECT */}
          <div className="p-6 border-b bg-gray-50 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Source Language
              </label>
              <select
                value={sourceLanguage}
                onChange={(e) => setSourceLanguage(e.target.value)}
                className="w-full p-3 border rounded"
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Language
              </label>
              <select
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
                className="w-full p-3 border rounded"
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="p-6">
            {/* TEXT TO SPEECH */}
            {activeTab === "text-to-speech" && (
              <div className="space-y-4">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type your text here..."
                  className="w-full p-3 border rounded resize-none"
                />
                <button
                  onClick={handleTextToSpeech}
                  disabled={isProcessing}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {isProcessing ? "Processing..." : "Speak"}
                </button>
                {isPlaying && (
                  <button
                    onClick={() => speechSynthesis.cancel()}
                    className="ml-2 px-4 py-2 bg-red-600 text-white rounded"
                  >
                    Stop
                  </button>
                )}
              </div>
            )}

            {/* SPEECH TO TEXT */}
            {activeTab === "speech-to-text" && (
              <div className="space-y-4">
                {!isRecording ? (
                  <button
                    onClick={startRecording}
                    className="px-4 py-2 bg-red-600 text-white rounded"
                  >
                    Start Recording
                  </button>
                ) : (
                  <button
                    onClick={stopRecording}
                    className="px-4 py-2 bg-gray-600 text-white rounded animate-pulse"
                  >
                    Stop Recording
                  </button>
                )}
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  className="block"
                />
                {audioBlob && (
                  <div className="space-x-2 mt-2">
                    <button
                      onClick={playAudio}
                      className="px-3 py-1 bg-blue-500 text-white rounded"
                    >
                      Play
                    </button>
                    <button
                      onClick={pauseAudio}
                      className="px-3 py-1 bg-yellow-500 text-white rounded"
                    >
                      Pause
                    </button>
                    <button
                      onClick={downloadAudio}
                      className="px-3 py-1 bg-green-500 text-white rounded"
                    >
                      Download
                    </button>
                    <button
                      onClick={clearAudio}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Clear
                    </button>
                  </div>
                )}
                <audio ref={audioRef} hidden />
                <div className="border p-3 bg-gray-50 rounded">
                  {isProcessing
                    ? "Processing..."
                    : transcribedText || "Transcribed text will appear here."}
                </div>
              </div>
            )}

            {/* AUDIO TO AUDIO */}
            {activeTab === "audio-to-audio" && (
              <div>
                <p className="mb-4 text-gray-700">
                  This combines speech-to-text and text-to-speech.
                </p>
                <button
                  onClick={startRecording}
                  disabled={isRecording}
                  className="px-4 py-2 bg-red-600 text-white rounded"
                >
                  Record Audio
                </button>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  className="block mt-2"
                />
                {transcribedText && (
                  <div className="mt-4">
                    <button
                      onClick={() => {
                        setInputText(transcribedText);
                        handleTextToSpeech();
                      }}
                      className="px-4 py-2 bg-indigo-600 text-white rounded"
                    >
                      Play Translation
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultilingualAudioApp;
