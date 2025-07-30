import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class DataBaseService extends PrismaClient {
    async onModuleInit() {
        await this.$connect()
    }
}