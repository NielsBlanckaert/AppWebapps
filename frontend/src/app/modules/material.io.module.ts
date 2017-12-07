import {
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatDialogModule,
    MatTabsModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatStepperModule
  } from '@angular/material';
import { NgModule } from '@angular/core';
import { HomeComponent } from '../components/home/home.component';

  @NgModule({
    imports: [
      MatButtonModule,
      MatToolbarModule,
      MatCardModule,
      MatSidenavModule,
      MatIconModule,
      MatFormFieldModule,
      MatInputModule,
      MatProgressSpinnerModule,
      MatListModule,
      MatDialogModule,
      MatTabsModule,
      MatExpansionModule,
      MatSnackBarModule,
      MatStepperModule
    ],
    exports: [
      MatButtonModule,
      MatToolbarModule,
      MatCardModule,
      MatSidenavModule,
      MatIconModule,
      MatFormFieldModule,
      MatInputModule,
      MatProgressSpinnerModule,
      MatListModule,
      MatDialogModule,
      MatTabsModule,
      MatExpansionModule,
      MatSnackBarModule,
      MatStepperModule
    ]
  })
  export class MaterialModule { }