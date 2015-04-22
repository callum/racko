export default class RackHelper {

  constructor(rack) {
    this.rack = rack;
  }

  get streak() {
    const rack = this.rack.toArray();

    let streak = 1;

    for (let i = 1; i < rack.length; i++) {
      if (rack[i] > rack[i - 1]) {
        streak++;
      }
    }

    return streak;
  }

  get isRacko() {
    return this.streak === this.rack.size;
  }

}
