#include <emscripten/bind.h>
#include <vector>
#include <cstdint>
#include "chip8.h" // Import James's header

using namespace emscripten;

class RetroCore {
public:
    Chip8 cpu; // Instantiate James Griffin's CHIP-8 CPU

    RetroCore() {
        // We don't need to initialize videoBuffer here; the CPU handles it
    }

    void loadROM(val romData) {
        std::vector<uint8_t> program = vecFromJSArray<uint8_t>(romData);
        
        // James's init() clears memory, registers, and the display
        cpu.init(); 

        // James's load() uses fopen, which doesn't work easily in basic WASM.
        // Instead, we inject the bytes directly into his public memory array starting at 0x200 (512).
        for (size_t i = 0; i < program.size() && (i + 512) < 4096; ++i) {
            cpu.memory[512 + i] = program[i];
        }
        
        printf("ROM loaded into James Griffin's core! Size: %zu bytes\n", program.size());
    }

    void cycle() {
        // 1. Run his emulation cycle (fetches and executes 1 opcode)
        cpu.emulate_cycle();

        // 2. If his CPU says the screen needs updating, map his gfx array to your React Canvas
        if (cpu.drawFlag) {
            for (int i = 0; i < 2048; ++i) {
                // He uses 1 for white, 0 for black. We convert to 32-bit ARGB.
                uint8_t pixel = cpu.gfx[i];
                videoBuffer[i] = (0x00FFFFFF * pixel) | 0xFF000000; 
            }
            cpu.drawFlag = false; // Reset the flag
        }
    }

    // Pass keyboard input from React to his public key array
    void setKey(int keyIndex, bool isDown) {
        if(keyIndex >= 0 && keyIndex < 16) {
            cpu.key[keyIndex] = isDown ? 1 : 0;
        }
    }

    val getVideoBufferPointer() {
        return val(typed_memory_view(64 * 32, videoBuffer));
    }

private:
    uint32_t videoBuffer[64 * 32]; 
};

// Expose to React via Embind
EMSCRIPTEN_BINDINGS(my_module) {
    class_<RetroCore>("RetroCore")
        .constructor<>()
        .function("cycle", &RetroCore::cycle)
        .function("loadROM", &RetroCore::loadROM)
        .function("setKey", &RetroCore::setKey)
        .function("getVideoBufferPointer", &RetroCore::getVideoBufferPointer);
}