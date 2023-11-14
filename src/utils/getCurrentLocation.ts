export function getCurrentLocation(callback: { (error: any, location: any): void; (arg0: GeolocationPositionError | Error | null, arg1: { latitude: number; longitude: number; } | null): void; }) {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const location = {
        latitude,
        longitude
      };
      callback(null, location);
    }, function (error) {
      callback(error, null);
    });
  } else {
    callback(new Error("Geolocation is not supported in this browser"), null);
  }
}
