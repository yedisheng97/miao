let yedisheng97 = {
  chunk: function (array, size) {
    let result = []
    for (i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size))
    }
    return result
  }
}
