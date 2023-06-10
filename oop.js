// Vector
class Vector {

  constructor(x, y) {
    this.x = x
    this.y = y
  }

  plus(vector) {
    let x = this.x + vector.x
    let y = this.y + vector.y
    return new Vector(x, y)
  }

  minus(vector) {
    let x = this.x - vector.x
    let y = this.y - vector.y
    return new Vector(x, y)
  }

  get length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2)
  }
}

// Complex
class Complex {
  constructor(real, imag) {
    this.real = real
    this.imag = imag
  }

  static plus(a, b) {
    let real = a.real + b.real
    let imag = a.imag + b.imag
    return new Complex(real, imag)
  }

  plus(c) {
    let real = this.real + c.real
    let imag = this.imag + c.imag
    return new Complex(real, imag)
  }

  static minus(a, b) {
    let real = a.real - b.real
    let imag = a.imag - b.imag
    return new Complex(real, imag)
  }

  minus(c) {
    let real = this.real - c.real
    let imag = this.imag - c.imag
    return new Complex(real, imag)
  }

  static mul(a, b) {
    let real = a.real * b.real + a.imag * b.imag * (-1)
    let imag = a.real * b.imag + b.imag * b.real
    return new Complex(real, imag)
  }

  mul(c) {
    let real = this.real * c.real + this.imag * c.imag * (-1)
    let imag = this.real * c.imag + this.imag * c.real
    return new Complex(real, imag)
  }

  static div(a, b) {
    let helper = new Complex(b.real, -b.imag)
    let up = a.mul(helper)
    let down = b.mul(helper)
    let real = up.real / down.real
    let imag = up.imag / down.real
    return new Complex(real, imag)
  }

  div(c) {
    let helper = new Complex(c.real, -c.imag)
    let up = this.mul(helper)
    let down = c.mul(helper)
    let real = up.real / down.real
    let imag = up.imag / down.real
    return new Complex(real, imag)
  }
}

// LinkedList
class LinkedList {

  constructor() {
    this.head = null
    this.tail = null
  }

  append(val) {
    let node = {
      val: val,
      next: null
    }
    if (this.head == null) {
      this.head = this.tail = node
      return
    }
    else {
      this.tail.next = node
      this.tail = node
      return
    }
  }

  prepend(val) {
    let node = {
      val: val,
      next: null
    }
    if (this.head === null) {
      this.head = this.tail = node
      return
    }
    else {
      node.next = this.head
      this.head = node
      return
    }
  }

  at(idx) {
    if (this.head === this.tail === null) return null
    let p = this.head
    let count = 0
    while (count < idx) {
      count++
      p = p.next
    }
    return p.val
  }

  get size() {
    let l = 0
    let p = this.head
    while (p) {
      l++
      p = p.next
    }
    return l
  }
}


// Queue
class Queue {

  constructor() {
    this.head = null
    this.tail = null
    this.count = 0
  }

  add(val) {
    let node = {
      val: val,
      next: null
    }
    if (!this.head) {
      this.head = this.tail = node
    }
    this.tail.next = node
    this.tail = node
    this.count++
  }

  pop() {
    if (!this.head) {
      return
    }
    this.count--
    if (this.head.next === this.tail) {
      let p = this.head.val
      this.head = this.tail = null
      return p
    }

    let p = this.head.val
    this.head = this.head.next
    return p
  }

  get size() {
    return this.count
  }
}


// Stack
class Stack {

  constructor() {
    this.head = null
    this.count = 0
  }

  push(val) {
    let node = {
      val: val,
      next: null
    }
    if (!this.head) {
      this.head = node
    } else {
      node.next = this.head
      this.head = node
    }
    this.count++
  }

  pop() {
    if (!this.head) return undefined

    this.count--
    let p = this.head.val
    this.head = this.head.next
    return p
  }

  get size() {
    return this.count
  }
}


// MyMap
class MyMap {

  constructor() {
    this._capacity = 16
    this._lists = new Array(this._capacity).fill(null)
    this._size = 0
    this._maxLoadFactor = 0.75
  }

  hashkey(key) {
    const seed = 131
    let hash = 0
    for (let char of key) {
      let code = char.charCodeAt(0)
      hash = (hash * seed + code) >>> 0
    }
    return hash % this._capacity
  }

