import React, { PureComponent } from 'react';
import { PanelProps } from '@grafana/data';
import { PanelOptions, Frame } from 'types';
import { processData } from './util/helpFuc';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './css/main.css';

interface Props extends PanelProps<PanelOptions> {}
interface State {
  num: number;
}

export class MainPanel extends PureComponent<Props, State> {
  previousStore: number[] = [];

  state: State = {
    num: 0,
  };

  componentDidMount() {
    const series = this.props.data.series as Frame[];
    if (series.length == 0 || series[0].fields[0].values.buffer.length == 0) {
      return;
    }

    const buffer = series[0].fields[0].values.buffer;
    const { num, store } = processData(buffer, this.previousStore);

    this.previousStore = store;
    this.setState({ num });
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.data.series !== this.props.data.series) {
      const series = this.props.data.series as Frame[];
      if (series.length == 0 || series[0].fields[0].values.buffer.length == 0) {
        this.setState({ num: 0 });
        return;
      }

      const buffer = series[0].fields[0].values.buffer;
      const { num, store } = processData(buffer, this.previousStore);

      this.previousStore = store;
      this.setState({ num });
    }
  }

  render() {
    const {
      width,
      height,
      options: { threshold, showText },
    } = this.props;
    const { num } = this.state;

    if (showText) {
      return (
        <div
          style={{
            width,
            height,
            padding: 10,
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <CircularProgressbar value={num >= threshold ? threshold : (num / threshold) * 100} text={num.toString()} />
          <div style={{ marginTop: 15, fontFamily: 'Ubuntu, sans-serif', fontSize: '4em', textAlign: 'center' }}>
            Αριθμός Πελατών
          </div>
        </div>
      );
    }

    return (
      <div
        style={{
          width,
          height,
          padding: 10,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <CircularProgressbar value={num >= threshold ? 100 : (num / threshold) * 100} text={num.toString()} />
      </div>
    );
  }
}
