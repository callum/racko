import React from 'react';

export class Turn extends React.Component {

  static getDefaultData() {
    return {
      drawTail: null
    };
  }

  static addDataHandlers() {
    this.drawTail = this.props.firebase
      .child('trays')
      .child(this.props.gameKey)
      .child('draw')
      .orderByKey()
      .limitToLast(1);

    this.handlers.drawTail = this.drawTail.on('value', res => {
      if (res.exists()) {
        let card = res.val();

        this.setState({
          drawTail: card
        });
      }
    });
  }

  static removeDataHandlers() {
    this.drawTail.off('value', this.handlers.drawTail);
  }

  keep() {
    this.props.onFinish();
  }

  discard() {
    let gameKey = this.props.gameKey;
    let tray = this.props.firebase.child('trays').child(gameKey);

    tray.once('value', (res) => {
      if (res.exists()) {
        let { draw, discard } = res.val();
        let discarded = draw.pop();

        if (draw.length) {
          discard.unshift(discarded);
        } else {
          draw = [...discard, discarded];
          discard = [draw.pop()];
        }

        tray.set({ draw, discard }, (err) => {
          if (err) {
            console.log('Set failed');
            return;
          }

          this.props.onFinish();
        });
      }
    });
  }

  render() {
    if (this.props.drawTail) {
      return (
        <div>
          <p>
            You picked up <b>{this.props.drawTail}</b>
          </p>

          <button onClick={this.keep.bind(this)}>
            Keep
          </button>

          <button onClick={this.discard.bind(this)}>
            Discard
          </button>
        </div>
      );
    }

    return (
      <p>Loading…</p>
    );
  }

}

export default Turn;
