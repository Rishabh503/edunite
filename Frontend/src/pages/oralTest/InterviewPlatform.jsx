// import { useEffect, useRef, useState } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'
// import { Canvas } from '@react-three/fiber'
// import { OrbitControls } from '@react-three/drei'
// import { Avatar } from '../../components/Avatar'
// import { motion } from 'framer-motion'

// export default function InterviewPlatform() {
//   const location = useLocation()
//   const navigate = useNavigate()
//   // const { questions = [], interviewType = '' } = location.state || {}
// const { questions = [], subject = '', difficulty = '' } = location.state || {};


//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [isSpeaking, setIsSpeaking] = useState(false)
//   const [currentAnimation, setCurrentAnimation] = useState('Idle')
//   const [userAnswer, setUserAnswer] = useState('')
//   const [qaPairs, setQaPairs] = useState([])
//   const [stream, setStream] = useState(null)
//   const [micOn, setMicOn] = useState(true)
//   const [videoOn, setVideoOn] = useState(true)
//   const [isListening, setIsListening] = useState(false)

//   const videoRef = useRef(null)
//   const synthRef = useRef(window.speechSynthesis)
//   const utteranceRef = useRef(null)
//   const recognitionRef = useRef(null)

//   useEffect(() => {
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//       .then((mediaStream) => {
//         setStream(mediaStream)
//         if (videoRef.current) {
//           videoRef.current.srcObject = mediaStream
//         }
//       })
//       .catch(err => {
//         console.error('Error accessing media devices:', err)
//       })

//     return () => {
//       if (stream) {
//         stream.getTracks().forEach(track => track.stop())
//       }
//     }
//   }, [])

//   const toggleMic = () => {
//     if (stream) {
//       stream.getAudioTracks().forEach((track) => (track.enabled = !micOn))
//       setMicOn(!micOn)
//     }
//   }

//   const toggleVideo = async () => {
//     if (videoOn) {
//       stream.getVideoTracks().forEach((track) => track.stop())
//       setVideoOn(false)
//       if (videoRef.current) {
//         videoRef.current.srcObject = null
//       }
//     } else {
//       try {
//         const newStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: micOn })
//         setStream(newStream)
//         setVideoOn(true)
//         if (videoRef.current) {
//           videoRef.current.srcObject = newStream
//         }
//       } catch (err) {
//         console.error('Failed to reacquire camera:', err)
//       }
//     }
//   }

//   const speak = (textToSpeak) => {
//     if (utteranceRef.current) {
//       synthRef.current.cancel()
//     }

//     const utterance = new SpeechSynthesisUtterance(textToSpeak)
//     utteranceRef.current = utterance

//     utterance.onstart = () => {
//       setIsSpeaking(true)
//       setCurrentAnimation('Talking')
//     }
//     utterance.onend = () => {
//       setIsSpeaking(false)
//       setCurrentAnimation('Idle')
//     }

//     synthRef.current.speak(utterance)
//   }

//   useEffect(() => {
//     if (questions.length > 0) {
//       speak(questions[0])
//     }
//   }, [questions])

//   useEffect(() => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
//     if (SpeechRecognition) {
//       const recognition = new SpeechRecognition()
//       recognition.lang = 'en-US'
//       recognition.continuous = true
//       recognition.interimResults = true

//       recognition.onstart = () => setIsListening(true)

//       recognition.onresult = (event) => {
//         let final = ''
//         for (let i = event.resultIndex; i < event.results.length; i++) {
//           const transcript = event.results[i][0].transcript
//           if (event.results[i].isFinal) {
//             final += transcript + ' '
//           }
//         }
//         setUserAnswer(prev => prev + final)
//       }

//       recognition.onerror = (e) => {
//         console.error('Speech Recognition error:', e)
//         setIsListening(false)
//       }

//       recognition.onend = () => setIsListening(false)

//       recognitionRef.current = recognition
//     }
//   }, [])

//   const startListening = () => {
//     setUserAnswer('')
//     if (recognitionRef.current) recognitionRef.current.start()
//   }

//   const stopListening = () => {
//     if (recognitionRef.current) recognitionRef.current.stop()
//   }

//   // const handleAnswerSubmit = () => {
//   //   const q = questions[currentIndex];
//   //   const updatedQaPairs = [...qaPairs, { question: q, answer: userAnswer }];

