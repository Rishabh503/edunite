// import { useEffect, useState } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'
// import { GoogleGenerativeAI } from '@google/generative-ai'

// const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)
// const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

// const Result = () => {
//   const { state } = useLocation()
//   const navigate = useNavigate()
//   const [report, setReport] = useState('')
//   const [loading, setLoading] = useState(true)
//   const [interviewType, setInterviewType] = useState('')
//   const { subject, difficulty } = state || {}

//   const questionsAndAnswers = state?.qaPairs || state?.questionsAndAnswers || []

//   useEffect(() => {
//     if (state?.interviewType) setInterviewType(state.interviewType)

//     if (questionsAndAnswers.length === 0) {
//       navigate('/')
//       return
//     }

//     const generateReport = async () => {
//       setLoading(true)

//       const prompt = `
// You are an experienced AI Interview Evaluator.

// Below is a ${interviewType || subject} interview transcript with questions and the candidate's answers. Analyze the performance in detail.

// ## Analyze Each Answer:
// Briefly evaluate the quality of the candidate’s response for each question.

// ${questionsAndAnswers
//   .map(
//     (pair, index) =>
//       `Q${index + 1}: ${pair.question}\nA${index + 1}: ${pair.answer}\nEvaluate A${index + 1} in 2-3 sentences.`
//   )
//   .join('\n\n')}

// ## Summary:
// Give a short overview of how the candidate performed.

// ## Strengths:
// List 2–3 strengths observed in the responses.

// ## Areas for Improvement:
// List 2–3 areas where the candidate can improve.

// ## Suggestions:
// Provide actionable advice or resources the candidate can use to improve.

// ## Final Score:
// Give an overall score out of 10 with a short justification.
// `

//       try {
//         const result = await model.generateContent(prompt)
//         const response = await result.response
//         const text = response.text()
//         setReport(text)
//       } catch (err) {
//         console.error('Failed to generate report:', err)
//         setReport('❌ Error generating report. Please try again.')
//       }

//       setLoading(false)
//     }

//     generateReport()
//   }, [questionsAndAnswers, navigate, interviewType, state])

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-white px-4 py-10">
//       <div className="max-w-5xl mx-auto">
//         <div className="text-center mb-10">
//           <h1 className="text-4xl font-bold text-purple-800 mb-2">Oral Test Evaluation Report</h1>
//           {(interviewType || subject) && (
//             <p className="text-lg text-blue-700">
//               Subject: <span className="font-semibold">{interviewType || subject}</span>
//               {difficulty && (
//                 <span className="ml-2">| Difficulty: <span className="font-medium">{difficulty}</span></span>
//               )}
//             </p>
//           )}
//         </div>

//         {loading ? (
//           <div className="text-center py-20">
//             <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-purple-500 mx-auto mb-4"></div>
//             <p className="text-purple-700 text-lg">Generating your detailed report...</p>
//           </div>
//         ) : (
//           <div className="bg-white border border-purple-200 rounded-xl p-8 shadow-xl transition-all duration-300">
//             <div className="prose prose-lg prose-purple max-w-none whitespace-pre-wrap text-gray-800">
//               {report.split('\n').map((line, index) => {
//                 if (line.startsWith('##')) {
//                   return (
//                     <h2 key={index} className="text-purple-700 text-xl font-semibold mt-6 mb-3">
//                       {line.replace('##', '').trim()}
//                     </h2>
//                   )
//                 } else if (line.startsWith('Q')) {
//                   return (
//                     <p key={index} className="font-medium text-gray-900 mb-2">
//                       {line}
//                     </p>
//                   )
//                 } else {
//                   return (
//                     <p key={index} className="text-gray-700 mb-3">
//                       {line}
//                     </p>
//                   )
//                 }
//               })}
//             </div>

// <div className="mt-10 pt-6 border-t border-purple-200 text-center">
//   <div className="flex justify-center gap-4 flex-wrap">
//     <button
//       onClick={() => navigate('/oral-assess-choose-subject')}
//       className="px-6 py-2.5 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
//     >
//       🎯 Start New Interview
//     </button>
//     <button
//       onClick={() => navigate('/')}
//       className="px-6 py-2.5 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
//     >
//       Return to Home
//     </button>
//   </div>
// </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default Result


