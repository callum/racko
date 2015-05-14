import RackHelper from './RackHelper';

export default class ScoreHelper extends RackHelper {

  constructor(rack, didRacko) {
    super(rack);

    this.didRacko = didRacko;
  }

  get points() {
    let points = this.streak * 5;

    if (this.didRacko) {
      points += 25;
    }

    return points;
  }

  get bonus() {
    const run = this.run;

    let bonus = 0;

    if (this.didRacko && run) {
      switch (run.length) {
        case 3:
          bonus = 50;
          break;
        case 4:
          bonus = 100;
          break;
        case 5:
          bonus = 200;
          break;
        default:
          bonus = 400;
          break;
      }
    }

    return bonus;
  }

  get total() {
    return this.points + this.bonus;
  }

}
