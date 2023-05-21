import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
})
export class TemplateComponent implements OnInit {
  user = {
    name: 'Arturo',
    lastname: 'Carmona',
    email: 'jsarturo@gmail.com',
    country: 'MEX',
    gender: 'M'
  };

  countries: any[] = []

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countriesService.getCountries().subscribe((country) => {
      this.countries = country;

      this.countries.unshift({
        nombre: 'Seleccione un pais...',
        codigo: ''
      })

      // console.log(country);
    });

    this.countriesService.getBurgers().subscribe(data => {
      console.log(data);
    })
  }

  guardar(forma: NgForm) {
    // console.log(forma);

    if (forma.invalid) {
      Object.values(forma.controls).forEach((control) => {
        control.markAsTouched();
      });

      return;
    }

    console.log(forma.value);
  }
}