// import { useEffect, useState } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'
// import { GoogleGenerativeAI } from '@google/generative-ai'

// const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)
// const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

// const Result = () => {
//   const { state } = useLocation()
//   const navigate = useNavigate()
//   const [report, setReport] = useState('')
//   const [loading, setLoading] = useState(true)
//   const [interviewType, setInterviewType] = useState('')
//   const { subject, difficulty } = state || {}

//   const questionsAndAnswers = state?.qaPairs || state?.questionsAndAnswers || []

//   useEffect(() => {
//     if (state?.interviewType) setInterviewType(state.interviewType)

//     if (questionsAndAnswers.length === 0) {
//       navigate('/')
//       return
//     }

//     const generateReport = async () => {
//       setLoading(true)
//       const prompt = `
// You are an experienced AI teacher oral test Evaluator.

// Below is a ${interviewType || subject} oral test with difficult level as ${difficulty} transcript with questions and the candidate's answers. Analyze the performance in detail.

// ## Analyze Each Answer:
// Briefly evaluate the quality of the candidate’s response for each question.

// ${questionsAndAnswers
//   .map(
//     (pair, index) =>
//       `Q${index + 1}: ${pair.question}\nA${index + 1}: ${pair.answer}\nEvaluate A${index + 1} in 2-3 sentences.`
//   )
//   .join('\n\n')}

// ## Summary:
// Give a short overview of how the candidate performed.

// ## Strengths:
// List 2–3 strengths observed in the responses.

// ## Areas for Improvement:
// List 2–3 areas where the candidate can improve.

// ## Suggestions:
// Provide actionable advice or resources the candidate can use to improve.

// ## Final Score:
// Give an overall score out of 10 with a short justification.
// `
//       try {
//         const result = await model.generateContent(prompt)
//         const response = await result.response
//         const text = response.text()
//         setReport(text)
//       } catch (err) {
//         console.error('Failed to generate report:', err)
//         setReport('❌ Error generating report. Please try again.')
//       }
//       setLoading(false)
//     }

//     generateReport()
//   }, [questionsAndAnswers, navigate, interviewType, state])

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 py-10">
//       <div className="max-w-5xl mx-auto">
//         <div className="text-center mb-10">
//           <h1 className="text-4xl font-bold text-blue-800 mb-3 animate-fade-in">
//            Oral Test Evaluation Report
//           </h1>
//           {(interviewType || subject) && (
//             <p className="text-lg text-blue-600 font-medium animate-slide-in">
//               Subject: <span className="font-semibold">{interviewType || subject}</span>
//               {difficulty && (
//                 <span className="ml-2">| Difficulty: <span className="font-medium">{difficulty}</span></span>
//               )}
//             </p>
//           )}
//         </div>

//         {loading ? (
//           <div className="text-center py-20">
//             <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 mx-auto mb-4"></div>
//             <p className="text-blue-700 text-lg">Generating your detailed report...</p>
//           </div>
//         ) : (
//           <div className="bg-white/80 border border-blue-200 backdrop-blur-md rounded-xl p-8 shadow-xl transition-all duration-300">
//             <div className="prose prose-lg max-w-none whitespace-pre-wrap text-gray-800">
//               {report.split('\n').map((line, index) => {
//                 if (line.startsWith('##')) {
//                   return (
//                     <h2 key={index} className="text-blue-700 text-xl font-semibold mt-6 mb-3 animate-fade-in">
//                       {line.replace('##', '').trim()}
//                     </h2>
//                   )
//                 } else if (line.startsWith('Q')) {
//                   return (
//                     <p key={index} className="font-medium text-gray-900 mb-2 animate-slide-in">
//                       {line}
//                     </p>
//                   )
//                 } else {
//                   return (
//                     <p key={index} className="text-gray-700 mb-3 animate-fade-in">
//                       {line}
//                     </p>
//                   )
//                 }
//               })}
//             </div>

