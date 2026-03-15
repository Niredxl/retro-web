# Retro Web 🎮

A web-based retro emulator project integrating a C++ emulation core with a modern JavaScript frontend. 

## 📖 About the Project

**Retro Web** aims to bring retro emulation directly to the browser. By leveraging **Emscripten** to compile a C++ emulation core into WebAssembly (WASM), it bridges high-performance system emulation with a sleek, accessible web interface built using modern frontend technologies.

### 🛠️ Built With

* **Frontend:** JavaScript, React (implied by `react-icons`), HTML/CSS
* **Core Emulation:** C++
* **WASM Toolchain:** [Emscripten](https://emscripten.org/)
* **Animations:** [GSAP](https://greensock.com/gsap/) (GreenSock Animation Platform)
* **Icons:** [React Icons](https://react-icons.github.io/react-icons/)

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You will need Node.js and npm installed for the frontend, and Emscripten installed to compile the C++ core.

1.  **Node.js & npm**
    ```sh
    npm install npm@latest -g
    ```
2.  **Emscripten SDK (emsdk)**
    Follow the [official Emscripten installation instructions](https://emscripten.org/docs/getting_started/downloads.html) to install the SDK.

### Installation

1.  Clone the repository:
    ```sh
    git clone [https://github.com/Niredxl/retro-web.git](https://github.com/Niredxl/retro-web.git)
    cd retro-web
    ```

2.  Install frontend NPM packages:
    ```sh
    npm install
    ```

3.  Activate Emscripten environment variables (must be done in the terminal where you plan to build the core):
    * **Windows (DOS/Command Prompt):**
        ```cmd
        emsdk_env.bat
        ```
    * **Linux / macOS (Bash):**
        ```bash
        source ./emsdk_env.sh
        ```

4.  *(Add specific build commands for the C++ `emulation_core` here, e.g., `make` or `emcc` commands)*

5.  Start the frontend development server:
    ```sh
    npm start # (or npm run dev, depending on your package.json setup)
    ```

---

## 📂 Project Structure

* `/emulation_core/` - Contains the C++ source code and tests for the emulation backend.
* `/frontend/` - Contains the JavaScript/React web interface.
* `package.json` - Defines frontend dependencies (`gsap`, `react-icons`, etc.).
* `TODO.md` - Planned features and tracking for upcoming development.

---

## 📝 TODO

Check out the [TODO.md](TODO.md) file to see what features, bug fixes, and improvements are currently in the pipeline. 

---

## 📄 License

This project is distributed under the MIT License. See the `LICENSE` file for more information.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Niredxl/retro-web/issues) if you want to contribute.