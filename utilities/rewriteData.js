const fs = require('fs')

let rawdata = fs.readFileSync('../data/keys_copy.json');
let data = JSON.parse(rawdata);

const result = []
for (const item of data) {
  const object = {
    type: 'key',
    label: item.label,
    maps: [item.map],
    spawns: [],
    unlocks: []
  }

  for (const i in item.spawns) {
    object.spawns.push({
      map: item.map,
      marker: item.markers.length ? item.markers[i] : '',
      notes: item.spawns.length ? item.spawns[i] : '',
      image: item.images.length ? item.images[i] : '',
      video: item.videos.length ? item.videos[i] : ''
    })
  }

  for (const i in item.unlocks) {
    object.unlocks.push({
      map: item.map,
      marker: '',
      notes: item.unlocks[i],
      image: '',
      video: ''
    })
  }

  result.push(object)
}

fs.writeFileSync('../data/keys_test.json', JSON.stringify(result))