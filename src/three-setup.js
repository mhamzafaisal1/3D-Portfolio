// Must be imported before App: model files call useGLTF.preload() at import time,
// so the decoder path has to be set before they load.
import { useGLTF } from "@react-three/drei";

// Serve the Draco decoder locally instead of Google's CDN.
useGLTF.setDecoderPath("/draco/");
