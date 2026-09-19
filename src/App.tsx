/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles, Download, RefreshCw, Loader2, Camera } from "lucide-react";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function App() {
  const [boyName, setBoyName] = useState('Vijay');
  const [girlName, setGirlName] = useState('Vidhi');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const prompt = `A cute 3D cartoon character couple in Pixar style standing on a modern urban street at night. The boy is wearing a casual light blue shirt and the girl is wearing a beautiful traditional pink embroidered lehenga. They are looking at each other lovingly with a small floating red heart between them. Behind them, two glowing neon signs on the wall display the names '${boyName}' in blue and '${girlName}' in pink. Cinematic lighting, high quality 8k render, soft shadows, vibrant colors, expressive faces.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: prompt }],
        },
      });

      let imageUrl = null;
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }

      if (imageUrl) {
        setGeneratedImage(imageUrl);
      } else {
        throw new Error("No image was generated. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to generate image. Please check your connection or try a different prompt.");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `${boyName}-${girlName}-pixar.png`;
    link.click();
  };

  return (
    <div className="min-h-screen font-sans selection:bg-orange-500/30">
      <div className="atmosphere" />
      
      <main className="max-w-6xl mx-auto px-6 py-12 md:py-20 flex flex-col items-center">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-orange-400 mb-4 tracking-wider uppercase">
            <Sparkles size={14} />
            AI Powered Portrait
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-tight">
            Pixar <span className="italic text-orange-500">Love</span> Story
          </h1>
          <p className="text-white/60 max-w-xl mx-auto text-lg leading-relaxed">
            Create a magical 3D animated portrait of your favorite couple in the iconic Pixar style.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full items-start">
          {/* Controls */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-3xl p-8 space-y-8"
          >
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="block text-sm font-medium text-white/50 uppercase tracking-widest">Boy's Name</label>
                <input 
                  type="text"
                  value={boyName}
                  onChange={(e) => setBoyName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all placeholder:text-white/20"
                  placeholder="Enter name..."
                />
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-white/50 uppercase tracking-widest">Girl's Name</label>
                <input 
                  type="text"
                  value={girlName}
                  onChange={(e) => setGirlName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all placeholder:text-white/20"
                  placeholder="Enter name..."
                />
              </div>
            </div>

            <button
              onClick={generateImage}
              disabled={isGenerating || !boyName || !girlName}
              className="w-full group relative overflow-hidden bg-orange-600 hover:bg-orange-500 disabled:bg-white/10 disabled:cursor-not-allowed text-white font-bold py-5 rounded-2xl transition-all flex items-center justify-center gap-3 text-lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="animate-spin" />
                  Crafting Magic...
                </>
              ) : (
                <>
                  <Camera size={20} className="group-hover:scale-110 transition-transform" />
                  Generate Portrait
                </>
              )}
            </button>

            {error && (
              <p className="text-red-400 text-sm text-center bg-red-400/10 py-3 rounded-xl border border-red-400/20">
                {error}
              </p>
            )}

            <div className="pt-6 border-t border-white/10">
              <h3 className="text-xs font-bold text-white/30 uppercase tracking-[0.2em] mb-4">Style Details</h3>
              <div className="flex flex-wrap gap-2">
                {['Pixar Style', '3D Render', 'Urban Night', 'Traditional Wear', 'Cinematic Lighting'].map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/50">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Preview */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="relative aspect-square w-full"
          >
            <AnimatePresence mode="wait">
              {!generatedImage && !isGenerating ? (
                <motion.div 
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full glass-card rounded-3xl flex flex-col items-center justify-center text-center p-12 border-dashed border-2 border-white/10"
                >
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 animate-float">
                    <Heart className="text-orange-500 fill-orange-500" size={32} />
                  </div>
                  <h3 className="text-2xl font-serif mb-2">Ready to Create</h3>
                  <p className="text-white/40">Enter the names and click generate to see your Pixar-style portrait.</p>
                </motion.div>
              ) : isGenerating ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full glass-card rounded-3xl flex flex-col items-center justify-center p-12"
                >
                  <div className="relative">
                    <div className="w-24 h-24 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin" />
                    <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-orange-500 animate-pulse" size={32} />
                  </div>
                  <p className="mt-8 text-white/60 font-medium animate-pulse">Rendering your story...</p>
                </motion.div>
              ) : (
                <motion.div 
                  key="image"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="group relative w-full h-full rounded-3xl overflow-hidden shadow-2xl shadow-orange-900/20"
                >
                  <img 
                    src={generatedImage!} 
                    alt="Generated Pixar Couple" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                    <div className="flex w-full justify-between items-center">
                      <div className="text-left">
                        <p className="text-white font-bold text-lg">{boyName} & {girlName}</p>
                        <p className="text-white/60 text-sm italic">Pixar Style Portrait</p>
                      </div>
                      <div className="flex gap-3">
                        <button 
                          onClick={generateImage}
                          className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all"
                          title="Regenerate"
                        >
                          <RefreshCw size={20} />
                        </button>
                        <button 
                          onClick={downloadImage}
                          className="p-3 rounded-full bg-orange-600 hover:bg-orange-500 border border-orange-400/30 transition-all"
                          title="Download"
                        >
                          <Download size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-white/5 w-full text-center text-white/20 text-xs tracking-[0.3em] uppercase">
          Crafted with Gemini AI & Pixar Inspiration
        </footer>
      </main>
    </div>
  );
}
