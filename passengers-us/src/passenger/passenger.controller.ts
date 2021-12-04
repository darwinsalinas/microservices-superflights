import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PassengerMSG } from 'src/common/constants';
import { PassengerDto } from './dto/passenger.dto';
import { PassengerService } from './passenger.service';

@Controller()
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  @MessagePattern(PassengerMSG.CREATE)
  create(@Payload() passengerDto: PassengerDto) {
    return this.passengerService.create(passengerDto);
  }

  @MessagePattern(PassengerMSG.FIND_ALL)
  getAll() {
    return this.passengerService.getAll();
  }

  @MessagePattern(PassengerMSG.FIND_ONE)
  getOne(@Payload() id: string) {
    return this.passengerService.getOne(id);
  }

  @MessagePattern(PassengerMSG.UPDATE)
  update(@Payload() payload) {
    return this.passengerService.update(payload.id, payload.passengerDto);
  }

  @MessagePattern(PassengerMSG.DELETE)
  delete(@Payload() id: string) {
    return this.passengerService.delete(id);
  }
}
