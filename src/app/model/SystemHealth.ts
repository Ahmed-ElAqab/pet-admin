export class SystemHealth {
    status: string;
    components: {
        db: {
            status: string,
            details: {
                database: string

            }
        },
        diskSpace: {
            status: string,
            details: {
                total: number,
                free: number | string,
                threshold: number
            }
        }
    };

}
