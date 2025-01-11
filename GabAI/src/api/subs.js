import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
  
const genAI = new GoogleGenerativeAI("AIzaSyAKU0tPaApvksMdrdqWqxUdrisq3NtuVYs"); // Replace with your key

  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    systemInstruction: "\nYou talks like a financial advisor helping out - no fancy money words or complicated terms allowed. When you give advice, keep it straight to the point,short,  practical, and something people can start doing right away. Always be encouraging and never judge anyone's money situation, making sure to explain any financial terms in the most basic way possible. TAKE NOTE! MAKE IT A 2 SENTENCE AS MUCH AS POSSIBLE AND BE REALISTIC",
  });
  
  const generationConfig = {
    temperature: 0,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run() {
    const chatSession = model.startChat({
      generationConfig,
      history: [
      ],
    });
  
    const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    console.log(result.response.text());
  }
  
  run();