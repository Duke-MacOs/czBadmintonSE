import { Controller, Get, Post, Req, Header, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateUserDto } from './user.dto';
import { UserEntity } from '@entity/user.entity';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('list')
  @Header('Cache-Control', 'none')
  findAll(@Req() request: Request): string {
    console.log('请求详情：', request);
    return 'This action returns all cats';
  }

  @Post()
  async create(@Body() params: CreateUserDto): Promise<string> {
    return 'This action adds a new cat';
  }

  @ApiOperation({ summary: '注册用户' })
  @ApiResponse({ status: 201, type: [UserEntity] })
  @Post('register')
  register(@Body() createUser: CreateUserDto) {
    return this.userService.register(createUser);
  }
}
