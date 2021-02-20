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






class Timer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      seconds: parseInt(props.startTimeInSeconds, 10) || 0,
      satisfactionData: [this.createData("05:00", 5)],
      vote: props.myCallback
    };
  }

  tick() {

    if (this.state.satisfactionData.length > 3) {
      this.state.satisfactionData.shift()
    }

    this.setState((state) => ({
      seconds: state.seconds + 1,
      satisfactionData: [...state.satisfactionData, this.createData(this.formatTime(state.seconds), this.state.vote())]
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

  formatTime(secs) {
    let hours = Math.floor(secs / 3600);
    let minutes = Math.floor(secs / 60) % 60;
    let seconds = secs % 60;
    return [hours, minutes, seconds]
      .map((v) => ("" + v).padStart(2, "0"))
      .filter((v, i) => v !== "00" || i > 0)
      .join(":");
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
            <XAxis dataKey="time" stroke={"#000000"} />
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

export default Timer










function SatisfactionChart(params) {
  

  // const [satisfactionData, setSatisfactionData] = useState([]);

  // useEffect(() => {
  //   const vote = params.vote;
  //   console.log(vote);

  //   var newData = satisfactionData;
  //   newData.push(createData("00:00", vote * 10));

  //   setSatisfactionData(newData);
  // }, []);

}
