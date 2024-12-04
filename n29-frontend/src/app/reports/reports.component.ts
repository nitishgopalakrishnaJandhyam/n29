import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  chartData: any;

  constructor(private http: HttpClient) {
    // Register all necessary Chart.js components
    Chart.register(...registerables, MatrixController, MatrixElement);
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get<any>('api/reports-chart', { headers }).subscribe(
      (data) => {
        this.chartData = data;
        this.createCharts();
      },
      (error) => {
        console.error('Error fetching chart data', error);
      }
    );
  }

  createCharts() {
    if (this.chartData) {
      // Stacked Bar Chart
      const industries = this.chartData.barChartData.map((item: any) => item.industry);
      const investment2019 = this.chartData.barChartData.map((item: any) => item.investment_2019);
      const investment2020 = this.chartData.barChartData.map((item: any) => item.investment_2020);
      const investment2021 = this.chartData.barChartData.map((item: any) => item.investment_2021);

      new Chart('barChart', {
        type: 'bar',
        data: {
          labels: industries,
          datasets: [
            { label: '2019', data: investment2019, backgroundColor: '#4CAF50' },
            { label: '2020', data: investment2020, backgroundColor: '#2196F3' },
            { label: '2021', data: investment2021, backgroundColor: '#FF9800' }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' }
          },
          scales: {
            x: { title: { display: true, text: 'Industries' } },
            y: { title: { display: true, text: 'Investment (in millions)' } }
          }
        }
      });

      // Heatmap
      const technologies = this.chartData.heatmapData.map((item: any) => item.technology);
      const industriess = ['Healthcare', 'Automotive', 'Entertainment', 'Finance', 'Retail', 'Education'];

      // Flatten the heatmap data into an array of {x, y, v} objects
      const heatmapData = this.chartData.heatmapData.flatMap((item: any) =>
        industriess.map((industry, index) => ({
          x: item.technology,
          y: industry,
          v: item[industry.toLowerCase()] // Access the value dynamically using the lowercase column name
        }))
      );

      const ctx = document.getElementById('heatmap') as HTMLCanvasElement;

      new Chart(ctx, {
        type: 'matrix', // Use the `matrix` chart type
        data: {
          datasets: [
            {
              label: 'Technology Adoption',
              data: heatmapData,
              backgroundColor: (context: any) => {
                const raw = context.raw as { v: number };
                const alpha = (raw.v - 1) / 5; // Normalize value between 1 and 5
                return `rgba(66, 133, 244, ${alpha})`; // Blue gradient based on value
              },
              borderWidth: 1,
              borderColor: 'rgba(0, 0, 0, 0.1)'
            }
          ]
        },
        options: {
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => {
                  const raw = context.raw as { x: string; y: string; v: number };
                  return `Technology: ${raw.x}, Industry: ${raw.y}, Value: ${raw.v}`;
                }
              }
            }
          },
          scales: {
            x: {
              type: 'category',
              title: { display: true, text: 'Technology' }
            },
            y: {
              type: 'category',
              title: { display: true, text: 'Industry' }
            }
          }
        }
      });




    }
  }

}
