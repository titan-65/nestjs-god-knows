import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean, IsDate } from 'class-validator';

export class PrayerDto {
  @IsString()
    id: string;

  @IsString()
    title: string;

    @IsString()
    content: string;

    @IsDate()
    createdAt: Date;

    @IsDate()
    updatedAt: Date;

    // @ManyToOne(type => User, user => user.prayers)
}
