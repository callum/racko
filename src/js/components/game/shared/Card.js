import styles from './Card.css';

import React from 'react';

export default class Card extends React.Component {

  static propTypes = {
    value: React.PropTypes.number.isRequired,
    textValue: React.PropTypes.any
  };

  render() {
    let { value, textValue } = this.props;

    if (!textValue) {
      textValue = value;
    }

    const style = { width: `${value / 60 * 100}%` };

    return (
      <div className={styles.root} {...this.props}>
        <div className={styles.top}>
          <div style={style} className={styles.number}>
            {textValue}
          </div>
        </div>

        <div className={styles.logo}>
          Rack-O
        </div>

        <div className={styles.bottom}>
          <div style={style} className={styles.number}>
            {textValue}
          </div>
        </div>
      </div>
    );
  }

}
