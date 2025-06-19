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
- Minimum system requirements vary depending on CPU or GPU usage:

#### 🔧 CPU Mode

- Dual-core processor (Intel/AMD)
- 8 GB RAM (16 GB recommended for large videos)
- No GPU required

#### ⚡ GPU Mode (CUDA)

- NVIDIA GPU with CUDA Compute Capability 3.5+
- Latest NVIDIA GPU Drivers
- [CUDA Toolkit](https://developer.nvidia.com/cuda-toolkit)
- [NVIDIA Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html)

You can check your GPU compatibility here: [CUDA GPUs](https://developer.nvidia.com/cuda-gpus)

> ⚠️ Note: If you're using CUDA, make sure the NVIDIA Container Toolkit is correctly configured on your machine.

---

## 🛠️ Install NVIDIA Drivers + Toolkit (Linux/WSL2)

### Step 1: Install NVIDIA Driver

```bash
sudo apt update
sudo apt install -y nvidia-driver-535
sudo reboot
```

Verify with:

```bash
nvidia-smi
```

### Step 2: Install NVIDIA Container Toolkit

```bash
distribution=$(. /etc/os-release;echo $ID$VERSION_ID)
curl -s -L https://nvidia.github.io/libnvidia-container/gpgkey | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg
curl -s -L https://nvidia.github.io/libnvidia-container/$distribution/libnvidia-container.list | \
  sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | \
  sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list

sudo apt-get update
sudo apt-get install -y nvidia-container-toolkit

sudo nvidia-ctk runtime configure --runtime=docker
# Restart Docker Desktop manually or with: sudo systemctl restart docker (Linux only)
```

---

## 📦 Running the App

### 👇 Select CPU or GPU (CUDA) mode

We use `.env` files to switch between CPU and GPU builds.

#### ✅ CPU (default)

```bash
cp .env.cpu .env
docker compose --env-file .env up --build
```

#### ⚡ GPU (CUDA)

```bash
cp .env.gpu .env
docker compose --env-file .env up --build
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
