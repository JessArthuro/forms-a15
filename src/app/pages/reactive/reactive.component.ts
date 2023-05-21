import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/services/validators.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css'],
})
export class ReactiveComponent {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private validator: ValidatorsService) {
    this.crearFormulario();
    this.cargarDataAlFormulario();
    this.crearListeners();
  }

  get nombreNoValido() {
    return this.form.get('name')?.invalid && this.form.get('name')?.touched;
  }

  get apellidoNoValido() {
    return (
      this.form.get('lastname')?.invalid && this.form.get('lastname')?.touched
    );
  }

  get correoNoValido() {
    return this.form.get('email')?.invalid && this.form.get('email')?.touched;
  }

  get usuarioNoValido() {
    return this.form.get('user')?.invalid && this.form.get('user')?.touched;
  }

  get distritoNoValido() {
    return (
      this.form.get('address.district')?.invalid &&
      this.form.get('address.district')?.touched
    );
  }

  get ciudadNoValido() {
    return (
      this.form.get('address.city')?.invalid &&
      this.form.get('address.city')?.touched
    );
  }

  get pasatiempos() {
    return this.form.get('hobbies') as FormArray;
  }

  get pass1NoValido() {
    return this.form.get('pass1')?.invalid && this.form.get('pass1')?.touched;
  }

  get pass2NoValido() {
    const pass1 = this.form.get('pass1').value;
    const pass2 = this.form.get('pass2').value;

    return pass1 === pass2 ? false : true;
  }

  crearFormulario() {
    this.form = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(5)]],
        lastname: ['', [Validators.required, this.validator.noCarmona]],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
          ],
        ],
        user: ['', , this.validator.userExists],
        pass1: ['', Validators.required],
        pass2: ['', Validators.required],
        address: this.fb.group({
          district: ['', Validators.required],
          city: ['', Validators.required],
        }),
        hobbies: this.fb.array([]),
      },
      {
        validators: this.validator.samePasswords('pass1', 'pass2'),
      }
    );
  }

  crearListeners() {
    // this.form.valueChanges.subscribe((valor) => console.log(valor));
    // this.form.statusChanges.subscribe((status) => console.log({ status }));

    this.form.get('name').valueChanges.subscribe(console.log); //Escuchar los cambios de un campo en especifico
  }

  cargarDataAlFormulario() {
    // con el setValue({}) tienes que mandar todos los campos del formulario obligatoriamente
    this.form.reset({
      name: 'Arturo',
      lastname: 'Aguirre',
      email: 'prueba@demo.com',
      pass1: '123',
      pass2: '123',
      address: {
        district: 'Candelaria',
        city: 'Campeche',
      },
    });

    ['Comer', 'Jugar'].forEach((valor) =>
      this.pasatiempos.push(this.fb.control(valor))
    );
  }

  agregarPasatiempo() {
    this.pasatiempos.push(this.fb.control(''));
  }

  borrarPasatiempo(i: number) {
    this.pasatiempos.removeAt(i);
  }

  guardar() {
    // console.log(this.form);

    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((control) => {
        // esta validacion se hace por si existe otro formgroup anidado.
        if (control instanceof FormGroup) {
          return Object.values(control.controls).forEach((control) =>
            control.markAsTouched()
          );
        } else {
          control.markAsTouched();
        }
      });
    }

    // Despues del posteo del formulario lo reseteamos
    this.form.reset();
  }
}
