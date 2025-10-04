import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useFBX, Environment, PerspectiveCamera } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ModelProps {
  modelPath: string;
}

// Model component
function MonopolyGuy({ modelPath }: ModelProps) {
  const group = useRef<THREE.Group>(null);
  const fbx = useFBX(modelPath);
  const mixer = useRef<THREE.AnimationMixer | null>(null);
   
  // Set up model materials and animations
  useEffect(() => {
    if (fbx) {
      // Apply shadows
      fbx.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          (child as THREE.Mesh).castShadow = true;
          (child as THREE.Mesh).receiveShadow = true;
        }
      });
       
      // Set up animations if they exist
      if (fbx.animations && fbx.animations.length > 0) {
        mixer.current = new THREE.AnimationMixer(fbx);
                
        // Play all animations
        fbx.animations.forEach((clip) => {
          const action = mixer.current!.clipAction(clip);
          action.play();
        });
      }
    }
     
    // Cleanup function
    return () => {
      if (mixer.current) {
        mixer.current.stopAllAction();
        mixer.current = null;
      }
    };
  }, [fbx]);
   
  // Update animation mixer
  useFrame((_, delta) => {
    if (mixer.current) {
      mixer.current.update(delta);
    }
  });
   
  return (
    <group
      ref={group}
      dispose={null}
      position={[0, -0.2, 0]}
      scale={0.2}
    >
      <primitive object={fbx} />
    </group>
  );
}

// Custom camera component
function CustomCamera() {
  return (
    <PerspectiveCamera
      makeDefault
      position={[0.09, -0.5, 0.8]}
      fov={30}
      near={0.1}
      far={100}
    />
  );
}

// Fallback component
const LoadingFallback: React.FC = () => (
  <mesh position={[0, 0, 0]}>
    <boxGeometry args={[0.5, 0.5, 0.5]} />
    <meshStandardMaterial color="hotpink" wireframe opacity={0.6} transparent />
  </mesh>
);

