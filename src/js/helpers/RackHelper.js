export default class RackHelper {

  static MIN_RUN_SIZE = 3;

  constructor(rack) {
    this.rack = rack;
  }

  get run() {
    const rack = this.rack.toArray();

    const runs = rack.reduce((reduction, current, i, array) => {
      const run = reduction[reduction.length - 1];

      if (run && current === array[i - 1] + 1) {
        run.end = i + 1;
      } else {
        reduction.push({ start: i, end: i + 1 });
      }

      return reduction;
    }, []);

    const longestRun = runs.sort((a, b) => {
      return (a.end - a.start) - (b.end - b.start);
    })[runs.length - 1];

    const slice = rack.slice(longestRun.start, longestRun.end);

    if (slice.length >= RackHelper.MIN_RUN_SIZE) {
      return slice;
    }
  }

  get streak() {
    const rack = this.rack.toArray();

    let streak = 1;

    for (let i = 1; i < rack.length; i++) {
      if (rack[i] < rack[i - 1]) {
        break;
      }

      streak++;
    }

    return streak;
  }

  get isRacko() {
    return this.streak === this.rack.size;
  }

}
