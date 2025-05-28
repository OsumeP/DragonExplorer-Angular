import { Component, inject, Input, Signal, signal, WritableSignal } from '@angular/core';
import { CharModel } from '../../../../models/char-model';
import { SearchBarComponent } from "../../../shared/components/search-bar/search-bar.component";
import { OptionBoxComponent } from "../../../shared/components/option-box/option-box.component";
import { FilterChar } from '../../../../models/filter-char';
import { CharactersService } from '@shared/services/characters.service';
import { finalize, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-char-filters',
  imports: [SearchBarComponent, OptionBoxComponent],
  templateUrl: './char-filters.component.html',
  styleUrl: './char-filters.component.css'
})
export class CharFiltersComponent {
  @Input({ required: true }) characters = signal<CharModel[]>([]);
  @Input() filtered = signal(false);
  @Input() loading = signal(false);
  charService = inject(CharactersService);
  filters: FilterChar = this.charService.filters;

  addAffiliation(event: string) {
    this.filters.affiliation = event;
  }
  addName(event: string) {
    this.filters.name = event;
  }
  addGender(event: string) {
    this.filters.gender = event;
  }
  addRace(event: string) {
    this.filters.race = event;
  }

  searchFiltersHandler() {
    this.filtered.set(true);
    this.loading.set(true);

    this.charService.getFilteredCharacters().subscribe({
      next: (response) => {
        this.characters.set(response);
        this.loading.set(false); // ← Desactivar loading al recibir respuesta
      },
      error: (err) => {
        console.error('Error:', err);
        this.loading.set(false); // ← Desactivar loading en caso de error
      }
    });
  }
}
