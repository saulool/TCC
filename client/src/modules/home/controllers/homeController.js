import moment from 'moment';
import * as currencyFormatter from 'currencyFormatter.js';

HomeController.$inject = ['$scope'];

export default function HomeController() {
	const vm = this;

	vm.expensesChart = {
		options: {
			tooltips: {
				enabled: true,
				mode: 'single',
				callbacks: {
					label: function(tooltipItem, data) {
						var label = data.labels[tooltipItem.index];
						var datasetLabel = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
						return label + ': ' + currencyFormatter.format(datasetLabel, { currency: 'BRL' });
					}
				}
			}
		},
		data: {
			labels: ["Lazer", "Saúde", "Alimentação", "Contas"],
			values: [347.10, 1247.10, 33.40, 130.11]
		}
	}

	vm.accountBalanceChart = {
		options: {
			tooltips: {
				enabled: true,
				mode: 'single',
				callbacks: {
					label: function(tooltipItem, data) {
						var label = data.labels[tooltipItem.index];
						var datasetLabel = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
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
			}
		},
		data: {
			labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
			series: ["Saldo"],
			values: [[13039, 15004, 19330, 13940, 15600, 20345, 50013, 45956, 43959, 39495, 37293, 40384]]
		}
	}

	vm.lastExpenses = [
		{
			date: moment().format('DD/MM/YYYY'),
			type: 'Lazer',
			cost: currencyFormatter.format(100.30, { currency: 'BRL' })
		},
		{
			date: moment().add(2,'day').format('DD/MM/YYYY'),
			type: 'Saúde',
			cost: currencyFormatter.format(1247.10, { currency: 'BRL' })
		},
		{
			date: moment().add(5,'day').format('DD/MM/YYYY'),
			type: 'Alimentação',
			cost: currencyFormatter.format(33.40, { currency: 'BRL' })
		},
		{
			date: moment().add(9,'day').format('DD/MM/YYYY'),
			type: 'Contas',
			cost: currencyFormatter.format(130.11, { currency: 'BRL' })
		},
		{
			date: moment().add(13,'day').format('DD/MM/YYYY'),
			type: 'Lazer',
			cost: currencyFormatter.format(246.80, { currency: 'BRL' })
		}
		,
		{
			date: moment().add(13,'day').format('DD/MM/YYYY'),
			type: 'Lazer',
			cost: currencyFormatter.format(246.80, { currency: 'BRL' })
		}
		,
		{
			date: moment().add(13,'day').format('DD/MM/YYYY'),
			type: 'Lazer',
			cost: currencyFormatter.format(246.80, { currency: 'BRL' })
		}
		,
		{
			date: moment().add(13,'day').format('DD/MM/YYYY'),
			type: 'Lazer',
			cost: currencyFormatter.format(246.80, { currency: 'BRL' })
		}
		,
		{
			date: moment().add(13,'day').format('DD/MM/YYYY'),
			type: 'Lazer',
			cost: currencyFormatter.format(246.80, { currency: 'BRL' })
		},
		{
			date: moment().add(13,'day').format('DD/MM/YYYY'),
			type: 'Lazer',
			cost: currencyFormatter.format(246.80, { currency: 'BRL' })
		}
	]
}