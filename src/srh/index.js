import { PositionService } from './services/PositionService';

const DEFAULT_SETTINGS = {
    interval: 250,
    fenceSize: 30
}

class SRH {

    constructor(settings) {
        this.settings = { ...DEFAULT_SETTINGS, ...settings };
        this._service = new PositionService();
        this._service.reset();
        document.onmousemove = function (e) {
            const event = e || window.event;
            window.mouseX = event.clientX;
            window.mouseY = event.clientY;
        }
    }

    start() {
        setInterval(() => {
            const x = window.mouseX / this.settings.fenceSize;
            const y = window.mouseY / this.settings.fenceSize;
            this._service.add({ x, y })
        }, this.settings.interval);
    }

    async getHeatMap() {
        const ocurrences = [];
        const data = await this._service.getHeatMap();
        data.forEach(element => {
            let unique = ocurrences.find(item => element.x == item[0] && element[1] == item.y);
            if (unique == null) {
                ocurrences.push([
                    element.x * this.settings.fenceSize,
                    element.y * this.settings.fenceSize,
                    1
                ]);
            } else {
                unique[2] += 1;
            }
        });
        return ocurrences;
    }
}

export default SRH;