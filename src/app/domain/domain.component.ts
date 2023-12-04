import { Component, OnInit, Input } from '@angular/core';
import { Domain } from 'src/app/domain/domain';

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.css']
})
export class DomainComponent implements OnInit {

  @Input() domain?: Domain;

  constructor() { }

  ngOnInit(): void {
  }

}
