const RackUtils = {

  isRacko(rack) {
    const rackArray = rack.toArray();

    for (let i = 1; i < rackArray.length; i++) {
      if (rackArray[i] <= rackArray[i - 1]) {
        return false;
      }
    }

    return true;
  }

};

export default RackUtils;
