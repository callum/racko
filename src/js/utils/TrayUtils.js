const TrayUtils = {

  discard(tray, discarded) {
    let { draw, discard } = tray;

    const discardIndex = draw.indexOf(discarded);

    if (discardIndex !== -1) {
      draw.splice(discardIndex, 1);
    } else {
      draw.pop();
    }

    if (draw.length) {
      discard.push(discarded);
    } else {
      draw = [...discard, discarded];
      discard = [draw.pop()];
    }

    return { draw, discard };
  }

};

export default TrayUtils;
