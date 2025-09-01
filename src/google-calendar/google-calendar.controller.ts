import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GoogleCalendarService } from './google-calendar.service';
import { CreateGoogleCalendarDto } from './dto/create-google-calendar.dto';
import { UpdateGoogleCalendarDto } from './dto/update-google-calendar.dto';

@Controller('google-calendar')
export class GoogleCalendarController {
  constructor(private readonly googleCalendarService: GoogleCalendarService) {}

  @Post()
  create(@Body() createGoogleCalendarDto: CreateGoogleCalendarDto) {
    return this.googleCalendarService.create(createGoogleCalendarDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGoogleCalendarDto: UpdateGoogleCalendarDto,
  ) {
    return this.googleCalendarService.update(+id, updateGoogleCalendarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.googleCalendarService.remove(+id);
  }
}
