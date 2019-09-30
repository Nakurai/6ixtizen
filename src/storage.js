import Dexie from 'dexie'
class Db {
    version = null;
    name = null;
    db = null;

    async  init(version, name) {

        if (version)
            this.version = version;
        if (name)
            this.name = name;

        this.db = new Dexie(this.name);

        this.db.version(this.version).stores({
            setting: '++id, code',
            calendar: '++id, code',
            trip: '++id, from, to',
        });

    }

    async insertDefault() {
        await this.db.setting.add({ code: "version", value: "1.0" });
        await this.db.calendar.add({ code: "datePr", value: null });
        await this.db.calendar.add({ code: "dateFirstEntry", value: null });
    }
}

export default new Db()