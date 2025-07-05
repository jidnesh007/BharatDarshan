import React, { useState, useRef, useEffect } from 'react';
import { Camera, Mic, MicOff, Video, VideoOff, RotateCcw, Copy, Download } from 'lucide-react';

const Deaf = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [detectedText, setDetectedText] = useState('');
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [stream, setStream] = useState(null);
  const [history, setHistory] = useState([]);
  const videoRef = useRef(null);
  const textAreaRef = useRef(null);

  // Start camera
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        },
        audio: false
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setIsVideoOn(true);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      alert('Could not access camera. Please ensure camera permissions are granted.');
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsVideoOn(false);
    }
  };

  // Toggle recording (placeholder for sign language detection)
  const toggleRecording = () => {
    if (!isVideoOn) {
      alert('Please turn on the camera first');
      return;
    }
    
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      // Start sign language detection (placeholder)
      simulateSignLanguageDetection();
    }
  };

  // Simulate sign language detection (replace with actual ML model)
  const simulateSignLanguageDetection = () => {
    const sampleWords = [
      'Hello', 'Thank you', 'Please', 'Help', 'Yes', 'No', 
      'Good', 'Bad', 'Water', 'Food', 'Home', 'Work',
      'Family', 'Friend', 'Love', 'Sorry', 'Excuse me'
    ];
    
    const interval = setInterval(() => {
      if (isRecording) {
        const randomWord = sampleWords[Math.floor(Math.random() * sampleWords.length)];
        setDetectedText(prev => prev + (prev ? ' ' : '') + randomWord);
      } else {
        clearInterval(interval);
      }
    }, 2000);
  };

  // Clear text
  const clearText = () => {
    if (detectedText) {
      setHistory(prev => [...prev, detectedText]);
    }
    setDetectedText('');
  };

  // Copy text to clipboard
  const copyText = async () => {
    if (detectedText) {
      try {
        await navigator.clipboard.writeText(detectedText);
        alert('Text copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy text:', err);
      }
    }
  };

  // Download text as file
  const downloadText = () => {
    if (detectedText) {
      const blob = new Blob([detectedText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `sign-language-${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Sign Language Interpreter
          </h1>
          <p className="text-lg text-gray-600">
            Perform sign language in front of the camera to see text translation
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Camera Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                <Camera className="w-6 h-6" />
                Camera Feed
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={isVideoOn ? stopCamera : startCamera}
                  className={`p-3 rounded-full transition-all ${
                    isVideoOn 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  {isVideoOn ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
                </button>
                <button
                  onClick={toggleRecording}
                  disabled={!isVideoOn}
                  className={`p-3 rounded-full transition-all ${
                    isRecording
                      ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                      : 'bg-blue-500 hover:bg-blue-600 text-white disabled:bg-gray-300'
                  }`}
                >
                  <Mic className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Video Display */}
            <div className="relative bg-gray-900 rounded-xl overflow-hidden aspect-video">
              {isVideoOn ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <div className="text-center">
                    <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Click the camera button to start</p>
                  </div>
                </div>
              )}
              
              {/* Recording indicator */}
              {isRecording && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                  ● Recording
                </div>
              )}
            </div>

            {/* Camera Controls */}
            <div className="mt-4 text-center">
              <p className="text-gray-600 text-sm">
                {isVideoOn 
                  ? isRecording 
                    ? 'Performing sign language detection...' 
                    : 'Camera is ready. Click record to start detection.'
                  : 'Turn on camera to begin sign language detection'
                }
              </p>
            </div>
          </div>

          {/* Text Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Detected Text
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={copyText}
                  disabled={!detectedText}
                  className="p-2 text-gray-500 hover:text-blue-500 disabled:opacity-50 transition-colors"
                  title="Copy text"
                >
                  <Copy className="w-5 h-5" />
                </button>
                <button
                  onClick={downloadText}
                  disabled={!detectedText}
                  className="p-2 text-gray-500 hover:text-green-500 disabled:opacity-50 transition-colors"
                  title="Download text"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button
                  onClick={clearText}
                  className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                  title="Clear text"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Text Display */}
            <div className="border-2 border-gray-200 rounded-xl p-4 min-h-[400px] bg-gray-50">
              <textarea
                ref={textAreaRef}
                value={detectedText}
                onChange={(e) => setDetectedText(e.target.value)}
                placeholder="Detected sign language text will appear here..."
                className="w-full h-full bg-transparent resize-none outline-none text-lg leading-relaxed"
                style={{ minHeight: '350px' }}
              />
            </div>

            {/* Text Stats */}
            <div className="mt-4 flex justify-between text-sm text-gray-500">
              <span>Words: {detectedText.split(' ').filter(word => word.length > 0).length}</span>
              <span>Characters: {detectedText.length}</span>
            </div>

            {/* History Section */}
            {history.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Recent History</h3>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {history.slice(-3).map((text, index) => (
                    <div key={index} className="bg-gray-100 p-2 rounded text-sm text-gray-700">
                      {text.substring(0, 100)}{text.length > 100 ? '...' : ''}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">How to Use</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-blue-50 rounded-xl">
              <div className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                1
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Start Camera</h4>
              <p className="text-gray-600 text-sm">Click the camera button to activate your webcam</p>
            </div>
            <div className="p-4 bg-green-50 rounded-xl">
              <div className="bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                2
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Start Recording</h4>
              <p className="text-gray-600 text-sm">Click the microphone button to begin sign language detection</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-xl">
              <div className="bg-purple-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                3
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Perform Signs</h4>
              <p className="text-gray-600 text-sm">Make sign language gestures and see the text appear</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deaf;