//   //   stopListening();

//   //   if (currentIndex + 1 < questions.length) {
//   //     setQaPairs(updatedQaPairs);
//   //     setUserAnswer('');
//   //     setCurrentIndex((prev) => prev + 1);

//   //     setTimeout(() => {
//   //       speak(questions[currentIndex + 1]);
//   //     }, 300);
//   //   } else {
//   //     navigate('/result', {
//   //       state: {
//   //         subject,
//   //         questionsAndAnswers: updatedQaPairs,
//   //       },
//   //     });
//   //   }
//   // };

// const handleAnswerSubmit = () => {
//   const q = questions[currentIndex];
//   const updatedQaPairs = [...qaPairs, { question: q, answer: userAnswer }];

//   stopListening();

//   if (currentIndex + 1 < questions.length) {
//     setQaPairs(updatedQaPairs);
//     setUserAnswer('');
//     setCurrentIndex((prev) => prev + 1);

//     setTimeout(() => {
//       speak(questions[currentIndex + 1]);
//     }, 300);
//   } else {
//     // Navigate to result with full state
//     navigate('/result', {
//       state: {
//         subject,
//         difficulty,
//         questionsAndAnswers: updatedQaPairs,
//       },
//     });
//   }
// };


//   return (
//     <div className="w-screen h-screen bg-gradient-to-br from-blue-900 to-blue-700 text-white overflow-hidden">
//       {/* Header */}
//       <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-4 bg-blue-900/30 backdrop-blur-sm border-b border-blue-700/50">
//         <div className="flex items-center">
//           <svg className="w-6 h-6 mr-2 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
//           </svg>
//           <span className="text-lg font-semibold text-blue-100">AI Oral Assessment </span>
//         </div>
//         <div className="bg-blue-700/50 px-4 py-2 rounded-full text-sm font-medium text-blue-100">
//           {subject || 'Technical Interview'}
//         </div>
//         <div className="text-sm text-blue-300">
//           Question {currentIndex + 1} of {questions.length}
//         </div>
//       </div>

//       <div className="w-full h-full flex flex-col md:flex-row pt-16">
//         {/* Left: Candidate Panel */}
//         <motion.div 
//           className="w-full md:w-1/2 h-1/2 md:h-full p-4 flex flex-col gap-4 overflow-hidden"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           {/* Video Feed */}
//           <div className="flex-1 flex flex-col items-center justify-center gap-4 overflow-hidden">
//             <div className="relative w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl border-2 border-blue-600/30 bg-blue-900/20">
//               {videoOn ? (
//                 <video
//                   ref={videoRef}
//                   autoPlay
//                   muted
//                   className="w-full aspect-video object-cover"
//                 />
//               ) : (
//                 <div className="w-full aspect-video bg-blue-900/50 flex items-center justify-center">
//                   <div className="text-center">
//                     <svg className="w-12 h-12 mx-auto text-blue-500/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
//                     </svg>
//                     <p className="mt-2 text-blue-300">Camera is disabled</p>
//                   </div>
//                 </div>
//               )}
              
//               {/* Status Indicators */}
//               <div className="absolute top-4 right-4 flex gap-2">
//                 <div className={`w-3 h-3 rounded-full ${micOn ? 'bg-green-500' : 'bg-red-500'}`}></div>
//                 <div className={`w-3 h-3 rounded-full ${videoOn ? 'bg-green-500' : 'bg-red-500'}`}></div>
//               </div>
              
//               {/* Mic Indicator */}
//               {isListening && (
//                 <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-blue-800/80 px-3 py-1 rounded-full">
//                   <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
//                   <span className="text-xs text-blue-100">Listening</span>
//                 </div>
//               )}
//             </div>

//             {/* Controls */}
//             {/* <div className="flex gap-3">
//               <motion.button
//                 onClick={toggleMic}
//                 whileTap={{ scale: 0.95 }}
//                 className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm ${
//                   micOn ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-900/80 hover:bg-blue-900'
//                 }`}
//               >
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={micOn ? "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" : "M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"} />
//                 </svg>
//                 {micOn ? 'Mute' : 'Unmute'}
//               </motion.button>
              
