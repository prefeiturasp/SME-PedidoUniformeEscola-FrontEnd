import React, { PureComponent } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell
} from "recharts";
import "./style.scss";

const COLORS = ["#80d7c9", "#3cc0ab", "#f69084", "#f3e68d", "#edb971"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      font-weight="bold"
      fill="black"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class GraficoVagasMatriculasSME extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      rContainerHeight: 250,
      vAlignLegenda: "top",
      alignLegenda: "right",
      marginLegenda: {
        marginTop: "65px",
        marginLeft: "0px"
      },
    };
  }

  render() {
    const { dados } = this.props;
    return (
      <React.Fragment>
        <ResponsiveContainer
          className="mx-auto my-2"
          width="75%"
          height={this.state.rContainerHeight}
        >
          <PieChart width={400} height={400}>
            <Pie
              data={dados}
              cx={100}
              cy={100}
              isAnimationActive={false}
              label
              outerRadius={80}
              innerRadius={40}
              fill="#8884d8"
              nameKey="dado"
              dataKey="valor"
              legendType="none"
            >
              {dados.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Pie
              data={dados}
              cx={100}
              cy={100}
              isAnimationActive={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              innerRadius={40}
              fill="#8884d8"
              nameKey="dado"
              dataKey="valor"
              legendType="circle"
            >
              {dados.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              layout="vertical"
              verticalAlign={this.state.vAlignLegenda}
              iconSize={18}
              wrapperStyle={this.state.marginLegenda}
              align={this.state.alignLegenda}
            />
          </PieChart>
        </ResponsiveContainer>
      </React.Fragment>
    );
  }
}