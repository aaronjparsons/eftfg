<template>
  <v-card>
    <canvas id="chart" ref="chart"></canvas>
  </v-card>
</template>

<script>
import Chart from 'chart.js'

export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      scatterChart: null,
      colors: [
        '#0165fcfa',
        '#fea051fa',
        '#41fdfefa',
        '#99FF99fa',
        '#FF1A66fa',
        '#d0ff14fa',
        '#21fc0dfa',
        '#FF33FFfa',
        '#eb5030fa',
        '#fe01b1fa',
        '#00B3E6fa',
        '#bc13fefa',
        '#ff000dfa',
        '#CCCC00fa',
        '#66E64Dfa',
        '#4D80CCfa',
        '#E64D66fa',
        '#4DB380fa',
        '#66991Afa',
        '#6666FFfa'
      ],
      options: {
        title: {
          display: true,
          text: 'Hover caliber to highlight, click to hide'
        },
        animation: {
          duration: 500
        },
        legend: {
          labels: {
            boxWidth: 15
          },
          onHover: this.onLegendHover,
          onLeave: this.onLegendLeave
        },
        maintainAspectRatio: false,
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              const dsIndex = tooltipItem.datasetIndex
              const index = tooltipItem.index
              const ammoType = data.datasets[dsIndex].data[index].ammoName
              return ammoType
            },
            afterLabel: function(tooltipItem) {
              return [
                `Damage: ${tooltipItem.yLabel}`,
                `Penetration: ${tooltipItem.xLabel}`
              ]
            }
          }
        },
        scales: {
          xAxes: [
            {
              type: 'linear',
              position: 'bottom',
              scaleLabel: {
                display: true,
                labelString: 'Penetration'
              }
            }
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Damage'
              }
            }
          ]
        }
      }
    }
  },

  computed: {
    chartLabels() {
      const labels = []
      for (const ammo of this.data) {
        const name = ammo.name.split(' ')[0]
        if (labels.includes(name)) {
          labels.push(name)
        }
      }
      return labels
    },
    mappedData() {
      let index = 0
      const datasets = []
      let currentObject = {
        label: '',
        data: [],
        borderColor: this.colors[index],
        backgroundColor: this.colors[index]
      }
      for (const ammo of this.data) {
        const name = ammo.name.split(' ')[0]
        if (currentObject.label === '') {
          currentObject.label = name
        }
        if (currentObject.label !== name) {
          datasets.push(currentObject)
          index++
          currentObject = {
            label: name,
            data: [],
            borderColor: this.colors[index],
            backgroundColor: this.colors[index]
          }
        }
        if (ammo.damage.includes('x')) {
          currentObject.data.push({
            x: ammo.penetration,
            y: parseInt(ammo.damage.split('x')[1]),
            ammoName: `${ammo.name} (Per Pellet)`
          })
        } else {
          currentObject.data.push({
            x: ammo.penetration,
            y: ammo.damage,
            ammoName: ammo.name
          })
        }
      }
      if (
        currentObject.label === this.chartLabels[this.chartLabels.length - 1]
      ) {
        datasets.push(currentObject)
      }
      return datasets
    }
  },

  mounted() {
    const ctx = this.$refs.chart
    Chart.defaults.global.defaultFontColor = '#ccc'
    this.scatterChart = new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: this.mappedData
      },
      options: this.options
    })
  },

  methods: {
    onLegendHover(event, legendItem) {
      event.srcElement.style.cursor = 'pointer'

      // If item has been hidden on chart, we don't want to highlight it
      if (legendItem.hidden) {
        return
      }

      // Reduce opacity for all items not hovered
      for (const index in this.mappedData) {
        if (index != legendItem.datasetIndex) {
          const color = this.colors[index].slice(0, -2) + '0a'
          this.mappedData[index].backgroundColor = color
          this.mappedData[index].borderColor = color
        }
      }
      this.scatterChart.update()
    },
    onLegendLeave(event, legendItem) {
      event.srcElement.style.cursor = 'default'

      // Return all items to full opacity
      for (const index in this.mappedData) {
        const color = this.colors[index].slice(0, -2) + 'fa'
        this.mappedData[index].backgroundColor = color
        this.mappedData[index].borderColor = color
      }
      this.scatterChart.update()
    }
  }
}
</script>

<style scoped>
#chart {
  min-height: 70vh;
}
</style>
