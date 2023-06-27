import {makeAutoObservable} from "mobx";

class DeviceStore {

    constructor() {
        this._types = []
        this._brends = []
        this._devices = []
        this._selectedType = {}
        this._selectedBrend = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 3



        makeAutoObservable(this)

    }
    setTypes(types) {
        this._types = types
    }

    setBrends(brends) {
        this._brends = brends
    }

    setPage(page) {
        this._page = page
    }

    setTotalCount(count) {
        this._totalCount = count
    }
     setLimit(limit) {
        this._limit = limit
     }

    setDevices(devices) {
        this._devices = devices
    }
    setSelectedType(type){
        this.setPage(1)
        this._selectedType = type
    }
    setSelectedBrend(brend){
        this.setPage(1)
        this._selectedBrend = brend
    }
    get types(){
        return this._types
    }
    get brends(){
        return this._brends
    }
    get devices(){
        return this._devices
    }
    get selectedType(){
        return this._selectedType
    }
    get selectedBrend(){
        return this._selectedBrend
    }
    get totalCount(){
        return this._totalCount
    }
    get page(){
        return this._page
    }
    get limit(){
        return this._limit
    }
}
export default DeviceStore;