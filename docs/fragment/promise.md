---
nav:
  title: 片段
  order: 4
group: 基础
order: 0
toc: content
---
# promise

```ts
interface Resolve {
  (value: unknown): void
}
interface Reject {
  (reason: unknown): void
}
interface Executor {
  (resolve: Resolve, reject: Reject): void
}
interface CallBackFn {
  (): void
}
interface FulfilledFn {
  (value: unknown): unknown
}
interface RejectedFn {
  (reason: unknown): unknown
}
class MyPromiseTS{
  //  1、设定3个状态值，只能由PENDING转变成FULFILLED或REJECTED，且只能转变一次。
  #PENDING: string = 'pending'
  #FULFILLED: string = 'fulfilled'
  #REJECTED: string = 'rejected'
  
  private state: string = this.#PENDING               // 状态存储
  private value: unknown = null                       // resolve方法返回的唯一值
  private reason: unknown = null                      // reject方法返回的唯一值  
  private onFulfilledCallBacks: CallBackFn[] = []     // fulfilled状态的回调数组
  private onRejectedCallBacks: CallBackFn[] = []  

  constructor(executor:Executor){
    const resolve: Resolve = (value: unknown): void => {
      if (this.state === this.#PENDING) {
        this.state = this.#FULFILLED
        this.value = value
        this.onFulfilledCallBacks.forEach((fn: CallBackFn): void => {
            fn()
        })
      }
    }
    const reject: Reject = (reason: unknown): void => {
      if (this.state === this.#PENDING) {
        this.state = this.#REJECTED
        this.reason = reason
        this.onRejectedCallBacks.forEach((fn: CallBackFn): void => {
            fn()
        })
      }
    }
    // && 确保exector方法存在再执行，避免ts报错, 下面同理
    try {
      executor && executor(resolve, reject)
    } catch (err: unknown) {
      reject(err)
    }
  }
  // then方法
  // 通过settimeOut来模拟异步调用，保证链式调用，所以then方法抛出的是一个新的promis，并将返回值进行resolve
  then(onFulfilled: FulfilledFn | null, onRejected?: RejectedFn): MyPromiseTS {
    if (!onFulfilled || typeof onFulfilled !== 'function') {
      onFulfilled = (value: unknown): unknown => value
    }
    if (!onRejected || typeof onRejected !== 'function') {
      onRejected = (reason: unknown): unknown => reason
    }
    const myPromiseTS: MyPromiseTS = new MyPromiseTS((resolve: Resolve, reject: Reject) => {
      switch (this.state) {
        // PENDING状态时将回调方法全部存在到回调数组内
        case this.#PENDING:
        this.onFulfilledCallBacks.push(() => {
          try {
            const result: unknown = onFulfilled && onFulfilled(this.value) 
            resolve(result)
          } catch (err: unknown) {
            reject(err)
          }
        })
        this.onRejectedCallBacks.push(() => {
          try {
            const result: unknown = onRejected && onRejected(this.reason)
            resolve(result)
          } catch (err: unknown) {
            reject(err)
          }
        })
        break
        case this.#FULFILLED:
        try {
            const result: unknown = onFulfilled && onFulfilled(this.value)
            resolve(result)
        } catch (err) {
            reject(err)
        }
        break
        case this.#REJECTED:
        try {
          const result: unknown = onRejected && onRejected(this.reason)
          reject(result)
        } catch (err) {
          reject(err)
        }
      break
      }
    })
    return myPromiseTS
  }


  // catch方法    
  catch(onRejected: RejectedFn): MyPromiseTS {
    return this.then(null, onRejected)
  }
  // finally方法
  finally(fn: Function): MyPromiseTS {
    return this.then((value) => {
      fn()
      return value
    }, (reason) => {
      fn()
      throw reason
    })
  }


  // all方法，接收一个promise数组，当所有promise状态都为resolve时执行resolve
  all(promises: MyPromiseTS[]): MyPromiseTS {
    return new MyPromiseTS((resolve, reject) => {
      if (promises.length === 0) {
        resolve([])
      } else {
        const result: unknown[] = [] // 接受promise返回值
        for (let i: number = 0; i < promises.length; i++) {
          promises[i].then(data => {
            result[i] = data
            if (++i === promises.length) {
              resolve(result)
            }
          }, (err: unknown) => {
            reject(err)
            return
          })
        }
      }
    })
  }
  //race方法，接收一个promise数组，当有一个promise状态为resolve时执行resolve
  race(promises: MyPromiseTS[]): MyPromiseTS {
    return new MyPromiseTS((resolve, reject) => {
      if (promises.length === 0) {
        resolve(null)
      } else {
        for (let i: number = 0; i < promises.length; i++) {
          promises[i].then(data => {
            resolve(data)
          }, reason => {
            reject(reason)
            return
          })
        }
      }
    })
  }
}
```

