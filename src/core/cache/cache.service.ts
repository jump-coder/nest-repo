import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";

@Injectable()
export class CacheService {
    constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) { }

    async get<T>(key: string): Promise<T | undefined> {
        return await this.cache.get<T>(key)
    }

    async set<T>(key: string, value: any, ttl?: number): Promise<void> {
        await this.cache.set(key, value, ttl !== undefined ? ttl : undefined)
    }

    async del(key: string): Promise<void> {
        await this.cache.del(key)
    }

    async reset(): Promise<void> {
        await this.cache.clear()
    }

    async onModuleDestory() {
        // 断开链接
        await this.cache.disconnect()
    }
}