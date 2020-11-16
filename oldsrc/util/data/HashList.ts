import { Hashable } from "./Hashable";

export class HashEntry<VALUE extends Hashable> {
    next: HashEntry<VALUE>;

    readonly hash: number;
    value: VALUE;

    constructor(value: VALUE, hash: number) {
        this.hash = hash;
        this.value = value;
    }
}

export class HashList<VALUE extends Hashable> {
    buckets: HashEntry<VALUE>[] = [];

    public constructor() {

    }

    public add(value: VALUE) {
        let hash = value.hash();

        let bucket = this.buckets[hash];
        if(bucket == null) {
            this.buckets[hash] = new HashEntry<VALUE>(value, hash);
        } else {
            while (bucket.next != null) {
                if(bucket.value.equals(value)) {
                    bucket.value = value;
                    return;
                }
                bucket = bucket.next;
            }
            bucket.next = new HashEntry<VALUE>(value, hash);

            if (bucket.value.equals(value)) {
                bucket.value = value;
            } else {
                bucket.next = new HashEntry<VALUE>(value, hash);
            }
        }
    }

    public remove(value: VALUE): boolean {
        let hash: number = value.hash();

        let bucket = this.buckets[hash];
        let prevBucket: HashEntry<VALUE>;
        if(bucket != null) {
            while (bucket.next != null) {
                if(bucket.value.equals(value)) {
                    if(prevBucket != null) {
                        prevBucket.next = bucket.next;
                    } else {
                        if(bucket.next != null) {
                            this.buckets[hash] = bucket.next;
                        } else {
                            this.buckets.splice(hash, 1);
                        }
                    }
                    return true;
                }
                prevBucket = bucket;
                bucket = bucket.next;
            }
        }
        return false;
    }

    public get(value: VALUE): VALUE {
        let hash = value.hash();

        let bucket = this.buckets[hash];
        if(bucket != null) {
            if(bucket.value.equals(value)) {
                return bucket.value;
            } else {
                while(!bucket.value.equals(value)) {
                    if(bucket.next == null) {
                        return null;
                    } else {
                        bucket = bucket.next;
                    }
                }
                return bucket.value;
            }
        } else {
            return null;
        }
    }

    public contains(value: VALUE): boolean {
        let hash = value.hash();

        let bucket = this.buckets[hash];
        if(bucket != null) {
            if(bucket.value.equals(value)) {
                return true;
            } else {
                while(!bucket.value.equals(value)) {
                    if(bucket.next == null) {
                        return false;
                    } else {
                        bucket = bucket.next;
                    }
                }
                return true;
            }
        } else {
            return false;
        }
    }

    public forEach(callback: (entry: HashEntry<VALUE>) => void) {
        let entry: HashEntry<VALUE>;

        this.buckets.forEach((element) => {
            entry = element;
            do {
                callback(entry);
                entry = entry.next;
            } while (entry.next != undefined)
        });
    }
}

