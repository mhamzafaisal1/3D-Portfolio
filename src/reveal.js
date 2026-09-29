// Tiny coordination point between the loader and the hero.
//  - heroReady: the 3D computer has rendered its first frame (or fell back to flat)
//  - revealed:  the loader has started fading out; intro animations may begin
const makeSignal = () => {
  let done = false;
  const subs = new Set();
  return {
    get done() {
      return done;
    },
    fire() {
      if (done) return;
      done = true;
      subs.forEach((fn) => fn());
      subs.clear();
    },
    on(fn) {
      if (done) {
        fn();
        return () => {};
      }
      subs.add(fn);
      return () => subs.delete(fn);
    },
  };
};

export const heroReady = makeSignal();
export const revealed = makeSignal();
