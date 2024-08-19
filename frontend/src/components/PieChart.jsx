import React, {useRef, useEffect} from 'react'
import Chart from 'chart.js/auto';

function PieChart({expensi}) {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const chart = new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: options
    });

    return () => {
      chart.destroy();
    };
  }, [expensi]);

  expensi = expensi.filter((expense) => (
    expense.cost > 0
  ));

  const data = {
    labels: expensi.map(expense => expense.user.username),
    datasets: [
      {
        label: 'Spent by user',
        data: expensi.map(expense => expense.cost)
      }
    ]
  }

  const options = {}

  

  return (
    <canvas ref={chartRef} style={{width: "500px"}}/>
  )
}

export default PieChart