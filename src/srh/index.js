import { PositionService } from './services/PositionService';

const DEFAULT_SETTINGS = {
    interval: 250,
    fenceSize: 40
}

class SRH {

    constructor(settings) {
        this.settings = { ...DEFAULT_SETTINGS, ...settings };
        this._service = new PositionService();
        document.onmousemove = function (e) {
            const event = e || window.event;
            window.mouseX = event.clientX;
            window.mouseY = event.clientY;
        }
    }

    start() {
        setInterval(() => {
            const x = Math.floor(window.mouseX / this.settings.fenceSize);
            const y = Math.floor(window.mouseY / this.settings.fenceSize);
            this._service.add({ x, y })
        }, this.settings.interval);
    }

    async getHeatMap() {
        let ocurrences = [];
        let data = await this._service.getHeatMap();
        data.forEach(element => {

        });
        //fence
        console.table(data);
    }
}

export default SRH;