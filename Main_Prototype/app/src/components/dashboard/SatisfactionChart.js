import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';

// Generate Sales Data
function createData(time, satRate) {
  return { time, satRate };
}

const data = [
  createData('22:00', 20),
  createData('22:05', 30),
  createData('22:10', 60),
  createData('22:15', 80),
  createData('22:20', 40),
  createData('22:25', 20),
  createData('22:30', 50),
  createData('22:35', 80),
  createData('22:40', 89),
];

export default function SatisfactionChart() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Guest satisfaction with current music</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Satisfaction (%)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="satRate" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
