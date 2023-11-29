import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Specialist } from '../../shared/specialist.interface';

@Component({
  selector: 'app-specialist-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './specialist-details.component.html',
  styleUrl: './specialist-details.component.css',
})
export class SpecialistDetailsComponent implements OnInit {
  @Input() details!: Specialist;

  constructor() {}

  ngOnInit(): void {}
}
