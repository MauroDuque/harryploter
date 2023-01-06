export function set_mouse_coor(x: any, y: any): void;
export function set_action(action: any): void;
export namespace actions {
    const down: number;
    const up: number;
}
export namespace mouse_action {
    namespace move {
        const x: number;
        const y: number;
    }
    const action: any;
}