//             <div className="mt-10 pt-6 border-t border-blue-200 text-center">
//               <div className="flex justify-center gap-4 flex-wrap">
//                 <button
//                   onClick={() => navigate('/oral-assess-choose-subject')}
//                   className="px-6 py-2.5 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
//                 >
//                 Start New Interview
//                 </button>
//                 <button
//                   onClick={() => navigate('/')}
//                   className="px-6 py-2.5 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
//                 >
//                 Return to Home
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default Result


import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { Radar } from 'react-chartjs-2'
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

const Result = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [report, setReport] = useState('')
  const [loading, setLoading] = useState(true)
  const [behaviorStats, setBehaviorStats] = useState(null)
  const { subject, difficulty, questionsAndAnswers = [] } = state || {}

  useEffect(() => {
    if (questionsAndAnswers.length === 0) {
      navigate('/')
      return
    }

    // Calculate behavioral statistics
    // const calculateBehaviorStats = () => {
    //   const stats = {
    //     totalQuestions: questionsAndAnswers.length,
    //     avgNervousness: 0,
    //     avgEyeContact: 0,
    //     emotionDistribution: {},
    //     blinkCount: 0,
    //     gazeDirections: { Center: 0, Left: 0, Right: 0 }
    //   }

    //   questionsAndAnswers.forEach(qa => {
    //     if (qa.behaviorMetrics) {
    //       stats.avgNervousness += qa.behaviorMetrics.nervousnessScore || 0
    //       stats.avgEyeContact += qa.behaviorMetrics.eyeContactScore || 0
    //       stats.blinkCount += qa.behaviorMetrics.blinkCount || 0

    //       // Emotion distribution
    //       const emotion = qa.behaviorMetrics.emotion || 'neutral'
    //       stats.emotionDistribution[emotion] = (stats.emotionDistribution[emotion] || 0) + 1

    //       // Gaze direction
    //       const gaze = qa.behaviorMetrics.gazeDirection || 'Center'
    //       stats.gazeDirections[gaze] = (stats.gazeDirections[gaze] || 0) + 1
    //     }
    //   })

    //   stats.avgNervousness = Math.round(stats.avgNervousness / questionsAndAnswers.length)
    //   stats.avgEyeContact = Math.round(stats.avgEyeContact / questionsAndAnswers.length)

    //   return stats
    // }

    // In the calculateBehaviorStats function
    const calculateBehaviorStats = () => {
      const stats = {
        totalQuestions: questionsAndAnswers.length,
        avgNervousness: 0,
        avgEyeContact: 0,
        emotionDistribution: {},
        blinkCount: 0,
        gazeDirections: { Center: 0, Left: 0, Right: 0 },
        // --- Add counters for new metrics ---
        lipBitingCount: 0,
        handOnFaceCount: 0,
        shruggingCount: 0,
      }

      questionsAndAnswers.forEach(qa => {
        if (qa.behaviorMetrics) {
          stats.avgNervousness += qa.behaviorMetrics.nervousnessScore || 0
          stats.avgEyeContact += qa.behaviorMetrics.eyeContactScore || 0
          stats.blinkCount += qa.behaviorMetrics.blinkCount || 0

          // Emotion distribution
          const emotion = qa.behaviorMetrics.emotion || 'neutral'
          stats.emotionDistribution[emotion] = (stats.emotionDistribution[emotion] || 0) + 1

          // Gaze direction
          const gaze = qa.behaviorMetrics.gazeDirection || 'Center'
          stats.gazeDirections[gaze] = (stats.gazeDirections[gaze] || 0) + 1

          // --- Increment new metric counters if true ---
          if (qa.behaviorMetrics.lipBiting) stats.lipBitingCount++
          if (qa.behaviorMetrics.handOnFace) stats.handOnFaceCount++
          if (qa.behaviorMetrics.shrugging) stats.shruggingCount++
        }
      })

      stats.avgNervousness = Math.round(stats.avgNervousness / questionsAndAnswers.length)
      stats.avgEyeContact = Math.round(stats.avgEyeContact / questionsAndAnswers.length)

      return stats
    }

    const generateReport = async () => {
      setLoading(true)
      const behaviorStats = calculateBehaviorStats()
      setBehaviorStats(behaviorStats)

      //       const prompt = `
      // You are an experienced AI teacher oral test Evaluator. Below is a ${subject} oral test with difficulty level ${difficulty}.

      // ## Behavioral Analysis Summary:
      // - Average Nervousness: ${behaviorStats.avgNervousness}%
      // - Average Eye Contact: ${behaviorStats.avgEyeContact}%
      // - Total Blinks: ${behaviorStats.blinkCount}
      // - Dominant Emotion: ${Object.entries(behaviorStats.emotionDistribution).sort((a,b) => b[1]-a[1])[0][0]}

      // ## Transcript Analysis:
      // Evaluate each question and response, incorporating behavioral insights where available:

      // ${questionsAndAnswers.map((pair, index) => {
      //   let behaviorInsight = ''
      //   if (pair.behaviorMetrics) {
      //     behaviorInsight = `
      // Behavioral Notes:
      // - Emotion: ${pair.behaviorMetrics.emotion || 'N/A'}
      // - Nervousness: ${pair.behaviorMetrics.nervousnessScore || 0}%
      // - Eye Contact: ${pair.behaviorMetrics.eyeContactScore || 0}%
      // - Blinks: ${pair.behaviorMetrics.blinkCount || 0}
      // - Gaze: ${pair.behaviorMetrics.gazeDirection || 'N/A'}
      // `
      //   }
      //   return `Q${index + 1}: ${pair.question}
      // A${index + 1}: ${pair.answer}
      // ${behaviorInsight}
      // Evaluate A${index + 1} in 2-3 sentences, considering both content and behavioral cues.`
      // }).join('\n\n')}

      // ## Comprehensive Evaluation:
      // 1. Content Mastery: Assess understanding of ${subject} concepts
      // 2. Communication Skills: Evaluate clarity and articulation
      // 3. Behavioral Performance: Analyze confidence and engagement
      // 4. Improvement Areas: Identify specific weaknesses
      // 5. Final Score: Provide overall score (1-10) with justification
      // `

      const prompt = `
You are an experienced AI teacher oral test Evaluator. Below is a ${subject} oral test with difficulty level ${difficulty}.

## Behavioral Analysis Summary:
- Average Nervousness: ${behaviorStats.avgNervousness}%
- Average Eye Contact: ${behaviorStats.avgEyeContact}%
- Total Blinks: ${behaviorStats.blinkCount}
- Dominant Emotion: ${Object.entries(behaviorStats.emotionDistribution).sort((a, b) => b[1] - a[1])[0][0]}
- Lip Biting Detected: ${behaviorStats.lipBitingCount} times
- Hand on Face Detected: ${behaviorStats.handOnFaceCount} times
- Shrugging Detected: ${behaviorStats.shruggingCount} times

## Transcript Analysis:
Evaluate each question and response, incorporating behavioral insights where available:

${questionsAndAnswers.map((pair, index) => {
        let behaviorInsight = ''
        if (pair.behaviorMetrics) {
          behaviorInsight = `
Behavioral Notes:
- Emotion: ${pair.behaviorMetrics.emotion || 'N/A'}
- Nervousness: ${pair.behaviorMetrics.nervousnessScore || 0}%
- Eye Contact: ${pair.behaviorMetrics.eyeContactScore || 0}%
- Lip Biting: ${pair.behaviorMetrics.lipBiting ? 'Yes' : 'No'}
- Hand on Face: ${pair.behaviorMetrics.handOnFace ? 'Yes' : 'No'}
- Shrugging: ${pair.behaviorMetrics.shrugging ? 'Yes' : 'No'}
`
        }
        return `Q${index + 1}: ${pair.question}
A${index + 1}: ${pair.answer}
${behaviorInsight}
Evaluate A${index + 1} in 2-3 sentences, considering both content and behavioral cues.`
      }).join('\n\n')}

## Comprehensive Evaluation:
1. Content Mastery: Assess understanding of ${subject} concepts.
2. Communication Skills: Evaluate clarity and articulation.
3. Behavioral Performance: Analyze confidence, engagement, and nervous mannerisms (like lip biting or excessive hand movement).
4. Improvement Areas: Identify specific weaknesses in both knowledge and presentation.
5. Final Score: Provide overall score (1-10) with justification.
`
      try {
        const result = await model.generateContent(prompt)
        const response = await result.response
        const text = response.text()
        setReport(text)
      } catch (err) {
        console.error('Failed to generate report:', err)
        setReport('❌ Error generating report. Please try again.')
      }
      setLoading(false)
    }

    generateReport()
  }, [questionsAndAnswers, navigate, subject, difficulty])

  // const prepareChartData = () => {
  //   if (!behaviorStats) return null

  //   return {
  //     labels: ['Confidence', 'Eye Contact', 'Composure', 'Engagement', 'Expressiveness'],
  //     datasets: [
  //       {
  //         label: 'Behavioral Metrics',
  //         data: [
  //           100 - behaviorStats.avgNervousness,
  //           behaviorStats.avgEyeContact,
  //           100 - (behaviorStats.blinkCount / behaviorStats.totalQuestions * 10),
  //           (behaviorStats.gazeDirections.Center / behaviorStats.totalQuestions * 100),
  //           (Object.entries(behaviorStats.emotionDistribution).sort((a,b) => b[1]-a[1])[0][1] / behaviorStats.totalQuestions * 100)
  //         ],
  //         backgroundColor: 'rgba(59, 130, 246, 0.2)',
  //         borderColor: 'rgba(59, 130, 246, 1)',
  //         borderWidth: 2,
  //         pointBackgroundColor: 'rgba(59, 130, 246, 1)',
  //       }
  //     ]
  //   }
  // }

  const prepareChartData = () => {
    if (!behaviorStats) return null

    // Calculate a more comprehensive 'Poise' score
    const mannerismPenalty = (
      behaviorStats.lipBitingCount +
      behaviorStats.handOnFaceCount +
      behaviorStats.shruggingCount
    ) * 15; // Penalize 15 points for each mannerism
    const poiseScore = Math.max(0, 100 - mannerismPenalty);

    return {
      // --- Update 'Composure' to 'Poise' ---
      labels: ['Confidence', 'Eye Contact', 'Poise', 'Engagement', 'Expressiveness'],
      datasets: [
        {
          label: 'Behavioral Metrics',
          data: [
            100 - behaviorStats.avgNervousness,
            behaviorStats.avgEyeContact,
            // --- Use the new poiseScore ---
            poiseScore,
            (behaviorStats.gazeDirections.Center / behaviorStats.totalQuestions * 100),
            (Object.entries(behaviorStats.emotionDistribution).sort((a, b) => b[1] - a[1])[0][1] / behaviorStats.totalQuestions * 100)
          ],
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        }
      ]
    }
  }
  const getEmotionColor = (emotion) => {
    const colors = {
      happy: 'bg-yellow-400',
      neutral: 'bg-gray-400',
      sad: 'bg-blue-400',
      angry: 'bg-red-400',
      surprised: 'bg-purple-400',
      fearful: 'bg-orange-400',
      disgusted: 'bg-green-400'
    }
    return colors[emotion] || 'bg-gray-200'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-800 mb-3 animate-fade-in">
            Oral Test Evaluation Report
          </h1>
          <p className="text-lg text-blue-600 font-medium animate-slide-in">
            Subject: <span className="font-semibold">{subject}</span>
            {difficulty && (
              <span className="ml-2">| Difficulty: <span className="font-medium">{difficulty}</span></span>
            )}
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 mx-auto mb-4"></div>
            <p className="text-blue-700 text-lg">Generating your detailed report...</p>
          </div>
        ) : (
          <>
            {/* Behavioral Insights Section */}
            {behaviorStats && (
              <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/80 border border-blue-200 rounded-xl p-6 shadow-md">
                  <h2 className="text-xl font-semibold text-blue-700 mb-4">Behavioral Analysis</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-700">Confidence Level</h3>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${100 - behaviorStats.avgNervousness}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {100 - behaviorStats.avgNervousness}% confident (based on nervousness indicators)
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-700">Eye Contact</h3>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                        <div
                          className="bg-green-500 h-2.5 rounded-full"
                          style={{ width: `${behaviorStats.avgEyeContact}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Maintained eye contact {behaviorStats.avgEyeContact}% of the time
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-blue-200/60">
                      <h3 className="font-medium text-gray-700 mb-2">Nervous Mannerisms</h3>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <p className="text-2xl font-bold text-blue-600">{behaviorStats.lipBitingCount}</p>
                          <p className="text-xs text-gray-500">Lip Bites</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-blue-600">{behaviorStats.handOnFaceCount}</p>
                          <p className="text-xs text-gray-500">Hand on Face</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-blue-600">{behaviorStats.shruggingCount}</p>
                          <p className="text-xs text-gray-500">Shrugs</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium text-gray-700">Total Blinks</h3>
                        <p className="text-2xl font-bold text-blue-600">{behaviorStats.blinkCount}</p>
                        <p className="text-sm text-gray-600">
                          (~{Math.round(behaviorStats.blinkCount / behaviorStats.totalQuestions)} per question)
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-700">Gaze Direction</h3>
                        <div className="flex space-x-2 mt-1">
                          {Object.entries(behaviorStats.gazeDirections).map(([dir, count]) => (
                            <div key={dir} className="text-center">
                              <div className="text-xs text-gray-600">{dir}</div>
                              <div className="font-medium">
                                {Math.round((count / behaviorStats.totalQuestions) * 100)}%
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 border border-blue-200 rounded-xl p-6 shadow-md">
                  <h2 className="text-xl font-semibold text-blue-700 mb-4">Emotional State</h2>
                  <div className="h-64">
                    {prepareChartData() && (
                      <Radar
                        data={prepareChartData()}
                        options={{
                          scales: {
                            r: {
                              angleLines: { display: true },
                              suggestedMin: 0,
                              suggestedMax: 100,
                              ticks: { stepSize: 20 }
                            }
                          },
                          plugins: {
                            legend: { display: false }
                          }
                        }}
                      />
                    )}
                  </div>
                  <div className="mt-4">
                    <h3 className="font-medium text-gray-700 mb-2">Emotion Distribution</h3>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(behaviorStats.emotionDistribution)
                        .sort((a, b) => b[1] - a[1])
                        .map(([emotion, count]) => (
                          <div
                            key={emotion}
                            className={`${getEmotionColor(emotion)} text-white px-3 py-1 rounded-full text-sm flex items-center`}
                          >
                            <span className="capitalize">{emotion}</span>
                            <span className="ml-1 font-medium">
                              {Math.round((count / behaviorStats.totalQuestions) * 100)}%
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* AI Evaluation Report */}
            <div className="bg-white/80 border border-blue-200 backdrop-blur-md rounded-xl p-8 shadow-xl transition-all duration-300 mb-10">
              <div className="prose prose-lg max-w-none whitespace-pre-wrap text-gray-800">
                {report.split('\n').map((line, index) => {
                  if (line.startsWith('##')) {
                    return (
                      <h2 key={index} className="text-blue-700 text-xl font-semibold mt-6 mb-3 animate-fade-in">
                        {line.replace('##', '').trim()}
                      </h2>
                    )
                  } else if (line.startsWith('Behavioral Notes:')) {
                    return (
                      <div key={index} className="bg-blue-50 border-l-4 border-blue-400 p-3 my-3 rounded-r animate-slide-in">
                        <p className="font-medium text-blue-700">Behavioral Notes</p>
                        {line.split('\n').slice(1).map((note, i) => (
                          <p key={i} className="text-blue-600 text-sm">{note.trim()}</p>
                        ))}
                      </div>
                    )
                  } else if (line.startsWith('Q')) {
                    return (
                      <p key={index} className="font-medium text-gray-900 mb-2 animate-slide-in">
                        {line}
                      </p>
                    )
                  } else {
                    return (
                      <p key={index} className="text-gray-700 mb-3 animate-fade-in">
                        {line}
                      </p>
                    )
                  }
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-6 border-t border-blue-200 text-center">
              <div className="flex justify-center gap-4 flex-wrap">
                <button
                  onClick={() => navigate('/oral-assess-choose-subject')}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                >
                  Start New Interview
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="px-6 py-2.5 bg-white text-blue-600 border border-blue-600 rounded-lg shadow hover:bg-blue-50 transition"
                >
                  Return to Home
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Result