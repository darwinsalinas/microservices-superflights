import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { PassengerDto } from './dto/passenger.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PASSENGER } from 'src/common/models/models';
import { IPassenger } from 'src/common/interfaces/passenger.interface';

@Injectable()
export class PassengerService {
  constructor(
    @InjectModel(PASSENGER.name) private readonly model: Model<IPassenger>,
  ) {}

  async create(passengerDto: PassengerDto): Promise<IPassenger> {
    const newPassenger = new this.model(passengerDto);
    return await newPassenger.save();
  }

  async getAll(): Promise<IPassenger[]> {
    return await this.model.find();
  }

  async getOne(id: string): Promise<IPassenger> {
    return await this.model.findById(id);
  }

  async update(id: string, passengerDto: PassengerDto): Promise<IPassenger> {
    return await this.model.findByIdAndUpdate(id, passengerDto, { new: true });
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
}
