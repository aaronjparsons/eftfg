<template>
  <v-card class="pa-2">
    <v-row>
      <v-col>
        <v-row justify="center">
          <v-switch
            v-model="armorBreakpoints"
            label="Show Armor Breakpoints"
          />
        </v-row>
      </v-col>
      <v-col>
        <v-row justify="center">
          <v-switch
            v-model="healthBreakpoints"
            label="Show Health Breakpoints"
          />
        </v-row>
      </v-col>
    </v-row>
    <div>
      <ApexChart type="scatter" :options="apexOptions" :series="apexData"></ApexChart>
    </div>
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
      armorBreakpoints: false,
      healthBreakpoints: false,
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
        '#6666FF'
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
          x: 80,
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
          background: '#424242',
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
          text: 'Hover calibre to highlight, click to hide',
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
          max: 250,
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
      let currentObject = {
        name: '',
        data: []
      }
      for (const ammo of this.data) {
        const name = ammo.name.split(' ')[0]
        if (currentObject.name === '') {
          currentObject.name = name
        }
        if (currentObject.name !== name) {
          datasets.push(currentObject)
          index++
          currentObject = {
            name: name,
            data: []
          }
        }
        if (ammo.damage.includes('x')) {
          currentObject.data.push({
            x: parseInt(ammo.damage.split('x')[1]),
            y: parseInt(ammo.penetration),
            title: `${ammo.name} (Per Pellet)`
          })
        } else {
          currentObject.data.push({
            x: parseInt(ammo.damage),
            y: parseInt(ammo.penetration),
            title: ammo.name
          })
        }
      }
      if (
        currentObject.name === this.chartLabels[this.chartLabels.length - 1]
      ) {
        datasets.push(currentObject)
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
  }
}
</script>

<style>
#chart {
  min-height: 70vh;
}
.tooltip-title {
  background: rgba(19, 19, 19, 0.781);
  padding: 10px;
}
.tooltip-body {
  padding: 10px;
}
</style>
