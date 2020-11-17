export interface Key {
    hashcode(): number;
    equals(key : this): boolean;
}

export class KeyEntry<VALUE> {
    next: KeyEntry<VALUE>;

    readonly key: Key;
    value: VALUE;


    constructor(key: Key, value: VALUE) {
        this.key = key;
        this.value = value;
    }
}

export class HashMap<VALUE> {
    buckets: KeyEntry<VALUE>[] = [];

    public constructor() {

    }

    public put(key: Key, value: VALUE) {
        let id = key.hashcode();

        let bucket = this.buckets[id];
        if(bucket == null) {
            this.buckets[id] = new KeyEntry<VALUE>(key, value);
        } else {
            while (bucket.next != null) {
                if(bucket.key.equals(key)) {
                    bucket.value = value;
                    return;
                }
                bucket = bucket.next;
            }
            bucket.next = new KeyEntry<VALUE>(key, value);

            if (bucket.key.equals(key)) {
                bucket.value = value;
            } else {
                bucket.next = new KeyEntry<VALUE>(key, value);
            }
        }
    }

    public get(key: Key): VALUE {
        let id = key.hashcode();

        let bucket = this.buckets[id];
        if(bucket != null) {
            if(bucket.key.equals(key)) {
                return bucket.value;
            } else {
                while(!bucket.key.equals(key)) {
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

    public remove(key: Key): boolean {
        let id = key.hashcode();

        let bucket = this.buckets[id];
        let prevBucket = null;
        if(bucket != null) {

            // If bucket has next bucket
            if(bucket.next != null) {

                // Iterate thru every parent, until there isn't next one
                while (bucket.next != null) {

                    // If the bucket equals target
                    if(bucket.key.equals(key)) {

                        // If there's a bucket before that one
                        if(prevBucket != null) {

                            // Assign the next bucket as last one's next
                            // Read as: delete reference to this bucket
                            prevBucket.next = bucket.next;
                        } else {
                            // If there isn't a bucket before this one

                            if(bucket.next != null) {
                                // If there's a next bucket

                                // Assign he next bucket as the first one
                                // Read as: delete reference to this bucket
                                this.buckets[id] = bucket.next;
                            } else {
                                // If there isn't a next bucket

                                // Remove this bucket list
                                this.buckets.splice(id, 1);
                            }
                        }
                        return true;
                    }
                    prevBucket = bucket;
                    bucket = bucket.next;
                }
            } else {
                // If bucket doesn't have a next bucket

                // If the bucket equals target
                if(bucket.key.equals(key)) {

                    // Remove his bucket list
                    this.buckets[id] = undefined;
                    // this.buckets.splice(id, 1);
                    return true;
                }
            }
        }

        return false;
    }

    public forEach(callback: (entry: KeyEntry<VALUE>) => void) {
        let entry: KeyEntry<VALUE>;

        this.buckets.forEach((element) => {
            entry = element;
            do {
                callback(entry);
                entry = entry.next;
            } while (entry.next != undefined)
        });
    }
}

