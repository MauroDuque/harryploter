export class HarryPloter {
    constructor(options: any);
    options: any;
    init(): void;
    container: {
        ctx: CanvasRenderingContext2D;
        id: any;
        canvas: HTMLCanvasElement;
    };
    render_on_tick: () => void;
    start(): void;
    stop(): void;
    clear(): void;
    render(): void;
}
