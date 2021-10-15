<template>
  <v-card class="pa-2">
    <v-row>
      <v-col cols="12" sm="4">
        <v-row justify="center">
          <v-switch
            v-model="armorBreakpoints"
            label="Show Armor Breakpoints"
            color="primary"
          />
        </v-row>
      </v-col cols="12" sm="4">
      <v-col>
        <v-row justify="center">
          <v-switch
            v-model="healthBreakpoints"
            label="Show Health Breakpoints"
            color="primary"
          />
        </v-row>
      </v-col>
      <v-col cols="12" sm="4">
        <v-row justify="center">
          <v-switch
            v-model="toggleAll"
            label="Show All Ammo"
            color="primary"
          />
        </v-row>
      </v-col>
    </v-row>
    <div>
      <ApexChart ref="chart" type="scatter" :options="apexOptions" :series="apexData"></ApexChart>
    </div>
    <v-overlay absolute :value="chartLoading" color="#000000">
      <v-row justify="center">
        <h2>Loading...</h2>
      </v-row>
      <v-row justify="center">
        <v-icon class="icon-spinner" size="x-large">mdi-loading</v-icon>
      </v-row>
    </v-overlay>
  </v-card>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      chartLoading: false,
      armorBreakpoints: false,
      healthBreakpoints: false,
      toggleAll: true,
      colors: [
        '#0165fc',
        '#fea051',
        '#41fdfe',
        '#99FF99',
        '#FF1A66',
        '#d0ff14',
        '#21fc0d',
        '#FF33FF',
        '#eb5030',
        '#fe01b1',
        '#00B3E6',
        '#bc13fe',
        '#ff000d',
        '#CCCC00',
        '#66E64D',
        '#4D80CC',
        '#E64D66',
        '#4DB380',
        '#66991A',
        '#6666FF',
        '#078C00'
      ],
      armorAnnotations: [
        {
          y: 10,
          borderColor: '#ffffff',
          label: {
            borderColor: '#ffffff',
            style: {
              color: '#212121',
              background: '#ffffff'
            },
            text: 'Class 1 Armor'
          }
        },
        {
          y: 20,
          borderColor: '#ffffff',
          label: {
            borderColor: '#ffffff',
            style: {
              color: '#212121',
              background: '#ffffff'
            },
            text: 'Class 2 Armor'
          }
        },
        {
          y: 30,
          borderColor: '#ffffff',
          label: {
            borderColor: '#ffffff',
            style: {
              color: '#212121',
              background: '#ffffff'
            },
            text: 'Class 3 Armor'
          }
        },
        {
          y: 40,
          borderColor: '#ffffff',
          label: {
            borderColor: '#ffffff',
            style: {
              color: '#212121',
              background: '#ffffff'
            },
            text: 'Class 4 Armor'
          }
        },
        {
          y: 50,
          borderColor: '#ffffff',
          label: {
            borderColor: '#ffffff',
            style: {
              color: '#212121',
              background: '#ffffff'
            },
            text: 'Class 5 Armor'
          }
        },
        {
          y: 60,
          borderColor: '#ffffff',
          label: {
            borderColor: '#ffffff',
            style: {
              color: '#212121',
              background: '#ffffff'
            },
            text: 'Class 6 Armor'
          }
        }
      ],
      healthAnnotations: [
        {
          x: 35,
          borderColor: '#ffffff',
          label: {
            borderColor: '#ffffff',
            style: {
              color: '#212121',
              background: '#ffffff'
            },
            text: 'Head Health'
          }
        },
        {
          x: 85,
          borderColor: '#ffffff',
          label: {
            borderColor: '#ffffff',
            style: {
              color: '#212121',
              background: '#ffffff'
            },
            text: 'Thorax Health'
          }
        }
      ]
    }
  },

  computed: {
    apexOptions() {
      return {
        chart: {
          id: 'scatter-plot-chart',
          background: '#161616',
          fontFamily: 'Bender Regular, Roboto, sans-serif',
          toolbar: {
            show: false
          },
          zoom: {
            enabled: false
          }
        },
        responsive: [{
          breakpoint: 768,
          options: {
            chart: {
              height: 500
            },
            xaxis: {
              tickAmount: 5
            }
          }
        }],
        theme: {
          mode: 'dark'
        },
        colors: this.colors,
        title: {
          text: 'Hover ammo to highlight, click to show/hide',
          align: 'centre'
        },
        legend: {
          position: 'top'
        },
        tooltip: {
          custom: function({series, seriesIndex, dataPointIndex, w}) {
            const dataPoint = w.config.series[seriesIndex].data[dataPointIndex]
            return '<div class="tooltip-container">' +
              '<div class="tooltip-title">' + dataPoint.title + '</div>' +
              '<div class="tooltip-body">' +
              '<div>Damage: ' + dataPoint.x + '</div>' +
              '<div>Penetration: ' + dataPoint.y + '</div>' +
              '</div>'
              '</div>'
          }
        },
        xaxis: {
          title: {
            text: 'Damage'
          },
          min: 0,
          max: 280,
          tickAmount: 10
        },
        yaxis: {
          title: {
            text: 'Penetration'
          }
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
              enabled: true,
              delay: 150
          },
          dynamicAnimation: {
              enabled: true,
              speed: 350
          }
        },
        annotations: {
          yaxis: this.armorBreakpoints ? this.armorAnnotations : [],
          xaxis: this.healthBreakpoints ? this.healthAnnotations : []
        }
      }
    },
    apexData() {
      let index = 0
      const datasets = []

      for (const ammo of this.data) {
        const name = ammo.name.split(' ')[0]
        let index = datasets.findIndex(item => item.name === name)

        if (index === -1) {
          datasets.push({
            name: name,
            data: []
          })
          index = datasets.length - 1
        }

        if (ammo.damage.includes('x')) {
          datasets[index].data.push({
            x: parseInt(ammo.damage.split('x')[1]),
            y: parseInt(ammo.penetration),
            title: `${ammo.name} (Per Pellet)`
          })
        } else {
          datasets[index].data.push({
            x: parseInt(ammo.damage),
            y: parseInt(ammo.penetration),
            title: ammo.name
          })
        }
      }

      return datasets
    },
    chartLabels() {
      const labels = []
      for (const ammo of this.data) {
        const name = ammo.name.split(' ')[0]
        if (labels.includes(name)) {
          labels.push(name)
        }
      }
      return labels
    }
  },

  watch: {
    toggleAll: function(bool) {
      this.chartLoading = true
      setTimeout(() => {
        for (const item of this.apexData) {
          bool ? this.$refs.chart.showSeries(item.name) : this.$refs.chart.hideSeries(item.name)
        }
        this.chartLoading = false
      }, 25)
    }
  }
}
</script>

<style>
#chart {
  min-height: 70vh;
}
.tooltip-title {
  background: #968465;
  color: #000000;
  padding: 10px;
}
.tooltip-body {
  padding: 10px;
}
.icon-spinner {
  animation:rotate 1s  infinite;
  animation-timing-function: cubic-bezier(1,0, .5,1);
}

@keyframes rotate {
  from { -webkit-transform: rotate(0deg) }
  to { -webkit-transform: rotate(360deg) }
}
</style>