//               <motion.button
//                 onClick={toggleVideo}
//                 whileTap={{ scale: 0.95 }}
//                 className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm ${
//                   videoOn ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-900/80 hover:bg-blue-900'
//                 }`}
//               >
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={videoOn ? "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" : "M15.536 8.464a5 5 0 010 7.072M12 12h.01M15.536 4.464a9 9 0 010 12.728M12 12h.01M8.464 15.536a5 5 0 010-7.072M12 12h.01M8.464 8.464a9 9 0 010-12.728M12 12h.01"} />
//                 </svg>
//                 {videoOn ? 'Stop Video' : 'Start Video'}
//               </motion.button>
//             </div> */}
//           </div>

//           {/* Answer Section */}
//           <div className="flex-none w-full max-w-xl mx-auto p-5 bg-blue-800/60 rounded-xl backdrop-blur-md border border-blue-700/50 shadow-lg">
//             <h3 className="text-sm font-medium text-blue-300 mb-3">Your Response</h3>
//             <textarea
//               rows={4}
//               placeholder={isListening ? "Speak now (your words will appear here)..." : "Type or speak your answer..."}
//               className="w-full bg-blue-900/50 border border-blue-700/50 rounded-lg p-4 mb-4 text-blue-100 placeholder-blue-300/70 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50"
//               value={userAnswer}
//               onChange={(e) => setUserAnswer(e.target.value)}
//             />

//             <div className="flex flex-wrap justify-between gap-3">
//               <div className="flex gap-2">
//                 <button
//                   onClick={startListening}
//                   disabled={isListening}
//                   className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg ${
//                     isListening ? 'bg-blue-900/50' : 'bg-blue-600 hover:bg-blue-700'
//                   }`}
//                 >
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
//                   </svg>
//                   Speak
//                 </button>
//                 <button
//                   onClick={stopListening}
//                   disabled={!isListening}
//                   className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg ${
//                     !isListening ? 'bg-blue-900/50' : 'bg-yellow-600 hover:bg-yellow-700'
//                   }`}
//                 >
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
//                   </svg>
//                   Stop
//                 </button>
//               </div>
              
//               <button
//                 onClick={handleAnswerSubmit}
//                 disabled={!userAnswer.trim()}
//                 className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium text-sm ${
//                   !userAnswer.trim() ? 'bg-blue-900/50 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
//                 }`}
//               >
//                 {currentIndex + 1 < questions.length ? (
//                   <>
//                     <span>Next Question</span>
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
//                     </svg>
//                   </>
//                 ) : (
//                   <>
//                     <span>Finish Interview</span>
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </motion.div>

//         {/* Right: Interviewer Avatar + Question */}
//         <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden bg-blue-800/20 border-t md:border-t-0 md:border-l border-blue-700/30">
//           <Canvas camera={{ position: [0, 1.5, 3], fov: 50 }}>
//             <ambientLight intensity={0.5} />
//             <directionalLight position={[2, 5, 2]} intensity={1} />
//             <Avatar isSpeaking={isSpeaking} animationName={currentAnimation} position={[0, -7, 0]} scale={4.5} />
//             <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2.2} minPolarAngle={Math.PI / 2.5} />
//           </Canvas>

//           {/* Question Card */}
//           <motion.div 
//             className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900/90 to-transparent pt-16 pb-8 px-6"
//             initial={{ y: 50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.3, duration: 0.5 }}
//           >
//             <motion.div 
//               className="max-w-2xl mx-auto bg-blue-800/70 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-blue-700/50"
//               whileHover={{ scale: 1.01 }}
//             >
//               <div className="flex items-start">
//                 <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0 shadow-md">
//                   <span className="font-bold text-white">{currentIndex + 1}</span>
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-medium text-blue-100 mb-2">
//                     {questions[currentIndex]}
//                   </h2>
//                   <div className="flex gap-2 mt-3">
//                     <div className={`text-xs px-2 py-1 rounded-full ${isSpeaking ? 'bg-blue-600/50 text-blue-200' : 'bg-blue-900/30 text-blue-400'}`}>
//                       {isSpeaking ? 'AI is speaking...' : 'AI is listening'}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   )
// }



import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Avatar } from '../../components/Avatar'
import { motion } from 'framer-motion'

