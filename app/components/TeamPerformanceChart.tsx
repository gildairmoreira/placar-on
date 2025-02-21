'use client';

import { useEffect, useRef } from 'react';
import * as LightweightCharts from 'lightweight-charts';

interface PerformanceData {
  time: string;
  value: number;
}

interface TeamPerformanceChartProps {
  data: PerformanceData[];
  title: string;
}

export function TeamPerformanceChart({ data, title }: TeamPerformanceChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Create chart instance
    const chart = LightweightCharts.createChart(chartContainerRef.current, {
      layout: {
        background: { 
          type: 'solid', 
          color: 'rgb(31, 41, 55)' 
        },
        textColor: 'white',
      },
      grid: {
        vertLines: { color: 'rgba(197, 203, 206, 0.1)' },
        horzLines: { color: 'rgba(197, 203, 206, 0.1)' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
    });

    // Create the series
    const series = chart.addAreaSeries({
      lineColor: '#60A5FA',
      topColor: 'rgba(96, 165, 250, 0.4)',
      bottomColor: 'rgba(96, 165, 250, 0)',
      lineWidth: 2,
    });

    // Set the data
    series.setData(data);

    // Fit content
    chart.timeScale().fitContent();

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data]);

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
      <div ref={chartContainerRef} />
    </div>
  );
} 