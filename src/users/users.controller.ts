import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,

    ) { }

    @Get()
    async findAll() {
        return await this.usersService.findAll();
    }

    @Post()
    async findOne(@Body() id: number) {
        const user = await this.usersService.findUserById(id);
        
    }

    @Post('signup')
    async createUser(@Body() createUserDto: CreateUserDto) {
        return await this.usersService.createUser(createUserDto);
    }

}