export default function InterviewPlatform() {
  const location = useLocation()
  const navigate = useNavigate()
  const { questions = [], subject = '', difficulty = '' } = location.state || {}

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [currentAnimation, setCurrentAnimation] = useState('Idle')
  const [userAnswer, setUserAnswer] = useState('')
  const [qaPairs, setQaPairs] = useState([])
  const [stream, setStream] = useState(null)
  const [micOn, setMicOn] = useState(true)
  const [videoOn, setVideoOn] = useState(true)
  const [isListening, setIsListening] = useState(false)
  // const [behaviorMetrics, setBehaviorMetrics] = useState({
  //   blinkCount: 0,
  //   emotion: 'neutral',
  //   nervousnessScore: 0,
  //   eyeContactScore: 100,
  //   feedback: '',
  //   gazeDirection: 'Center'
  // })
  
  const [behaviorMetrics, setBehaviorMetrics] = useState({
    blinkCount: 0,
    emotion: 'neutral',
    nervousnessScore: 0,
    eyeContactScore: 100,
    feedback: '',
    gazeDirection: 'Center',
    // --- New metrics added below ---
    lipBiting: false,
    handOnFace: false,
    shrugging: false,
    fidgeting: false, // Added for future use as it's in the backend
  })
  const [analysisActive, setAnalysisActive] = useState(false)

  const videoRef = useRef(null)
  const synthRef = useRef(window.speechSynthesis)
  const utteranceRef = useRef(null)
  const recognitionRef = useRef(null)
  const analysisInterval = useRef(null)
  const behaviorHistory = useRef([])

  useEffect(() => {
    // Initialize media stream
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        setStream(mediaStream)
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream
        }
      })
      .catch(err => {
        console.error('Error accessing media devices:', err)
      })

    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition()
      recognition.lang = 'en-US'
      recognition.continuous = true
      recognition.interimResults = true

      recognition.onstart = () => setIsListening(true)
      recognition.onresult = (event) => {
        let final = ''
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            final += transcript + ' '
          }
        }
        setUserAnswer(prev => prev + final)
      }
      recognition.onerror = (e) => {
        console.error('Speech Recognition error:', e)
        setIsListening(false)
      }
      recognition.onend = () => setIsListening(false)

      recognitionRef.current = recognition
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
      if (analysisInterval.current) {
        clearInterval(analysisInterval.current)
      }
    }
  }, [])

  useEffect(() => {
    if (questions.length > 0) {
      speak(questions[0])
    }
  }, [questions])

  // useEffect(() => {
  //   // Start/stop analysis based on interview state
  //   if ((isListening || isSpeaking) && videoOn) {
  //     startBehaviorAnalysis()
  //     setAnalysisActive(true)
  //   } else {
  //     stopBehaviorAnalysis()
  //     setAnalysisActive(false)
  //   }
  // }, [isListening, isSpeaking, videoOn])
