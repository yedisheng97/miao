var yedisheng97 = {
  chunk: function (array, size) {
    let result = []
    for (i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size))
    }
    return result
  },

  compact: function (array) {
    let result = []
    array.map(item => {
      if (item) {
        result.push(item)
      }
    })
    return result
  },

  concat: function (array, ...values) {
    return array.concat(...values)
  },

  difference: function (array, ...values) {
    return array.filter(value => values.flat().indexOf(value) < 0)
  },

  differenceBy: function (array, ...values) {
    const value = values.flat()
    const iteratee = value[value.length - 1]
    if (Array.isArray(value)) {
      return array.filter(it => values.flat().indexOf(it) < 0)
    }
    if (typeof iteratee === "string") {
      return array.filter(it => !new Set(value.map(item => item[iteratee])).has(it[iteratee]))
    }
    if (typeof iteratee === "function") {
      return array.filter(it => !new Set(value.map(iteratee)).has(iteratee(it)))
    }
  },



  drop: function (array, len = 1) {
    return array.slice(len)
  },

  dropRight: function (array, n = 1) {
    return n > array.length ? [] : array.slice(0, array.length - n)
  },

  fill: function (array, value, start = 0, end = array.length) {
    return array.fill(value, start, end)
  },
}