  set(key, val) {
    const index = this.hashkey(key)
    let list = this._lists[index]
    let p = list
    while (p) {
      if (p.key === key) {
        p.val = val
        return this
      }
      p = p.next
    }
    let node = {
      key: key,
      val: val,
      next: null
    }
    node.next = list
    this._lists[index] = node
    this._size++
    if (this._size / this._capacity > this._maxLoadFactor) {
      this._expand()
    }
    return this
  }

  get(key) {
    const index = this.hashkey(key)
    let p = this._lists[index]
    while (p) {
      if (p.key === key) {
        return p.val
      }
      p = p.next
    }
  }

  has(key) {
    const index = this.hashkey(key)
    let p = this._lists[index]
    while (p) {
      if (p.key === key) {
        return true
      }
      p = p.next
    }
    return false
  }

  delete(key) {
    const index = this.hashkey(key)
    let dummy = {
      key: '',
      cal: 0,
      next: this._lists[index]
    }
    let p = dummy
    while (p.next) {
      if (p.next.key === key) {
        p.next = p.next.next
        this._lists[index] = dummy.next
        this._size--
        if (this._size / this._capacity < this._maxLoadFactor / 4) {
          this._shrink()
        }
        return true
      }
      p = p.next
    }
    return false
  }

  get size() {
    return this._size
  }

  _move(targetCapacity) {
    const oldLists = this._lists
    this._capacity = targetCapacity
    this._lists = new Array(this._capacity).fill(null)
    this.size = 0
    for (let list of oldLists) {
      let p = list
      while (p) {
        this.set(p.key, p.val)
        p = p.next
      }
    }
  }

  _expand() {
    this._move(this._capacity * 2)
  }

  _shrink() {
    if (this._capacity === 16) {
      return
    }
    this._move(this._capacity / 2)
  }

  forEach(action) {
    outerloop: for (let list of this._lists) {
      while (list) {
        if (action(list.key, list.val) === false) {
          break outerloop
        }
        list = list.next
      }
    }
  }
}


// MySet
class MySet {

  constructor() {
    this.MyMap = new MyMap()
  }

  add(key, val) {
    return this.MyMap.set(key, val)
  }

  get(key) {
    return this.MyMap.get(key)
  }

  has(key) {
    return this.MyMap.has(key)
  }

  delete(val) {
    return this.MyMap.delete(val)
  }

  get size() {
    return this.MyMap.size
  }
}


// PriorityQueue
class PriorityQueue {
  constructor(initials = [], predicate = it => it) {
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function, got: ' + predicate)
    }
    this._elements = []
    this._predicate = predicate

    for (var item of initials) {
      this.push(item)
    }
  }
  _swap(i, j) {
    var t = this._elements[i]
    this._elements[i] = this._elements[j]
    this._elements[j] = t
  }
  _heapUp(pos) {
    if (pos == 0) {
      return
    }
    var predicate = this._predicate
    var parentPos = (pos - 1) >> 1 // 计算pos位置的元素的父结点的位置
    if (predicate(this._elements[pos]) > predicate(this._elements[parentPos])) {
      this._swap(pos, parentPos)
      this._heapUp(parentPos)
    }
  }
  _heapDown(pos) {
    var leftPos = 2 * pos + 1
    var rightPos = 2 * pos + 2
    var maxIdx = pos
    var predicate = this._predicate
    if (leftPos < this._elements.length && predicate(this._elements[leftPos]) > predicate(this._elements[maxIdx])) {
      maxIdx = leftPos
    }
    if (rightPos < this._elements.length && predicate(this._elements[rightPos]) > predicate(this._elements[maxIdx])) {
      maxIdx = rightPos
    }
    if (maxIdx !== pos) {
      this._swap(maxIdx, pos)
      this._heapDown(maxIdx)
    }
  }
  push(val) {
    this._elements.push(val)
    this._heapUp(this._elements.length - 1)
    return this
  }
  pop() {
    if (this._elements.length == 0) {
      return undefined
    }
    if (this._elements.length == 1) {
      return this._elements.pop()
    }
    var result = this._elements[0]
    var last = this._elements.pop()
    this._elements[0] = last
    this._heapDown(0)
    return result
  }
  // 查看堆顶元素但不将它从堆中删除
  peek() {
    return this._elements[0]
  }
  get size() {
    return this._elements.length
  }
}

RegExp.prototype.mytest = function (str) {
  if (this.exec(str)) {
    return true
  } else {
    return false
  }
}

String.prototype.mysearch = function (target) {
  if (typeof target == 'string') {
    return this.indexOf(target)
  } else {
    const match = target.exec(this)
    if (match) {
      return match.index
    } else {
      return -1
    }
  }
}