const MonopolyGuyChatbot: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Greetings! I'm the Monopoly Guy! Ready to talk business? 💰",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const openChatbot = () => {
    setIsChatOpen(true);
  };

  const closeChatbot = () => {
    setIsChatOpen(false);
  };

  // Multi-provider AI API call with proper error handling
  const callAIAPI = async (userMessage: string): Promise<string> => {
    const openRouterKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    const groqKey = import.meta.env.VITE_GROQ_API_KEY;
    const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    console.log('🔍 Debug - API Keys available:');
    console.log('  - OpenRouter:', !!openRouterKey);
    console.log('  - Groq:', !!groqKey);
    console.log('  - Gemini:', !!geminiKey);
    console.log('🔍 Debug - User message:', userMessage);

    const systemPrompt = `You are the Monopoly Guy, the distinguished gentleman with the top hat and monocle. Respond in character with business wisdom, enthusiasm, and charm. Keep responses under 100 words and use emojis like 🎩 💰 🏦 📈 🎯

Key character traits:
- Sophisticated, well-educated businessman
- Enthusiastic about investments and entrepreneurship  
- Uses phrases like "Capital idea!", "Splendid!", "My good fellow!"
- Gives practical financial advice
- Mentions Monopoly game concepts occasionally
- Always encouraging and optimistic`;

    // Try OpenRouter first (reliable free tier)
    if (openRouterKey) {
      try {
        console.log('📞 Trying OpenRouter API...');
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openRouterKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': window.location.origin,
            'X-Title': 'Monopoly Guy Chatbot'
          },
          body: JSON.stringify({
            model: 'meta-llama/llama-3.2-3b-instruct:free',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userMessage }
            ],
            max_tokens: 150,
            temperature: 0.8
          })
        });

        console.log('📡 OpenRouter response status:', response.status);

        if (response.ok) {
          const data = await response.json();
          console.log('📦 OpenRouter response:', data);
          
          if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
            const content = data.choices[0].message.content.trim();
            console.log('✅ OpenRouter success:', content);
            return content;
          }
        } else {
          const errorText = await response.text();
          console.log('⚠️ OpenRouter failed:', response.status, errorText);
        }
      } catch (error) {
        console.log('💥 OpenRouter error:', error);
      }
    }

    // Try Groq as backup
    if (groqKey) {
      try {
        console.log('📞 Trying Groq API...');
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${groqKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'llama3-8b-8192',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userMessage }
            ],
            max_tokens: 150,
            temperature: 0.8
          })
        });

        console.log('📡 Groq response status:', response.status);

        if (response.ok) {
          const data = await response.json();
          console.log('📦 Groq response:', data);
          
          if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
            const content = data.choices[0].message.content.trim();
            console.log('✅ Groq success:', content);
            return content;
          }
        } else {
          const errorText = await response.text();
          console.log('⚠️ Groq failed:', response.status, errorText);
        }
      } catch (error) {
        console.log('💥 Groq error:', error);
      }
    }

    // Try Gemini as final backup
    if (geminiKey) {
      try {
        console.log('📞 Trying Gemini API...');
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-goog-api-key': geminiKey,
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `${systemPrompt}\n\nUser message: ${userMessage}`
              }]
            }]
          })
        });

        console.log('📡 Gemini response status:', response.status);

        if (response.ok) {
          const data = await response.json();
          console.log('📦 Gemini response:', data);
          
          if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
            const content = data.candidates[0].content.parts[0].text.trim();
            console.log('✅ Gemini success:', content);
            return content;
          }
        } else {
          const errorText = await response.text();
          console.log('⚠️ Gemini failed:', response.status, errorText);
        }
      } catch (error) {
        console.log('💥 Gemini error:', error);
      }
    }

    // If all APIs fail, throw error to use fallback
    throw new Error('All AI APIs failed');
  };

  // Enhanced fallback responses
  const getFallbackResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Well hello there, my good fellow! Ready to make some deals? 🎩💰";
    } else if (message.includes('money') || message.includes('rich') || message.includes('wealth')) {
      return "Ah, talking about money! Remember, it's not just about having it, but knowing how to use it wisely! The key is to make your money work for you! 💸📈";
    } else if (message.includes('business') || message.includes('invest') || message.includes('entrepreneur')) {
      return "Excellent! Business is my specialty! Remember: diversify your investments, never put all your eggs in one basket, and always do your research! 📊💼";
    } else if (message.includes('property') || message.includes('real estate')) {
      return "Ah, real estate! Location, location, location! That's the golden rule. Buy low, improve the property, and watch its value soar! 🏠🏦";
    } else if (message.includes('advice') || message.includes('help')) {
      return "Here's some timeless advice: Save before you spend, invest in yourself first, and remember - compound interest is the eighth wonder of the world! ⏰💎";
    } else if (message.includes('monopoly') || message.includes('game')) {
      return "Ah, the game that bears my likeness! It teaches valuable lessons about strategy, negotiation, and financial management. Pass GO and collect wisdom! 🎲🎩";
    } else if (message.includes('stock') || message.includes('market')) {
      return "The stock market! A thrilling game of strategy and patience. Buy quality companies, hold for the long term, and don't let emotions drive your decisions! 📈🎯";
    } else if (message.includes('ieee') || message.includes('engineering')) {
      return "Ah, IEEE! A capital organization for engineers! Technology and innovation drive the future of business. Invest in knowledge, my friend! 🎯💼";
    } else if (message.includes('thank') || message.includes('thanks')) {
      return "You're most welcome, my enterprising friend! Remember, knowledge is the best investment you can make! 🌟💼";
    } else {
      const responses = [
        "Fascinating! Tell me more about your entrepreneurial spirit! In my experience, the best opportunities come to those who are prepared! 💼✨",
        "Splendid! You've got the mind of a true businessperson! Keep that innovative thinking flowing! 🌟🎩", 
        "Marvelous! That's exactly the kind of forward-thinking that builds empires! What's your next move? 🏰📊",
        "Capital idea! In business, timing and preparation are everything! How can I help you strategize? ⏰💰",
        "Excellent point! Success favors the prepared mind, and you're clearly thinking like a winner! 🎯🏆"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  };

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue.trim(),
      isBot: false,
      timestamp: new Date()
    };

    const currentInput = inputValue.trim();
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      console.log('🚀 Attempting AI API call...');
      const apiResponse = await callAIAPI(currentInput);
      
      const botResponse: Message = {
        id: Date.now() + 1,
        text: apiResponse,
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      console.log('✅ AI API response added successfully');
      
    } catch (error) {
      console.log('🔄 All APIs failed, using fallback response');
      
      // Simulate a small delay for fallback responses
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));
      
      const fallbackResponse: Message = {
        id: Date.now() + 1,
        text: getFallbackResponse(currentInput),
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, fallbackResponse]);
    }
    
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* 3D Monopoly Guy Model - Fixed Position */}
      <div className="fixed bottom-0 right-0 md:right-6 z-[1001]">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 30,
            damping: 14,
            duration: 1.5
          }}
          className="w-48 h-48 md:w-64 md:h-80 lg:w-50 lg:h-50 cursor-pointer"
          onClick={openChatbot}
          role="button"
          aria-label="Open chat with Monopoly Guy"
        >
          <Canvas
            style={{ background: 'transparent' }}
            gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
            dpr={[1, 2]}
          >
            <CustomCamera />
            <ambientLight intensity={0.7} />
            <spotLight
              position={[-5, -10, -7]}
              angle={0.15}
              penumbra={1}
              intensity={1.5}
              castShadow
            />
            <Suspense fallback={<LoadingFallback />}>
              <MonopolyGuy modelPath="/models/mono.fbx" />
              <Environment preset="city" />
            </Suspense>
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 1.8}
              rotateSpeed={0.4}
              autoRotate={false}
            />
          </Canvas>

          {/* Chat Bubble - positioned over the 3D model */}
          {!isChatOpen && (
            <div className="absolute top-4 left-4 bg-white rounded-lg px-3 py-2 shadow-lg border-2 border-gray-200 opacity-90 whitespace-nowrap text-sm font-semibold text-gray-700 animate-pulse pointer-events-none">
              Click me for business advice! 💰
              <div className="absolute bottom-[-8px] left-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Chatbot Overlay */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] p-4">
          <div className="bg-white rounded-2xl w-full max-w-md h-[600px] flex flex-col shadow-2xl transform transition-all duration-300 scale-100">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-lg">
                  🎩
                </div>
                <h3 className="font-bold text-lg">Monopoly Guy</h3>
              </div>
              <button
                onClick={closeChatbot}
                className="w-8 h-8 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-colors duration-200 text-white font-bold"
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${
                      message.isBot
                        ? 'bg-white text-gray-800 rounded-bl-md border border-gray-200'
                        : 'bg-green-600 text-white rounded-br-md'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white text-gray-800 rounded-2xl rounded-bl-md p-3 max-w-[80%] border border-gray-200 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about business, money, or investments..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  disabled={isTyping}
                />
                <button
                  onClick={sendMessage}
                  disabled={isTyping || !inputValue.trim()}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded-full transition-colors duration-200 font-semibold text-sm"
                >
                  {isTyping ? '...' : 'Send'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MonopolyGuyChatbot;