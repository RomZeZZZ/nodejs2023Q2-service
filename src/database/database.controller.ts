import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { User } from 'src/db/db';
@Controller('database')
export class DatabaseController {
    constructor(private databaseService: DatabaseService){}
    @Get()
    async findAll(): Promise<User[]> {
      return this.databaseService.findAll();
    }
}
