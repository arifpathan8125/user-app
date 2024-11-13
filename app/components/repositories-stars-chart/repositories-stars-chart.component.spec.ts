import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepositoriesStarsChartComponent } from './repositories-stars-chart.component';
import { AppComponent } from '../../app.component';
import { RouterModule } from '@angular/router';

describe('RepositoriesStarsChartComponent', () => {
  let component: RepositoriesStarsChartComponent;
  let fixture: ComponentFixture<RepositoriesStarsChartComponent>;
  let mockReposStore: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepositoriesStarsChartComponent,
        RouterModule.forRoot(
          [{path: '', component: AppComponent}]
          )
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RepositoriesStarsChartComponent);
    component = fixture.componentInstance;
    mockReposStore = jasmine.createSpyObj('ReposStore', ['setRepos']);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default margin, width, and height values', () => {
    expect(component['margin']).toBe(50);
    expect(component['width']).toBe(750 - (component['margin'] * 2));
    expect(component['height']).toBe(400 - (component['margin'] * 2));
  });

  it('should draw bars with the correct data', () => {
    const testData = [
      { name: 'repo1', stargazerCount: 5000 },
      { name: 'repo2', stargazerCount: 3000 }
    ];

    component.createSvg(); // Ensure SVG is created before drawing bars
    spyOn(component, 'drawBars').and.callThrough();
    component.drawBars(testData);
    expect(component.drawBars).toHaveBeenCalledWith(testData);
    expect(component['svg'].selectAll('rect').size()).toBe(testData.length);
  });
});
