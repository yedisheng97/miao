// Vector
class Vector {

  constructor() {
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
  constructor() {
    this.real = real
    this.imag = imag
  }

  static plus(a, b) {
    let real = a.real + b.real
    let imag = a.imag + b.imag
    return new Complex(real, imag)
  }

  static minus(a, b) {
    let real = a.real - b.real
    let imag = a.imag - b.imag
    return new Complex(real, imag)
  }

  static mul(a, b) {
    let real = a.real * b.real + a.imag * b.imag * (-1)
    let imag = a.real * b.imag + b.imag * b.real
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
}

// LinkedList
class LinkedList {

  constructor(...initVals) {
    this.head = null
    this.tail = null
    for (let item of initVals) {
      this.head.append(item)
    }
  }

  append(val) {
    let node = {
      val: val,
      next: null
    }
    if (this.head === null) {
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

  get length() {
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

  pop(val) {
    if (!this.head) {
      return
    }

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

  add(val) {
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

  pop(val) {
    if (!this.head) return undefined

    this.count++
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
    for (const char of key) {
      let code = char.charCodeAt()
      hash = (hash * seed + code) >>> 0
    }
    return hash % this._capacity
  }

  set(key, val) {
    const index = hashkey(key)
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
    const index = hashkey(key)
    let p = this._lists[index]
    while (p) {
      if (p.key === key) {
        return p.val
      }
      p = p.next
    }
  }

  has(key) {
    const index = hashkey(key)
    let p = this._lists[index]
    while (p) {
      if (p.key === key) {
        return true
      }
      p = p.next
    }
    return false
  }

  delete(val) {
    const index = hashkey(key)
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
    this.MyMap() = new MyMap()
  }

  set(key, val) {
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
    return this.MyMap.size()
  }
}