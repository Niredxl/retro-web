#include <emscripten/bind.h>
#include <vector>

using namespace emscripten;

class RetroCore{
    public:
        RetroCore(){
            for(int i = 0; i < 64 * 32; i++){
                videoBuffer[i] = (i % 2 == 0) ? 0xFFFFFFFF : 0xFF000000;
            }
        }

        void cycle(){
            uint32_t temp = videoBuffer[0];
            for(int i = 0; i < 2047; i++){
                videoBuffer[i] = videoBuffer[i+1];
            }
            videoBuffer[2047] = temp;
        }

        val getVideoBufferPointer() {
            return val(typed_memory_view(64 * 32, videoBuffer));
        }
    private:
        uint32_t videoBuffer[64 * 32];
};

EMSCRIPTEN_BINDINGS(my_module) {
    class_<RetroCore>("RetroCore")
        .constructor<>()
        .function("cycle", &RetroCore::cycle)
        .function("getVideoBufferPointer", &RetroCore::getVideoBufferPointer);
}