import { isDeepStrictEqual } from 'util';

export class Node<T extends object> {
   prev: Node<T> | null;
   next: Node<T> | null;

   constructor(public readonly data: T) {
      this.prev = null;
      this.next = null;
   }
}

export class Deque<T extends object> {
   head: Node<T> | null;
   tail: Node<T> | null;
   size: number;

   constructor() {
      this.head = this.tail = null;
      this.size = 0;
   }

   isEmpty(): boolean {
      return this.size === 0;
   }

   getSize(): number {
      return this.size;
   }

   addFirst(data: T): void {
      const newNode = new Node(data);

      if (this.head === null || this.tail === null) {
         this.head = newNode;
         this.tail = newNode;
         this.size++;
         return;
      }

      this.head.prev = newNode;

      newNode.next = this.head;

      newNode.prev = this.tail;

      this.head = newNode;

      this.tail.next = newNode;

      this.size++;
   }

   addLast(data: T): void {
      const newNode = new Node(data);

      if (this.head === null || this.tail === null) {
         this.head = newNode;
         this.tail = newNode;
         this.size++;
         return;
      }

      this.tail.next = newNode;

      newNode.next = this.head;

      newNode.prev = this.tail;

      this.tail = newNode;

      this.head.prev = newNode;

      this.size++;
   }

   removeFirst(): T {
      if (this.isEmpty() || this.head === null || this.tail === null) {
         throw new Error('No such element');
      }

      if (this.head === this.tail) {
         const data = this.head.data;
         this.head = null;
         this.tail = null;
         this.size--;
         return data;
      }

      const temp = this.head;

      this.head = this.head.next;

      if (this.head) this.head.prev = this.tail;

      temp.next = temp.prev = null;

      this.size--;

      return temp.data;
   }

   removeSpecific(data: T) {
      let current = this.head;

      while (current) {
         if (isDeepStrictEqual(current.data, data)) {
            if (current.prev) {
               current.prev.next = current.next;
            }

            if (current.next) {
               current.next.prev = current.prev;
            }

            if (current === this.head) {
               this.head = current.next;
            }

            if (current === this.tail) {
               this.tail = current.prev;
            }

            this.size--;

            current.next = current.prev = null;

            return;
         }

         current = current.next;
      }
   }

   removeLast(): T {
      if (this.isEmpty() || this.head === null || this.tail === null) {
         throw new Error('No such element');
      }

      if (this.head === this.tail) {
         const data = this.head.data;
         this.head = null;
         this.tail = null;
         this.size--;
         return data;
      }

      const temp = this.tail;

      this.tail = this.tail.prev;

      if (this.tail) this.tail.next = this.head;

      temp.prev = temp.next = null;

      this.size--;

      return temp.data;
   }

   toArray(): T[] {
      const items = [];

      let temp = this.head;

      while (temp !== null && temp === this.head) {
         items.push(temp.data);

         temp = temp.next;
      }

      return items;
   }
}
