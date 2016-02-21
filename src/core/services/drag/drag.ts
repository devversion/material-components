import {Injectable} from "angular2/core";

@Injectable()
export class MdDrag {

  private START_EVENTS = ['mousedown', 'touchstart', 'pointerdown'];
  private MOVE_EVENTS = ['mousemove', 'touchmove', 'pointermove'];
  private END_EVENTS = ['mouseup', 'mouseleave', 'touchend', 'touchcancel', 'pointerup', 'pointercancel'];

  private handlers: any[] = [];
  private currentItem: any;

  constructor() {
    this.registerEvents();
  }

  register(element: any) {
    element.$mdDrag = true;
    this.handlers.push({
      element: element
    });
  }

  registerEvents() {
    this.START_EVENTS.forEach(entry => document.addEventListener(entry, (ev:PointerEvent) => this.onStartDrag(ev)));
    this.MOVE_EVENTS.forEach(entry => document.addEventListener(entry, (ev:PointerEvent) => this.onMoveDrag(ev)));
    this.END_EVENTS.forEach(entry => document.addEventListener(entry, (ev:PointerEvent) => this.onStopDrag(ev)));
  }

  createPointer(event: PointerEvent): any {
    return {
      startX: event.pageX,
      startY: event.pageY,
      distanceX: 0,
      distanceY: 0
    };
  }

  updatePointer(event: PointerEvent, pointer: any): any {
    pointer.distanceX = event.pageX - pointer.startX;
    pointer.distanceY = event.pageY - pointer.startY;
    return pointer;
  }

  private triggerEvent(element: Node, suffix: string, pointer: any) {
    element.dispatchEvent(new CustomEvent('$md.' + suffix, {
      detail: {
        pointer: pointer
      }
    }));
  }

  onStartDrag(event: PointerEvent) {
    var element = this.getNearestParent(event.srcElement);
    var item;

    if (!element || !(item = this.findProperty(this.handlers, 'element', element))) return;
    event.preventDefault();

    item.pointer = this.createPointer(event);

    this.triggerEvent(element, 'dragstart', item.pointer);

    this.currentItem = item;
  }

  onMoveDrag(event: PointerEvent) {
    if (!this.currentItem) return;
    event.preventDefault();

    this.currentItem.pointer = this.updatePointer(event, this.currentItem.pointer);

    this.triggerEvent(this.currentItem.element, 'drag', this.currentItem.pointer);
  }

  onStopDrag(event: PointerEvent) {
    if (!this.currentItem) return;
    event.preventDefault();

    this.currentItem.pointer = this.updatePointer(event, this.currentItem.pointer);

    this.triggerEvent(this.currentItem.element, 'dragend', this.currentItem.pointer);

    this.currentItem = null;
  }

  getNearestParent(node: any): Node {
    var current = node;
    while (current) {
      if (current.$mdDrag) {
        return current;
      }
      current = current.parentNode;
    }
    return null;
  }

  findProperty(arr: any[], propName: string, propValue: any): any {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][propName] == propValue) {
        return arr[i];
      }
    }
  }

}