useEffect(() => {
  // Start analysis if video is on and the stream is ready.
  // Stop if video is turned off.
  if (videoOn && stream) {
    startBehaviorAnalysis()
    setAnalysisActive(true)
  } else {
    stopBehaviorAnalysis()
    setAnalysisActive(false)
  }
}, [videoOn, stream]) // Depends only on video status and stream readiness



  
  const captureFrame = () => {
    if (!videoRef.current || videoRef.current.readyState !== 4) return null
    
    const canvas = document.createElement('canvas')
    canvas.width = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight
    const ctx = canvas.getContext('2d')
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)
    return canvas.toDataURL('image/jpeg', 0.7)
  }

  const startBehaviorAnalysis = () => {
    if (analysisInterval.current) return
    
    analysisInterval.current = setInterval(async () => {
      const frame = captureFrame()
      if (!frame) return
      
      try {
        const response = await fetch('http://localhost:5000/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ frame })
        })
        
        const data = await response.json()
        
        // Update blink count cumulatively
        // setBehaviorMetrics(prev => ({
        //   blinkCount: prev.blinkCount + (data.blink_count || 0),
        //   emotion: data.emotion?.toLowerCase() || prev.emotion,
        //   nervousnessScore: Math.max(prev.nervousnessScore, data.nervousness_score || 0),
        //   eyeContactScore: data.eye_contact_score || prev.eyeContactScore,
        //   feedback: data.feedback || prev.feedback,
        //   gazeDirection: data.gaze_direction || prev.gazeDirection
        // }))

        // Update state with data from the backend
        setBehaviorMetrics(prev => ({
          blinkCount: prev.blinkCount + (data.blink_count || 0),
          emotion: data.emotion?.toLowerCase() || prev.emotion,
          nervousnessScore: Math.max(prev.nervousnessScore, data.nervousness_score || 0),
          // Correctly handle a score of 0
          eyeContactScore: data.eye_contact_score !== undefined ? data.eye_contact_score : prev.eyeContactScore,
          feedback: data.feedback || prev.feedback,
          gazeDirection: data.gaze_direction || prev.gazeDirection,
          // --- Map new backend traits to state ---
          lipBiting: data.lip_biting || false,
          handOnFace: data.hand_on_face || false,
          shrugging: data.shrugging || false,
          fidgeting: data.fidgeting || false,
        }))

        // Store in history
        behaviorHistory.current.push({
          timestamp: new Date().toISOString(),
          metrics: data
        })
      } catch (error) {
        console.error('Analysis error:', error)
      }
    }, 3000) // Analyze every 3 seconds
  }

  const stopBehaviorAnalysis = () => {
    if (analysisInterval.current) {
      clearInterval(analysisInterval.current)
      analysisInterval.current = null
    }
  }

  const toggleMic = () => {
    if (stream) {
      stream.getAudioTracks().forEach((track) => (track.enabled = !micOn))
      setMicOn(!micOn)
    }
  }

  const toggleVideo = async () => {
    if (videoOn) {
      stream.getVideoTracks().forEach((track) => track.stop())
      setVideoOn(false)
      if (videoRef.current) {
        videoRef.current.srcObject = null
      }
      stopBehaviorAnalysis()
    } else {
      try {
        const newStream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: micOn 
        })
        setStream(newStream)
        setVideoOn(true)
        if (videoRef.current) {
          videoRef.current.srcObject = newStream
        }
      } catch (err) {
        console.error('Failed to reacquire camera:', err)
      }
    }
  }

  const speak = (textToSpeak) => {
    if (utteranceRef.current) {
      synthRef.current.cancel()
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak)
    utteranceRef.current = utterance

    utterance.onstart = () => {
      setIsSpeaking(true)
      setCurrentAnimation('Talking')
    }
    utterance.onend = () => {
      setIsSpeaking(false)
      setCurrentAnimation('Idle')
    }

    synthRef.current.speak(utterance)
  }

  const startListening = () => {
    setUserAnswer('')
    if (recognitionRef.current) recognitionRef.current.start()
  }

  const stopListening = () => {
    if (recognitionRef.current) recognitionRef.current.stop()
  }

  const handleAnswerSubmit = () => {
    const q = questions[currentIndex]
    const updatedQaPairs = [...qaPairs, { 
      question: q, 
      answer: userAnswer,
      behaviorMetrics: {
        ...behaviorMetrics,
        behaviorHistory: [...behaviorHistory.current],
        timestamp: new Date().toISOString()
      }
    }]

    // Reset for next question
    // behaviorHistory.current = []
    // setBehaviorMetrics({
    //   blinkCount: 0,
    //   emotion: 'neutral',
    //   nervousnessScore: 0,
    //   eyeContactScore: 100,
    //   feedback: '',
    //   gazeDirection: 'Center'
    // })

// Reset for next question
    behaviorHistory.current = []
    setBehaviorMetrics({
      blinkCount: 0,
      emotion: 'neutral',
      nervousnessScore: 0,
      eyeContactScore: 100,
      feedback: '',
      gazeDirection: 'Center',
      // --- Reset new metrics ---
      lipBiting: false,
      handOnFace: false,
      shrugging: false,
      fidgeting: false,
    })
    stopListening()

    if (currentIndex + 1 < questions.length) {
      setQaPairs(updatedQaPairs)
      setUserAnswer('')
      setCurrentIndex((prev) => prev + 1)

      setTimeout(() => {
        speak(questions[currentIndex + 1])
      }, 300)
    } else {
      stopBehaviorAnalysis(); // <-- ADD THIS LINE
      navigate('/result', {
        state: {
          subject,
          difficulty,
          questionsAndAnswers: updatedQaPairs,
        },
      })
    }
  }

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-blue-900 to-blue-700 text-white overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-4 bg-blue-900/30 backdrop-blur-sm border-b border-blue-700/50">
        <div className="flex items-center">
          <svg className="w-6 h-6 mr-2 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
          <span className="text-lg font-semibold text-blue-100">AI Oral Assessment</span>
        </div>
        <div className="bg-blue-700/50 px-4 py-2 rounded-full text-sm font-medium text-blue-100">
          {subject || 'Technical Interview'}
        </div>
        <div className="text-sm text-blue-300">
          Question {currentIndex + 1} of {questions.length}
        </div>
      </div>

      {/* Behavior Metrics Panel */}
      {/* {analysisActive && (
        <motion.div 
          className="absolute top-20 right-4 z-20 bg-blue-800/80 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-blue-700/50"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-sm font-semibold text-blue-200 mb-2">Behavior Analysis</h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-blue-300">Emotion:</span>
              <span className="font-medium capitalize">{behaviorMetrics.emotion}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-300">Blinks:</span>
              <span>{behaviorMetrics.blinkCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-300">Eye Contact:</span>
              <span>{behaviorMetrics.eyeContactScore}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-300">Confidence:</span>
              <span>{100 - behaviorMetrics.nervousnessScore}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-300">Gaze:</span>
              <span>{behaviorMetrics.gazeDirection}</span>
            </div>
            {behaviorMetrics.feedback && (
              <div className="mt-2 pt-2 border-t border-blue-700/50 text-blue-100 text-xs">
                {behaviorMetrics.feedback}
              </div>
            )}
          </div>
        </motion.div>
      )} */}

      {/* Behavior Metrics Panel */}
      {analysisActive && (
        <motion.div 
          className="absolute top-20 right-4 z-20 bg-blue-800/80 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-blue-700/50 w-64" // Added w-64 for consistent width
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-sm font-semibold text-blue-200 mb-2">Behavior Analysis</h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-blue-300">Emotion:</span>
              <span className="font-medium capitalize">{behaviorMetrics.emotion}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-300">Blinks:</span>
              <span>{behaviorMetrics.blinkCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-300">Eye Contact:</span>
              <span>{behaviorMetrics.eyeContactScore}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-300">Confidence:</span>
              <span>{100 - behaviorMetrics.nervousnessScore}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-300">Gaze:</span>
              <span>{behaviorMetrics.gazeDirection}</span>
            </div>
            
            {/* --- New Display Elements --- */}
            <div className="flex justify-between">
              <span className="text-blue-300">Lip Biting:</span>
              <span className={behaviorMetrics.lipBiting ? 'text-yellow-400 font-semibold' : ''}>
                {behaviorMetrics.lipBiting ? 'Detected' : 'No'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-300">Hand on Face:</span>
              <span className={behaviorMetrics.handOnFace ? 'text-yellow-400 font-semibold' : ''}>
                {behaviorMetrics.handOnFace ? 'Detected' : 'No'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-300">Shrugging:</span>
              <span className={behaviorMetrics.shrugging ? 'text-yellow-400 font-semibold' : ''}>
                {behaviorMetrics.shrugging ? 'Detected' : 'No'}
              </span>
            </div>

            {behaviorMetrics.feedback && (
              <div className="mt-2 pt-2 border-t border-blue-700/50 text-blue-100 text-xs">
                {behaviorMetrics.feedback}
              </div>
            )}
          </div>
        </motion.div>
      )}

      <div className="w-full h-full flex flex-col md:flex-row pt-16">
        {/* Left: Candidate Panel */}
        <motion.div 
          className="w-full md:w-1/2 h-1/2 md:h-full p-4 flex flex-col gap-4 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Video Feed */}
          <div className="flex-1 flex flex-col items-center justify-center gap-4 overflow-hidden">
            <div className="relative w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl border-2 border-blue-600/30 bg-blue-900/20">
              {videoOn ? (
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  className="w-full aspect-video object-cover"
                />
              ) : (
                <div className="w-full aspect-video bg-blue-900/50 flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-12 h-12 mx-auto text-blue-500/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <p className="mt-2 text-blue-300">Camera is disabled</p>
                  </div>
                </div>
              )}
              
              {/* Status Indicators */}
              <div className="absolute top-4 right-4 flex gap-2">
                <div 
                  className={`w-3 h-3 rounded-full ${micOn ? 'bg-green-500' : 'bg-red-500'}`}
                  title={micOn ? 'Microphone on' : 'Microphone off'}
                ></div>
                <div 
                  className={`w-3 h-3 rounded-full ${videoOn ? 'bg-green-500' : 'bg-red-500'}`}
                  title={videoOn ? 'Camera on' : 'Camera off'}
                ></div>
                <div 
                  className={`w-3 h-3 rounded-full ${analysisActive ? 'bg-purple-500' : 'bg-gray-500'}`}
                  title={analysisActive ? 'Analysis active' : 'Analysis inactive'}
                ></div>
              </div>
              
              {/* Mic Indicator */}
              {isListening && (
                <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-blue-800/80 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-blue-100">Listening</span>
                </div>
              )}
            </div>

            {/* Controls */}
            {/* <div className="flex gap-3">
              <motion.button
                onClick={toggleMic}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm ${
                  micOn ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-900/80 hover:bg-blue-900'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={micOn ? "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" : "M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"} />
                </svg>
                {micOn ? 'Mute' : 'Unmute'}
              </motion.button>
              
              <motion.button
                onClick={toggleVideo}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm ${
                  videoOn ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-900/80 hover:bg-blue-900'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={videoOn ? "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" : "M15.536 8.464a5 5 0 010 7.072M12 12h.01M15.536 4.464a9 9 0 010 12.728M12 12h.01M8.464 15.536a5 5 0 010-7.072M12 12h.01M8.464 8.464a9 9 0 010-12.728M12 12h.01"} />
                </svg>
                {videoOn ? 'Stop Video' : 'Start Video'}
              </motion.button>
            </div> */}
          </div>

          {/* Answer Section */}
          <div className="flex-none w-full max-w-xl mx-auto p-5 bg-blue-800/60 rounded-xl backdrop-blur-md border border-blue-700/50 shadow-lg">
            <h3 className="text-sm font-medium text-blue-300 mb-3">Your Response</h3>
            <textarea
              rows={4}
              placeholder={isListening ? "Speak now (your words will appear here)..." : "Type or speak your answer..."}
              className="w-full bg-blue-900/50 border border-blue-700/50 rounded-lg p-4 mb-4 text-blue-100 placeholder-blue-300/70 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
            />

            <div className="flex flex-wrap justify-between gap-3">
              <div className="flex gap-2">
                <button
                  onClick={startListening}
                  disabled={isListening}
                  className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg ${
                    isListening ? 'bg-blue-900/50' : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  Speak
                </button>
                <button
                  onClick={stopListening}
                  disabled={!isListening}
                  className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg ${
                    !isListening ? 'bg-blue-900/50' : 'bg-yellow-600 hover:bg-yellow-700'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                  </svg>
                  Stop
                </button>
              </div>
              
              <button
                onClick={handleAnswerSubmit}
                disabled={!userAnswer.trim()}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium text-sm ${
                  !userAnswer.trim() ? 'bg-blue-900/50 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {currentIndex + 1 < questions.length ? (
                  <>
                    <span>Next Question</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                  </>
                ) : (
                  <>
                    <span>Finish Interview</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right: Interviewer Avatar + Question */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden bg-blue-800/20 border-t md:border-t-0 md:border-l border-blue-700/30">
          <Canvas camera={{ position: [0, 1.5, 3], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 5, 2]} intensity={1} />
            <Avatar isSpeaking={isSpeaking} animationName={currentAnimation} position={[0, -7, 0]} scale={4.5} />
            <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2.2} minPolarAngle={Math.PI / 2.5} />
          </Canvas>

          {/* Question Card */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900/90 to-transparent pt-16 pb-8 px-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.div 
              className="max-w-2xl mx-auto bg-blue-800/70 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-blue-700/50"
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-start">
                <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0 shadow-md">
                  <span className="font-bold text-white">{currentIndex + 1}</span>
                </div>
                <div>
                  <h2 className="text-xl font-medium text-blue-100 mb-2">
                    {questions[currentIndex]}
                  </h2>
                  <div className="flex gap-2 mt-3">
                    <div className={`text-xs px-2 py-1 rounded-full ${isSpeaking ? 'bg-blue-600/50 text-blue-200' : 'bg-blue-900/30 text-blue-400'}`}>
                      {isSpeaking ? 'AI is speaking...' : 'AI is listening'}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}