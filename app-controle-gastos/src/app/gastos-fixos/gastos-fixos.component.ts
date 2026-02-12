import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gastos-fixos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gastos-fixos.component.html',
  styleUrls: ['./gastos-fixos.component.scss']
})
export class GastosFixosComponent implements OnInit {

  meses = [
    { value: 1,  label: 'Janeiro'   },
    { value: 2,  label: 'Fevereiro' },
    { value: 3,  label: 'Março'     },
    { value: 4,  label: 'Abril'     },
    { value: 5,  label: 'Maio'      },
    { value: 6,  label: 'Junho'     },
    { value: 7,  label: 'Julho'     },
    { value: 8,  label: 'Agosto'    },
    { value: 9,  label: 'Setembro'  },
    { value: 10, label: 'Outubro'   },
    { value: 11, label: 'Novembro'  },
    { value: 12, label: 'Dezembro'  }
  ];

  anos: number[] = [];
  selectedMes: number = new Date().getMonth() + 1;
  selectedAno: number = new Date().getFullYear();

  constructor(private router: Router) {}

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    for (let y = currentYear - 3; y <= currentYear + 1; y++) {
      this.anos.push(y);
    }
  }

  atualizar(): void {
    // Chame aqui o serviço para buscar os dados do mês/ano selecionado
    console.log('Buscando dados:', this.selectedMes, this.selectedAno);
  }
}