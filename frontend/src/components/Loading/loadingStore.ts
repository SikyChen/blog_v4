interface LoadingStore {
  event: any;
  setLoading: (value: boolean) => void;
  listen: (fn: Function) => void;
}

const loadingStore: LoadingStore = {
  event: () => {},
  setLoading(value: boolean) {
    this.event(value);
  },
  listen(fn: Function) {
    this.event = fn;
  }
}

export default loadingStore;
