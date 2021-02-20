import React, { useState, useEffect } from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import Title from "./Title";






class SatisfactionChart extends React.Component {

  constructor(props) {
    super(props);

    var today = new Date(),
    time = today.getHours() + ':' + today.getMinutes();

    this.state = {
      seconds: parseInt(props.startTimeInSeconds, 10) || 0,
      currentTime: time,
      satisfactionData: [],
      vote: props.myCallback
    };
  }

  tick() {

    if (this.state.satisfactionData.length > 7) {
      this.state.satisfactionData.shift()
    }

    this.setState((state) => ({
      seconds: state.seconds + 1,
      satisfactionData: [...state.satisfactionData, this.createData(this.state.currentTime, this.state.vote())]
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  createData(time, satRate) {
    return { time, satRate };
  }

  render() {
    // return <div>Timer: {this.formatTime(this.state.seconds)}</div>;
    return (
      <React.Fragment>
        <Title>Guest satisfaction with current music</Title>
        <ResponsiveContainer>
          <LineChart
            data={this.state.satisfactionData}
            margin={{
              top: 16,
              right: 16,
              bottom: 0,
              left: 24,
            }}
          >
            <XAxis dataKey="time" stroke={"#000000"} tick={false}/>
            <YAxis stroke={"#000000"} type="number" domain={[0, 100]}>
              <Label
                angle={270}
                position="left"
                style={{ textAnchor: "middle", fill: "#000000" }}
              >
                Satisfaction (%)
              </Label>
            </YAxis>
            <Line
              type="monotone"
              dataKey="satRate"
              stroke={"#0000FF"}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </React.Fragment>
      )
  }
}

export default SatisfactionChart


