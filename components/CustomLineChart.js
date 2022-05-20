import React  from 'react'
import { LineChart } from 'react-native-chart-kit'

const CustomLineChart = ({data = [0],hour= [0]}) => {

    const chartData = {
        labels: hour,
        datasets: [
          {
            data: data
          }
        ]
      }
    return (
        <LineChart data={chartData}
            width={320} // from react-native
            height={170}
            chartConfig={
                {
                    backgroundColor: "#8CB0D3",
                    backgroundGradientFrom: "#1A2938",
                    backgroundGradientTo: "#284F76",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,

                }
            }
            withVerticalLabels={true}
            withHorizontalLabels={true}
            yAxisSuffix='kWh'
            xAxisLabel=':00'
            style={
                {
                    height: 160,
                    elevation: 5,
                    borderRadius: 10,
                    marginHorizontal: 20,
                    marginTop: 10,
                    marginBottom: 5,


                }
            }
            bezier 
        />
    )
}

export default CustomLineChart