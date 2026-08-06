
export function getDeviceId() {
  let deviceId = localStorage.getItem("recipeBookDeviceId");

  if (!deviceId) {
    deviceId = crypto.randomUUID();
    localStorage.setItem("recipeBookDeviceId", deviceId);
  }

  return deviceId;
}
