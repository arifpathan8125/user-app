import { Component, inject, effect } from '@angular/core';
import * as d3 from 'd3';
import { UserStore } from '../../store/user.store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-repositories-stars-chart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './repositories-stars-chart.component.html'
})
export class RepositoriesStarsChartComponent {
  readonly store = inject(UserStore);
  private margin: number = 50;
  private width: number = 750 - (this.margin * 2);
  private height: number = 400 - (this.margin * 2);
  private svg: any;

  constructor() {
    /* create svg and draw bars once repositories are stored in SignalStore */
    effect(() => {
      if (this.store.repos().length) {
        this.createSvg();
        this.drawBars(this.store.repos());
      }
    })
  }

  /* create svg */
  createSvg(): void {
    this.svg = d3.select("figure#bar")
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin * 2 + "," + this.margin / 4 + ")");
  }

  /* draw bars */
  drawBars(data: any[]): void {
    // Create the X-axis band scale
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.name))
      .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .domain([0, 10000])
      .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
      .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg.selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d: any) => x(d.name))
      .attr("y", (d: any) => y(d.stargazerCount))
      .attr("width", x.bandwidth())
      .attr("height", (d: any) => this.height - y(d.stargazerCount))
      .attr("fill", "#d04a35");

    this.svg.append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", this.width)
      .attr("y", this.height + 60)
      .text("Visionmedia repositories");

    this.svg.append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("y", -60)
      .attr("dy", ".75em")
      .attr("transform", "rotate(-90)")
      .text("No. of Stars");
  }
}