String.prototype.mymatch = function (re) {
  if (re.global) {
    re.lastIndex = 0
    let result = []
    let match
    while (match = re.exec(this)) {
      result.push(match[0])
    }
    return result
  } else {
    return re.exec(this)
  }
}

String.prototype.mymatchAll = function (re) {
  if (re instanceof RegExp) {
    if (!re.global) {
      throw new TypeError('String.prototype.matchAll called with a non-global RegExp argument at xxx')
    }
  }
  if (typeof re == 'string') {
    re = new RegExp(re, 'g')
  }
  let result = []
  let match
  while (match = re.exec(this)) {
    result.push(match)
  }
  return match
}

String.prototype.myreplace = function (re, replacer) {
  re.lastIndex = 0
  let result = ''
  let match
  let lastLastIndex = 0
  while ((match = re.exec(this))) {
    result += this.slice(lastLastIndex, match.index)

    if (typeof replacer == 'function') {
      result += replacer(...match, match.index, match.input)
    } else {
      let replacement = replacer.myreplace(/\$[1-9\&]/g, (_, idx) => {
        if (idx == '&') {
          return match[0]
        } else {
          return match[idx]
        }
      })
      result += replacement
    }
    lastLastIndex = re.lastIndex
    if (!re.global) {
      lastLastIndex = match.index + match[0].length
      break
    }
  }
  result += this.slice(lastLastIndex)
  return result
}

// String.prototype.myreplace = function (re, replacement) {
//   if (typeof re === 'string') {
//     re = new RegExp(re)
//   }
//   re.lastIndex = 0
//   let result = ''
//   let match
//   let lastLastIndex = 0

//   while ((match = re.exec(this))) {
//     result += this.slice(lastLastIndex, match.index)
//     if (typeof replacement === 'function') {
//       result += replacement(...match, match.index, match.input)
//     } else {
//       replacer = replacement.myreplace(/\$([1-9\&])/g, (_, idx) => {
//         if (idx === '&') {
//           return match[0]
//         } else {
//           return match[idx]
//         }
//       })
//       result += replacer
//     }
//     lastLastIndex = re.lastIndex
//     if (!re.global) {
//       lastLastIndex = match.index + match[0].length
//       break
//     }
//   }
//   result += this.slice(lastLastIndex)

//   return result
// }

// String.prototype.myreplace = function (regexp, replacer) {
//   regexp.lastIndex = 0;
//   var result = "";
//   var match;
//   var lastLastIndex = 0;
//   while ((match = regexp.exec(this))) {
//     result += this.slice(lastLastIndex, match.index);
//     if (typeof replacer == "function") {
//       result += replacer(...match, match.index, match.input);
//     } else {
//       var replacement = replacer.myreplace(/\$([1-9\&])/g, (_, idx) => {
//         if (idx == "&") {
//           return match[0];
//         } else {
//           return match[idx];
//         }
//       });
//       result += replacement;
//     }
//     lastLastIndex = regexp.lastIndex;
//     if (!regexp.global) {
//       lastLastIndex = match.index + match[0].length;
//       break;
//     }
//   }
//   result += this.slice(lastLastIndex);
//   return result;
// };

String.prototype.myreplaceAll = function (re, replacer) {
  if (!re.global) {
    throw new TypeError('String.prototype.replaceAll called with a non-global RegExp argument at xxx')
  }
  return this.myreplace(re, replacer)
}

String.prototype.mysplit = function (re) {
  if (typeof re == 'string') {
    if (re) {
      re = new RegExp(re, 'g')
      let result = []
      re.lastIndex = 0
      let lastLastIndex = 0
      let match
      while (match = re.exec(this)) {
        result.push(this.slice(lastLastIndex, match.index))
        result.push(...match.slice(1))
        lastLastIndex = re.lastIndex
      }
      result.push(this.slice(lastLastIndex))
      return result
    } else {
      let result = []
      for (let i = 0; i < this.length; i++) {
        result.push(this[i])
      }
      return result
    }

  } else {
    let result = []
    if (!re.global) {
      re = new RegExp(re.source, 'g' + re.flags)
    }
    re.lastIndex = 0
    let lastLastIndex = 0
    let match
    while (match = re.exec(this)) {
      result.push(this.slice(lastLastIndex, match.index))
      result.push(...match.slice(1))
      lastLastIndex = re.lastIndex
    }
    result.push(this.slice(lastLastIndex))
    return result
  }
}









