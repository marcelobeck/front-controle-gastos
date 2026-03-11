import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface GastoVariaveis {
  id: number;
  descricao: string;
  valorMensal: number;
  categoria: string;
  mes: number;
  ano: number;
}

@Component({
  selector: 'app-gastos-variaveis',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe],
  templateUrl: './gastos-variaveis.component.html',
  styleUrls: ['./gastos-variaveis.component.scss']
})
export class GastosVariaveisComponent implements OnInit {

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

  gastosVariaveis: GastoVariaveis[] = [];
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
  
  get gastosFiltrados(): GastoVariaveis[] {
    return this.gastosVariaveis.filter(
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

  adicionarGastoVariavel(): void {
    if (!this.novoGasto.descricao.trim() || this.novoGasto.valorMensal <= 0) {
      return;
    }

    this.gastosVariaveis.push({
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
    this.gastosVariaveis = this.gastosVariaveis.filter(g => g.id !== id);
  }

  editarGasto(gasto: GastoVariaveis): void {
    // Preenche o formulário com os dados do gasto para edição
    this.novoGasto = {
      descricao: gasto.descricao,
      valorMensal: gasto.valorMensal,
      categoria: gasto.categoria
    };
    this.removerGasto(gasto.id);
  }
}