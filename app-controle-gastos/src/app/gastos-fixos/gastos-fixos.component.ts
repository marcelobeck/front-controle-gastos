import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface GastoFixo {
  id: number;
  descricao: string;
  valorMensal: number;
  categoria: string;
  mes: number;
  ano: number;
}

@Component({
  selector: 'app-gastos-fixos',
  standalone: true,
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './gastos-fixos.component.html',
  styleUrls: ['./gastos-fixos.component.scss']
})
export class GastosFixosComponent implements OnInit {

  categorias = [
    'Moradia',
    'Transporte',
    'Alimentação',
    'Saúde',
    'Educação',
    'Lazer',
    'Assinaturas',
    'Outros'
  ];

  novoGasto = {
    descricao: '',
    valorMensal: 0,
    categoria: 'Moradia'
  };

  gastosFixos: GastoFixo[] = [];
  private nextId = 1;

  mesFiltro: number = new Date().getMonth();
  anoFiltro: number = new Date().getFullYear();

  readonly nomeMeses = [
    'Janeiro','Fevereiro','Março','Abril','Maio','Junho',
    'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'
  ];

  get labelMesFiltro(): string {
    return `${this.nomeMeses[this.mesFiltro]} ${this.anoFiltro}`;
  }

  get gastosFiltrados(): GastoFixo[] {
    return this.gastosFixos.filter(
      g => g.mes === this.mesFiltro && g.ano === this.anoFiltro
    );
  }

    mesAnterior(): void {
    if (this.mesFiltro === 0) {
      this.mesFiltro = 11;
      this.anoFiltro--;
    } else {
      this.mesFiltro--;
    }
  }

  mesPosterior(): void {
    if (this.mesFiltro === 11) {
      this.mesFiltro = 0;
      this.anoFiltro++;
    } else {
      this.mesFiltro++;
    }
  }

  ngOnInit(): void {}

  adicionarGastoFixo(): void {
    if (!this.novoGasto.descricao.trim() || this.novoGasto.valorMensal <= 0) {
      return;
    }

    this.gastosFixos.push({
      id: this.nextId++,
      descricao: this.novoGasto.descricao.trim(),
      valorMensal: this.novoGasto.valorMensal,
      categoria: this.novoGasto.categoria,
      mes: new Date().getMonth(),  
      ano: new Date().getFullYear()
    });

    // Reset form
    this.novoGasto = {
      descricao: '',
      valorMensal: 0,
      categoria: 'Moradia'
    };
  }

  removerGasto(id: number): void {
    this.gastosFixos = this.gastosFixos.filter(g => g.id !== id);
  }

  editarGasto(gasto: GastoFixo): void {
    // Preenche o formulário com os dados do gasto para edição
    this.novoGasto = {
      descricao: gasto.descricao,
      valorMensal: gasto.valorMensal,
      categoria: gasto.categoria
    };
    this.removerGasto(gasto.id);
  }
}