import { PositionService } from './services/PositionService';

const DEFAULT_SETTINGS = {
    interval: 250,
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
        setInterval(() => this._service.add({ x: window.mouseX, y: window.mouseY }), this.settings.interval);
    }
}

export default SRH;