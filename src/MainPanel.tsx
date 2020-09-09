import React, { PureComponent } from 'react';
import { PanelProps } from '@grafana/data';
import { PanelOptions, Frame } from 'types';
import { processData } from './util/helpFuc';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface Props extends PanelProps<PanelOptions> {}
interface State {
  num: number;
}

export class MainPanel extends PureComponent<Props, State> {
  state: State = {
    num: 0,
  };

  componentDidMount() {
    const series = this.props.data.series as Frame[];
    console.log('---initial--- ', this.props.data.series);
    if (series.length == 0 || series[0].fields[0].values.buffer.length == 0) {
      return;
    }

    const buffer = series[0].fields[0].values.buffer;
    const num = processData(buffer);
    this.setState({ num });
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.data.series !== this.props.data.series) {
      console.log('---update--- ', this.props.data.series);
      const series = this.props.data.series as Frame[];
      if (series.length == 0 || series[0].fields[0].values.buffer.length == 0) {
        this.setState({ num: 0 });
        return;
      }

      const buffer = series[0].fields[0].values.buffer;
      const num = processData(buffer);
      this.setState({ num });
    }
  }

  render() {
    const { width, height } = this.props;
    const { num } = this.state;

    return (
      <div
        style={{
          width,
          height,
          padding: 10,
        }}
      >
        <CircularProgressbarWithChildren value={num >= 200 ? 200 : (num / 200) * 100} text={num.toString()} />
      </div>
    );
  }
}
