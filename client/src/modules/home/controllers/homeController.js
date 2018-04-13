import moment from 'moment';
import * as currencyFormatter from 'currencyFormatter.js';

HomeController.$inject = ['LancamentoService', 'localStorageService', 'CATEGORIAS_LANCAMENTOS'];

export default function HomeController(LancamentoService, localStorageService, CATEGORIAS_LANCAMENTOS) {
	const vm = this;
	const usuario = localStorageService.get('usuario');

	const lancamentosEntreDatas = (dataLancamento, tipoIntervaloInicio, tipoIntervaloFim = tipoIntervaloInicio) => dataLancamento >= moment().startOf(tipoIntervaloInicio) && dataLancamento <= moment().endOf(tipoIntervaloFim);

	const montarDespesasMes = (lancamentos) => {
		vm.tiposDespesas = lancamentos.reduce((acumulador, lancamento) => {
			let dataLancamento = moment(lancamento.data);
			if(lancamentosEntreDatas(dataLancamento, 'month') && lancamento.tipo == 'D')
				acumulador[CATEGORIAS_LANCAMENTOS[lancamento.natureza]] ? acumulador[CATEGORIAS_LANCAMENTOS[lancamento.natureza]] += lancamento.valor : acumulador[CATEGORIAS_LANCAMENTOS[lancamento.natureza]] = lancamento.valor;

			return acumulador;
		}, {});

		vm.expensesChart = {
			options: {
				tooltips: {
					enabled: true,
					mode: 'single',
					callbacks: {
						label: function(tooltipItem, data) {
							const label = data.labels[tooltipItem.index];
							const datasetLabel = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
							return label + ': ' + currencyFormatter.format(datasetLabel, { currency: 'BRL' });
						}
					}
				}
			},
			data: {
				labels: Object.keys(vm.tiposDespesas),
				values: Object.values(vm.tiposDespesas)
			}
		}
	}

	const montarGraficoAno = (lancamentos) => {
		let totalDespesasUltimoAno = lancamentos.reverse().reduce((acumulador, lancamento) => {
			let dataLancamento = moment(lancamento.data);
			if(dataLancamento >= moment().subtract(12, 'month').startOf('month') && dataLancamento <= moment().endOf('month')){
				if(acumulador[moment(lancamento.data).format('MMMM/YY')]){
					if(acumulador[moment(lancamento.data).format('MMMM/YY')][lancamento.tipo]) {
						acumulador[moment(lancamento.data).format('MMMM/YY')][lancamento.tipo] += lancamento.valor;
					}else{
						acumulador[moment(lancamento.data).format('MMMM/YY')][lancamento.tipo] = lancamento.valor;	
					}
				} else {
					acumulador[moment(lancamento.data).format('MMMM/YY')] = {
						[lancamento.tipo]: lancamento.valor
					}
				}
			}

			return acumulador;
		}, {});

		let lancamentosR = Object.values(totalDespesasUltimoAno).map((valor) => {
			return valor.R ? valor.R : 0;
		});

		let lancamentosD = Object.values(totalDespesasUltimoAno).map((valor) => {
			return valor.D ? valor.D : 0;
		});

		vm.accountBalanceChart = {
			options: {
				tooltips: {
					enabled: true,
					mode: 'single',
					callbacks: {
						label: function(tooltipItem, data) {
							const label = data.labels[tooltipItem.index];
							const datasetLabel = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
							return currencyFormatter.format(datasetLabel, { currency: 'BRL' });
						}
					}
				},
				scales: {
					yAxes: [
						{
							type: 'linear',
							position: 'left',
							ticks: {
								min: 0,
								callback: function(label, index, labels) {
			                        return currencyFormatter.format(label, { currency: 'BRL' });
			                    }
							}
						}
					],
				},
				legend: {
					display: true
				}
			},
			data: {
				labels: Object.keys(totalDespesasUltimoAno),
				series: ["Receitas", "Despesas"],
				values: [lancamentosR, lancamentosD]
			}
		}
	}

	const montarUltimasDespesas = (lancamentos) => {
		vm.ultimasDespesas = lancamentos.reduce((acumulador, lancamento) => {
			let dataLancamento = moment(lancamento.data);
			if(lancamentosEntreDatas(dataLancamento, 'month'))
				acumulador.push({
					data: moment(lancamento.data).format('DD/MM/YYYY - HH:mm:ss'),
					natureza: CATEGORIAS_LANCAMENTOS[lancamento.natureza],
					descricao: lancamento.descricao,
					valor: currencyFormatter.format(lancamento.valor, { currency: 'BRL' })
				});

			return acumulador;
		}, []).slice(0, 10);
	}

	LancamentoService.getLancamentos({
		ordenacao: 'DESC',
		de: moment().subtract(1, 'year').startOf('year').format('YYYY-MM-DD'),
		ate: moment().endOf('year').format('YYYY-MM-DD'),
		idUsuario: usuario.id
	}).then((response) => {
		let lancamentos = response.data.map((lancamento) => {
			return {
				data: lancamento.data,
				tipo: lancamento.tipo,
				natureza: lancamento.natureza,
				descricao: lancamento.descricao,
				valor: lancamento.valor
			}
		});

		montarUltimasDespesas(lancamentos);

		montarDespesasMes(lancamentos);

		montarGraficoAno(lancamentos);
	});
}