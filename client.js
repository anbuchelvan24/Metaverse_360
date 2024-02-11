import { ReactInstance, Surface } from 'react-360-web';
import WebVRPolyfill from 'webvr-polyfill';

const polyfill = new WebVRPolyfill();

function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    
    fullScreen: true,
    ...options,
  });

  const cylinderSurface = new Surface(4680,2400,Surface.SurfaceShape.Cylinder);

  r360.renderToSurface(
      r360.createRoot('App', {}),
      cylinderSurface
  );
}

window.React360 = { init };
