import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Response,
  Request,
} from '@nestjs/common';
import { CookieService } from './cookie.service';
import { CreateCookieDto } from './dto/create-cookie.dto';
import { UpdateCookieDto } from './dto/update-cookie.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('cookit 模块')
@Controller('cookie')
export class CookieController {
  constructor(private readonly cookieService: CookieService) {}

  @Post()
  create(@Body() createCookieDto: CreateCookieDto) {
    return this.cookieService.create(createCookieDto);
  }

  @Get()
  findAll() {
    return this.cookieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cookieService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCookieDto: UpdateCookieDto) {
    return this.cookieService.update(+id, updateCookieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cookieService.remove(+id);
  }

  @ApiOperation({ summary: '设置 cookie' })
  @Get('setCookie')
  setCookie(@Response() res) {
    res.cookie('cookieData', 'test cookie', {
      maxAge: 1000 * 60 * 10,
      httpOnly: true,
      signed: true,
    });

    return res.send('🌆');
  }

  @Get('getCookie')
  @ApiOperation({ summary: '获取 cookie' })
  getCookie(@Request() req) {
    //加密的cookie获取方式 - 设置 signed 属性
    console.log(req.signedCookies);
    return req.cookies;
  }
}
