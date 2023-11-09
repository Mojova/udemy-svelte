import { readable } from "svelte/store";

export const location = readable(null, (set) => {
  let watchId;
  if (navigator.geolocation) {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        console.log(position);
        const { latitude, longitude } = position.coords;
        set({ latitude, longitude });
      },
      (error) => {
        set({ error });
      },
    );
  }
  return () => {
    if (navigator.geolocation) {
      navigator.geolocation.clearWatch(watchId);
    }
    set(null);
  };
});
