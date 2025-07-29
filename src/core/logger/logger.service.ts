import { Injectable, LoggerService as NestLogger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as winston from "winston";
import * as dayjs from "dayjs";



@Injectable()
export class LoggerService implements NestLogger {
    private logger: winston.Logger
    constructor(private readonly configServer: ConfigService) {

        const isDevelopment = this.configServer.getOrThrow(`environment`) === `development`
        const { combine, timestamp, json, colorize, printf } = winston.format

        const formatTime = () => {
            return dayjs().format("YYYY-MM-DD HH:mm:ss")
        }

        const logFormat = isDevelopment ? combine(colorize(), timestamp(), printf(({ level, context, message, meta }) => {
            return `${formatTime()} ${level} [${context}] ${message} ${meta ? JSON.stringify(meta) : ``}`
        })) : combine(
            timestamp(),
            json()
        )

        this.logger = winston.createLogger({
            format: logFormat,
            transports: [
                new winston.transports.Console()
            ]
        })
    }
    log(message: string, context?: string, meta?: any) {
        this.logger.info(message, { context, meta })
    }
    warn(message: string, context?: string, meta?: any) {
        this.logger.warn(message, { context, meta })
    }
    error(message: string, trace?: string, context?: string, meta?: any) {
        this.logger.error(message, { trace, context, meta })
    }
}