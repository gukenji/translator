# 🎬 Whisper Subtitle Generator 

This project is a web application that uses [OpenAI Whisper](https://github.com/openai/whisper) to generate subtitles for videos or embed subtitles directly into video files.

The project includes:
- ⚙️ A FastAPI backend (running on port **8000**)
- 🎨 A React frontend (running on port **3000**)
- 🐳 A full Docker setup for easy execution

---
## 🚀 Getting Started

### ✅ Requirements

- [Docker](https://www.docker.com/) installed on your system

---
### 📦 Running the App

From the root directory, simply run:

```bash

docker-compose up --build

```

- The backend API will be available at: `http://localhost:8000`
- The frontend UI will be available at: `http://localhost:3000`

---
## 🌐 Access from Other Devices (Same Wi-Fi)

You can use this app from **any device connected to the same Wi-Fi network** by visiting:

```bash

http://<your-ip-address>:3000

```

### 🔍 How to find your IP address

On the machine running the app, open a terminal and run:
#### Windows

```bash

ipconfig

```

Look for the line: `IPv4 Address`.

#### macOS / Linux

```bash

ifconfig | grep 192.

```

Copy the IP address (usually something like `192.168.x.x`) and open in any browser:

```

http://192.168.x.x:3000

```  

---

## 📂 Features

- Upload a video file
- Select input language and subtitle format
- Option to generate `.srt`, `.vtt`, `.txt`, etc.
- Option to embed subtitles directly into the video
- Download subtitle file and/or subtitled video

---
## 🧠 Powered By
- [OpenAI Whisper](https://github.com/openai/whisper)
- [FastAPI](https://fastapi.tiangolo.com/)
- [React](https://reactjs.org/)
- [Docker](https://www.docker.com/)

---
## 📄 License

MIT License.
