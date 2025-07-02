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
    { code: "en-US", name: "English (US)", voice: "en-US" },
    { code: "es-ES", name: "Spanish (Spain)", voice: "es-ES" },
    { code: "fr-FR", name: "French (France)", voice: "fr-FR" },
    { code: "de-DE", name: "German (Germany)", voice: "de-DE" },
    { code: "it-IT", name: "Italian (Italy)", voice: "it-IT" },
    { code: "pt-BR", name: "Portuguese (Brazil)", voice: "pt-BR" },
    { code: "zh-CN", name: "Chinese (Mandarin)", voice: "zh-CN" },
    { code: "ja-JP", name: "Japanese (Japan)", voice: "ja-JP" },
    { code: "ko-KR", name: "Korean (South Korea)", voice: "ko-KR" },
    { code: "ar-SA", name: "Arabic (Saudi Arabia)", voice: "ar-SA" },
    { code: "hi-IN", name: "Hindi (India)", voice: "hi-IN" },
    { code: "ru-RU", name: "Russian (Russia)", voice: "ru-RU" },
  ];

  // Text to Speech
  const handleTextToSpeech = () => {
    if (!inputText.trim()) return;

    setIsProcessing(true);
    const utterance = new SpeechSynthesisUtterance(inputText);

    // Find matching voice
    const voices = speechSynthesis.getVoices();
    const selectedVoice = voices.find(
      (voice) =>
        voice.lang.startsWith(targetLanguage.split("-")[0]) ||
        voice.lang === targetLanguage
    );

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.lang = targetLanguage;
    utterance.rate = 0.9;
    utterance.pitch = 1;

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
  };

  // Speech to Text
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/wav" });
        setAudioBlob(blob);
        stream.getTracks().forEach((track) => track.stop());
        handleSpeechRecognition();
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert(
        "Error accessing microphone. Please ensure microphone permissions are granted."
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSpeechRecognition = () => {
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      alert("Speech recognition not supported in this browser");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = sourceLanguage;
    recognition.continuous = false;
    recognition.interimResults = false;

    setIsProcessing(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setTranscribedText(transcript);
      setIsProcessing(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsProcessing(false);
    };

    recognition.onend = () => {
      setIsProcessing(false);
    };

    // For demo purposes, we'll simulate speech recognition
    setTimeout(() => {
      setTranscribedText(
        "This is a simulated transcription of your recorded audio."
      );
      setIsProcessing(false);
    }, 2000);
  };

  // Audio playback
  const playAudio = () => {
    if (audioBlob && audioRef.current) {
      const audioUrl = URL.createObjectURL(audioBlob);
      audioRef.current.src = audioUrl;
      audioRef.current.play();
      setIsPlaying(true);

      audioRef.current.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // File upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("audio/")) {
      setAudioBlob(file);
      setTranscribedText("");
    }
  };

  // Download audio
  const downloadAudio = () => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `audio-${Date.now()}.wav`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  // Clear audio
  const clearAudio = () => {
    setAudioBlob(null);
    setTranscribedText("");
    if (audioRef.current) {
      audioRef.current.src = "";
    }
  };

  // Load voices when component mounts
  useEffect(() => {
    const loadVoices = () => {
      speechSynthesis.getVoices();
    };

    loadVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
        activeTab === id
          ? "bg-blue-500 text-white shadow-lg"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
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

          {/* Tab Navigation */}
          <div className="p-6 border-b">
            <div className="flex flex-wrap gap-2">
              <TabButton
                id="text-to-speech"
                label="Text to Speech"
                icon={Volume2}
              />
              <TabButton
                id="speech-to-text"
                label="Speech to Text"
                icon={Mic}
              />
              <TabButton
                id="audio-to-audio"
                label="Audio Translation"
                icon={Languages}
              />
            </div>
          </div>

          {/* Language Selection */}
          <div className="p-6 border-b bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Source Language
                </label>
                <select
                  value={sourceLanguage}
                  onChange={(e) => setSourceLanguage(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6">
            {/* Text to Speech Tab */}
            {activeTab === "text-to-speech" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter text to convert to speech
                  </label>
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type your text here..."
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleTextToSpeech}
                    disabled={!inputText.trim() || isProcessing}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Volume2 size={18} />
                        Speak Text
                      </>
                    )}
                  </button>
                  {isPlaying && (
                    <button
                      onClick={() => speechSynthesis.cancel()}
                      className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <Square size={18} />
                      Stop
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Speech to Text Tab */}
            {activeTab === "speech-to-text" && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Recording Controls */}
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Record Audio
                    </label>
                    <div className="flex gap-3">
                      {!isRecording ? (
                        <button
                          onClick={startRecording}
                          className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                          <Mic size={18} />
                          Start Recording
                        </button>
                      ) : (
                        <button
                          onClick={stopRecording}
                          className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors animate-pulse"
                        >
                          <Square size={18} />
                          Stop Recording
                        </button>
                      )}
                    </div>
                  </div>

                  {/* File Upload */}
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Or Upload Audio File
                    </label>
                    <label className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors cursor-pointer">
                      <Upload size={18} />
                      Choose File
                      <input
                        type="file"
                        accept="audio/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Audio Controls */}
                {audioBlob && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm font-medium text-gray-700">
                        Recorded Audio:
                      </span>
                      <div className="flex gap-2">
                        {!isPlaying ? (
                          <button
                            onClick={playAudio}
                            className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                          >
                            <Play size={14} />
                            Play
                          </button>
                        ) : (
                          <button
                            onClick={pauseAudio}
                            className="flex items-center gap-1 px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600 transition-colors"
                          >
                            <Pause size={14} />
                            Pause
                          </button>
                        )}
                        <button
                          onClick={downloadAudio}
                          className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors"
                        >
                          <Download size={14} />
                          Download
                        </button>
                        <button
                          onClick={clearAudio}
                          className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
                        >
                          <Trash2 size={14} />
                          Clear
                        </button>
                      </div>
                    </div>
                    <audio ref={audioRef} className="hidden" />
                  </div>
                )}

                {/* Transcription Results */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transcribed Text
                  </label>
                  <div className="p-4 border border-gray-300 rounded-lg min-h-24 bg-gray-50">
                    {isProcessing ? (
                      <div className="flex items-center gap-2 text-gray-500">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
                        Processing audio...
                      </div>
                    ) : transcribedText ? (
                      <p className="text-gray-800">{transcribedText}</p>
                    ) : (
                      <p className="text-gray-500">
                        Transcribed text will appear here...
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Audio to Audio Tab */}
            {activeTab === "audio-to-audio" && (
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Languages className="text-blue-600" size={20} />
                    <h3 className="font-medium text-blue-800">
                      Audio Translation Process
                    </h3>
                  </div>
                  <p className="text-blue-700 text-sm">
                    This feature combines speech-to-text and text-to-speech to
                    translate audio from one language to another.
                  </p>
                </div>

                {/* Step 1: Record or Upload */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-800">
                    Step 1: Provide Source Audio
                  </h4>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      {!isRecording ? (
                        <button
                          onClick={startRecording}
                          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                          <Mic size={18} />
                          Record Audio
                        </button>
                      ) : (
                        <button
                          onClick={stopRecording}
                          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors animate-pulse"
                        >
                          <Square size={18} />
                          Stop Recording
                        </button>
                      )}
                    </div>
                    <div className="flex-1">
                      <label className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors cursor-pointer">
                        <Upload size={18} />
                        Upload Audio File
                        <input
                          type="file"
                          accept="audio/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Step 2: Process Audio */}
                {audioBlob && (
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-800">
                      Step 2: Audio Processing
                    </h4>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-700">
                          Source Audio:
                        </span>
                        <div className="flex gap-2">
                          {!isPlaying ? (
                            <button
                              onClick={playAudio}
                              className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                            >
                              <Play size={14} />
                              Play
                            </button>
                          ) : (
                            <button
                              onClick={pauseAudio}
                              className="flex items-center gap-1 px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600 transition-colors"
                            >
                              <Pause size={14} />
                              Pause
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Transcription */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Transcribed Text (
                          {
                            languages.find((l) => l.code === sourceLanguage)
                              ?.name
                          }
                          ):
                        </label>
                        <div className="p-3 border border-gray-300 rounded bg-white text-sm">
                          {isProcessing ? (
                            <div className="flex items-center gap-2 text-gray-500">
                              <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
                              Transcribing audio...
                            </div>
                          ) : transcribedText ? (
                            transcribedText
                          ) : (
                            <span className="text-gray-500">
                              Transcription will appear here...
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Translation & Speech Generation */}
                      {transcribedText && (
                        <div>
                          <button
                            onClick={() => {
                              setInputText(transcribedText);
                              handleTextToSpeech();
                            }}
                            disabled={isProcessing}
                            className="flex items-center gap-2 px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <Languages size={18} />
                            Generate Translated Audio
                          </button>
                          <p className="text-sm text-gray-600 mt-2">
                            This will speak the transcribed text in{" "}
                            {
                              languages.find((l) => l.code === targetLanguage)
                                ?.name
                            }
                          </p>
                        </div>
                      )}
                    </div>
                    <audio ref={audioRef} className="hidden" />
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
