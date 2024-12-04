import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {
  Chart,
  registerables
} from 'chart.js';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  chartData: any;

  constructor(private http: HttpClient) {
    // Register all necessary Chart.js components
    Chart.register(...registerables);
  }

  ngOnInit() {
    // Get the token from localStorage
    const token = localStorage.getItem('token');

    // Prepare headers with the token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    // Fetch chart data from the backend
    this.http.get<any>('api/summary-chart', { headers }).subscribe(
      (data) => {
        this.chartData = data;
        this.createCharts();
      },
      (error) => {
        console.error('Error fetching chart data:', error);
      }
    );
  }

  // Create both Pie Chart and Line Chart
  createCharts() {
    if (this.chartData) {
      // Pie Chart: Generative AI Applications Across Industries
      const industries = this.chartData.pieChartData.map((item: any) => item.industry);
      const shares = this.chartData.pieChartData.map((item: any) => item.application_share);

      new Chart('pieChart', {
        type: 'pie',
        data: {
          labels: industries,
          datasets: [{
            data: shares,
            backgroundColor: ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#00BCD4', '#FFC107'],
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            tooltip: { callbacks: { label: (context) => `${context.label}: ${context.raw}%` } }
          }
        }
      });

      // Line Chart: Generative AI Growth Over Time
      const years = this.chartData.lineChartData.map((item: any) => item.year);
      const papers = this.chartData.lineChartData.map((item: any) => item.research_papers_published);

      new Chart('lineChart', {
        type: 'line',
        data: {
          labels: years,
          datasets: [{
            label: 'Research Papers Published',
            data: papers,
            borderColor: '#33A8FF',
            backgroundColor: 'rgba(51, 168, 255, 0.2)',
            fill: true
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: { title: { display: true, text: 'Year' } },
            y: { title: { display: true, text: 'Papers Published' } }
          }
        }
      });
    }
  }
}
