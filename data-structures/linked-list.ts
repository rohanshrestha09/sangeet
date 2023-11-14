import { isDeepStrictEqual } from 'util';

export class Node<T> {
   prev: Node<T> | null;
   next: Node<T> | null;

   constructor(public readonly data: T) {
      this.prev = null;
      this.next = null;
   }
}

export class LinkedList<T> {
   head: Node<T> | null;
   tail: Node<T> | null;

   constructor() {
      this.head = null;
      this.tail = null;
   }

   append(data: T) {
      const newNode = new Node(data);

      if (!this.head) {
         this.head = newNode;
         this.tail = newNode;
         return;
      }

      newNode.next = null;

      newNode.prev = this.tail;

      if (this.tail) this.tail.next = newNode;

      this.tail = newNode;
   }

   remove(data: T) {
      let current = this.head;

      while (current) {
         if (isDeepStrictEqual(current.data, data)) {
            if (current.prev) {
               current.prev.next = current.next;
            } else {
               this.head = current.next;
            }

            if (current.next) {
               current.next.prev = current.prev;
            } else {
               this.tail = current.prev;
            }

            return;
         }

         current = current.next;
      }
   }
}
