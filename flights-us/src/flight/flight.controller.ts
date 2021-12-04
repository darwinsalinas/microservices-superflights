import { Controller } from '@nestjs/common';
import { FlightService } from './flight.service';
import { FlightDto } from './dto/flight.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { IFlight } from 'src/common/interfaces/flight.interface';
import { FlightMSG } from '../common/constants';

@Controller()
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @MessagePattern(FlightMSG.CREATE)
  create(@Payload() flightDto: FlightDto) {
    return this.flightService.create(flightDto);
  }

  @MessagePattern(FlightMSG.FIND_ALL)
  index(): Promise<FlightDto[]> {
    return this.flightService.index();
  }

  @MessagePattern(FlightMSG.FIND_ONE)
  show(@Payload() id: string): Promise<IFlight> {
    return this.flightService.show(id);
  }

  @MessagePattern(FlightMSG.UPDATE)
  update(@Payload() payload) {
    return this.flightService.update(payload.id, payload.flightDto);
  }

  @MessagePattern(FlightMSG.DELETE)
  delete(@Payload() id: string) {
    return this.flightService.delete(id);
  }

  @MessagePattern(FlightMSG.ADD_PASSENGER)
  addPassenger(@Payload() payload) {
    return this.flightService.addPassenger(
      payload.flightId,
      payload.passengerId,
    );
  }
}
