export class TouchEventManager {
    constructor(widget) {
        this.ontouch = null;
        this.ontouchdown = null;
        this.ontouchup = null;
        if (widget)
            this._init(widget);
    }
    _init(widget) {
        let handleClick = true;
        widget.addEventListener(hmUI.event.CLICK_DOWN, (e) => {
            console.log("[TouchManager] Click Down");
            if (this.ontouchdown)
                this.ontouchdown(e);
            handleClick = true;
        });
        widget.addEventListener(hmUI.event.CLICK_UP, (e) => {
            console.log("[TouchManager] Click Up");
            if (this.ontouchup)
                this.ontouchup(e);
            if (handleClick && this.ontouch) {
                console.log("[TouchManager] Executing ontouch callback");
                this.ontouch(e);
            }
            handleClick = false;
        });
    }
}
