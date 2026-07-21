import { useState, useRef } from "react";
const demo1 = "Air pollution refers to the introduction of harmful substances into the atmosphere, which can damage the environment, human health, and overall quality of life. Air is a vital element for human survival, and yet, we often overlook how our activities pollute this essential resource. Clean air is crucial for life, but various human activities contribute to its contamination. Air pollution arises from several sources. Industrial development has led to increased pollution, affecting not only urban areas but also homes, schools, offices, and even rural areas. Common activities that contribute to air pollution include cooking fires, brick-making, burning of wood for construction, and the emission of smoke from various sources. Railway engines, power plants, mills, and factories often use coal and oil, while vehicles such as buses, trucks, and cars run on petrol and diesel. These activities produce significant amounts of smoke and pollutants, contributing to deteriorating air quality. Industrial areas, where numerous mills and vehicles operate daily, are particularly affected. In severe cases, people living in such areas may suffer from health issues that are difficult to treat. To combat air pollution, effective measures must be implemented. The rise in pollution-related health problems, including respiratory issues and lung cancer, underscores the urgency of addressing this issue. Air pollution not only harms people but also disrupts entire ecosystems, negatively impacting plants and animals. Therefore, taking proactive steps to reduce pollution is essential for safeguarding both human health and the environment.";
import {Routes,Route} from "react-router-dom";
import Navbar from "./comp/Navbar";
function Test15() {
  const textRef = useRef("");
  const [demo, setDemo] = useState(demo1);
  const [text, setText] = useState("");
  const [timer, setTimer] = useState();
  const [showResult, setShowResult] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [accuracy, setAccuracy] = useState(0);
  const [gross_wpm, setGross_Wpm] = useState(0);
  const [net_wpm, setNet_Wpm] = useState(0);
  const [errorPercentage,setErrorPercentage]=useState(100);
  const handleKeyDown = (e) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
    }
  }
  const [timeLeft, setTimeLeft] = useState(600);
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  const handleTextChange = (e) => {
    const val = e.target.value;
    setText(val);
    textRef.current = val;
  }
  const calcResult = () => {
    const master = demo.trim();
    const typed = textRef.current.trim();
    if (!typed) {
      setAccuracy(0);
      return;
    }
    let correctChars = 0;
    let totalTypedChars = typed.length;
    let totalMasterChars = master.length;
    let i = 0; // master pointer
    let j = 0; // typed pointer
    let mistakes = 0;
    while(i<totalMasterChars && j<totalTypedChars){
      if(master[i]===typed[i]){
        correctChars++;
        i++;
        j++;
      }else{
        mistakes++;
        if(master[i+1]===typed[j]){
          // master was skipped
          i++;
        }else if(master[i]===typed[j+1]){
          //extra char inserted 
          j++;

        }
      }
    }
    // Calculate Accuracy based on Character Alignment
  let calculatedAcc = ((correctChars / Math.max(totalTypedChars, totalMasterChars)) * 100).toFixed(2);
  setAccuracy(calculatedAcc);
    let words_demo = demo.split(/\s+/);
    let words_typed = currentTypedText.split(/\s+/);
    let totalTypedWord = words_typed.length;
    let i = 0;
    let correct = 0;
    while (i < totalTypedWord) {
      if (words_demo[i] === words_typed[i]) {
        correct += 1;
      }
      i++;
    }
    let wrongTypedWord = totalTypedWord - correct;
    let grosswpm = total_char / 50;
    let netwpm = grosswpm - (wrongTypedWord / 10);
    setGross_Wpm(grosswpm);
    setNet_Wpm(netwpm);
    setAccuracy((correct / totalTypedWord).toFixed(2) * 100);
    for (let i=0;i<totalTypedWord;i++){
      const masterWord = words_demo[i];
      const typedWord = words_typed[i];
      if (!masterWord){
        fullerror++;
      }else if (masterWord===typedWord){
        continue;
      }else if (masterWord.toLowerCase()=== typedWord.toLowerCase()){
        halferror++;
      }else{
        fullerror++;
      }
    }
  }

  const handleStartTimer = () => {
    if (isRunning) return;
    setText("");
    textRef.current = "";
    setShowResult(false);
    setTimeLeft(600); // Reset timer to 10 mins(600s)

    setIsRunning(true);
    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          // Time is up!
          clearInterval(timerInterval);
          setIsRunning(false);
          calcResult();
          setShowResult(true);
          return 0;
        }
        return prevTime - 1; // Decrement by 1 second
      });
    }, 1000);
  };

  return (
    <>
    <div className="min-h-screen bg-gray-50 flex flex-col">
    <Navbar/>
      <div className="box flex flex-col min-w-full min-h-full justify-between items-center ">
        <div className="demo_para flex flex-1 w-full h-1/2 text-[15px] p-5">{demo}</div>
        <div className="flex flex-col items-center gap-2">
          {/* Live Countdown Display */}
          <div className="text-3xl font-mono font-bold text-red-600">
            {formatTime(timeLeft)}
          </div>
          <button className="rounded bg-red-200 p-4" onClick={handleStartTimer} disabled={isRunning}>{isRunning ? 'Timer Running...'
            : 'Start 1 Min Timer'}</button></div>
        <div className="user_para flex flex-2 w-full h-1/2 p-5">
          <textarea
            name="user_para"
            id="user_para"
            value={text}
            disabled={!isRunning}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
            className="w-full h-[200px] p-2 border rounded resize-none"
            placeholder="Type your paragraph here..."

          />
        </div>
        {showResult ?
          <div className="written-text p-5">
            <h1 className="font-semibold text-3xl">Your Result</h1>
            <br /><span className="text-2xl">You have written - </span>{text}
            <br /><span className="text-2xl">Accuracy - {accuracy} %</span>
            <br /><span className="gross wpm text-2xl">Typing Speed - {gross_wpm} wpm</span>
            <br /><span className="net wpm text-2xl">Typing Speed - {net_wpm} wpm</span>

          </div> : ""}
      </div>
<Routes>
          <Route path="/" element={<TypingTestPage />} />
          <Route path="/rules" element={<MarkingRules />} />
          <Route path="/about" element={<About />} />
        </Routes>
    </div>
    </>
  )
}
export default Test15
