# Pixar Love Story Creator ✨

An AI-powered web application that generates 3D Pixar-style couple portraits with custom neon name signs, cinematic nighttime urban backdrops, and rich atmospheric lighting using Google's Gemini generative models.

![Pixar Love Story Banner](https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80)

---

## 🌟 Features

- **Custom Neon Sign Personalization**: Input custom names for both partners to render vibrant glowing neon signs (blue and pink) on the backdrop wall.
- **3D Pixar Character Aesthetic**: Generates charming cartoon couple art featuring detailed attire (casual light blue shirt & traditional embroidered lehenga) with expressive facial details and floating heart accent.
- **Gemini Image Generation**: Seamlessly integrates the `@google/genai` SDK using Gemini's image generation capabilities.
- **Atmospheric UI/UX**: Designed with modern glassmorphism, animated glow effects, ambient dark styling, and smooth layout transitions powered by Motion.
- **Instant Preview & Download**: Live state management showing generation progress, full-resolution preview, quick regeneration, and one-click PNG download.
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices.

---

## 🛠️ Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Motion](https://motion.dev/) (Framer Motion)
- **Icons**: [Lucide React](https://lucide.dev/)
- **AI SDK**: [@google/genai](https://www.npmjs.com/package/@google/genai) (`gemini-2.5-flash-image`)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) / [pnpm](https://pnpm.io/)
- A **Gemini API Key** from [Google AI Studio](https://aistudio.google.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/pixar-love-story-creator.git
   cd pixar-love-story-creator
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root directory (or copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

   Add your Gemini API key:
   ```env
   GEMINI_API_KEY="your-gemini-api-key-here"
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

   Open your browser and navigate to `http://localhost:3000`.

---

## 📋 Available Scripts

- `npm run dev`: Starts the local development server on port 3000.
- `npm run build`: Compiles TypeScript and creates an optimized production build in `dist/`.
- `npm run preview`: Locally previews the production build.
- `npm run lint`: Checks for TypeScript compile errors and type safety.
- `npm run clean`: Cleans up the `dist` directory.

---

## 🎨 How It Works

1. Enter the **Boy's Name** and **Girl's Name** in the input controls.
2. Click **Generate Portrait**.
3. The prompt is constructed dynamically with cinematic lighting parameters, 3D Pixar rendering instructions, and custom neon sign text.
4. The generated image is returned as inline base64 image data and rendered in the interactive viewer.
5. Hover over the image to **Download** the artwork directly to your device or **Regenerate** a new iteration.

---

## 📄 License

This project is open-source and available under the [Apache 2.0 License](LICENSE).
