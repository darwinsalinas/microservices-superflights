import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FLIGHT } from '../common/models/models';
import { IFlight } from '../common/interfaces/flight.interface';
import { FlightDto } from './dto/flight.dto';

@Injectable()
export class FlightService {
  constructor(
    @InjectModel(FLIGHT.name) private readonly model: Model<IFlight>,
  ) {}

  async create(flightDto: FlightDto): Promise<IFlight> {
    const newFlight = new this.model(flightDto);
    return await newFlight.save();
  }

  async index(): Promise<IFlight[]> {
    return await this.model.find().populate('passengers');
  }

  async show(id: string): Promise<IFlight> {
    return await (await this.model.findById(id)).populate('passengers');
  }

  async update(id: string, flightDto: FlightDto): Promise<IFlight> {
    const result = await this.model.findByIdAndUpdate(id, flightDto, {
      new: true,
    });

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  async delete(id: string) {
    const result = await this.model.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException();
    }

    return {
      status: HttpStatus.OK,
      message: 'Deleted',
    };
  }

  async addPassenger(flightId: string, passengerId: string): Promise<IFlight> {
    return await this.model
      .findByIdAndUpdate(
        flightId,
        {
          $addToSet: { passengers: passengerId },
        },
        { new: true },
      )
      .populate('passengers');
  }
}
