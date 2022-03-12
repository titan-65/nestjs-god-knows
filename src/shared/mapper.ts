import {UserDto} from '../users/dto/user.dto';
import {User} from '../users/entities/user.entity';

export const toUserDto = (data: User): UserDto => {
    const { id, username, email, firstName, lastName } = data;
    const userDto: UserDto = {id, username, email, firstName, lastName};
    return userDto;
};
