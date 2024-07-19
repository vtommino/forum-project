const validateRoom = (building, roomNo) => {
  if (building === "A" && roomNo > 0 && roomNo <= 100) {
    return true;
  }
  if (building === "B" && roomNo > 100 && roomNo <= 200) {
    return true;
  }
  if (building === "C" && roomNo > 200 && roomNo <= 300) {
    return true;
  }
  if (building === "D" && roomNo > 300 && roomNo <= 400) {
    return true;
  }
  if (building === "E" && roomNo > 400 && roomNo <= 468) {
    return true;
  }
  return false;
};

export default validateRoom;
