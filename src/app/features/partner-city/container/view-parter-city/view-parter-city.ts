import { Component, input, OnInit } from '@angular/core';
import { PartnerCityResponseDto } from '../../../../core/models/PartnerCityHistoryResponseDto';
import { environment } from '../../../../../environments/environment';
import { AgChartOptions } from 'ag-charts-community';
import { AgCharts } from 'ag-charts-angular';
@Component({
  selector: 'app-view-parter-city',
  imports: [AgCharts],
  templateUrl: './view-parter-city.html',
  styleUrl: './view-parter-city.css'
})
export class ViewParterCity implements OnInit {

  cityDetail = input.required<PartnerCityResponseDto>();
  urlBase = environment.apiUrl;
  // Chart Options
  public options!: AgChartOptions;
  constructor() {
    
  }

  ngOnInit(): void {
    const score = this.cityDetail().score;
    const highScore = this.cityDetail().highScore * 100 /4;
    const progress = this.cityDetail().progress;
    const lowerScore = this.cityDetail().lowerScore * 100 /4;

    // Minimum display value for zero scores
    const minDisplay = 0.5;

    this.options = {
      width: 120,  
      height: 120,
      series: [
        {
          type: 'donut',
          data: [
            { type: 'highScore', value: highScore || minDisplay, actualValue: highScore },
            { type: '', value: 100 - (highScore || minDisplay) }
          ],
          angleKey: 'value',
          innerRadiusRatio: 0.55,
          outerRadiusRatio: 0.7,
          fills: ['#DDB000', '#EEE7CA'],
          showInLegend: false,
          calloutLabelKey: 'type'
        },
        {
          type: 'donut',
          data: [
            { type: 'progress', value: progress || minDisplay, actualValue: progress },
            { type: '', value: 100 - (progress || minDisplay) }
          ],
          angleKey: 'value',
          innerRadiusRatio: 0.35,
          outerRadiusRatio: 0.5,
          fills: ['#FFCB00', '#EEE7CA'],
          showInLegend: false,
          calloutLabelKey: 'type'
        },
        {
          type: 'donut',
          data: [
            { type: 'lowerScore', value: lowerScore || minDisplay, actualValue: lowerScore },
            { type: '', value: 100 - (lowerScore || minDisplay) }
          ],
          angleKey: 'value',
          innerRadiusRatio: 0.15,
          outerRadiusRatio: 0.3,
          fills: ['#FFDE60', '#EEE7CA'],
          showInLegend: false,
          calloutLabelKey: 'type',
          tooltip: {
            enabled: false,
            renderer: params => {
              const data = params.datum as any;
              return `${data.type || ''}: ${data.actualValue ?? 0}`;
            }
          }
        },
      ],
      legend: { enabled: false },
      gradientLegend:{enabled:true,position:'bottom'},
      title: { text: '' },
      subtitle: { text: '' },
      background: {
        fill: 'transparent',
      },
    };
  }

  onImgError(event: Event) {
    (event.target as HTMLImageElement).src = '../../../../Frame 1321315029.png';
  }
}

